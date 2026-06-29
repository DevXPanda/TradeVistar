"use client";

import React from "react";
import Image from "next/image";

export interface Order {
  id: string;
  supplier: string;
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  amount: number;
  orderDate: string;
  paymentStatus: "Pending Settlement" | "Escrow Locked" | "Escrow Released" | "Refunded";
  deliveryStatus: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingHistory: { date: string; log: string }[];
}

interface OrdersTableProps {
  orders: Order[];
  onOpenTracking: (order: Order) => void;
  onOpenDispute: (order: Order) => void;
  onOpenRelease: (order: Order) => void;
  onCancelOrder: (order: Order) => void;
  onMarkDelivered: (order: Order) => void;
  handleDownloadInvoice: (orderId: string) => void;
}

export default function OrdersTable({
  orders,
  onOpenTracking,
  onOpenDispute,
  onOpenRelease,
  onCancelOrder,
  onMarkDelivered,
  handleDownloadInvoice,
}: OrdersTableProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[12.5px]">
          <thead>
            <tr className="bg-surface-container-low/60 border-b border-outline-variant/30 text-secondary">
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Order ID</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Supplier</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Product</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Quantity</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Amount</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Payment Status</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Delivery Status</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Tracking</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px]">Invoice</th>
              <th className="font-bold text-trade-navy p-4 uppercase tracking-wider text-[10.5px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-trade-navy">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low/40 transition-colors">
                  {/* Order ID */}
                  <td className="p-4 font-bold text-trade-navy tracking-tight">{order.id}</td>

                  {/* Supplier */}
                  <td className="p-4 font-bold text-trade-navy">{order.supplier}</td>

                  {/* Product */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded border border-outline-variant/20 overflow-hidden bg-white flex-shrink-0">
                        <Image src={order.productImage} alt={order.productName} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-secondary truncate max-w-[150px]">{order.productName}</span>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td className="p-4 font-bold text-secondary">
                    {order.quantity.toLocaleString()} {order.unit}s
                  </td>

                  {/* Amount */}
                  <td className="p-4 font-bold text-trade-navy">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                      order.paymentStatus === "Escrow Locked"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : order.paymentStatus === "Escrow Released"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : order.paymentStatus === "Refunded"
                        ? "bg-purple-50 text-purple-700 border border-purple-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Delivery Status */}
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${
                      order.deliveryStatus === "Delivered"
                        ? "bg-emerald-500 text-white"
                        : order.deliveryStatus === "Shipped"
                        ? "bg-blue-500 text-white"
                        : order.deliveryStatus === "Cancelled"
                        ? "bg-red-500 text-white"
                        : order.deliveryStatus === "Processing"
                        ? "bg-amber-500 text-white"
                        : "bg-slate-400 text-white"
                    }`}>
                      {order.deliveryStatus}
                    </span>
                  </td>

                  {/* Tracking */}
                  <td className="p-4">
                    <button
                      onClick={() => onOpenTracking(order)}
                      className="text-trade-orange hover:underline font-bold flex items-center gap-0.5 cursor-pointer text-[11px]"
                    >
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      Track
                    </button>
                  </td>

                  {/* Invoice */}
                  <td className="p-4">
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="text-trade-navy hover:underline font-bold flex items-center gap-0.5 cursor-pointer text-[11px]"
                    >
                      <span className="material-symbols-outlined text-[14px]">description</span>
                      Invoice
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {order.deliveryStatus === "Shipped" && (
                        <button
                          onClick={() => onMarkDelivered(order)}
                          className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {(order.deliveryStatus === "Pending" ||
                        order.deliveryStatus === "Confirmed" ||
                        order.deliveryStatus === "Processing") && (
                        <button
                          onClick={() => onCancelOrder(order)}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                      {order.paymentStatus === "Escrow Locked" && order.deliveryStatus === "Delivered" && (
                        <button
                          onClick={() => onOpenRelease(order)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] transition-colors cursor-pointer"
                        >
                          Release Escrow
                        </button>
                      )}
                      <button
                        onClick={() => onOpenDispute(order)}
                        className="px-2 py-1 bg-white hover:bg-surface-container border border-outline-variant text-secondary hover:text-trade-navy rounded text-[10px] font-bold transition-all cursor-pointer"
                      >
                        Dispute
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-5 py-12 text-center text-secondary font-medium">
                  No orders match search parameters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
