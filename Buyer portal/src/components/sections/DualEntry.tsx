"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function DualEntry() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-s-xl px-s-md bg-background">
      {/* Slider Navbar Header */}
      <div className="max-w-s-container-max mx-auto flex justify-center items-center mb-8">
        <div className="flex items-center gap-s-lg border-b border-outline-variant/30 pb-2">
          <button
            onClick={() => setActiveSlide(0)}
            className={`font-label-sm font-bold pb-2 transition-all border-b-2 cursor-pointer uppercase tracking-wider ${activeSlide === 0
              ? "text-trade-orange border-trade-orange"
              : "text-secondary border-transparent hover:text-trade-navy"
              }`}
          >
            For Buyers
          </button>
          <button
            onClick={() => setActiveSlide(1)}
            className={`font-label-sm font-bold pb-2 transition-all border-b-2 cursor-pointer uppercase tracking-wider ${activeSlide === 1
              ? "text-trade-orange border-trade-orange"
              : "text-secondary border-transparent hover:text-trade-navy"
              }`}
          >
            For Sellers
          </button>
        </div>
      </div>

      {/* Main Slider Container */}
      <div className="max-w-s-container-max mx-auto relative group overflow-hidden rounded-2xl hover:ring-4 ring-trade-orange/20 transition-all">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: activeSlide === 0 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeSlide === 0 ? -20 : 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {activeSlide === 0 ? (
              /* Buyers Card */
              <div className="relative overflow-hidden p-s-lg flex flex-col justify-between min-h-[400px] text-white w-full bg-[#1d3c50]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    alt="Sell Across India"
                    src="/dual-entry/img1.png"
                    fill
                    className="object-cover md:object-contain md:object-right transition-transform duration-700 hover:scale-102"
                    sizes="100vw"
                    priority
                  />
                  {/* Dark overlay for readability on mobile, gradient on desktop */}
                  <div className="absolute inset-0 bg-black/40 md:hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1d3c50] via-[#1d3c50]/60 to-transparent z-10 hidden md:block"></div>
                </div>

                <div className="relative z-10 space-y-s-md max-w-xl">
                  <h3 className="text-headline-lg text-white font-bold">
                    Sell Across <br />
                    <span className="text-trade-orange">India</span>
                  </h3>
                  <p className="text-white/85 max-w-sm text-body-md">
                    Reach thousands of Manufactures, Importers, Sellers, Retailers,
                    Resellers and Business buyers through TradeVistar.
                  </p>
                  <ul className="space-y-s-sm">
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">check_circle</span> Guaranteed Payment Protection
                    </li>
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">check_circle</span> Integrated Export Credits
                    </li>
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">check_circle</span> AI-Driven Demand Forecasts
                    </li>
                  </ul>
                </div>
                <div className="relative z-10 pt-s-lg">
                  <button className="text-label-caps border-b-2 border-white pb-1 hover:text-trade-orange hover:border-trade-orange transition-all uppercase cursor-pointer">
                    For Buyers →
                  </button>
                </div>
              </div>
            ) : (
              /* Sellers Card */
              <div className="relative overflow-hidden p-s-lg flex flex-col justify-between min-h-[400px] text-white w-full bg-[#f9f2ee]">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    alt="Buy Direct from Verified Suppliers"
                    src="/dual-entry/img2.png"
                    fill
                    className="object-cover md:object-contain md:object-right transition-transform duration-700 hover:scale-102"
                    sizes="100vw"
                    priority
                  />
                  {/* Dark overlay for readability on mobile, gradient on desktop */}
                  <div className="absolute inset-0 bg-black/40 md:hidden"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent z-10 hidden md:block"></div>
                </div>

                <div className="relative z-10 space-y-s-md max-w-xl">
                  <h3 className="text-headline-lg text-white font-bold">
                    Buy Direct from<br />
                    <span className="text-trade-orange">Verified Suppliers</span>
                  </h3>
                  <p className="text-white/85 max-w-sm text-body-md">
                    Source products directly from Manufactures, Importers
                    and Wholesellers accross India.
                  </p>
                  <ul className="space-y-s-sm">
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">trending_up</span> Verified Supplier Network
                    </li>
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">trending_up</span> Bulk Order Support
                    </li>
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">trending_up</span> Better Profit Margins
                    </li>
                    <li className="flex items-center gap-s-xs text-sm">
                      <span className="material-symbols-outlined text-trade-orange">trending_up</span> Multi-Category Marketplace
                    </li>
                  </ul>
                </div>
                <div className="relative z-10 pt-s-lg">
                  <button className="text-label-caps border-b-2 border-white pb-1 hover:text-trade-orange hover:border-trade-orange transition-all uppercase cursor-pointer">
                    For Sellers →
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        {/* Dots Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          <button
            onClick={() => setActiveSlide(0)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${activeSlide === 0 ? "bg-trade-orange w-4" : "bg-white/50 hover:bg-white/80"
              }`}
          ></button>
          <button
            onClick={() => setActiveSlide(1)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${activeSlide === 1 ? "bg-trade-orange w-4" : "bg-white/50 hover:bg-white/80"
              }`}
          ></button>
        </div>
      </div>
    </section>
  );
}
