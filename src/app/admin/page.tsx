"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  Weight,
  Flame,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Settings,
  RefreshCw,
  Store,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { INITIAL_PRODUCTS } from "@/lib/products-data";

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phoneNumber: string;
  orderType: string;
  status: "NEW" | "CONFIRMED" | "PREPARING" | "READY" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  itemsSummary: string;
  totalWeightKg: number;
  grandTotal: number;
  time: string;
}

const INITIAL_MOCK_ORDERS: AdminOrder[] = [
  {
    id: "ord-1",
    orderNumber: "#ORD-2026-0042",
    customerName: "Alisher Karimov",
    phoneNumber: "+998 90 123 45 67",
    orderType: "DELIVERY",
    status: "NEW",
    itemsSummary: "Shirin Qarsildoq (2 kg), Achchiq Qarsildoq (1 kg)",
    totalWeightKg: 3.0,
    grandTotal: 247000,
    time: "10:15",
  },
  {
    id: "ord-2",
    orderNumber: "#ORD-2026-0041",
    customerName: "Zilola Mahmudova",
    phoneNumber: "+998 91 987 65 43",
    orderType: "PICKUP",
    status: "PREPARING",
    itemsSummary: "Shirin Qarsildoq (1.5 kg)",
    totalWeightKg: 1.5,
    grandTotal: 120000,
    time: "09:50",
  },
  {
    id: "ord-3",
    orderNumber: "#ORD-2026-0040",
    customerName: "Otabek Saidov",
    phoneNumber: "+998 93 456 78 90",
    orderType: "EVENT",
    status: "CONFIRMED",
    itemsSummary: "Mega Qarsildoq Savat (12 kg), 6 ta sous",
    totalWeightKg: 12.0,
    grandTotal: 1020000,
    time: "09:10",
  },
];

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_MOCK_ORDERS);
  const [isKitchenOpen, setIsKitchenOpen] = useState(true);
  const [basePrice, setBasePrice] = useState(80000);
  const [editingPrice, setEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState("80000");

  const handleStatusChange = (orderId: string, newStatus: AdminOrder["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleSavePrice = () => {
    const val = Number(tempPrice);
    if (val > 0) {
      setBasePrice(val);
      setEditingPrice(false);
    }
  };

  // KPIs
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.grandTotal, 0);
  const totalWeight = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalWeightKg, 0);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#0A0B0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-ivory-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Saytga qaytish</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span>ADMIN BOSHQARUV PANELI</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-crispy-500/20 text-crispy-400 border border-crispy-500/30">
                Jonli Boshqaruv
              </span>
            </h1>
          </div>

          {/* Quick Restaurant Status Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsKitchenOpen(!isKitchenOpen)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                isKitchenOpen
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-spicy-500/20 border-spicy-500/40 text-spicy-400"
              }`}
            >
              <Store className="w-4 h-4" />
              <span>{isKitchenOpen ? "Oshxona: OCHIQ" : "Oshxona: YOPIQ"}</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ivory-400 font-semibold uppercase">Bugungi Tushum</span>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-black text-white">
              {totalRevenue.toLocaleString()} <span className="text-xs text-ivory-400 font-normal">UZS</span>
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ivory-400 font-semibold uppercase">Sotilgan Tovuq</span>
              <Weight className="w-4 h-4 text-crispy-400" />
            </div>
            <p className="text-2xl font-black text-crispy-400">
              {totalWeight.toFixed(1)} <span className="text-xs text-ivory-400 font-normal">kg</span>
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ivory-400 font-semibold uppercase">Jami Buyurtmalar</span>
              <Package className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-white">{totalOrders} ta</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ivory-400 font-semibold uppercase">1 kg Narxi</span>
              <Settings className="w-4 h-4 text-ivory-400" />
            </div>
            {editingPrice ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  className="w-24 px-2 py-1 rounded bg-black/60 border border-crispy-500 text-xs text-white"
                />
                <button
                  onClick={handleSavePrice}
                  className="px-2 py-1 rounded bg-crispy-500 text-white text-xs font-bold"
                >
                  Saqlash
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-white">
                  {basePrice.toLocaleString()} <span className="text-xs text-ivory-400 font-normal">UZS</span>
                </span>
                <button
                  onClick={() => setEditingPrice(true)}
                  className="text-xs text-crispy-400 hover:underline font-bold"
                >
                  O'zgartirish
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-crispy-500" />
              <span>Kelib Tushgan Buyurtmalar</span>
            </h3>
            <span className="text-xs text-ivory-400">
              Telegram va Saytdan yagona oqim
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/50 text-ivory-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-6">Buyurtma</th>
                  <th className="py-3.5 px-6">Mijoz</th>
                  <th className="py-3.5 px-6">Mahsulotlar</th>
                  <th className="py-3.5 px-6">Vazn</th>
                  <th className="py-3.5 px-6">Summa</th>
                  <th className="py-3.5 px-6">Holat</th>
                  <th className="py-3.5 px-6 text-right">Boshqarish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-crispy-400">
                      {o.orderNumber}
                      <span className="block text-[10px] text-ivory-400 font-sans">
                        {o.time}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white">
                      {o.customerName}
                      <span className="block text-[10px] text-ivory-400 font-mono">
                        {o.phoneNumber}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-ivory-300 max-w-xs">
                      {o.itemsSummary}
                    </td>
                    <td className="py-4 px-6 font-bold text-white">
                      {o.totalWeightKg} kg
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-white">
                      {o.grandTotal.toLocaleString()} UZS
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          o.status === "NEW"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : o.status === "PREPARING"
                            ? "bg-crispy-500/20 text-crispy-400 border border-crispy-500/30"
                            : o.status === "READY"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : o.status === "OUT_FOR_DELIVERY"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                            : o.status === "DELIVERED"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-spicy-500/20 text-spicy-400 border border-spicy-500/30"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {o.status === "NEW" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "PREPARING")}
                            className="px-2.5 py-1 rounded-lg bg-crispy-500 hover:bg-crispy-600 text-white text-[11px] font-bold"
                          >
                            Qovurish
                          </button>
                        )}
                        {o.status === "PREPARING" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "OUT_FOR_DELIVERY")}
                            className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold"
                          >
                            Kuryerga berish
                          </button>
                        )}
                        {o.status === "OUT_FOR_DELIVERY" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "DELIVERED")}
                            className="px-2.5 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold"
                          >
                            Yakunlash
                          </button>
                        )}
                        {o.status !== "DELIVERED" && o.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleStatusChange(o.id, "CANCELLED")}
                            className="p-1 text-ivory-400 hover:text-spicy-400 transition-colors"
                            title="Bekor qilish"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
