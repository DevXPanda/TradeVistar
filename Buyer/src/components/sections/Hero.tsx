"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <header className="pt-32 pb-s-xl px-s-md bg-surface relative overflow-hidden">
      <div className="max-w-s-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-s-lg items-center relative z-10">
        <div
          className="space-y-s-md text-center lg:text-left flex flex-col items-center lg:items-start animate-fade-in"
        >
          {/* <div className="inline-flex items-center gap-s-xs px-3 py-1 bg-secondary-container/50 text-on-secondary-container rounded-full border border-secondary-container mx-auto lg:mx-0">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            <span className="font-label-caps text-[10px] tracking-widest uppercase">Verified Trade Network</span>
          </div> */}
          <h1 className="font-display-lg text-display-lg lg:text-display-lg text-trade-navy leading-tight w-full">
            <span className="text-trade-orange">India&apos;s</span> Trusted B2B Marketplace <br className="hidden lg:inline" />
            <span className="text-primary-blue">for Bulk Buying, Faster Delivery</span>
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
            TradeVistar is India&apos;s digital B2B marketplace connecting manufacturers, suppliers, wholesalers, retailers,
            and resellers through seamless bulk buying, fast delivery, and business growth opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-s-sm pt-s-xs w-full sm:w-auto justify-center lg:justify-start">
            <button className="bg-trade-orange text-white px-6 sm:px-s-xl py-4 rounded-lg font-bold font-label-sm hover:translate-y-[-2px] hover:bg-secondary-blue transition-all active:scale-95 cursor-pointer w-full sm:w-auto">
              Explore Infrastructure
            </button>
            <button className="border border-outline-variant px-6 sm:px-s-xl py-4 rounded-lg font-bold font-label-sm hover:bg-surface-variant transition-colors cursor-pointer w-full sm:w-auto">
              Speak to Sales
            </button>
          </div>
        </div>

        <div
          className="relative group w-full animate-fade-in"
        >
          <div className="absolute -inset-4 bg-trade-orange/5 rounded-3xl blur-3xl opacity-50 transition-opacity group-hover:opacity-70"></div>
          <div className="relative rounded-2xl overflow-hidden ghost-outline ambient-plume transition-all duration-700 opacity-100 translate-y-0 w-full aspect-video">
            <Image
              alt="Infrastructure Visualization"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="/Hero section image/tradevistar.jpeg"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface-container/30 to-transparent pointer-events-none"></div>
    </header>
  );
}
