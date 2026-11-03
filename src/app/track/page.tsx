"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, PackageCheck, Clock, ChefHat, Truck, CheckCircle2, AlertCircle, Phone, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface OrderTrackingData {
  orderNumber: string;
  status: string;
  orderType: string;
  itemsTotal: number;
  deliveryFee: number;
  grandTotal: number;
  totalWeightKg: number;
  deliveryAddress?: string;
  createdAt: string;
  items: Array<{
    nameUz: string;
    weightKg: number;
    totalPrice: number;
  }>;
}

const STATUS_STEPS = [
  { key: "NEW", label: "Qabul qilindi", icon: Clock },
  { key: "CONFIRMED", label: "Tasdiqlandi", icon: PackageCheck },
  { key: "PREPARING", label: "Qovurilmoqda", icon: ChefHat },
  { key: "OUT_FOR_DELIVERY", label: "Kuryer yo'lda", icon: Truck },
  { key: "DELIVERED", label: "Yetkazildi", icon: CheckCircle2 },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order") || "";

  const [orderQuery, setOrderQuery] = useState(initialOrder);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderTrackingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const cleanNum = encodeURIComponent(query.trim());
      const res = await fetch(`/api/v1/orders/${cleanNum}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Buyurtma topilmadi.");
      }

      setOrderData(data.order);
    } catch (err: any) {
      setError(err.message || "Buyurtma ma'lumotlarini yuklashda xatolik yuz berdi.");
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrder) {
      fetchOrder(initialOrder);
    }
  }, [initialOrder]);

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const keys = ["NEW", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];
    const currentIndex = keys.indexOf(currentStatus);
    const stepIndex = keys.indexOf(stepKey);

    if (currentStatus === "CANCELLED") return "cancelled";
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-ivory-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Bosh sahifaga qaytish</span>
      </Link>

      {/* Page Title */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-crispy-400 block mb-1">
          Real Vaqtda Monitoring
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Buyurtmani Kuzatish
        </h1>
        <p className="text-xs sm:text-sm text-ivory-400 mt-2">
          Buyurtma berilganda berilgan raqamni kiriting (masalan: #ORD-2026-0001)
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchOrder(orderQuery);
        }}
        className="glass-panel p-2 rounded-2xl flex items-center gap-2 border border-white/10 mb-8"
      >
        <Search className="w-5 h-5 text-ivory-400 ml-3" />
        <input
          type="text"
          value={orderQuery}
          onChange={(e) => setOrderQuery(e.target.value)}
          placeholder="#ORD-2026-0001"
          className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder-white/30 focus:outline-none font-mono"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-crispy-500 hover:bg-crispy-600 text-white font-bold text-xs shadow-glow-orange transition-all disabled:opacity-50"
        >
          {loading ? "Qidirilmoqda..." : "Kuzatish"}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div className="glass-panel p-4 rounded-2xl border border-spicy-500/40 bg-spicy-500/10 text-spicy-400 text-xs flex items-center gap-3 mb-8">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tracking Details */}
      {orderData && (
        <div className="space-y-6">
          {/* Status Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <span className="text-[11px] text-ivory-400 uppercase font-medium">Buyurtma Raqami:</span>
                <h3 className="text-xl sm:text-2xl font-mono font-black text-crispy-400">
                  {orderData.orderNumber}
                </h3>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-ivory-200">
                {orderData.orderType === "DELIVERY"
                  ? "🛵 Yetkazib berish"
                  : orderData.orderType === "PICKUP"
                  ? "🏪 Olib ketish"
                  : "🎉 Ehson / Tadbir"}
              </div>
            </div>

            {/* Progress Stepper */}
            <div className="py-8">
              <div className="grid grid-cols-5 gap-2 text-center">
                {STATUS_STEPS.map((step) => {
                  const statusType = getStepStatus(step.key, orderData.status);
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                          statusType === "completed"
                            ? "bg-green-500 text-white shadow-md shadow-green-500/30"
                            : statusType === "current"
                            ? "bg-crispy-500 text-white shadow-glow-orange scale-110 animate-pulse"
                            : "bg-white/5 text-ivory-400 border border-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span
                        className={`text-[10px] sm:text-xs font-semibold ${
                          statusType === "current"
                            ? "text-crispy-400 font-bold"
                            : statusType === "completed"
                            ? "text-green-400"
                            : "text-ivory-400"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Status Description */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <p className="text-ivory-300">
                  Buyurtma vaqti:{" "}
                  <span className="font-mono text-white">
                    {new Date(orderData.createdAt).toLocaleTimeString("uz-UZ", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
                {orderData.deliveryAddress && (
                  <p className="text-ivory-400 mt-1">
                    Manzil: <span className="text-white">{orderData.deliveryAddress}</span>
                  </p>
                )}
              </div>

              <a
                href="tel:+998952645664"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-crispy-400 border border-white/10 font-bold flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Operator</span>
              </a>
            </div>
          </div>

          {/* Order Items Summary */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10">
            <h4 className="text-sm font-bold text-white mb-4">
              Buyurtma Tarkibi ({orderData.totalWeightKg} kg)
            </h4>
            <div className="space-y-3">
              {orderData.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs py-2 border-b border-white/5">
                  <span className="text-white font-medium">
                    {it.nameUz} ({it.weightKg} kg)
                  </span>
                  <span className="font-mono font-bold text-crispy-400">
                    {it.totalPrice.toLocaleString()} UZS
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between text-sm font-black text-white">
              <span>Jami to'lov:</span>
              <span className="text-crispy-400">
                {orderData.grandTotal.toLocaleString()} UZS
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0A0B0E] text-white">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-crispy-400 gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-semibold">Yuklanmoqda...</span>
          </div>
        }
      >
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
