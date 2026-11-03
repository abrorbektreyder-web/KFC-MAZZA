import { NextRequest, NextResponse } from "next/server";
import { bot, getStatusInlineKeyboard } from "@/lib/telegram";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    // 1. Handle Callback Query from Admin Inline Keyboard
    if (update.callback_query && bot) {
      const callback = update.callback_query;
      const data = callback.data as string; // Format: "status:#ORD-XXXX:STATUS"

      if (data.startsWith("status:")) {
        const [, orderNumber, newStatus] = data.split(":");

        // Update database
        try {
          await db.order.update({
            where: { orderNumber },
            data: { status: newStatus as OrderStatus },
          });

          await db.orderStatusHistory.create({
            data: {
              orderId: (await db.order.findUnique({ where: { orderNumber } }))?.id || "",
              toStatus: newStatus as OrderStatus,
              changedBy: `TELEGRAM:${callback.from.username || callback.from.id}`,
            },
          });
        } catch (dbErr) {
          console.warn("DB status update error:", dbErr);
        }

        const statusLabels: Record<string, string> = {
          CONFIRMED: "✅ Tasdiqlandi",
          PREPARING: "👨‍🍳 Qovurilmoqda",
          READY: "🍗 Tayyor bo'ldi",
          OUT_FOR_DELIVERY: "🛵 Kuryer yo'lda",
          DELIVERED: "✨ Yakunlandi",
          CANCELLED: "❌ Bekor qilindi",
        };

        const statusTitle = statusLabels[newStatus] || newStatus;

        // Answer callback query with toast alert to admin
        await bot.api.answerCallbackQuery(callback.id, {
          text: `Buyurtma statusi: ${statusTitle}`,
          show_alert: false,
        });

        // Edit original message to reflect updated status
        if (callback.message) {
          const originalText = callback.message.text || "";
          const updatedText = originalText.replace(
            /Holat:.*$/m,
            `Holat: <b>${statusTitle}</b> (Yangilandi: ${new Date().toLocaleTimeString("uz-UZ")})`
          );

          try {
            await bot.api.editMessageText(
              callback.message.chat.id,
              callback.message.message_id,
              updatedText,
              {
                parse_mode: "HTML",
                reply_markup: getStatusInlineKeyboard(orderNumber),
              }
            );
          } catch (editErr) {
            console.warn("Message edit error (content identical):", editErr);
          }
        }
      }

      return NextResponse.json({ ok: true });
    }

    // 2. Handle /start and user messages in Bot
    if (update.message && bot) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const text = msg.text || "";

      if (text.startsWith("/start")) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://andijon-mazza.uz";

        await bot.api.sendMessage(
          chatId,
          `🍗 <b>ANDIJON MAZZA Restoraniga Xush Kelibsiz!</b>\n\nEng qarsildoq, suvli va yangi tayyorlangan Sweet & Spicy crispy chicken.\n\nQuyidagi tugma orqali to'g'ridan-to'g'ri Telegram ichida to'liq interaktiv menyuni ochishingiz va buyurtma berishingiz mumkin! 👇`,
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🍗 Menyu & Buyurtma Berish (Mini App)",
                    web_app: { url: siteUrl },
                  },
                ],
                [
                  {
                    text: "📞 Operator Bilan Bog'lanish",
                    url: "https://t.me/andijon_mazza_operator",
                  },
                ],
              ],
            },
          }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Telegram webhook xatolik:", error);
    return NextResponse.json({ error: error.message }, { status: 200 }); // Always 200 to Telegram
  }
}
