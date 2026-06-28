"use client";

import React from "react";

export default function OrdersPage() {
  const orders = [
    { id: "ORD-99283-A", supplier: "Aero-Core Parts Ltd", date: "11 Oct 2024", total: "₹4.5L", shipment: "Warehouse B", status: "In Transit", statusBg: "bg-blue-100 text-blue-700", progress: 65 },
    { id: "ORD-98104-F", supplier: "Shree Metal Forgings", date: "05 Oct 2024", total: "₹12.4L", shipment: "Mumbai Port", status: "Pending Settlement", statusBg: "bg-amber-100 text-amber-700", progress: 30 },
    { id: "ORD-97500-D", supplier: "Vikas Polymer Tubing", date: "28 Sep 2024", total: "₹2.1L", shipment: "Warehouse B", status: "Delivered", statusBg: "bg-emerald-100 text-emerald-700", progress: 100 },
    { id: "ORD-96102-K", supplier: "Tata Steel Corp", date: "15 Sep 2024", total: "₹28.0L", shipment: "Warehouse A", status: "Delivered", statusBg: "bg-emerald-100 text-emerald-700", progress: 100 },
  ];

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Procurement Orders</h1>
        <p className="font-body-md text-secondary mt-1">Track shipping progress, dispatch logs, and incoming delivery clearances.</p>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
        <div className="px-s-md py-s-sm border-b border-outline-variant/30 bg-white/40 flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold">Active Shipments & Orders</h3>
          <span className="text-[12px] font-label-caps text-secondary font-medium uppercase">Total Active: 4</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Order ID</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Supplier</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Order Date</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Amount</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Destination</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Fulfillment</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-s-md font-label-caps text-trade-navy font-bold text-[12px]">{ord.id}</td>
                  <td className="p-s-md font-body-md text-on-surface font-semibold">{ord.supplier}</td>
                  <td className="p-s-md font-body-md text-secondary text-[13px]">{ord.date}</td>
                  <td className="p-s-md font-body-md text-trade-navy font-bold">{ord.total}</td>
                  <td className="p-s-md font-body-md text-secondary text-[13px]">{ord.shipment}</td>
                  <td className="p-s-md min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden max-w-[80px]">
                        <div className="bg-trade-orange h-1.5" style={{ width: `${ord.progress}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-secondary">{ord.progress}%</span>
                    </div>
                  </td>
                  <td className="p-s-md">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${ord.statusBg}`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
