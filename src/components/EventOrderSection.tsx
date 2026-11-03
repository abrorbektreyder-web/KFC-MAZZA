"use client";

import React, { useState } from "react";
import { Users, Sparkles, Gift, Check, ArrowRight, HeartHandshake } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { INITIAL_PRODUCTS } from "@/lib/products-data";

export function EventOrderSection() {
  const [guests, setGuests] = useState(30);
  const [selectedFlavor, setSelectedFlavor] = useState<"sweet" | "spicy" | "mixed">("mixed");
  const { addItem, openCheckout } = useCartStore();

  // 1 guest consumes roughly 0.25 - 0.3 kg of fried chicken
  const calculatedKg = Math.max(5, Math.round(guests * 0.28 * 2) / 2);
  const estimatedPrice = calculatedKg * 80000;

  const handleCreateEventOrder = () => {
    const sweetProduct = INITIAL_PRODUCTS.find((p) => p.slug === "sweet-crispy-chicken")!;
    const spicyProduct = INITIAL_PRODUCTS.find((p) => p.slug === "spicy-crispy-chicken")!;

    if (selectedFlavor === "sweet") {
      addItem(sweetProduct, calculatedKg);
    } else if (selectedFlavor === "spicy") {
      addItem(spicyProduct, calculatedKg);
    } else {
      // Mixed: split half and half
      const half = Number((calculatedKg / 2).toFixed(1));
      addItem(sweetProduct, half);
      addItem(spicyProduct, half);
    }

    openCheckout();
  };

  return (
    <section id="event-orders" className="py-24 bg-[#0A0B0E] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-crispy-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Description & Perks */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crispy-500/15 border border-crispy-500/30 text-crispy-400 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Ehson, To'y va Katta Yig'inlar</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                KATTA TADBIRLAR UCHUN MAXSUS BUYURTMA
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                Oilaviy shodiyonalar, ehson marosimlari, ayollar yig'inlari yoki korporativ tadbirlar uchun issiq qarsildoq tovuqni katta hajmda buyurtma bering. Belgilangan aniq vaqtda maxsus termobokslarda yetkazib beramiz.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-ivory-200">
                  <div className="w-6 h-6 rounded-full bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span><strong>10 kg dan yuqori:</strong> Andijon tumani bo'ylab yetkazib berish <strong>mutlaqo bepul</strong></span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-ivory-200">
                  <div className="w-6 h-6 rounded-full bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                  <span>Har 5 kg buyurtmaga 2 ta firma sousi sovg'a</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-ivory-200">
                  <div className="w-6 h-6 rounded-full bg-crispy-500/20 text-crispy-400 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span>Oldindan aniq vaqt va kunga buyurtma berish imkoniyati</span>
                </div>
              </div>
            </div>

            {/* Right Column: Smart Calculator Card */}
            <div className="lg:col-span-6 bg-black/60 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-6 flex items-center justify-between">
                <span>Aqlli Tadbir Kalkulyatori</span>
                <Users className="w-5 h-5 text-crispy-400" />
              </h3>

              {/* Guests Range Slider */}
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
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
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
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
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
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
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
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 mb-6">
                <div className="flex justify-between text-xs text-ivory-300">
                  <span>Tavsiya etilgan tovuq vazni:</span>
                  <span className="font-bold text-white text-sm">{calculatedKg} kg</span>
                </div>
                <div className="flex justify-between text-xs text-ivory-300">
                  <span>Yetkazib berish xizmati:</span>
                  <span className="font-bold text-green-400">
                    {calculatedKg >= 10 ? "MUTLAQO BEPUL (0 UZS)" : "Standart tarif"}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-white/10 font-bold text-white">
                  <span>Taxminiy jami qiymat:</span>
                  <span className="text-crispy-400 text-lg font-black">
                    {estimatedPrice.toLocaleString()} UZS
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleCreateEventOrder}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-crispy-500 to-crispy-600 hover:from-crispy-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow-orange transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ushbu Hajmda Buyurtma Berish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
