"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Flame, Clock, Star, ShoppingBag, Check, CupSoda, Sparkles } from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { ProductItem } from "@/types";
import { useCartStore } from "@/store/useCartStore";

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "chicken" | "spicy" | "combo" | "drinks">("all");
  const [weights, setWeights] = useState<Record<string, number>>({
    "prod-sweet-crispy": 1,
    "prod-spicy-crispy": 1,
    "prod-hot-basket": 1.5,
    "prod-sauce-platter": 1,
    "prod-pepsi-can": 1,
    "prod-fanta-can": 1,
    "prod-pepsi-bottle": 1,
    "prod-fanta-bottle": 1,
    "prod-pepsi-15l": 1,
  });
  const [addedAnimation, setAddedAnimation] = useState<Record<string, boolean>>({});

  const { addItem } = useCartStore();

  const handleWeightChange = (product: ProductItem, delta: number) => {
    setWeights((prev) => {
      const current = prev[product.id] || 1;
      const isDona = product.unit === "dona";
      const step = isDona ? (delta > 0 ? 1 : -1) : delta;
      const minVal = isDona ? 1 : 0.5;
      const next = Math.max(minVal, Math.min(50, Number((current + step).toFixed(1))));
      return { ...prev, [product.id]: next };
    });
  };

  const handleAddToCart = (product: ProductItem) => {
    const weight = weights[product.id] || (product.unit === "dona" ? 1 : 1);
    addItem(product, weight);

    // Visual feedback
    setAddedAnimation((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedAnimation((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const filteredProducts = INITIAL_PRODUCTS.filter((item) => {
    if (activeCategory === "chicken") {
      return item.category === "chicken" || (item.unit !== "dona" && !item.isSpicy && !item.id.includes("basket") && !item.id.includes("platter"));
    }
    if (activeCategory === "spicy") {
      return item.isSpicy;
    }
    if (activeCategory === "combo") {
      return item.category === "combo" || item.id.includes("basket") || item.id.includes("platter");
    }
    if (activeCategory === "drinks") {
      return item.category === "drinks" || item.unit === "dona";
    }
    return true;
  });

  return (
    <section id="menu" className="py-20 sm:py-24 bg-[#0B0C0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-crispy-500 mb-2 block">
            Haqiqiy Mazza &amp; Salqin Ichimliklar
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            MAHSULOTLAR MENYUSI
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            Har bir tovuq yangi go'shtdan buyurtma tushgandan so'ng qovuriladi. Qarsildoq tovuq yoniga muzdek Pepsi va Fanta ichimliklarini tanlang!
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-14">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
              activeCategory === "all"
                ? "bg-crispy-500 text-white shadow-glow-orange scale-105"
                : "glass-button text-zinc-300 hover:text-white"
            }`}
          >
            Barchasi ({INITIAL_PRODUCTS.length})
          </button>

          <button
            onClick={() => setActiveCategory("chicken")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${
              activeCategory === "chicken"
                ? "bg-crispy-500 text-white shadow-glow-orange scale-105"
                : "glass-button text-zinc-300 hover:text-white"
            }`}
          >
            Shirin Qarsildoq
          </button>

          <button
            onClick={() => setActiveCategory("spicy")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
              activeCategory === "spicy"
                ? "bg-spicy-500 text-white shadow-glow-red scale-105"
                : "glass-button text-zinc-300 hover:text-white"
            }`}
          >
            <Flame className="w-4 h-4 text-spicy-500" />
            <span>Achchiq Olovli</span>
          </button>

          <button
            onClick={() => setActiveCategory("combo")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
              activeCategory === "combo"
                ? "bg-crispy-500 text-white shadow-glow-orange scale-105"
                : "glass-button text-zinc-300 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>To'plam &amp; Souslar</span>
          </button>

          <button
            onClick={() => setActiveCategory("drinks")}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 ${
              activeCategory === "drinks"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "glass-button text-zinc-300 hover:text-white"
            }`}
          >
            <CupSoda className="w-4 h-4 text-blue-400" />
            <span>Salqin Ichimliklar (Pepsi, Fanta)</span>
          </button>
        </div>

        {/* Product Cards Grid: Mobil (1 col), Planshet (2 col), Kompyuter (4 col) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const isDona = product.unit === "dona";
            const currentWeight = weights[product.id] || 1;
            const calculatedPrice = Math.round(currentWeight * product.pricePerKg);
            const isAdded = addedAnimation[product.id];

            return (
              <div
                key={product.id}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between p-5 group border border-white/10"
              >
                {/* Top Image & Badges */}
                <div>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-black/40">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/15">
                        {product.badge}
                      </div>
                    )}

                    {/* Spicy Indicator */}
                    {product.isSpicy && (
                      <div className="absolute top-3 right-3 p-1.5 rounded-full bg-spicy-500/90 text-white shadow-glow-red">
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Drinks Indicator */}
                    {isDona && (
                      <div className="absolute top-3 right-3 p-1.5 rounded-full bg-blue-600/90 text-white shadow-md">
                        <CupSoda className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {/* Serving / Cook info */}
                    {product.portionTime && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-medium text-zinc-200 flex items-center gap-1 border border-white/10">
                        <Clock className="w-3 h-3 text-crispy-400" />
                        <span>{product.portionTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div className="flex items-start justify-between gap-2 mb-2 min-h-[44px]">
                    <h3 className="font-display text-base font-bold text-white group-hover:text-crispy-400 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    {product.rating && (
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20 flex-shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Bottom Controls: Stepper & Price Calculation */}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                  
                  {/* Stepper (kg yoki dona) */}
                  <div className="flex items-center justify-between bg-black/60 rounded-xl p-1.5 border border-white/10">
                    <button
                      onClick={() => handleWeightChange(product, isDona ? -1 : -0.5)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all active:scale-95"
                      aria-label="Kamaytirish"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-base font-black text-white">{currentWeight}</span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {isDona ? "dona" : "kg"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleWeightChange(product, isDona ? 1 : 0.5)}
                      className="w-8 h-8 rounded-lg bg-crispy-500/20 hover:bg-crispy-500 text-crispy-400 hover:text-white flex items-center justify-center transition-all active:scale-95"
                      aria-label="Oshirish"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Calculated Price & Add to Cart button */}
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 uppercase font-medium">Jami:</span>
                      <span className="font-display text-base font-black text-white">
                        {calculatedPrice.toLocaleString()}{" "}
                        <span className="text-[10px] font-normal text-zinc-400">so'm</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 shadow-md active:scale-95 ${
                        isAdded
                          ? "bg-green-600 text-white"
                          : "bg-crispy-500 hover:bg-crispy-600 text-white shadow-glow-orange hover:scale-105"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Qo'shildi!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Savatga</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
