"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { ProductType } from "@/types/product";
import { Product } from "@/data/products";

interface RelatedProductsProps {
  products: ProductType[];
  onViewDetails: (product: Product) => void;
}

export default function RelatedProducts({ products, onViewDetails }: RelatedProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -210, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 210, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-[16px] md:text-[18px] text-trade-navy font-black tracking-tight">
        Related Products
      </h3>

      <div className="relative flex items-center w-full group">
        {/* Left Chevron Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
          aria-label="Scroll left"
        >
          <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
        </button>

        {/* Scroll Container */}
        <div
          ref={sliderRef}
          className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((prod) => (
            <div key={prod.id} className="w-[190px] flex-shrink-0 snap-start">
              <ProductCard
                product={prod as unknown as Product}
                onViewDetails={onViewDetails}
                onQuote={() => {}}
                onBuyNow={() => {}}
                onChat={() => {}}
                isCompact={true}
              />
            </div>
          ))}
        </div>

        {/* Right Chevron Button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
          aria-label="Scroll right"
        >
          <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
