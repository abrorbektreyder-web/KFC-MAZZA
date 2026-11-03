# 🚀 ANDIJON MAZZA — DEPLOYMENT VA ISHGA TUSHIRISH QO'LLANMASI

Ushbu platforma dunyo darajasidagi tezlik, 3D vizual effektlar va yagona savdo backendiga ega to'liq tayyor savdo tizimidir.

---

## 1. MAHALLIY ISHGA TUSHIRISH (LOCAL DEVELOPMENT)

### 1.1. Talablar:
- Node.js v20+ yoki Bun v1.2+
- PostgreSQL ma'lumotlar bazasi (Mahalliy yoki Bulutli)

### 1.2. Qadamlar:
```bash
# 1. Repository papkasiga o'ting
cd KFC-MAZZA

# 2. Atrof-muhit o'zgaruvchilarini sozlang
cp .env.example .env
# .env ichiga PostgreSQL DATABASE_URL va Telegram BOT_TOKEN ni kiriting

# 3. Prisma migratsiyalarini bazaga yuborish va boshlang'ich ma'lumotlarni kiritish
bun prisma db push
bun prisma/seed.ts

# 4. Mahalliy serverni ishga tushiring
bun run dev
```

Brauzeringizda oching:
- **Asosiy Savdo Sayti:** `http://localhost:3000`
- **Admin Boshqaruv Paneli:** `http://localhost:3000/admin`
- **Buyurtmani Kuzatish:** `http://localhost:3000/track`

---

## 2. PRODUCTION DEPLOYMENT (VERCEL VA RENDER)

### 2.1. Vercel (Frontend & Server Actions & API):
1. [vercel.com](https://vercel.com) ga kiring va GitHub repository'ni ulang.
2. Quyidagi Environment Variables ni Vercel Dashboard'ga qo'shing:
   - `DATABASE_URL` (Supabase yoki Neon PostgreSQL ulanish havolasi)
   - `TELEGRAM_BOT_TOKEN` (@BotFather orqali olingan token)
   - `TELEGRAM_ADMIN_CHAT_ID` (Admin guruhi yoki kanali ID raqami)
   - `TELEGRAM_WEBHOOK_SECRET` (Ixtiyoriy xavfsiz kalit)
   - `NEXT_PUBLIC_SITE_URL` (Sizning Vercel domeningiz, masalan: `https://andijon-mazza.vercel.app`)
3. **Deploy** tugmasini bosing.

### 2.2. Telegram Webhookni Sozlash:
Vercel'ga yuklagandan so'ng, Telegram boti webhookini bir marta quyidagi havola orqali faollashtiring:
```text
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook?url=https://<SIZNING_DOMEN>/api/telegram/webhook&secret_token=<TELEGRAM_WEBHOOK_SECRET>
```

---

## 3. TELEGRAM MINI APP (TMA) NI SOZLASH
1. Telegramda `@BotFather` ga kiring.
2. `/newapp` buyrug'ini yuboring va botingizni tanlang.
3. Mini App nomi: `ANDIJON MAZZA`.
4. WebApp URL sifatida Vercel havolangizni kiriting: `https://<SIZNING_DOMEN>`.
5. Natijada foydalanuvchilar Telegram ichidan chiqmasdan to'liq 3D menyu va savat orqali buyurtma bera oladilar!
