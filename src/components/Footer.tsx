"use client";

import React from "react";
import Link from "next/link";
import { Flame, MapPin, Phone, Clock, Send, Instagram, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer id="about" className="bg-[#070709] border-t border-white/10 pt-16 pb-12 text-ivory-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info (span 5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crispy-500 to-spicy-600 flex items-center justify-center shadow-glow-orange">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-black tracking-wider text-white">
                  ANDIJON <span className="text-crispy-500">MAZZA</span>
                </span>
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium">
                  Premium Qarsildoq Tovuq
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-ivory-300 max-w-sm leading-relaxed">
              Andijon tumanidagi eng qarsildoq, suvli va toza qovurilgan tovuqlar restorani. Yangi so'yilgan halol tovuq go'shti, maxsus shirin va olovli marinad.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/andijon_mazza_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#229ED9]/20 hover:text-[#229ED9] border border-white/10 flex items-center justify-center transition-all"
                aria-label="Telegram Bot"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-600/20 hover:text-pink-500 border border-white/10 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Tezkor Bo'limlar
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#menu" className="hover:text-crispy-400 transition-colors">
                  Taomlar Menyusi
                </Link>
              </li>
              <li>
                <Link href="#deals" className="hover:text-crispy-400 transition-colors">
                  Bento Chegirmalar
                </Link>
              </li>
              <li>
                <Link href="#event-orders" className="hover:text-crispy-400 transition-colors">
                  Ehson &amp; Katta Tadbirlar
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-crispy-400 transition-colors">
                  Buyurtmani Kuzatish (#ORD)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-ivory-400 hover:text-white transition-colors">
                  Admin Panelga Kirish
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts & Address (span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Savdo Nuqtasi &amp; Bog'lanish
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-crispy-400 flex-shrink-0 mt-0.5" />
                <span>Andijon tumani, Gulshan (Mo'ljal: 7 kun)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-crispy-400 flex-shrink-0" />
                <span>Har kuni: 10:00 dan 23:00 gacha</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-crispy-400 flex-shrink-0" />
                <a href="tel:+998952645664" className="text-white font-bold hover:text-crispy-400">
                  +998 (95) 264-56-64
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-400 gap-4">
          <p>© {new Date().getFullYear()} ANDIJON MAZZA. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-2 text-ivory-400">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>100% Halol va Sertifikatlangan Go'sht</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
