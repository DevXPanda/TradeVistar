"use client";

import React, { useRef } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface BestSellingTopRatedProps {
  onViewDetails: (product: Product) => void;
}

export default function BestSellingTopRated({
  onViewDetails,
}: BestSellingTopRatedProps) {
  const bestSellingSliderRef = useRef<HTMLDivElement>(null);
  const topRatedSliderRef = useRef<HTMLDivElement>(null);

  const scrollBestSellingLeft = () => {
    if (bestSellingSliderRef.current) {
      bestSellingSliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollBestSellingRight = () => {
    if (bestSellingSliderRef.current) {
      bestSellingSliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollTopRatedLeft = () => {
    if (topRatedSliderRef.current) {
      topRatedSliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollTopRatedRight = () => {
    if (topRatedSliderRef.current) {
      topRatedSliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  // Select 6 products for Best Selling and 6 products for Top Rated
  const bestSelling = MOCK_PRODUCTS.slice(0, 6);
  const topRated = MOCK_PRODUCTS.slice(2, 8);

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20" id="best-selling-top-rated-section">
      <div className="max-w-s-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Best selling */}
        <div className="space-y-6">
          {/* Header Block */}
          <div className="flex justify-between items-end pb-2 border-b border-outline-variant/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500 text-[24px]">trophy</span>
              <h2 className="font-headline-lg text-[18px] md:text-[20px] text-trade-navy font-black tracking-tight">
                Best Selling
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

          {/* Carousel Slider container */}
          <div className="relative flex items-center group">
            
            {/* Left Chevron Button */}
            <button
              onClick={scrollBestSellingLeft}
              className="absolute left-0 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
            </button>

            {/* Slider Content */}
            <div
              ref={bestSellingSliderRef}
              className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {bestSelling.map((product, idx) => {
                const discountPercentage = idx % 2 === 0 ? 5 : 0;
                return (
                  <div key={`best-selling-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
                    <ProductCard
                      product={product}
                      onViewDetails={onViewDetails}
                      onQuote={() => {}}
                      onBuyNow={() => {}}
                      onChat={() => {}}
                      isCompact={true}
                      discountPercentage={discountPercentage > 0 ? discountPercentage : undefined}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={scrollBestSellingRight}
              className="absolute right-0 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
            </button>

          </div>
        </div>

        {/* Right Column: Top rated */}
        <div className="space-y-6">
          {/* Header Block */}
          <div className="flex justify-between items-end pb-2 border-b border-outline-variant/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-trade-orange text-[24px]">military_tech</span>
              <h2 className="font-headline-lg text-[18px] md:text-[20px] text-trade-navy font-black tracking-tight">
                Top Rated
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

          {/* Carousel Slider container */}
          <div className="relative flex items-center group">
            
            {/* Left Chevron Button */}
            <button
              onClick={scrollTopRatedLeft}
              className="absolute left-0 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
            </button>

            {/* Slider Content */}
            <div
              ref={topRatedSliderRef}
              className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {topRated.map((product, idx) => {
                const discountPercentage = idx % 3 === 0 ? 5 : 0;
                return (
                  <div key={`top-rated-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
                    <ProductCard
                      product={product}
                      onViewDetails={onViewDetails}
                      onQuote={() => {}}
                      onBuyNow={() => {}}
                      onChat={() => {}}
                      isCompact={true}
                      discountPercentage={discountPercentage > 0 ? discountPercentage : undefined}
                    />
                  </div>
                );
              })}
            </div>

            {/* Right Chevron Button */}
            <button
              onClick={scrollTopRatedRight}
              className="absolute right-0 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
