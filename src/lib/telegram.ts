import { Bot, InlineKeyboard } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN || "";
export const bot = token ? new Bot(token) : null;

export const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID || "";

export function getStatusInlineKeyboard(orderNumber: string) {
  return new InlineKeyboard()
    .text("✅ Tasdiqlash", `status:${orderNumber}:CONFIRMED`)
    .text("👨‍🍳 Qovurilmoqda", `status:${orderNumber}:PREPARING`)
    .row()
    .text("🍗 Tayyor", `status:${orderNumber}:READY`)
    .text("🛵 Kuryerda", `status:${orderNumber}:OUT_FOR_DELIVERY`)
    .row()
    .text("✨ Yakunlandi", `status:${orderNumber}:DELIVERED`)
    .text("❌ Bekor qilish", `status:${orderNumber}:CANCELLED`);
}

export async function sendOrderAlertToAdmin(order: {
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  orderType: string;
  deliveryAddress?: string | null;
  items: Array<{ nameUz: string; weightKg: number; totalPrice: number }>;
  grandTotal: number;
  totalWeightKg: number;
  paymentMethod: string;
}) {
  if (!bot || !ADMIN_CHAT_ID) {
    console.warn("Telegram bot tokeni yoki ADMIN_CHAT_ID o'rnatilmagan. Xabar konsolga chiqarildi.");
    return false;
  }

  const itemsList = order.items
    .map(
      (item) =>
        `• <b>${item.nameUz}</b> — ${item.weightKg} kg (${item.totalPrice.toLocaleString()} UZS)`
    )
    .join("\n");

  const orderTypeText =
    order.orderType === "DELIVERY"
      ? "🛵 Yetkazib berish"
      : order.orderType === "PICKUP"
      ? "🏪 Olib ketish"
      : "🎉 Ehson va Katta Tadbir";

  const messageText = `
🔔 <b>YANGI BUYURTMA: ${order.orderNumber}</b>
━━━━━━━━━━━━━━━━━━
👤 <b>Mijoz:</b> ${order.customerName}
📞 <b>Tel:</b> <code>${order.phoneNumber}</code>
🛵 <b>Turi:</b> ${orderTypeText}
${order.deliveryAddress ? `📍 <b>Manzil:</b> ${order.deliveryAddress}\n` : ""}
⚖️ <b>Jami vazn:</b> ${order.totalWeightKg} kg

📦 <b>MAHSULOTLAR:</b>
${itemsList}

💰 <b>JAMI SUMMA:</b> <code>${order.grandTotal.toLocaleString()} UZS</code>
💳 <b>To'lov:</b> ${order.paymentMethod === "CASH" ? "Naqd pul" : "Click / Payme (Operator)"}
━━━━━━━━━━━━━━━━━━
Holat: 🟡 <b>Yangi buyurtma</b>
`;

  try {
    await bot.api.sendMessage(ADMIN_CHAT_ID, messageText, {
      parse_mode: "HTML",
      reply_markup: getStatusInlineKeyboard(order.orderNumber),
    });
    return true;
  } catch (err) {
    console.error("Telegramga xabar jo'natishda xatolik:", err);
    return false;
  }
}
