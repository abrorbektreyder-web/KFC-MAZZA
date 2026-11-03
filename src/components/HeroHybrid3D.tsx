"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Flame, MapPin, Phone } from "lucide-react";

export function HeroHybrid3D() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0B0E]">
      
      {/* Cinematic Crisp Background Image with High Sharpness */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-flying-chicken.jpg"
          alt="Andijon Mazza Qarsildoq Tovuq"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-right lg:object-center opacity-85 sm:opacity-95"
        />
        {/* Soft directional scrim on the left only for text readability, keeping the right chicken crisp and clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0E] via-[#0A0B0E]/85 via-45% to-transparent sm:w-4/5 lg:w-3/5" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0B0E] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0B0E]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="max-w-xl lg:max-w-2xl">
          
          {/* Top Pill Badge with Real Address */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-crispy-500/40 backdrop-blur-md mb-5 shadow-glow-orange">
            <MapPin className="w-3.5 h-3.5 text-crispy-500" />
            <span className="text-xs font-bold text-white tracking-wide">
              Andijon t., Gulshan (Mo'ljal: 7 kun)
            </span>
          </div>

          {/* Sizing: Sal kichraytirilgan, qulay va ixcham sarlavha */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12] mb-4 drop-shadow-md">
            MAZALI LAHZA. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-crispy-400 via-crispy-500 to-spicy-500 text-glow-orange">
              QARSILDOQ TA'M.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-200 max-w-lg mb-6 leading-relaxed font-normal drop-shadow-sm">
            Yangi tayyorlangan shirin va achchiq marinadli qarsildoq tovuq. Sevimli ta'mingizni kilogramm bo'yicha tanlang va Andijon bo'ylab issiq holda qabul qiling.
          </p>

          {/* CTAs & Direct Call */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href="#menu"
              className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-crispy-500 to-crispy-600 hover:from-crispy-600 hover:to-crispy-700 text-white font-bold text-sm shadow-glow-orange transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>BUYURTMA BERISH</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:+998952645664"
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black/60 hover:bg-black/80 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4 text-crispy-400" />
              <span>+998 (95) 264-56-64</span>
            </a>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/15 max-w-md bg-black/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-white">80 000</span>
              <span className="text-[10px] sm:text-[11px] text-ivory-300 font-medium">so'm / 1 kg dan</span>
            </div>
            <div className="flex flex-col border-l border-white/15 pl-3">
              <span className="text-lg sm:text-xl font-black text-crispy-400">0 UZS</span>
              <span className="text-[10px] sm:text-[11px] text-ivory-300 font-medium">1 km gacha bepul</span>
            </div>
            <div className="flex flex-col border-l border-white/15 pl-3">
              <span className="text-lg sm:text-xl font-black text-green-400">10+ kg</span>
              <span className="text-[10px] sm:text-[11px] text-ivory-300 font-medium">Mutlaqo bepul</span>
            </div>
          </div>

        </div>
      </div>

      {/* Marquee Ticker Tape */}
      <div className="absolute bottom-0 left-0 right-0 py-2.5 bg-crispy-500/10 border-y border-crispy-500/20 backdrop-blur-md overflow-hidden whitespace-nowrap z-10">
        <div className="inline-block text-xs font-bold tracking-widest text-crispy-400 uppercase">
          🍗 YANGI QOVURILGAN TOVUQ &nbsp;•&nbsp; 🌶️ SHIRIN VA ACHCHIQ MARINAD &nbsp;•&nbsp; 📍 GULSHAN (MO'LJAL: 7 KUN) &nbsp;•&nbsp; 🛵 ANDIJON TUMANI BO'YLAB YETKAZISH &nbsp;•&nbsp; 📞 +998 (95) 264-56-64 &nbsp;•&nbsp; 🍗 YANGI QOVURILGAN TOVUQ &nbsp;•&nbsp; 🌶️ SHIRIN VA ACHCHIQ MARINAD
        </div>
      </div>
    </section>
  );
}
