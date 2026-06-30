"use client";

import React, { useRef } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface NewArrivalsProps {
  onViewDetails: (product: Product) => void;
}

export default function NewArrivals({ onViewDetails }: NewArrivalsProps) {
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

  // Select 4 fresh products to display as New Arrivals
  const freshProducts = MOCK_PRODUCTS.slice(4, 8);

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20" id="new-arrivals-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="pb-2">
          <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight">
            New Arrivals
          </h2>
        </div>

        {/* Carousel Slider container */}
        <div className="relative flex items-center group">
          
          {/* Left Chevron Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 md:left-2 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
          </button>

          {/* Cards Horizontal Slider */}
          <div
            ref={sliderRef}
            className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {freshProducts.map((product, idx) => {
              const discountPercentage = 5 + (idx % 2) * 5;

              return (
                <div key={`new-arrival-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
                  <ProductCard
                    product={product}
                    onViewDetails={onViewDetails}
                    onQuote={() => {}}
                    onBuyNow={() => {}}
                    onChat={() => {}}
                    isCompact={true}
                    discountPercentage={discountPercentage}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Chevron Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 md:right-2 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
          </button>

        </div>

      </div>
    </section>
  );
}
