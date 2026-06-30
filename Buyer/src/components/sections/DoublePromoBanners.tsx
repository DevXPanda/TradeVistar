"use client";

import React from "react";
import Image from "next/image";

export default function DoublePromoBanners() {
  return (
    <section className="bg-white py-6 px-s-md" id="double-promo-banners-section">
      <div className="max-w-s-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Banner: Earbuds */}
        <div className="relative bg-trade-orange/5 text-trade-navy rounded-2xl overflow-hidden shadow-xs p-6 md:p-8 flex items-center justify-between min-h-[220px] group border border-outline-variant/10">
          {/* Decorative shapes */}
          <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-trade-orange/10 blur-xl pointer-events-none"></div>

          {/* Left Text */}
          <div className="space-y-4 max-w-[55%] z-10">
            <h3 className="font-display-lg text-[20px] md:text-[24px] font-black leading-tight text-trade-navy">
              Elevate Your <br className="hidden sm:inline" />
              Audio Experience
            </h3>
            <button className="bg-trade-orange hover:bg-trade-navy text-white px-5 py-2.5 rounded-lg text-[10.5px] font-black uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer">
              Explore Now
            </button>
          </div>

          {/* Right Image */}
          <div className="relative w-[130px] h-[130px] md:w-[160px] md:h-[160px] z-10 flex items-center justify-center">
            <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/promo_earbuds.png"
                alt="Audio Tech"
                fill
                sizes="(max-width: 768px) 130px, 160px"
                className="object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Banner: Baby Essentials */}
        <div className="relative bg-trade-navy/5 text-trade-navy rounded-2xl overflow-hidden shadow-xs p-6 md:p-8 flex items-center justify-between min-h-[220px] group border border-outline-variant/10">
          {/* Decorative shapes */}
          <div className="absolute right-0 bottom-0 w-24 h-24 rounded-full bg-trade-navy/10 blur-xl pointer-events-none"></div>

          {/* Left Text */}
          <div className="space-y-4 max-w-[55%] z-10">
            <h3 className="font-display-lg text-[20px] md:text-[24px] font-black leading-tight text-trade-navy">
              Cozy Comfort <br className="hidden sm:inline" />
              for Little Ones!
            </h3>
            <button className="bg-trade-navy hover:bg-trade-orange text-white px-5 py-2.5 rounded-lg text-[10.5px] font-black uppercase tracking-wider transition-all duration-300 shadow-xs cursor-pointer">
              Shop Baby Essentials
            </button>
          </div>

          {/* Right Image */}
          <div className="relative w-[130px] h-[130px] md:w-[160px] md:h-[160px] z-10 flex items-center justify-center">
            <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/promo_baby.png"
                alt="Baby Essentials"
                fill
                sizes="(max-width: 768px) 130px, 160px"
                className="object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
