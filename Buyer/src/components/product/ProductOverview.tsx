import React from "react";

interface ProductOverviewProps {
  description: string;
  specifications: Record<string, string>;
  packagingDetails: string;
}

export default function ProductOverview({
  description,
  specifications,
  packagingDetails,
}: ProductOverviewProps) {
  return (
    <div className="space-y-6 text-xs font-semibold text-secondary leading-relaxed max-w-4xl">
      
      {/* Detail Description header matching mockup 2 */}
      <div>
        <h3 className="text-[14px] font-black text-trade-navy mb-3 select-none">
          Detail Description
        </h3>
        
        <p className="font-bold text-trade-navy mb-1 text-[12px]">Product Description:</p>
        <p className="leading-relaxed whitespace-pre-line font-medium text-secondary">{description}</p>
      </div>

      {/* Specifications list matching mockup 2 */}
      {specifications && Object.keys(specifications).length > 0 && (
        <div className="space-y-2">
          <p className="font-bold text-trade-navy text-[12px]">Specifications:</p>
          <ul className="list-disc pl-4 space-y-1.5 font-medium text-secondary">
            {Object.entries(specifications).map(([key, val]) => (
              <li key={key}>
                <span className="font-bold text-trade-navy">{key}</span>: {val}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sourcing Features or Packaging details */}
      {packagingDetails && (
        <div className="space-y-2 border-t border-outline-variant/5 pt-4">
          <p className="font-bold text-trade-navy text-[12px]">Key Features & Packaging:</p>
          <p className="font-medium text-secondary">{packagingDetails}</p>
        </div>
      )}

    </div>
  );
}
