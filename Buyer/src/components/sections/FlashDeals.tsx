"use client";

import React, { useState, useEffect, useRef } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface FlashDealsProps {
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

export default function FlashDeals({
  onViewDetails,
}: FlashDealsProps) {
  // Matches the exact numbers in the image: 549 days, 11 hours, 1 minute, 7 seconds
  const [timeLeft, setTimeLeft] = useState({
    days: 549,
    hours: 11,
    minutes: 1,
    seconds: 7,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { days, hours, minutes, seconds } = prev;
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let nextSec = seconds - 1;
        let nextMin = minutes;
        let nextHr = hours;
        let nextDay = days;

        if (nextSec < 0) {
          nextSec = 59;
          nextMin = minutes - 1;
        }
        if (nextMin < 0) {
          nextMin = 59;
          nextHr = hours - 1;
        }
        if (nextHr < 0) {
          nextHr = 23;
          nextDay = days - 1;
        }

        return { days: nextDay, hours: nextHr, minutes: nextMin, seconds: nextSec };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileSliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -260, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 260, behavior: "smooth" });
    }
  };

  const scrollLeftMobile = () => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRightMobile = () => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  // We select a subset of MOCK_PRODUCTS to display as flash deals
  const dealProducts = MOCK_PRODUCTS.slice(0, 6);

  const formatTime = (t: number) => t.toString().padStart(2, "0");

  return (
    <section className="bg-[#F2F5FF] py-10 px-s-md relative border-y border-outline-variant/20" id="flash-deals-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block - Desktop */}
        <div className="hidden md:flex justify-between items-end pb-2">
          <div className="space-y-1">
            <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight flex items-center gap-1">
              Flash Deal
            </h2>
            <p className="text-[12.5px] text-secondary font-bold">
              Hurry Up ! The offer is limited. Grab while it lasts
            </p>
          </div>
          <button
            onClick={() => {
              document.getElementById("search-filter-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-trade-navy hover:text-trade-orange text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            View All
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Header Block - Mobile (Title left, compact timer right) */}
        <div className="flex md:hidden justify-between items-center gap-2 pb-2">
          <div className="flex-grow max-w-[50%]">
            <h2 className="text-[18px] text-trade-navy font-black tracking-tight leading-tight">
              Flash Deal
            </h2>
            <p className="text-[11px] text-secondary font-bold leading-tight mt-1">
              Hurry Up ! The offer is limited. Grab while it lasts
            </p>
          </div>

          {/* Compact Timer Box (Orange) */}
          <div className="bg-trade-orange text-white rounded-lg p-3 flex flex-col justify-between items-center shadow-sm w-[210px] h-[86px] flex-shrink-0 relative overflow-hidden">
            <div className="w-full grid grid-cols-4 gap-1 text-center my-auto">
              {/* Days */}
              <div className="space-y-0.5">
                <div className="bg-orange-600/75 rounded-md py-1.5 px-0.5 font-mono text-[15px] font-black leading-none border border-white/5 shadow-inner">
                  {formatTime(timeLeft.days)}
                </div>
                <span className="text-[8.5px] text-white/90 uppercase font-black tracking-wide">Days</span>
              </div>
              {/* Hours */}
              <div className="space-y-0.5">
                <div className="bg-orange-600/75 rounded-md py-1.5 px-0.5 font-mono text-[15px] font-black leading-none border border-white/5 shadow-inner">
                  {formatTime(timeLeft.hours)}
                </div>
                <span className="text-[8.5px] text-white/90 uppercase font-black tracking-wide">Hours</span>
              </div>
              {/* Minutes */}
              <div className="space-y-0.5">
                <div className="bg-orange-600/75 rounded-md py-1.5 px-0.5 font-mono text-[15px] font-black leading-none border border-white/5 shadow-inner">
                  {formatTime(timeLeft.minutes)}
                </div>
                <span className="text-[8.5px] text-white/90 uppercase font-black tracking-wide">Min</span>
              </div>
              {/* Seconds */}
              <div className="space-y-0.5">
                <div className="bg-orange-600/75 rounded-md py-1.5 px-0.5 font-mono text-[15px] font-black leading-none border border-white/5 shadow-inner">
                  {formatTime(timeLeft.seconds)}
                </div>
                <span className="text-[8.5px] text-white/90 uppercase font-black tracking-wide">Sec</span>
              </div>
            </div>
            {/* Progress line */}
            <div className="w-full mt-2 h-1.5 bg-orange-600/75 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-white rounded-full w-2/3 shadow-xs"></div>
            </div>
          </div>
        </div>

        {/* Desktop Content Grid (Countdown Card + Carousel) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          
          {/* Left Column: Big Orange Countdown Card */}
          <div className="lg:col-span-3 bg-trade-orange text-white rounded-xl p-5 flex flex-col justify-between items-center shadow-md min-h-[220px] lg:min-h-auto relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-white/5 blur-2xl pointer-events-none"></div>

            {/* Countdown Boxes */}
            <div className="w-full grid grid-cols-4 gap-2 text-center my-auto">
              {/* Days */}
              <div className="space-y-1">
                <div className="bg-orange-600/75 rounded-lg py-3 px-1 font-mono text-[22px] font-black tracking-tight leading-none shadow-inner border border-white/5">
                  {formatTime(timeLeft.days)}
                </div>
                <span className="text-[9.5px] text-white/70 uppercase tracking-widest font-bold">Days</span>
              </div>
              
              {/* Hours */}
              <div className="space-y-1">
                <div className="bg-orange-600/75 rounded-lg py-3 px-1 font-mono text-[22px] font-black tracking-tight leading-none shadow-inner border border-white/5">
                  {formatTime(timeLeft.hours)}
                </div>
                <span className="text-[9.5px] text-white/70 uppercase tracking-widest font-bold">Hours</span>
              </div>

              {/* Minutes */}
              <div className="space-y-1">
                <div className="bg-orange-600/75 rounded-lg py-3 px-1 font-mono text-[22px] font-black tracking-tight leading-none shadow-inner border border-white/5">
                  {formatTime(timeLeft.minutes)}
                </div>
                <span className="text-[9.5px] text-white/70 uppercase tracking-widest font-bold">Minutes</span>
              </div>

              {/* Seconds */}
              <div className="space-y-1">
                <div className="bg-orange-600/75 rounded-lg py-3 px-1 font-mono text-[22px] font-black tracking-tight leading-none shadow-inner border border-white/5">
                  {formatTime(timeLeft.seconds)}
                </div>
                <span className="text-[9.5px] text-white/70 uppercase tracking-widest font-bold">Seconds</span>
              </div>
            </div>

            {/* Horizontal progress bar */}
            <div className="w-full mt-4 space-y-1.5 z-10">
              <div className="h-1.5 bg-orange-600/75 rounded-full overflow-hidden w-full border border-white/5">
                <div className="h-full bg-white rounded-full w-2/3 shadow-sm animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel Slider container */}
          <div className="lg:col-span-9 relative flex items-center group">
            
            {/* Left Chevron Button overlaying card edges */}
            <button
              onClick={scrollLeft}
              className="absolute left-2 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
            </button>

            {/* Carousel Content */}
            <div
              ref={sliderRef}
              className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {dealProducts.map((product, idx) => {
                const discountPercentage = 15 + (idx % 3) * 5;
                return (
                  <div key={`deal-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
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

            {/* Right Chevron Button overlaying card edges */}
            <button
              onClick={scrollRight}
              className="absolute right-2 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
            </button>

          </div>

        </div>

        {/* Mobile Content Slider (Horizontal cards scrolling horizontally) */}
        <div className="md:hidden relative flex items-center group">
          
          {/* Left Chevron Button */}
          <button
            onClick={scrollLeftMobile}
            className="absolute left-0 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
          </button>

          <div
            ref={mobileSliderRef}
            className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {dealProducts.map((product, idx) => {
              const discountPercentage = 15 + (idx % 3) * 5;
              return (
                <div key={`deal-mob-${product.id}`} className="w-[190px] flex-shrink-0 snap-start">
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
            onClick={scrollRightMobile}
            className="absolute right-0 z-20 w-10 h-10 rounded-full bg-trade-orange hover:bg-trade-navy text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/10"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
          </button>

        </div>

        {/* Mobile View All Link */}
        <div className="flex md:hidden justify-start pt-2">
          <button
            onClick={() => {
              document.getElementById("search-filter-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-trade-navy hover:text-trade-orange text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            View All
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

      </div>
    </section>
  );
}
