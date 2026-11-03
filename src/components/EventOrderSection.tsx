"use client";

import React, { useState } from "react";
import { Users, Sparkles, Gift, Check, ArrowRight, HeartHandshake } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { INITIAL_PRODUCTS } from "@/lib/products-data";

export function EventOrderSection() {
  const [guests, setGuests] = useState(30);
  const [selectedFlavor, setSelectedFlavor] = useState<"sweet" | "spicy" | "mixed">("mixed");
  const { addItem, openCheckout } = useCartStore();

  // 1 kishi uchun aniq 300 gram (0.3 kg) qarsildoq tovuq me'yori:
  // 10 kishi = 3.0 kg (240 000 UZS)
  // 15 kishi = 4.5 kg (360 000 UZS)
  // 20 kishi = 6.0 kg (480 000 UZS)
  // 25 kishi = 7.5 kg (600 000 UZS)
  // 30 kishi = 9.0 kg (720 000 UZS)
  // 35 kishi = 10.5 kg (840 000 UZS) -> Mutlaqo bepul yetkazish
  // 50 kishi = 15.0 kg (1 200 000 UZS)
  // 100 kishi = 30.0 kg (2 400 000 UZS)
  const calculatedKg = Number((guests * 0.3).toFixed(1));
  const estimatedPrice = Math.round(calculatedKg * 80000);
  const isFreeDelivery = calculatedKg >= 10;
  const remainingForFree = Number(Math.max(0, 10 - calculatedKg).toFixed(1));

  const guestPresets = [10, 15, 20, 30, 50, 100];

  const handleCreateEventOrder = () => {
    const sweetProduct = INITIAL_PRODUCTS.find((p) => p.slug === "sweet-crispy-chicken")!;
    const spicyProduct = INITIAL_PRODUCTS.find((p) => p.slug === "spicy-crispy-chicken")!;

    if (selectedFlavor === "sweet") {
      addItem(sweetProduct, calculatedKg);
    } else if (selectedFlavor === "spicy") {
      addItem(spicyProduct, calculatedKg);
    } else {
      // Mixed: Teng taqsimlash
      const halfSweet = Math.round((calculatedKg / 2) * 10) / 10;
      const halfSpicy = Number((calculatedKg - halfSweet).toFixed(1));
      addItem(sweetProduct, halfSweet);
      addItem(spicyProduct, halfSpicy);
    }

    openCheckout();
  };

  return (
    <section id="event-orders" className="py-20 sm:py-24 bg-[#0A0B0E] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-crispy-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Description & Perks */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crispy-500/15 border border-crispy-500/30 text-crispy-400 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Ehson, To'y va Katta Yig'inlar</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                KATTA TADBIRLAR UCHUN MAXSUS BUYURTMA
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                Oilaviy shodiyonalar, ehson marosimlari, ayollar yig'inlari yoki korporativ tadbirlar uchun issiq qarsildoq tovuqni katta hajmda buyurtma bering. Belgilangan aniq vaqtda maxsus termobokslarda yetkazib beramiz.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory-200">
                  <div className="w-6 h-6 rounded-full bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>10 kg dan yuqori:</strong> Andijon tumani bo'ylab yetkazib berish <strong>mutlaqo bepul</strong></span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory-200">
                  <div className="w-6 h-6 rounded-full bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                  <span>Har 5 kg buyurtmaga 2 ta firma sousi sovg'a beriladi</span>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-ivory-200">
                  <div className="w-6 h-6 rounded-full bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span>Oldindan aniq vaqt va kunga bron qilib buyurtma berish imkoniyati</span>
                </div>
              </div>
            </div>

            {/* Right Column: Smart Calculator Card */}
            <div className="lg:col-span-6 bg-black/60 rounded-3xl p-5 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">Aqlli Tadbir Kalkulyatori</h3>
                  <p className="text-[11px] text-zinc-400">1 kishi uchun o'rtacha 300g qarsildoq tovuq hisobida</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* Guests Range Slider & Quick Presets */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-ivory-300">Mehmonlar soni:</span>
                  <span className="text-crispy-400 font-bold text-base">{guests} kishi</span>
                </div>

                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-crispy-500"
                />

                <div className="flex justify-between text-[10px] text-ivory-400">
                  <span>10 kishi</span>
                  <span>75 kishi</span>
                  <span>150+ kishi</span>
                </div>

                {/* Quick Preset Buttons (Oson bosish uchun) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-zinc-400 font-medium mr-1">Tezkor tanlov:</span>
                  {guestPresets.map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuests(count)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
                        guests === count
                          ? "bg-crispy-500 text-white shadow-glow-orange"
                          : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/5"
                      }`}
                    >
                      {count} kishi
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-2 mb-6">
                <label className="block text-xs font-semibold text-ivory-300">
                  Ta'm tanlovi:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFlavor("mixed")}
                    className={`px-1.5 py-2.5 rounded-xl text-[11px] sm:text-xs text-center font-bold border transition-all ${
                      selectedFlavor === "mixed"
                        ? "border-crispy-500 bg-crispy-500/20 text-white"
                        : "border-white/10 bg-white/5 text-ivory-400"
                    }`}
                  >
                    Teng aralash (50/50)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFlavor("sweet")}
                    className={`px-1.5 py-2.5 rounded-xl text-[11px] sm:text-xs text-center font-bold border transition-all ${
                      selectedFlavor === "sweet"
                        ? "border-crispy-500 bg-crispy-500/20 text-white"
                        : "border-white/10 bg-white/5 text-ivory-400"
                    }`}
                  >
                    Faqat Shirin
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFlavor("spicy")}
                    className={`px-1.5 py-2.5 rounded-xl text-[11px] sm:text-xs text-center font-bold border transition-all ${
                      selectedFlavor === "spicy"
                        ? "border-crispy-500 bg-crispy-500/20 text-white"
                        : "border-white/10 bg-white/5 text-ivory-400"
                    }`}
                  >
                    Faqat Achchiq
                  </button>
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs text-ivory-300">
                  <span>Tavsiya etilgan tovuq vazni:</span>
                  <div className="text-right">
                    <span className="font-bold text-white text-base">{calculatedKg} kg</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-ivory-300">
                  <span>Yetkazib berish xizmati:</span>
                  <span className={`font-bold ${isFreeDelivery ? "text-green-400" : "text-amber-400"}`}>
                    {isFreeDelivery ? "MUTLAQO BEPUL (0 UZS)" : "Standart tarif (1 km bepul)"}
                  </span>
                </div>

                {isFreeDelivery ? (
                  <div className="text-[11px] text-green-400/90 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Buyurtma 10 kg dan yuqori: Bepul yetkazish + sovg'a souslar!</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-zinc-400 bg-white/5 rounded-xl px-3 py-1.5">
                    Yana <strong className="text-crispy-400">{remainingForFree} kg</strong> qo'shilsa — yetkazib berish mutlaqo bepul bo'ladi!
                  </div>
                )}

                <div className="flex justify-between items-center text-sm pt-3 border-t border-white/10 font-bold text-white">
                  <span>Taxminiy jami qiymat:</span>
                  <span className="text-crispy-400 text-lg sm:text-xl font-black">
                    {estimatedPrice.toLocaleString()} UZS
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCreateEventOrder}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-crispy-500 to-crispy-600 hover:from-crispy-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-orange transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ushbu Hajmda Buyurtma Berish ({calculatedKg} kg)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
