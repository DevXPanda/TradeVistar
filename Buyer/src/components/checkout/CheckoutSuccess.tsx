"use client";

import React from "react";
import Link from "next/link";

interface CheckoutSuccessProps {
  supplierName: string;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
  handleDownloadInvoice: () => void;
}

export default function CheckoutSuccess({
  supplierName,
  subtotal,
  gstAmount,
  grandTotal,
  handleDownloadInvoice,
}: CheckoutSuccessProps) {
  return (
    <div className="space-y-6 text-center py-8">
      <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
        <span className="material-symbols-outlined text-[36px]">check</span>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="font-display-lg text-[22px] md:text-[26px] text-trade-navy font-bold">
          Escrow Funded & Locked!
        </h2>
        <p className="text-secondary text-[13.5px] leading-relaxed">
          Order Reference <strong className="text-trade-navy">TV-2026-CHQ832</strong> has been successfully registered. The seller ({supplierName}) is notified to start freight dispatch.
        </p>
      </div>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 max-w-sm mx-auto text-left text-xs text-secondary space-y-2">
        <div className="flex justify-between">
          <span>Order Value:</span>
          <strong className="text-trade-navy">₹{subtotal.toLocaleString("en-IN")}</strong>
        </div>
        <div className="flex justify-between">
          <span>18% IGST:</span>
          <strong className="text-trade-navy">₹{gstAmount.toLocaleString("en-IN")}</strong>
        </div>
        <div className="border-t border-outline-variant/20 pt-2 flex justify-between font-bold text-trade-navy">
          <span>Escrow Total:</span>
          <strong className="text-trade-orange font-black">₹{grandTotal.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto pt-4">
        <button
          onClick={handleDownloadInvoice}
          className="w-full py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-trade-navy rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">download</span>
          Download Invoice
        </button>

        <Link
          href="/"
          className="w-full py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">home</span>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
