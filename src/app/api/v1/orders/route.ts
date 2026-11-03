import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { sendOrderAlertToAdmin } from "@/lib/telegram";

const createOrderSchema = z.object({
  fullName: z.string().min(2, "Ism kamida 2 harfdan iborat bo'lishi kerak"),
  phoneNumber: z.string().min(9, "Telefon raqami to'g'ri kiritilishi shart"),
  orderType: z.enum(["PICKUP", "DELIVERY", "EVENT"]),
  deliveryAddress: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.number().optional(),
  notes: z.string().optional(),
  paymentMethod: z.enum(["CASH", "OPERATOR_CONFIRMED", "CLICK", "PAYME"]).default("CASH"),
  items: z.array(
    z.object({
      productId: z.string(),
      weightKg: z.number().positive(),
    })
  ).min(1, "Kamida bitta mahsulot tanlanishi shart"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = createOrderSchema.parse(body);

    // 1. Calculate price securely on SERVER SIDE (client prices ignored)
    let calculatedItemsTotal = 0;
    let totalWeightKg = 0;

    const validatedItems = validated.items.map((item) => {
      const product = INITIAL_PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`Mahsulot topilmadi: ${item.productId}`);
      }
      const weight = Number(item.weightKg.toFixed(2));
      const linePrice = Math.round(weight * product.pricePerKg);

      calculatedItemsTotal += linePrice;
      totalWeightKg += weight;

      return {
        productId: product.id,
        nameUz: product.name,
        weightKg: weight,
        unitPricePerKg: product.pricePerKg,
        totalPrice: linePrice,
      };
    });

    totalWeightKg = Number(totalWeightKg.toFixed(2));

    // 2. Delivery logic:
    // 1 km gacha bepul, 10 kg va undan yuqori bepul!
    let deliveryFee = 0;
    if (validated.orderType === "DELIVERY" && totalWeightKg < 10) {
      // Standart 1 km dan tashqariga boshlang'ich tarif: 7 000 UZS
      deliveryFee = 7000;
    }

    const grandTotal = calculatedItemsTotal + deliveryFee;

    // 3. Generate unique order number (e.g., #ORD-2026-0042)
    const timestamp = Date.now().toString().slice(-4);
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const orderNumber = `#ORD-${new Date().getFullYear()}-${timestamp}${randomSuffix}`;

    // 4. Try storing in PostgreSQL via Prisma if database is reachable
    let dbSuccess = false;
    try {
      // Find or create customer
      const customer = await db.customer.upsert({
        where: { phoneNumber: validated.phoneNumber },
        update: { fullName: validated.fullName },
        create: {
          fullName: validated.fullName,
          phoneNumber: validated.phoneNumber,
        },
      });

      // Create order with order items
      await db.order.create({
        data: {
          orderNumber,
          customerId: customer.id,
          orderType: validated.orderType,
          status: "NEW",
          paymentMethod: validated.paymentMethod,
          itemsTotal: calculatedItemsTotal,
          deliveryFee,
          grandTotal,
          totalWeightKg,
          deliveryAddress: validated.deliveryAddress,
          customerNotes: validated.notes,
          guestCount: validated.guestCount,
          eventDate: validated.eventDate ? new Date(validated.eventDate) : undefined,
          sourceChannel: "WEB",
          items: {
            create: validatedItems.map((i) => ({
              productId: i.productId,
              weightKg: i.weightKg,
              unitPricePerKg: i.unitPricePerKg,
              totalPrice: i.totalPrice,
            })),
          },
        },
      });

      dbSuccess = true;
    } catch (dbErr) {
      console.warn("DB ga yozishda xatolik (mahalliy DB ulanmagan bo'lishi mumkin):", dbErr);
    }

    // 5. Send Telegram Alert to Admin Group with Interactive Inline Buttons
    await sendOrderAlertToAdmin({
      orderNumber,
      customerName: validated.fullName,
      phoneNumber: validated.phoneNumber,
      orderType: validated.orderType,
      deliveryAddress: validated.deliveryAddress,
      items: validatedItems,
      grandTotal,
      totalWeightKg,
      paymentMethod: validated.paymentMethod,
    });

    return NextResponse.json(
      {
        success: true,
        order: {
          orderNumber,
          customerName: validated.fullName,
          orderType: validated.orderType,
          itemsTotal: calculatedItemsTotal,
          deliveryFee,
          grandTotal,
          totalWeightKg,
          items: validatedItems,
          savedToDatabase: dbSuccess,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ma'lumotlar to'liq emas", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
