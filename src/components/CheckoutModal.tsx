"use client";

import React, { useState } from "react";
import { X, CheckCircle, Truck, Store, Calendar, ArrowRight, Loader2, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/store/useCartStore";
import { OrderType, PaymentMethod } from "@/types";

export function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
    getItemsTotal,
    getTotalWeight,
  } = useCartStore();

  const [orderType, setOrderType] = useState<OrderType>("DELIVERY");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [address, setAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");

  const [isLoading, setIsLoading] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const totalWeight = getTotalWeight();
  const itemsTotal = getItemsTotal();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998 ";
    }
    setPhoneNumber(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Iltimos, ismingizni kiriting.");
      return;
    }

    if (phoneNumber.replace(/\D/g, "").length < 12) {
      setErrorMessage("Iltimos, to'liq telefon raqamingizni kiriting (+998 9X XXX XX XX).");
      return;
    }

    if (orderType === "DELIVERY" && !address.trim()) {
      setErrorMessage("Iltimos, yetkazib berish manzilini kiriting.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          orderType,
          deliveryAddress: address,
          eventDate: eventDate || undefined,
          guestCount: guestCount ? Number(guestCount) : undefined,
          notes,
          paymentMethod,
          items: items.map((i) => ({
            productId: i.product.id,
            weightKg: i.weightKg,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Buyurtma berishda xatolik yuz berdi.");
      }

      // Success
      setCreatedOrderNumber(data.order.orderNumber);
      clearCart();

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF7A00", "#E53835", "#FFFFFF"],
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={closeCheckout}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-[#111217] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-white">
        
        {/* Close Button */}
        <button
          onClick={closeCheckout}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-ivory-400 hover:text-white transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Screen */}
        {createdOrderNumber ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">
              Buyurtmangiz Qabul Qilindi!
            </h3>
            <p className="text-xs sm:text-sm text-ivory-300 max-w-sm mx-auto mb-6">
              Buyurtma raqami:{" "}
              <span className="font-mono font-bold text-crispy-400 text-base">
                {createdOrderNumber}
              </span>
              . Operatorimiz tez orada siz bilan bog'lanadi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`/track?order=${createdOrderNumber}`}
                className="px-6 py-3 rounded-xl bg-crispy-500 hover:bg-crispy-600 text-white font-bold text-xs shadow-glow-orange flex items-center justify-center gap-2"
              >
                <span>Buyurtmani Kuzatish</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/andijon_mazza_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#229ED9] border border-[#229ED9]/40 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Telegram Botda Ochish</span>
              </a>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-crispy-400 block mb-1">
                Rasmiylashtirish
              </span>
              <h3 className="text-2xl font-black text-white">
                Buyurtmani Tasdiqlang
              </h3>
            </div>

            {/* Order Type Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-black/50 border border-white/10">
              <button
                type="button"
                onClick={() => setOrderType("DELIVERY")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  orderType === "DELIVERY"
                    ? "bg-crispy-500 text-white shadow-glow-orange"
                    : "text-ivory-400 hover:text-white"
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Yetkazish</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType("PICKUP")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  orderType === "PICKUP"
                    ? "bg-crispy-500 text-white shadow-glow-orange"
                    : "text-ivory-400 hover:text-white"
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Olib ketish</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType("EVENT")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  orderType === "EVENT"
                    ? "bg-crispy-500 text-white shadow-glow-orange"
                    : "text-ivory-400 hover:text-white"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Ehson / Tadbir</span>
              </button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-spicy-500/20 border border-spicy-500/40 text-spicy-400 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                    Ismingiz *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alisher Karimov"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-crispy-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                    Telefon Raqamingiz *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-crispy-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              {orderType === "DELIVERY" && (
                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                    Yetkazib berish manzili va mo'ljal *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Andijon t., Bog'i Shamol MFY, 12-uy (Mo'ljal: Maktab yonida)"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-crispy-500 transition-colors"
                  />
                </div>
              )}

              {/* Event Order fields */}
              {orderType === "EVENT" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                      Tadbir sanasi va vaqti
                    </label>
                    <input
                      type="datetime-local"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-crispy-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                      Taxminiy mehmonlar soni
                    </label>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="Masalan: 40 kishi"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-crispy-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                  To'lov usuli
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CASH")}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold text-left transition-all ${
                      paymentMethod === "CASH"
                        ? "border-crispy-500 bg-crispy-500/10 text-white"
                        : "border-white/10 bg-white/5 text-ivory-300 hover:text-white"
                    }`}
                  >
                    💵 Naqd pul (Qabul qilinganda)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("OPERATOR_CONFIRMED")}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold text-left transition-all ${
                      paymentMethod === "OPERATOR_CONFIRMED"
                        ? "border-crispy-500 bg-crispy-500/10 text-white"
                        : "border-white/10 bg-white/5 text-ivory-300 hover:text-white"
                    }`}
                  >
                    📲 Click / Payme (Operator orqali)
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1.5">
                  Qo'shimcha izoh (Ixtiyoriy)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Souslarni ko'proq soling, eshik kodi..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs focus:outline-none focus:border-crispy-500 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-ivory-400 uppercase block font-medium">Jami to'lov:</span>
                <span className="text-xl font-black text-crispy-400">
                  {itemsTotal.toLocaleString()} UZS
                </span>
                <span className="text-[11px] text-ivory-400 block font-normal">
                  ({totalWeight} kg tovuq)
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-crispy-500 to-crispy-600 hover:from-crispy-600 text-white font-bold text-xs shadow-glow-orange flex items-center gap-2 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Yuborilmoqda...</span>
                  </>
                ) : (
                  <>
                    <span>BUYURTMANI YUBORISH</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
