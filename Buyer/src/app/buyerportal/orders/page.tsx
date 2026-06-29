"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrdersTable from "@/components/dashboard/OrdersTable";
import TrackingDrawer from "@/components/dashboard/TrackingDrawer";

// Interface for Order type
interface Order {
  id: string;
  supplier: string;
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  amount: number;
  orderDate: string; // YYYY-MM-DD
  paymentStatus: "Pending Settlement" | "Escrow Locked" | "Escrow Released" | "Refunded";
  deliveryStatus: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingHistory: { date: string; log: string }[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-2026-X771B",
    supplier: "Buildcon Materials Corp",
    productName: "Premium Portland Slag Cement (PSC)",
    productImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=150&q=80",
    quantity: 2000,
    unit: "Bag",
    amount: 760000,
    orderDate: "2026-06-25",
    paymentStatus: "Escrow Locked",
    deliveryStatus: "Shipped",
    trackingHistory: [
      { date: "2026-06-25 10:00 AM", log: "Order registered & Escrow payment authorized by buyer" },
      { date: "2026-06-25 04:00 PM", log: "Escrow funds locked. Order marked as Confirmed" },
      { date: "2026-06-26 11:30 AM", log: "Batch production finished & QC checklist clearance certified" },
      { date: "2026-06-27 09:15 AM", log: "Logistics truck loaded. Dispatched from manufacturing facility" },
      { date: "2026-06-28 02:40 PM", log: "Shipment in transit via National Highway Route 4" },
    ],
  },
  {
    id: "ORD-2026-P882K",
    supplier: "Apex Polymer Ind.",
    productName: "Heavy Duty HDPE Plastic Granules",
    productImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=150&q=80",
    quantity: 1500,
    unit: "kg",
    amount: 212400,
    orderDate: "2026-06-20",
    paymentStatus: "Escrow Released",
    deliveryStatus: "Delivered",
    trackingHistory: [
      { date: "2026-06-20 09:00 AM", log: "Order created. Waiting for Escrow payment" },
      { date: "2026-06-20 11:00 AM", log: "Payment of ₹2,12,400 locked in escrow" },
      { date: "2026-06-21 03:00 PM", log: "Dispatched from warehouse location Mumbai" },
      { date: "2026-06-24 12:00 PM", log: "Delivered at target buyer construction yard site" },
      { date: "2026-06-24 04:30 PM", log: "Inspected by buyer. Escrow funds released to supplier bank account" },
    ],
  },
  {
    id: "ORD-2026-S102P",
    supplier: "Tata Steel Corp",
    productName: "High Tensile Deformed Steel Rebars",
    productImage: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=150&q=80",
    quantity: 5000,
    unit: "kg",
    amount: 383500,
    orderDate: "2026-06-28",
    paymentStatus: "Pending Settlement",
    deliveryStatus: "Pending",
    trackingHistory: [
      { date: "2026-06-28 08:30 AM", log: "Order created by buyer. Awaiting bank transfer (RTGS) validation" },
    ],
  },
  {
    id: "ORD-2026-Q994W",
    supplier: "Aero-Core Parts Ltd",
    productName: "Precision Aluminum Alloy Extrusion Profiles",
    productImage: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=150&q=80",
    quantity: 3000,
    unit: "Unit",
    amount: 1350000,
    orderDate: "2026-06-15",
    paymentStatus: "Refunded",
    deliveryStatus: "Cancelled",
    trackingHistory: [
      { date: "2026-06-15 09:30 AM", log: "Order created. Payment locked in Escrow" },
      { date: "2026-06-16 10:00 AM", log: "Fulfillment issue: Supplier reported manufacturing capacity bottleneck" },
      { date: "2026-06-16 11:00 AM", log: "Order cancelled. Escrow refund sequence initialized" },
      { date: "2026-06-17 02:00 PM", log: "Funds returned to buyer wallet. Escrow refunded" },
    ],
  },
  {
    id: "ORD-2026-T105M",
    supplier: "Vikas Polymer Tubing",
    productName: "PVC Flexible Conduit Pipes",
    productImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=150&q=80",
    quantity: 1000,
    unit: "Meter",
    amount: 120000,
    orderDate: "2026-06-22",
    paymentStatus: "Escrow Locked",
    deliveryStatus: "Processing",
    trackingHistory: [
      { date: "2026-06-22 01:15 PM", log: "Order placed & Escrow payment authorized" },
      { date: "2026-06-22 04:30 PM", log: "Escrow funds locked. Order confirmed" },
      { date: "2026-06-23 10:00 AM", log: "Raw materials queued. Processing factory fabrication" },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Modals / Drawer state
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [actionConfirm, setActionConfirm] = useState<{
    type: "cancel" | "deliver" | "release" | null;
    order: Order | null;
  }>({ type: null, order: null });
  const [helpOrder, setHelpOrder] = useState<Order | null>(null);

  // Status Filter options
  const statusFilters = ["All", "Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"];

  // Filter and Search Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Status Filter
      if (selectedStatus !== "All" && order.deliveryStatus !== selectedStatus) {
        return false;
      }

      // 2. Search Query Filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(query);
        const matchesSupplier = order.supplier.toLowerCase().includes(query);
        const matchesProduct = order.productName.toLowerCase().includes(query);
        if (!matchesId && !matchesSupplier && !matchesProduct) {
          return false;
        }
      }

      // 3. Date Range Filter
      if (startDate !== "" && order.orderDate < startDate) {
        return false;
      }
      if (endDate !== "" && order.orderDate > endDate) {
        return false;
      }

      return true;
    });
  }, [orders, selectedStatus, searchQuery, startDate, endDate]);

  // Export CSV Action
  const handleExport = () => {
    alert("Exporting Orders Data...\nFormat: CSV (TradeVistar Procurement Report)");
  };

  // Download Invoice Action
  const handleDownloadInvoice = (orderId: string) => {
    alert(`Downloading Simulated Invoice PDF for ${orderId}...`);
  };

  // Perform Order cancellation
  const handleCancelOrder = () => {
    if (!actionConfirm.order) return;
    const targetId = actionConfirm.order.id;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === targetId) {
          return {
            ...order,
            deliveryStatus: "Cancelled",
            paymentStatus: "Refunded",
            trackingHistory: [
              ...order.trackingHistory,
              {
                date: new Date().toLocaleString(),
                log: "Order Cancelled by Buyer. Escrow refund initialized.",
              },
            ],
          };
        }
        return order;
      })
    );
    setActionConfirm({ type: null, order: null });
    alert(`Order ${targetId} cancelled successfully! Funds queued for escrow refund.`);
  };

  // Mark as Delivered action
  const handleMarkAsDelivered = () => {
    if (!actionConfirm.order) return;
    const targetId = actionConfirm.order.id;

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === targetId) {
          return {
            ...order,
            deliveryStatus: "Delivered",
            paymentStatus: "Escrow Released",
            trackingHistory: [
              ...order.trackingHistory,
              {
                date: new Date().toLocaleString(),
                log: "Inspected & Mark as Delivered by Buyer. Escrow funds released to supplier.",
              },
            ],
          };
        }
        return order;
      })
    );
    setActionConfirm({ type: null, order: null });
    alert(`Escrow released successfully for order ${targetId}!`);
  };

  return (
    <div className="flex flex-col gap-s-lg pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight font-extrabold">Procurement Orders</h1>
          <p className="font-body-md text-secondary mt-1">Track shipping progress, download escrow invoices, and release payments upon inspection.</p>
        </div>
        <button
          onClick={handleExport}
          className="self-start sm:self-center px-4 py-2 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          Export Report
        </button>
      </div>

      {/* Toolbar filters block */}
      <div className="bg-white border border-outline-variant/30 rounded-xl p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by Order ID, Product, Supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-outline-variant/50 focus:border-trade-orange rounded-lg text-xs outline-none bg-surface-container-low focus:bg-white transition-all"
            />
          </div>

          {/* Date range pickers */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-secondary font-bold uppercase">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1.5 border border-outline-variant/50 rounded-lg text-xs outline-none bg-surface-container-low text-trade-navy cursor-pointer focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-secondary font-bold uppercase">To:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1.5 border border-outline-variant/50 rounded-lg text-xs outline-none bg-surface-container-low text-trade-navy cursor-pointer focus:bg-white"
              />
            </div>
            {(startDate || endDate || searchQuery) && (
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setSearchQuery("");
                }}
                className="text-[11px] text-trade-orange hover:underline font-bold"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Status Pill Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 border-t border-outline-variant/10 pt-3">
          {statusFilters.map((status) => {
            const count = status === "All" 
              ? orders.length 
              : orders.filter((o) => o.deliveryStatus === status).length;
            const isSelected = selectedStatus === status;

            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-trade-navy text-white"
                    : "bg-surface-container-low border border-outline-variant/20 text-secondary hover:bg-surface-container"
                }`}
              >
                <span>{status}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected ? "bg-white/20 text-white" : "bg-outline-variant/30 text-secondary"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table view */}
      <OrdersTable
        orders={filteredOrders}
        onOpenTracking={(order) => setTrackingOrder(order)}
        onOpenDispute={(order) => setHelpOrder(order)}
        onOpenRelease={(order) => setActionConfirm({ type: "release", order })}
        onCancelOrder={(order) => setActionConfirm({ type: "cancel", order })}
        onMarkDelivered={(order) => setActionConfirm({ type: "deliver", order })}
        handleDownloadInvoice={(orderId) => handleDownloadInvoice(orderId)}
      />

      <AnimatePresence>
        {trackingOrder && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTrackingOrder(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />
            <TrackingDrawer
              order={trackingOrder}
              onClose={() => setTrackingOrder(null)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* 2. Modal: Action confirmation (Cancel / Deliver) */}
      <AnimatePresence>
        {actionConfirm.type && actionConfirm.order && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActionConfirm({ type: null, order: null })}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-sm overflow-hidden shadow-2xl relative z-10 p-6 text-center space-y-5"
            >
              <div className="space-y-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                  actionConfirm.type === "cancel" 
                    ? "bg-red-50 text-red-500" 
                    : "bg-emerald-50 text-emerald-500"
                }`}>
                  <span className="material-symbols-outlined text-[24px]">
                    {actionConfirm.type === "cancel" ? "cancel" : "check_circle"}
                  </span>
                </div>
                <h3 className="font-headline-md text-[16px] text-trade-navy font-bold">
                  {actionConfirm.type === "cancel" 
                    ? "Confirm Order Cancellation" 
                    : actionConfirm.type === "release"
                    ? "Confirm Escrow Release"
                    : "Confirm Delivery Clearance"}
                </h3>
                <p className="text-secondary text-[12px] leading-relaxed">
                  {actionConfirm.type === "cancel"
                    ? `Are you sure you want to cancel order ${actionConfirm.order.id}? Any locked Escrow funds will be refunded to your balance.`
                    : actionConfirm.type === "release"
                    ? `Are you sure you want to release Escrow payment for order ${actionConfirm.order.id}? Funds will be instantly transferred to the supplier.`
                    : `By marking order ${actionConfirm.order.id} as Delivered, you confirm that goods have arrived and passed quality inspection. Funds will be released to the supplier.`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setActionConfirm({ type: null, order: null })}
                  className="py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-secondary rounded-lg font-bold text-xs cursor-pointer transition-all active:scale-95"
                >
                  Go Back
                </button>
                <button
                  onClick={actionConfirm.type === "cancel" ? handleCancelOrder : handleMarkAsDelivered}
                  className={`py-2.5 text-white rounded-lg font-bold text-xs cursor-pointer transition-all active:scale-95 ${
                    actionConfirm.type === "cancel" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  Yes, Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Modal: Help Query dialog */}
      <AnimatePresence>
        {helpOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHelpOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-sm overflow-hidden shadow-2xl relative z-10 p-6 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-outline-variant/10 pb-3">
                <span className="material-symbols-outlined text-[20px] text-trade-orange">support_agent</span>
                <h3 className="font-headline-md text-[15px] text-trade-navy font-bold">Raise Support Ticket</h3>
              </div>

              <div className="text-[12.5px] text-secondary space-y-1">
                <p>Order Reference: <strong className="text-trade-navy">{helpOrder.id}</strong></p>
                <p>Supplier: {helpOrder.supplier}</p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-trade-navy block">Describe your issue or query:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Shipment delayed or packing quality issue..."
                  className="w-full p-2 border border-outline-variant/50 rounded-lg text-xs outline-none focus:border-trade-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setHelpOrder(null)}
                  className="py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-secondary rounded-lg font-bold text-xs cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Ticket submitted successfully for ${helpOrder.id}! Support will contact you shortly.`);
                    setHelpOrder(null);
                  }}
                  className="py-2.5 bg-trade-navy text-white rounded-lg font-bold text-xs cursor-pointer transition-all active:scale-95"
                >
                  Submit Ticket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
