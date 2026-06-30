"use client";

import React, { useRef } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface FeaturedDealsProps {
  onViewDetails: (product: Product) => void;
}

export default function FeaturedDeals({ onViewDetails }: FeaturedDealsProps) {
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

  // Select 4 products to display as Featured Deals
  const dealProducts = MOCK_PRODUCTS.slice(2, 6);

  return (
    <section className="bg-[#F2F5FF] py-10 px-s-md border-b border-outline-variant/20" id="featured-deals-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex justify-between items-end pb-2">
          <div className="space-y-1">
            <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight">
              Featured Deal
            </h2>
            <p className="text-[12.5px] text-secondary font-bold">
              See the latest deals and exciting new offers!
            </p>
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

        {/* Carousel Slider container */}
        <div className="relative flex items-center group">
          
          {/* Left Chevron Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 md:left-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
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
            {dealProducts.map((product, idx) => {
              const discountPercentage = 10 + (idx % 3) * 5;

              return (
                <div key={`featured-deal-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
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
            className="absolute right-0 md:right-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
          </button>

        </div>

      </div>
    </section>
  );
}
