import React from "react";

interface ProductPricingProps {
  priceMin: number;
  priceMax: number;
  unit: string;
  moq: number;
  deliveryTime: number;
}

export default function ProductPricing({
  moq,
  unit,
  deliveryTime,
}: ProductPricingProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 border border-outline-variant/10 rounded-xl text-xs font-semibold text-trade-navy">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-trade-orange font-black">
          inventory_2
        </span>
        <div>
          <p className="text-[9.5px] uppercase font-bold text-secondary/60 tracking-wider">Min Order (MOQ)</p>
          <p className="font-black text-[12.5px] mt-0.5">{moq.toLocaleString()} {unit}s</p>
        </div>
      </div>
      <div className="flex items-center gap-2 border-l border-outline-variant/10 pl-4">
        <span className="material-symbols-outlined text-[16px] text-[#0A47BC] font-black">
          schedule
        </span>
        <div>
          <p className="text-[9.5px] uppercase font-bold text-secondary/60 tracking-wider">Lead Time</p>
          <p className="font-black text-[12.5px] mt-0.5">{deliveryTime} Days</p>
        </div>
      </div>
    </div>
  );
}
