"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface LatestProductsProps {
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

export default function LatestProducts({
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: LatestProductsProps) {
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

  // Select products for Latest Products (8 items)
  const latestItems = MOCK_PRODUCTS.slice(0, 8);
  
  // Select a mock product for the Deal of the Day (e.g. item 9)
  const dealOfTheDay = MOCK_PRODUCTS[8] || MOCK_PRODUCTS[0];

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20" id="latest-products-section">
      <div className="max-w-s-container-max mx-auto">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: DEAL OF THE DAY (Col span 3) */}
          <div className="lg:col-span-3 border border-[#0A47BC]/25 rounded-xl p-5 bg-white flex flex-col justify-between items-center text-center shadow-xs min-h-[380px] max-w-[320px] md:max-w-none mx-auto md:mx-0 w-full relative overflow-hidden group">
            <span className="text-[12px] text-[#0A47BC] font-black uppercase tracking-widest block pt-1">
              DEAL OF THE DAY
            </span>
            
            {/* Image frame */}
            <div className="relative w-44 h-44 md:w-full md:aspect-square bg-white rounded-lg overflow-hidden my-4 flex-shrink-0">
              <Image
                src={dealOfTheDay.image}
                alt={dealOfTheDay.name}
                fill
                sizes="(max-width: 768px) 176px, 300px"
                className="object-contain group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 z-10 bg-trade-orange text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                -30%
              </span>
            </div>

            {/* Product details */}
            <div className="space-y-3 w-full flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-[13px] text-trade-navy font-bold leading-tight line-clamp-2 hover:text-trade-orange transition-colors cursor-pointer" onClick={() => onViewDetails(dealOfTheDay)}>
                  {dealOfTheDay.name}
                </h3>
                <p className="text-[13.5px] text-trade-navy font-bold flex justify-center items-baseline gap-2">
                  <span className="text-[11px] text-secondary font-medium line-through">
                    ₹{dealOfTheDay.priceMin.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[14px] text-trade-navy font-black">
                    ₹{Math.round(dealOfTheDay.priceMin * 0.7).toLocaleString("en-IN")}
                  </span>
                </p>
              </div>

              {/* Grab This Deal Button */}
              <div className="w-full flex justify-center pt-2">
                <button
                  onClick={() => onViewDetails(dealOfTheDay)}
                  className="px-6 py-2 bg-primary-blue hover:bg-secondary-blue text-white rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-xs"
                >
                  Grab This Deal
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Latest products (Col span 9) */}
          <div className="lg:col-span-9 flex flex-col justify-between space-y-4">
            
            {/* Header Block inside Right Column */}
            <div className="flex justify-between items-end pb-2 border-b border-outline-variant/10">
              <h2 className="text-[18px] md:text-[20px] text-trade-navy font-black tracking-tight">
                Latest Products
              </h2>
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

            {/* Unified Carousel Slider (visible on both desktop & mobile) */}
            <div className="relative flex items-center w-full group">
              
              {/* Left Chevron Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
                aria-label="Scroll left"
              >
                <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
              </button>

              {/* Slider Content */}
              <div
                ref={sliderRef}
                className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {latestItems.map((product) => (
                  <div key={`latest-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
                    <ProductCard
                      product={product}
                      onViewDetails={onViewDetails}
                      onQuote={onQuote}
                      onBuyNow={onBuyNow}
                      onChat={onChat}
                      isCompact={true}
                      hideStars={true}
                    />
                  </div>
                ))}
              </div>

              {/* Right Chevron Button */}
              <button
                onClick={scrollRight}
                className="absolute right-0 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
                aria-label="Scroll right"
              >
                <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
