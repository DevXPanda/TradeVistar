"use client";

import React, { useRef, useEffect } from "react";

interface BrandInfo {
  name: string;
  logo: React.ReactNode;
}

export default function TrustedBrands() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const brands: BrandInfo[] = [
    {
      name: "Electrical Charge",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-emerald-600">loop</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">ELECTRICAL</span>
        </div>
      ),
    },
    {
      name: "Electronic Store",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-orange-500">router</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">ELECTRONIC</span>
        </div>
      ),
    },
    {
      name: "Global Tech",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-blue-600">public</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">GLOBAL TECH</span>
        </div>
      ),
    },
    {
      name: "UrbanEdge",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-indigo-600">business</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">URBANEDGE</span>
        </div>
      ),
    },
    {
      name: "Cool Sneakers",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-red-500">steps</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">SNEAKERS</span>
        </div>
      ),
    },
    {
      name: "TechConnect",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-amber-600">hub</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">TECHCONNECT</span>
        </div>
      ),
    },
    {
      name: "Otospeedios",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-slate-700">settings</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">OTOSPEED</span>
        </div>
      ),
    },
    {
      name: "Power Energy",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-yellow-500">flash_on</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">POWER</span>
        </div>
      ),
    },
    {
      name: "Electric Vehicle",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-emerald-500">electric_car</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">EV VEHICLE</span>
        </div>
      ),
    },
    {
      name: "Borcelle",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-rose-500">waves</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">BORCELLE</span>
        </div>
      ),
    },
    {
      name: "Timmerman",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-cyan-600">gavel</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">TIMMERMAN</span>
        </div>
      ),
    },
    {
      name: "Francisco",
      logo: (
        <div className="flex flex-col items-center leading-none text-center">
          <span className="material-symbols-outlined text-[20px] text-slate-800">electric_bolt</span>
          <span className="text-[9px] font-black text-slate-800 tracking-tighter mt-0.5">FRANCISCO</span>
        </div>
      ),
    },
  ];

  // Infinite duplicate list to ensure endless marquee feel
  const brandList = [...brands, ...brands, ...brands];

  // Auto-scrolling ticker hook
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;
    const speed = 0.55; // Pixels per frame scroll speed

    const scrollTicker = () => {
      container.scrollLeft += speed;
      // Loop back if reached near the end
      if (container.scrollLeft >= (container.scrollWidth / 3) * 2) {
        container.scrollLeft = container.scrollWidth / 3;
      }
      animationFrameId = requestAnimationFrame(scrollTicker);
    };

    // Initialize position in middle segment
    container.scrollLeft = container.scrollWidth / 3;
    animationFrameId = requestAnimationFrame(scrollTicker);

    // Pause on hover
    const pauseScroll = () => cancelAnimationFrame(animationFrameId);
    const resumeScroll = () => {
      animationFrameId = requestAnimationFrame(scrollTicker);
    };

    container.addEventListener("mouseenter", pauseScroll);
    container.addEventListener("mouseleave", resumeScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", pauseScroll);
      container.removeEventListener("mouseleave", resumeScroll);
    };
  }, []);

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20" id="popular-brands-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex justify-between items-end pb-2">
          <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight uppercase">
            Brands
          </h2>
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

        {/* Endless Auto-scroll Container */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto py-2 flex gap-6 scrollbar-none"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {brandList.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="w-20 h-20 rounded-full border border-outline-variant/15 bg-white shadow-xs hover:shadow-md hover:border-trade-orange flex-shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 select-none"
              title={`View ${brand.name}`}
            >
              {brand.logo}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
