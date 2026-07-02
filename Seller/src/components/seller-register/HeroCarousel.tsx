"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GlobalTradeIllustration,
  VerifiedBuyersIllustration,
  EscrowIllustration,
  AIGrowthIllustration,
  SuccessIllustration,
  FloatingWrapper,
} from "./SlideIllustrations";

const slides = [
  {
    key: "global",
    badge: "Global Reach",
    title: "Sell to 190+ Countries Worldwide",
    desc: "Reach verified enterprise buyers across six continents through TradeVistar's global trade network.",
    Illustration: GlobalTradeIllustration,
  },
  {
    key: "buyers",
    badge: "KYC Verified",
    title: "100% Verified Enterprise Buyers",
    desc: "Every buyer is KYC-verified and credit-checked before they can send you an RFQ.",
    Illustration: VerifiedBuyersIllustration,
  },
  {
    key: "escrow",
    badge: "100% Secure",
    title: "Escrow-Protected Payments",
    desc: "Get paid safely — funds are held in escrow and released the moment your shipment is confirmed.",
    Illustration: EscrowIllustration,
  },
  {
    key: "ai",
    badge: "Smart Analytics",
    title: "AI-Powered Growth Insights",
    desc: "Personalized pricing, demand forecasting, and catalog optimization powered by AI.",
    Illustration: AIGrowthIllustration,
  },
  {
    key: "success",
    badge: "5X Average Growth",
    title: "Join 50,000+ Successful Exporters",
    desc: "Sellers on TradeVistar grow revenue by an average of 2.8X in their first year.",
    Illustration: SuccessIllustration,
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1)), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const slide = slides[index];
  const Illustration = slide.Illustration;

  return (
    <div
      className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-trade-navy via-[#023d82] to-primary-blue shadow-2xl shadow-trade-navy/20 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={index}>
        <motion.div
          key={slide.key}
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 items-center gap-4 p-7 sm:p-9"
        >
          {/* Text content */}
          <div className="relative z-10 text-white space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/10 border border-white/20 backdrop-blur-sm w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-orange animate-pulse" />
              {slide.badge}
            </span>
            <h2 className="font-display-lg text-xl sm:text-2xl md:text-[26px] font-bold leading-tight">
              {slide.title}
            </h2>
            <p className="text-white/75 text-xs sm:text-[12.5px] leading-relaxed max-w-[240px]">
              {slide.desc}
            </p>
          </div>

          {/* Illustration */}
          <div className="relative z-10 h-[130px] sm:h-full hidden sm:block">
            <FloatingWrapper>
              <Illustration />
            </FloatingWrapper>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer z-20"
      >
        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors cursor-pointer z-20"
      >
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      </button>

      {/* Morphing dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1.5 rounded-full bg-white/30 overflow-hidden transition-all duration-300 cursor-pointer"
            style={{ width: i === index ? 22 : 6 }}
          >
            {i === index && (
              <motion.div layoutId="carousel-active-dot" className="absolute inset-0 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
