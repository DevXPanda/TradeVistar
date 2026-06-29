"use client";

import React from "react";

interface ProductSpecsTableProps {
  specifications: Record<string, string>;
  description: string;
}

export default function ProductSpecsTable({ specifications, description }: ProductSpecsTableProps) {
  return (
    <div className="bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm p-6 space-y-6">
      <div>
        <h3 className="font-headline-md text-[14px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2">
          Technical Specifications
        </h3>
        <div className="mt-4 border border-outline-variant/20 rounded-xl overflow-hidden">
          <table className="w-full border-collapse text-left text-xs">
            <tbody className="divide-y divide-outline-variant/10">
              {Object.entries(specifications).map(([key, val]) => (
                <tr key={key} className="even:bg-surface-container-low/30 hover:bg-surface-container-low/55 transition-colors">
                  <td className="px-5 py-3 font-semibold text-secondary w-1/3 border-r border-outline-variant/10">{key}</td>
                  <td className="px-5 py-3 font-bold text-trade-navy">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-headline-md text-[14px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2">
          Product Description
        </h3>
        <p className="text-secondary text-xs leading-relaxed mt-3 whitespace-pre-line font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
