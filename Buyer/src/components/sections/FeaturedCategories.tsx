"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
  name: string;
  image: string;
  bgClass: string;
}

interface FeaturedCategoriesProps {
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export default function FeaturedCategories({
  onSelectCategory,
  activeCategory,
}: FeaturedCategoriesProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -240, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 240, behavior: "smooth" });
    }
  };

  // 8 categories with actual mock images mapped to subtle, clean TradeVistar UI global background colors
  const categories: CategoryItem[] = [
    {
      name: "Construction Materials",
      image: "/D2D market/1.jpg",
      bgClass: "bg-trade-navy/5 hover:bg-trade-navy/10",
    },
    {
      name: "Electronics & Electrical",
      image: "/D2D market/4.jpeg",
      bgClass: "bg-trade-orange/5 hover:bg-trade-orange/10",
    },
    {
      name: "Machinery & Tools",
      image: "/D2D market/6.jpeg",
      bgClass: "bg-secondary/5 hover:bg-secondary/10",
    },
    {
      name: "Chemicals & Plastics",
      image: "/D2D market/7.jpg",
      bgClass: "bg-surface-variant/80 hover:bg-surface-variant",
    },
    {
      name: "Textile & Apparel",
      image: "/D2D market/8.jpg",
      bgClass: "bg-trade-navy/5 hover:bg-trade-navy/10",
    },
    {
      name: "Packaging & Paper",
      image: "/built for high/1.jpeg",
      bgClass: "bg-trade-orange/5 hover:bg-trade-orange/10",
    },
    {
      name: "Medical Supplies",
      image: "/built for high/2.jpeg",
      bgClass: "bg-secondary/5 hover:bg-secondary/10",
    },
    {
      name: "Automotive Parts",
      image: "/D2D market/6.jpeg",
      bgClass: "bg-surface-variant/80 hover:bg-surface-variant",
    },
  ];

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20" id="featured-categories-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex justify-between items-end pb-2">
          <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight">
            Categories
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

          {/* Categories Horizontal Carousel */}
          <div
            ref={sliderRef}
            className="w-full flex gap-6 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <div
                  key={cat.name}
                  onClick={() => {
                    onSelectCategory(isActive ? "All Categories" : cat.name);
                    // Scroll to search filter
                    document.getElementById("search-filter-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex flex-col items-center space-y-2.5 cursor-pointer group flex-shrink-0 w-[110px] snap-start"
                >
                  {/* Circle Container */}
                  <div
                    className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 relative border border-outline-variant/10 shadow-xs group-hover:scale-105 ${cat.bgClass} ${
                      isActive ? "ring-2 ring-trade-orange ring-offset-2" : ""
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white shadow-xs">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="64px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Centered label */}
                  <span className={`text-[11.5px] font-bold text-center leading-tight transition-colors line-clamp-2 max-w-[100px] ${
                    isActive ? "text-trade-orange font-black" : "text-trade-navy group-hover:text-primary-blue"
                  }`}>
                    {cat.name}
                  </span>
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
