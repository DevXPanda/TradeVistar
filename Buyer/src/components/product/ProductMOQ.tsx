"use client";

import React, { useState, useEffect } from "react";
import { getMOQTiers, getPriceForQty } from "@/lib/product/calculateMOQ";
import { formatPrice } from "@/lib/product/formatPrice";

interface ProductMOQProps {
  moq: number;
  priceMin: number;
  priceMax: number;
  unit: string;
  onQtyChange?: (qty: number, totalPrice: number) => void;
}

export default function ProductMOQ({
  moq,
  priceMin,
  priceMax,
  unit,
  onQtyChange,
}: ProductMOQProps) {
  const tiers = getMOQTiers(moq, priceMin, priceMax);
  const [qty, setQty] = useState(moq);
  const activePrice = getPriceForQty(qty, tiers);
  const totalPrice = qty * activePrice;

  useEffect(() => {
    if (onQtyChange) {
      onQtyChange(qty, totalPrice);
    }
  }, [qty, totalPrice, onQtyChange]);

  const handleDecrement = () => {
    setQty((prev) => {
      const step = 1;
      const nextVal = prev - step;
      return nextVal < moq ? moq : nextVal;
    });
  };

  const handleIncrement = () => {
    setQty((prev) => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      setQty(val);
    }
  };

  const handleBlur = () => {
    if (qty < moq) {
      setQty(moq);
    }
  };

  return (
    <div className="space-y-4 pt-2 border-t border-outline-variant/10">
      
      {/* 1. Horizontal MOQ Tiers Row */}
      <div className="flex items-start gap-4 text-xs font-semibold text-trade-navy">
        <span className="text-secondary select-none font-black w-10 pt-2.5">
          MOQ
        </span>
        <div className="flex gap-4 flex-wrap flex-grow">
          {tiers.map((tier, index) => {
            const isActive = qty >= tier.minQty && (!tier.maxQty || qty <= tier.maxQty);
            return (
              <div key={index} className="flex flex-col space-y-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-1.5 border rounded-lg font-black text-[11.5px] transition-all ${
                      isActive
                        ? "border-trade-orange bg-trade-orange/5 text-trade-orange"
                        : "border-outline-variant/15 bg-white text-trade-navy"
                    }`}
                  >
                    {tier.maxQty ? `${tier.minQty}-${tier.maxQty}` : `≥${tier.minQty}`}
                  </span>
                  <span className="text-emerald-600 font-bold text-[11px] tracking-tight">
                    {tier.discount}% off
                  </span>
                </div>
                <span className="text-secondary font-medium text-[11px] pl-1">
                  {formatPrice(tier.price)}/{unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. QTY Row */}
      <div className="flex items-center gap-4 text-xs font-semibold text-trade-navy">
        <span className="text-secondary select-none font-black w-10">
          QTY
        </span>
        <div className="flex items-center border border-outline-variant/30 rounded-lg overflow-hidden bg-white shadow-xs h-9">
          <button
            type="button"
            onClick={handleDecrement}
            className="w-9 h-full flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors cursor-pointer select-none font-black text-sm"
          >
            -
          </button>
          <input
            type="number"
            value={qty}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="w-14 text-center font-bold text-xs text-trade-navy outline-none border-x border-outline-variant/10 h-full py-1"
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="w-9 h-full flex items-center justify-center text-secondary hover:bg-slate-50 transition-colors cursor-pointer select-none font-black text-sm"
          >
            +
          </button>
        </div>
      </div>

      {/* 3. Total Price Row */}
      <div className="flex items-center gap-2 pt-1 font-semibold text-xs text-trade-navy">
        <span className="text-secondary font-black">Total Price :</span>
        <span className="text-[20px] font-black text-primary-blue leading-none">
          {formatPrice(totalPrice)}
        </span>
      </div>

    </div>
  );
}
