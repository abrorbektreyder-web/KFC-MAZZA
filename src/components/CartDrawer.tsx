"use client";

import React from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateWeight,
    removeItem,
    clearCart,
    openCheckout,
    getTotalWeight,
    getItemsTotal,
    getRemainingForFreeDelivery,
  } = useCartStore();

  if (!isCartOpen) return null;

  const totalWeight = getTotalWeight();
  const itemsTotal = getItemsTotal();
  const remainingForFree = getRemainingForFreeDelivery();
  const progressPercent = Math.min(100, Math.round((totalWeight / 10) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101116] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-crispy-500/20 text-crispy-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Sizning Savatchangiz</h3>
                <p className="text-xs text-zinc-400 font-medium">
                  {items.length} xil mahsulot &bull; <span className="font-display text-crispy-400 font-bold">{totalWeight} kg/dona</span>
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-ivory-300 hover:text-white transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Gamified Progress Bar */}
          <div className="px-6 py-3.5 bg-black/40 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-ivory-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-crispy-400" />
                {remainingForFree > 0
                  ? `Yana ${remainingForFree} kg tovuq qo'shing va bepul yetkazamiz!`
                  : "🎉 Tabriklaymiz! Yetkazib berish MUTLAQO BEPUL!"}
              </span>
              <span className="font-bold text-crispy-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-crispy-500 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-ivory-400 mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-display text-base font-bold text-white mb-1">Savatchangiz bo'sh</h4>
                <p className="text-xs text-zinc-400 max-w-xs mb-6 font-normal">
                  Menyudan o'zingiz yoqtirgan qarsildoq tovuq yoki salqin ichimliklarni tanlang va savatchaga qo'shing.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-xl bg-crispy-500 text-white font-bold text-xs shadow-glow-orange"
                >
                  Menyuga o'tish
                </button>
              </div>
            ) : (
              items.map((item) => {
                const isDona = item.product.unit === "dona";
                const step = isDona ? 1 : 0.5;

                return (
                  <div
                    key={item.product.id}
                    className="glass-panel p-3.5 rounded-2xl flex items-center gap-3.5 border border-white/5"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-bold text-white truncate">
                        {item.product.name}
                      </h5>
                      <p className="text-xs text-crispy-400 font-bold mb-2">
                        {item.totalPrice.toLocaleString()} UZS
                      </p>

                      {/* Weight/Quantity controller */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-black/60 rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => updateWeight(item.product.id, item.weightKg - step)}
                            className="w-6 h-6 rounded flex items-center justify-center bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
                            aria-label="Kamaytirish"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="min-w-14 text-center text-xs font-bold text-white px-1">
                            {item.weightKg} {isDona ? "dona" : "kg"}
                          </span>
                          <button
                            onClick={() => updateWeight(item.product.id, item.weightKg + step)}
                            className="w-6 h-6 rounded flex items-center justify-center bg-crispy-500/20 hover:bg-crispy-500 text-crispy-400 hover:text-white transition-all active:scale-95"
                            aria-label="Oshirish"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1.5 text-ivory-400 hover:text-spicy-500 transition-colors ml-auto"
                          aria-label="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/50 space-y-4">
              <div className="space-y-2 text-xs text-ivory-300">
                <div className="flex items-center justify-between">
                  <span>Mahsulotlar jami:</span>
                  <span className="font-bold text-white">
                    {itemsTotal.toLocaleString()} UZS
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="font-bold text-crispy-400">
                    {totalWeight >= 10 ? "0 UZS (BEPUL)" : "Manzilga qarab hisoblanadi"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-white/10 font-black text-white">
                  <span>Jami summa:</span>
                  <span className="text-crispy-400 text-lg">
                    {itemsTotal.toLocaleString()} UZS
                  </span>
                </div>
              </div>

              <button
                onClick={openCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-crispy-500 to-crispy-600 hover:from-crispy-600 hover:to-crispy-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-glow-orange transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>BUYURTMANI RASMIYLASHTIRISH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
