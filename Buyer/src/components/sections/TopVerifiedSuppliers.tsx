"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SupplierProfile {
  id: string;
  name: string;
  bannerText: string;
  bannerBg: string;
  bannerTextClass: string;
  logoIcon: string;
  logoBg: string;
  isOpen: boolean;
  rating: number;
  reviewsCount: number;
  productsCount: number;
  location: string;
  establishedYear: number;
  responseTime: string;
  products: string[];
}

export default function TopVerifiedSuppliers() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -290, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 290, behavior: "smooth" });
    }
  };

  const suppliers: SupplierProfile[] = [
    {
      id: "SUP-201",
      name: "Athletic Venture",
      bannerText: "Gear Up For Your Game!",
      bannerBg: "bg-trade-navy/5",
      bannerTextClass: "text-trade-navy",
      logoIcon: "sports_tennis",
      logoBg: "bg-trade-navy text-white",
      isOpen: false,
      rating: 4.5,
      reviewsCount: 0,
      productsCount: 16,
      location: "New Delhi, Delhi",
      establishedYear: 2018,
      responseTime: "< 2 Hours",
      products: ["Sports Apparels", "Cricket Bats", "Tennis Nets"],
    },
    {
      id: "SUP-202",
      name: "Kids Corner",
      bannerText: "Fun Fashion For Little Ones!",
      bannerBg: "bg-trade-orange/5",
      bannerTextClass: "text-trade-orange",
      logoIcon: "child_care",
      logoBg: "bg-trade-orange text-white",
      isOpen: true,
      rating: 4.7,
      reviewsCount: 0,
      productsCount: 11,
      location: "Mumbai, Maharashtra",
      establishedYear: 2019,
      responseTime: "< 1 Hour",
      products: ["Kids Clothing", "Baby Strollers", "Educational Toys"],
    },
    {
      id: "SUP-203",
      name: "Hanover Electronics",
      bannerText: "Latest Tech, Best Prices!",
      bannerBg: "bg-slate-100",
      bannerTextClass: "text-secondary",
      logoIcon: "electric_bolt",
      logoBg: "bg-slate-700 text-white",
      isOpen: true,
      rating: 4.6,
      reviewsCount: 0,
      productsCount: 20,
      location: "Bangalore, Karnataka",
      establishedYear: 2015,
      responseTime: "< 3 Hours",
      products: ["HDMI Transmitters", "Fiber Patch Cables", "Logic Gates"],
    },
    {
      id: "SUP-204",
      name: "6valley CMS",
      bannerText: "Multi Vendor eCommerce CMS",
      bannerBg: "bg-trade-navy/10",
      bannerTextClass: "text-trade-navy",
      logoIcon: "shopping_cart",
      logoBg: "bg-trade-navy text-white",
      isOpen: true,
      rating: 4.8,
      reviewsCount: 4,
      productsCount: 194,
      location: "Kolkata, West Bengal",
      establishedYear: 2021,
      responseTime: "< 1 Hour",
      products: ["Web Software Modules", "SaaS Dashboards", "Integrations"],
    },
  ];

  // Modals state for interactiveness
  const [activeModal, setActiveModal] = useState<{
    type: "contact" | "quote" | null;
    supplier: SupplierProfile | null;
  }>({ type: null, supplier: null });

  const [quoteQty, setQuoteQty] = useState("");
  const [quoteMessage, setQuoteMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const modalSupplier = activeModal.supplier;

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20" id="verified-suppliers-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="flex justify-between items-end pb-2">
          <div className="space-y-1">
            <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight">
              Top Sellers
            </h2>
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

          {/* Top Sellers Horizontal Carousel */}
          <div
            ref={sliderRef}
            className="w-full flex gap-6 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {suppliers.map((supplier) => (
              <div
                key={supplier.id}
                onClick={() => setActiveModal({ type: "contact", supplier })}
                className="bg-white border border-trade-orange/50 hover:border-trade-orange rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative w-[280px] h-[200px] flex-shrink-0 snap-start cursor-pointer justify-between"
              >
                {/* 1. Banner with illustration on left, text on right */}
                <div className={`h-[75px] ${supplier.id === "SUP-201" ? "bg-[#FFF0F0]" : supplier.id === "SUP-202" ? "bg-[#FAE8FF]" : supplier.id === "SUP-203" ? "bg-[#E0F2FE]" : "bg-[#F0FDFA]"} flex items-center justify-between px-4 relative overflow-hidden border-b border-outline-variant/5`}>
                  {/* Left side illustration icon */}
                  <div className="flex-shrink-0 opacity-80">
                    <span className={`material-symbols-outlined text-[42px] ${supplier.id === "SUP-201" ? "text-red-400" : supplier.id === "SUP-202" ? "text-fuchsia-400" : supplier.id === "SUP-203" ? "text-blue-400" : "text-teal-400"}`} style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                      {supplier.logoIcon}
                    </span>
                  </div>
                  {/* Right side text */}
                  <div className="text-right flex-grow pl-2">
                    <span className={`text-[10.5px] font-bold tracking-tight block leading-snug ${supplier.id === "SUP-201" ? "text-red-600" : supplier.id === "SUP-202" ? "text-fuchsia-600" : supplier.id === "SUP-203" ? "text-blue-600" : "text-teal-600"}`}>
                      {supplier.bannerText}
                    </span>
                  </div>
                </div>

                {/* 2. Floating Circular Brand Logo overlapping banner */}
                <div className="absolute top-[46px] left-4 z-10 w-14 h-14 rounded-full border-2 border-white shadow-md bg-white flex items-center justify-center overflow-hidden">
                  {supplier.id === "SUP-201" && (
                    <div className="w-full h-full bg-red-100 flex items-center justify-center text-red-500">
                      <span className="material-symbols-outlined text-[24px]">sports_tennis</span>
                    </div>
                  )}
                  {supplier.id === "SUP-202" && (
                    <div className="w-full h-full bg-fuchsia-100 flex items-center justify-center text-fuchsia-500">
                      <span className="material-symbols-outlined text-[24px]">emoji_nature</span>
                    </div>
                  )}
                  {supplier.id === "SUP-203" && (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <span className="material-symbols-outlined text-[24px]">electric_bolt</span>
                    </div>
                  )}
                  {supplier.id === "SUP-204" && (
                    <div className="w-full h-full bg-[#0A47BC] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                    </div>
                  )}
                  {!supplier.isOpen && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
                      <span className="text-[7.5px] text-white font-black uppercase leading-none scale-90">
                        Closed Now
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. White content body */}
                <div className="px-4 pb-3.5 flex flex-col justify-between flex-grow relative pt-8">
                  {/* Name and Rating */}
                  <div className="pl-[64px]">
                    <h3 className="font-headline-md text-[13.5px] text-trade-navy font-bold leading-tight truncate group-hover:text-primary-blue transition-colors">
                      {supplier.name}
                    </h3>
                    
                    {supplier.reviewsCount > 0 ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10.5px] text-[#0A47BC] font-black leading-none">
                          {supplier.rating}
                        </span>
                        <span className="material-symbols-outlined text-[10.5px] text-amber-500 fill-amber-500">
                          star
                        </span>
                        <span className="text-[10.5px] text-secondary font-medium leading-none">
                          Rating
                        </span>
                      </div>
                    ) : (
                      <div className="h-3.5"></div>
                    )}
                  </div>

                  {/* Two stats pills at bottom */}
                  <div className="flex gap-2.5 mt-3 w-full justify-between">
                    <div className="flex-1 bg-[#F0F4FA] rounded-md py-1.5 px-2 text-center text-[11.5px] font-bold">
                      <span className="text-[#0A47BC] font-black">{supplier.reviewsCount}</span>
                      <span className="text-secondary ml-1 font-semibold">Reviews</span>
                    </div>
                    <div className="flex-1 bg-[#F0F4FA] rounded-md py-1.5 px-2 text-center text-[11.5px] font-bold">
                      <span className="text-[#0A47BC] font-black">{supplier.productsCount}</span>
                      <span className="text-secondary ml-1 font-semibold">Products</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
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

      {/* ======================================================================= */}
      {/* INTERACTIVE SUPPLIER POPUPS */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {activeModal.type !== null && modalSupplier !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal({ type: null, supplier: null })}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-outline-variant/30 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 z-50 flex flex-col space-y-6"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModal({ type: null, supplier: null })}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              {activeModal.type === "contact" ? (
                // 1. CHAT OVERLAY FORM
                <div className="space-y-4">
                  <div className="flex gap-3 items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${modalSupplier.logoBg}`}>
                      <span className="material-symbols-outlined text-[18px]">{modalSupplier.logoIcon}</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-[15px] text-trade-navy font-bold">{modalSupplier.name}</h3>
                      <p className="text-[11px] text-secondary">Typically replies in {modalSupplier.responseTime}</p>
                    </div>
                  </div>

                  <div className="border-t border-outline-variant/10 pt-4 space-y-3">
                    <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/5 text-[11px] space-y-1">
                      <p className="text-secondary"><strong>Established:</strong> {modalSupplier.establishedYear} ({2026 - modalSupplier.establishedYear} Years)</p>
                      <p className="text-secondary"><strong>Location:</strong> {modalSupplier.location}</p>
                      <p className="text-secondary"><strong>Specialties:</strong> {modalSupplier.products.join(", ")}</p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        alert(`Message sent to ${modalSupplier.name}!`);
                        setChatMessage("");
                        setActiveModal({ type: null, supplier: null });
                      }}
                      className="space-y-3"
                    >
                      <textarea
                        required
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Write a message to start direct WhatsApp/portal conversation..."
                        className="w-full h-24 p-3 border border-outline-variant/50 rounded-lg text-xs focus:ring-1 focus:ring-trade-orange outline-none resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-trade-navy hover:bg-trade-orange text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        Start Conversation
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                // 2. RFQ REQUEST FORM
                <div className="space-y-4">
                  <div>
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-extrabold">Request B2B Quote</h3>
                    <p className="text-xs text-secondary">Submit direct RFQ to {modalSupplier.name}</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`RFQ submitted successfully to ${modalSupplier.name}!`);
                      setQuoteQty("");
                      setQuoteMessage("");
                      setActiveModal({ type: null, supplier: null });
                    }}
                    className="space-y-4 border-t border-outline-variant/10 pt-4"
                  >
                    <div className="space-y-1">
                      <label className="block text-[10.5px] uppercase font-bold text-secondary tracking-wider">Required Quantity</label>
                      <input
                        type="text"
                        required
                        value={quoteQty}
                        onChange={(e) => setQuoteQty(e.target.value)}
                        placeholder="e.g. 100 Units, 5 Metric Tons"
                        className="w-full p-2.5 border border-outline-variant/50 rounded-lg text-xs focus:ring-1 focus:ring-trade-orange outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10.5px] uppercase font-bold text-secondary tracking-wider">Specifications / Remarks</label>
                      <textarea
                        required
                        value={quoteMessage}
                        onChange={(e) => setQuoteMessage(e.target.value)}
                        placeholder="Provide details about delivery timelines, chemical grade, packing requirements..."
                        className="w-full h-20 p-2.5 border border-outline-variant/50 rounded-lg text-xs focus:ring-1 focus:ring-trade-orange outline-none resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-trade-orange hover:bg-trade-navy text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                    >
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      Send RFQ
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
