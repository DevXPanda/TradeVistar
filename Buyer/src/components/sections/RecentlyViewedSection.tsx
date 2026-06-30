"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data/products";
import { Carousel } from "@/components/common/Carousel";

interface RecentlyViewedSectionProps {
  products: Product[];
  isLoggedIn: boolean;
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

export default function RecentlyViewedSection({
  products,
  isLoggedIn,
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: RecentlyViewedSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn || products.length === 0) return null;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background py-10 px-s-md" id="recently-viewed-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-outline-variant/20">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-trade-orange text-[26px]">history</span>
              <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
                Recently Viewed
              </h2>
            </div>
            
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-emerald-200">
              Active Session: Rajesh K.
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={scrollLeft}
              className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button 
              onClick={scrollRight}
              className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <Carousel ref={sliderRef}>
          {products.map((product) => (
            <ProductCard
              key={`recently-${product.id}`}
              product={product}
              onViewDetails={onViewDetails}
              onQuote={onQuote}
              onBuyNow={onBuyNow}
              onChat={onChat}
            />
          ))}
        </Carousel>

      </div>
    </section>
  );
}
