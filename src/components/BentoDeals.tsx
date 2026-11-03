"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowUpRight, Flame, Users } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { INITIAL_PRODUCTS } from "@/lib/products-data";

export function BentoDeals() {
  const { addItem } = useCartStore();

  const handleQuickAdd = (slug: string, weightKg: number) => {
    const prod = INITIAL_PRODUCTS.find((p) => p.slug === slug);
    if (prod) {
      addItem(prod, weightKg);
    }
  };

  return (
    <section id="deals" className="py-20 bg-[#0A0B0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crispy-500/10 border border-crispy-500/20 text-crispy-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maxsus Takliflar</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
              MAXSUS TAKLIFLAR &amp; CHEGIRMALAR
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-md mt-4 md:mt-0 font-normal">
            Katta hajmda buyurtma bering yoki maxsus to'plamlarni tanlab, bepul yetkazib berish va sovg'alarga ega bo'ling.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Featured Orange Card with Topographic Lines (span 5) */}
          <div className="md:col-span-5 rounded-3xl bg-gradient-to-br from-crispy-500 to-crispy-600 p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[420px] shadow-glow-orange group">
            {/* Topographic pattern overlay */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {/* Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3.5 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-xs font-black tracking-wide border border-white/20 uppercase">
                Ehson &amp; Katta Tadbir
              </span>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-sm">
                Bepul
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 my-auto py-6">
              <h3 className="font-display text-3xl sm:text-4xl font-black leading-tight mb-3">
                10 kg va undan yuqori buyurtmalar
              </h3>
              <p className="text-white/95 text-sm leading-relaxed max-w-sm mb-4">
                Andijon tumani bo'ylab har qanday masofaga <strong>mutlaqo bepul</strong> issiq yetkazish va firma souslari sovg'aga!
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-white/90">
                <Users className="w-4 h-4" />
                <span>20 – 50 kishilik mehmonlar uchun a'lo tanlov</span>
              </div>
            </div>

            {/* Action */}
            <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase text-white/80 font-bold block">1 kg narxi</span>
                <span className="text-2xl font-black text-white font-display">80 000 UZS</span>
              </div>
              <a
                href="#event-orders"
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-black/80 text-white font-bold text-xs flex items-center gap-2 transition-transform duration-200 group-hover:scale-105 active:scale-95"
              >
                <span>Hozir hisoblash</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Sub-Grid (span 7) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Bento Card 2: Shirin Qarsildoq */}
            <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-crispy-500/20 text-crispy-400 text-xs font-bold border border-crispy-500/30">
                  Eng Ommabop
                </span>
                <span className="text-xs text-zinc-400 font-medium">1 kg</span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/products/sweet-crispy.jpg"
                  alt="Shirin Qarsildoq Tovuq"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-white mb-1">Shirin Qarsildoq Tovuq</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 font-normal">
                  Asal va shirin marinadli nozik qarsildoq tovuq.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-base font-black text-white font-display">80 000 UZS</span>
                  <button
                    onClick={() => handleQuickAdd("sweet-crispy-chicken", 1)}
                    className="px-3.5 py-2 rounded-xl bg-crispy-500 hover:bg-crispy-600 text-white text-xs font-bold shadow-glow-orange transition-all active:scale-95"
                  >
                    + 1 kg Qo'shish
                  </button>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Achchiq Qarsildoq */}
            <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-spicy-500/20 text-spicy-500 text-xs font-bold border border-spicy-500/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Olovli Achchiq
                </span>
                <span className="text-xs text-zinc-400 font-medium">1 kg</span>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/images/products/spicy-crispy.jpg"
                  alt="Achchiq Qarsildoq Tovuq"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h4 className="font-display text-lg font-bold text-white mb-1">Achchiq Qarsildoq Tovuq</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 mb-4 font-normal">
                  Haqiqiy olovli achchiq qalampir va tabiiy ziravorlar.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-base font-black text-white font-display">80 000 UZS</span>
                  <button
                    onClick={() => handleQuickAdd("spicy-crispy-chicken", 1)}
                    className="px-3.5 py-2 rounded-xl bg-spicy-500 hover:bg-spicy-600 text-white text-xs font-bold shadow-glow-red transition-all active:scale-95"
                  >
                    + 1 kg Qo'shish
                  </button>
                </div>
              </div>
            </div>

            {/* Bento Card 4: Qarsildoq Jamlanma & 3 Xil Sous */}
            <div className="sm:col-span-2 glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group border border-white/10">
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-square rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/products/sauce-platter.jpg"
                  alt="Qarsildoq Jamlanma & 3 Xil Sous"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 text-left">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 inline-block mb-2">
                  Souslar To'plami
                </span>
                <h4 className="font-display text-xl font-bold text-white mb-1">
                  Qarsildoq Jamlanma &amp; 3 Xil Firma Sousi
                </h4>
                <p className="text-xs text-zinc-300 mb-4 max-w-md font-normal leading-relaxed">
                  Qarsildoq tovuq bo'laklari bilan birga Barbekyu, Olovli Qalampir va Mayin Sarimsoqli Oq sous.
                </p>
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <span className="text-xl font-black text-crispy-400 font-display">85 000 UZS / kg</span>
                  <button
                    onClick={() => handleQuickAdd("sauce-combo-platter", 1)}
                    className="px-4 py-2.5 rounded-xl bg-crispy-500 hover:bg-crispy-600 text-white text-xs font-bold shadow-glow-orange transition-all active:scale-95"
                  >
                    Savatchaga qo'shish
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
