"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data/products";

interface FeaturedProductsProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

export default function FeaturedProducts({
  products,
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: FeaturedProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-10 px-s-md relative border-b border-outline-variant/20" id="featured-products-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex justify-between items-end pb-2">
          <div className="space-y-1">
            <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight uppercase">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => {
              document.getElementById("search-filter-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-trade-navy hover:text-primary-blue text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            View All
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Slider row with floating arrows */}
        <div className="relative flex items-center group">
          
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
          </button>

          {/* Carousel Slider */}
          <div
            ref={sliderRef}
            className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-[190px] flex-shrink-0 snap-start">
                <ProductCard
                  product={product}
                  onViewDetails={onViewDetails}
                  onQuote={onQuote}
                  onBuyNow={onBuyNow}
                  onChat={onChat}
                  isCompact={true}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
          </button>

        </div>

      </div>
    </section>
  );
}
