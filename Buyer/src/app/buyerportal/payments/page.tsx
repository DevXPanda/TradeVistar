"use client";

import React from "react";

export default function PaymentsPage() {
  const invoices = [
    { id: "INV-2024-001", orderId: "ORD-97500-D", date: "28 Sep 2024", amount: "₹2.1L", status: "Paid", statusBg: "bg-emerald-100 text-emerald-700" },
    { id: "INV-2024-002", orderId: "ORD-96102-K", date: "15 Sep 2024", amount: "₹28.0L", status: "Paid", statusBg: "bg-emerald-100 text-emerald-700" },
    { id: "INV-2024-003", orderId: "ORD-98104-F", date: "05 Oct 2024", amount: "₹12.4L", status: "Outstanding", statusBg: "bg-red-100 text-red-700", dueDays: "15 days" },
  ];

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Payments & Ledger</h1>
        <p className="font-body-md text-secondary mt-1">Settle trade balances, check verification escrow limits, and view invoice history.</p>
      </div>

      {/* Financial Summary */}
      <div className="grid sm:grid-cols-3 gap-s-md">
        <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-sm rounded-lg shadow-sm">
          <p className="font-label-caps text-[10px] text-secondary/70 uppercase">Outstanding Balance</p>
          <p className="font-display-lg text-2xl font-bold text-red-600 mt-2">₹12.4L</p>
          <p className="text-[11px] text-secondary mt-1">Next payment due: 20 Oct 2024</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-sm rounded-lg shadow-sm">
          <p className="font-label-caps text-[10px] text-secondary/70 uppercase">Escrow Limit</p>
          <p className="font-display-lg text-2xl font-bold text-trade-navy mt-2">₹50.0L</p>
          <p className="text-[11px] text-emerald-600 mt-1">Verified Buyer Limit</p>
        </div>
        <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-sm rounded-lg shadow-sm">
          <p className="font-label-caps text-[10px] text-secondary/70 uppercase">Sattled YTD</p>
          <p className="font-display-lg text-2xl font-bold text-emerald-600 mt-2">₹30.1L</p>
          <p className="text-[11px] text-secondary mt-1">Total across 2 invoices</p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
        <div className="px-s-md py-s-sm border-b border-outline-variant/30 bg-white/40">
          <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold">Invoice Ledgers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Invoice ID</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Order ID</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Issue Date</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Total Amount</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Status</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-s-md font-label-caps text-trade-navy font-bold text-[12px]">{inv.id}</td>
                  <td className="p-s-md font-label-caps text-secondary text-[12px]">{inv.orderId}</td>
                  <td className="p-s-md font-body-md text-secondary text-[13px]">{inv.date}</td>
                  <td className="p-s-md font-body-md text-trade-navy font-bold">{inv.amount}</td>
                  <td className="p-s-md">
                    <div className="flex flex-col gap-0.5">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider w-fit ${inv.statusBg}`}>
                        {inv.status}
                      </span>
                      {inv.dueDays && <span className="text-[9px] text-red-500 font-medium">Due in {inv.dueDays}</span>}
                    </div>
                  </td>
                  <td className="p-s-md text-right">
                    <button
                      onClick={() => alert(`Downloading Invoice PDF: ${inv.id}`)}
                      className="px-2.5 py-1 text-[11px] font-bold border border-outline-variant hover:border-trade-orange hover:text-trade-orange transition-colors rounded cursor-pointer bg-white"
                    >
                      Download PDF
                    </button>
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
