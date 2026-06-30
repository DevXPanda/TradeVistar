"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Carousel } from "@/components/common/Carousel";

export default function TopTrending() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Select products with high supplier ratings as trending products
  const trendingProducts = MOCK_PRODUCTS.filter((p) => p.supplierRating >= 4.6);

  return (
    <section className="bg-white border-t border-outline-variant/30 py-10 px-s-md" id="top-trending-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-trade-navy text-[24px]">trending_up</span>
            <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
              Top Trending Products
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollLeft}
              className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button 
              onClick={scrollRight}
              className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
            
            <div className="h-4 w-px bg-outline-variant/30 mx-1"></div>
            
            <a 
              href="#marketplace-section" 
              className="text-trade-orange text-[12px] font-black uppercase tracking-wider hover:underline flex items-center gap-0.5"
            >
              View Trending Catalog
              <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
            </a>
          </div>
        </div>

        {/* Carousel Slider */}
        <Carousel ref={carouselRef}>
          {trendingProducts.map((product, idx) => (
            <div key={`trending-${product.id}`} className="w-[250px] flex-shrink-0 relative">
              {/* Trending ranking index badge */}
              <div className="absolute top-3 left-3 bg-trade-navy text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10 flex items-center gap-1">
                <span>Rank</span>
                <span className="text-trade-orange">#{idx + 1}</span>
              </div>

              <ProductCard
                product={product}
                onViewDetails={() => {}}
                onQuote={() => {}}
                onBuyNow={() => {}}
                onChat={() => {}}
              />
            </div>
          ))}
        </Carousel>

      </div>
    </section>
  );
}
