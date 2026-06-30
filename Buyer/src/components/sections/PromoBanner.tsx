"use client";

import React from "react";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="bg-white py-6 px-s-md" id="promo-banner-section">
      <div className="max-w-s-container-max mx-auto">
        <div className="relative bg-gradient-to-r from-trade-navy via-slate-800 to-trade-navy text-white rounded-2xl overflow-hidden shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[300px]">
          
          {/* Background decorative circles */}
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-white/5 border border-white/10 pointer-events-none"></div>

          {/* Left Text details */}
          <div className="space-y-6 max-w-lg z-10 text-center md:text-left flex flex-col items-center md:items-start">
            <h2 className="font-display-lg text-[28px] md:text-[38px] font-black leading-tight tracking-tight">
              Dive Into A World Of <br />
              Crystal Clear Sound
            </h2>
            <button className="bg-white hover:bg-trade-orange hover:text-white text-trade-navy px-8 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-md cursor-pointer">
              Buy Now
            </button>
          </div>

          {/* Right Product Image */}
          <div className="relative w-[280px] h-[220px] md:w-[350px] md:h-[280px] z-10 flex items-center justify-center">
            <div className="relative w-full h-full animate-bounce-slow">
              <Image
                src="/promo_headphones.png"
                alt="Premium Studio Headphones"
                fill
                sizes="(max-width: 768px) 280px, 350px"
                className="object-contain drop-shadow-2xl filter brightness-105 contrast-105"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
