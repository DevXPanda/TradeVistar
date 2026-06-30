"use client";

import React, { useState } from "react";

interface ProductVariantsProps {
  category: string;
}

export default function ProductVariants({ category }: ProductVariantsProps) {
  const hasSizes = 
    category.toLowerCase().includes("fashion") || 
    category.toLowerCase().includes("clothing") || 
    category.toLowerCase().includes("apparel") ||
    category.toLowerCase().includes("textile") ||
    category.toLowerCase().includes("packaging") ||
    category.toLowerCase().includes("tools") ||
    category.toLowerCase().includes("machinery") ||
    category.toLowerCase().includes("construction") ||
    category.toLowerCase().includes("materials");
  
  // State selectors
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("S");

  // Options mock datasets
  const colors = [
    { id: "white", bg: "bg-white border-outline-variant/30" },
    { id: "blue", bg: "bg-indigo-900 border-indigo-950" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="space-y-4 pt-2 border-t border-outline-variant/10 text-xs font-semibold text-trade-navy">
      
      {/* 1. Color Circular Selectors */}
      <div className="flex items-center gap-4">
        <span className="text-secondary w-10 select-none font-black text-left">Color</span>
        <div className="flex items-center gap-2">
          {colors.map((c) => {
            const isSelected = selectedColor === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center p-0.5 transition-all cursor-pointer ${
                  isSelected ? "border-trade-orange" : "border-transparent"
                }`}
              >
                <div className={`w-full h-full rounded-full border ${c.bg}`}></div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Size Square Selectors */}
      {hasSizes && (
        <div className="flex items-center gap-4">
          <span className="text-secondary w-10 select-none font-black text-left">Size</span>
          <div className="flex items-center gap-2">
            {sizes.map((s) => {
              const isSelected = selectedSize === s;
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-8 h-8 border text-[11px] font-black rounded-lg flex items-center justify-center uppercase transition-all cursor-pointer ${
                    isSelected
                      ? "border-trade-orange bg-trade-orange/5 text-trade-orange"
                      : "border-outline-variant/15 bg-white text-trade-navy hover:border-outline-variant/40"
                  }`}
                >
                  {s}
                </button>
              );
            })}
            <button className="text-trade-orange hover:underline text-[10.5px] ml-2 font-bold cursor-pointer">
              Size chart
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
