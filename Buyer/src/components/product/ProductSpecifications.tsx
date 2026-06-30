import React from "react";

interface ProductSpecificationsProps {
  specifications: Record<string, string>;
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return <p className="text-xs text-secondary italic">No technical specifications listed for this product.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-[14px] font-black text-trade-navy mb-2 uppercase tracking-wide">
        Technical Specifications Matrix
      </h3>

      <div className="border border-outline-variant/15 rounded-2xl overflow-hidden text-xs font-semibold">
        {Object.entries(specifications).map(([key, val], idx) => (
          <div
            key={key}
            className={`flex p-3.5 transition-colors ${
              idx % 2 === 0 ? "bg-slate-50" : "bg-white"
            } border-b border-outline-variant/5 last:border-b-0`}
          >
            <span className="w-1/3 text-secondary font-black">{key}</span>
            <span className="w-2/3 text-trade-navy font-bold">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
