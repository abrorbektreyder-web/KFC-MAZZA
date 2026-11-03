"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Flame, Phone, Send, Search, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, openCart, getTotalWeight } = useCartStore();

  const totalItemsCount = items.length;
  const totalWeight = getTotalWeight();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0B0E]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crispy-500 to-spicy-600 flex items-center justify-center shadow-glow-orange group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-black tracking-wider text-white leading-tight whitespace-nowrap">
                ANDIJON <span className="text-crispy-500 text-glow-orange">MAZZA</span>
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium whitespace-nowrap">
                Qarsildoq Tovuq &bull; Andijon
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links (Oraliq masofalari bir xil va bir qatorda) */}
          <nav className="hidden xl:flex items-center gap-8 text-sm font-semibold text-zinc-300">
            <Link
              href="#menu"
              className="hover:text-crispy-400 transition-colors whitespace-nowrap py-1"
            >
              Menyu
            </Link>
            <Link
              href="#deals"
              className="hover:text-crispy-400 transition-colors whitespace-nowrap py-1 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-crispy-500 animate-pulse flex-shrink-0" />
              <span>Takliflar</span>
            </Link>
            <Link
              href="#event-orders"
              className="hover:text-crispy-400 transition-colors whitespace-nowrap py-1"
            >
              Ehson &amp; Tadbirlar
            </Link>
            <Link
              href="#about"
              className="hover:text-crispy-400 transition-colors whitespace-nowrap py-1"
            >
              Manzil &amp; Aloqa
            </Link>
          </nav>

          {/* 3. Actions: Barcha tugmalar bir xil o'lchamda (h-10 / 40px), bir xil radiusda (rounded-xl) */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            
            {/* Buyurtmani kuzatish tugmasi */}
            <Link
              href="/track"
              className="hidden lg:flex items-center gap-2 h-10 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-crispy-500/30 text-zinc-200 hover:text-white text-xs font-bold transition-all active:scale-95 whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5 text-crispy-400" />
              <span>Kuzatish</span>
            </Link>

            {/* Telefon tugmasi (bitta qatorda, 2 qatorga bo'linmaydi) */}
            <a
              href="tel:+998952645664"
              className="hidden sm:flex items-center gap-2 h-10 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-crispy-500/30 text-white text-xs font-bold transition-all active:scale-95 whitespace-nowrap font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-crispy-500" />
              <span>+998 95 264-56-64</span>
            </a>

            {/* Telegram Bot tugmasi */}
            <a
              href="https://t.me/andijon_mazza_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 h-10 px-3.5 rounded-xl bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/30 text-[#229ED9] text-xs font-bold transition-all active:scale-95 whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Bot</span>
            </a>

            {/* Savatcha tugmasi (h-10 bir xil balandlikda) */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-crispy-500 to-crispy-600 hover:from-crispy-600 hover:to-crispy-700 text-white font-bold text-xs sm:text-sm shadow-glow-orange transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              aria-label="Savatcha"
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span>Savatcha</span>
              {totalItemsCount > 0 && (
                <span className="flex items-center justify-center text-[11px] font-black bg-white text-crispy-600 rounded-full h-5 min-w-5 px-1.5 shadow-sm ml-0.5">
                  {totalWeight} kg
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 pb-4 bg-[#0F1014] p-4 rounded-2xl border border-white/10 shadow-2xl">
            <Link
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-crispy-400 py-2 font-semibold text-sm"
            >
              Taomlar Menyusi
            </Link>
            <Link
              href="#deals"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-crispy-400 py-2 font-semibold text-sm"
            >
              Maxsus Takliflar va Chegirmalar
            </Link>
            <Link
              href="#event-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-crispy-400 py-2 font-semibold text-sm"
            >
              Ehson &amp; Tadbirlar (Katta buyurtma)
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-crispy-400 py-2 font-semibold text-sm"
            >
              Manzil va Ish vaqti
            </Link>
            <Link
              href="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="text-crispy-400 py-2 font-bold flex items-center gap-2 text-sm"
            >
              <Search className="w-4 h-4" /> Buyurtmani kuzatish (#ORD)
            </Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
              <a
                href="tel:+998952645664"
                className="flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl bg-white/5 border border-white/10 text-white"
              >
                <Phone className="w-4 h-4 text-crispy-500" />
                +998 (95) 264-56-64
              </a>
              <a
                href="https://t.me/andijon_mazza_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xs font-bold py-3 rounded-xl bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/40"
              >
                <Send className="w-4 h-4" />
                Telegram Bot orqali buyurtma
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
