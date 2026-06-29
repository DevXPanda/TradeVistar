"use client";

import React from "react";

interface CheckoutSummaryProps {
  calculatedQty: number;
  unit: string;
  subtotal: number;
  gstAmount: number;
  grandTotal: number;
}

export default function CheckoutSummary({
  calculatedQty,
  unit,
  subtotal,
  gstAmount,
  grandTotal,
}: CheckoutSummaryProps) {
  return (
    <div className="bg-white border border-outline-variant/30 rounded-xl p-5 shadow-sm space-y-4">
      <h3 className="font-headline-md text-[14px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2">
        B2B Invoice Summary
      </h3>

      {/* Calculations Breakdown */}
      <div className="text-[13px] text-secondary space-y-3">
        <div className="flex justify-between">
          <span>Subtotal ({calculatedQty} {unit}s):</span>
          <strong className="text-trade-navy">₹{subtotal.toLocaleString("en-IN")}</strong>
        </div>
        <div className="flex justify-between">
          <span>Integrated GST (18%):</span>
          <strong className="text-trade-navy">₹{gstAmount.toLocaleString("en-IN")}</strong>
        </div>
        <div className="border-t border-outline-variant/20 pt-3 flex justify-between text-[14px] font-bold text-trade-navy">
          <span>Escrow Total:</span>
          <strong className="text-trade-orange font-black">₹{grandTotal.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {/* Verification details */}
      <div className="pt-3 border-t border-outline-variant/10 text-[10.5px] text-secondary space-y-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-emerald-500 font-bold">shield</span>
          <span>Trade Assurance Covered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-blue-500 font-bold">lock</span>
          <span>Fund secured in ESCROW</span>
        </div>
      </div>
    </div>
  );
}
