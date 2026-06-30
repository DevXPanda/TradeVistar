"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MarketplaceSearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: "product" | "supplier" | "company";
  setSearchType: (type: "product" | "supplier" | "company") => void;
  
  // Filter states
  category: string;
  setCategory: (category: string) => void;
  industry: string;
  setIndustry: (industry: string) => void;
  location: string;
  setLocation: (location: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
  
  // Advanced Drawer states
  priceMin: string;
  setPriceMin: (price: string) => void;
  priceMax: string;
  setPriceMax: (price: string) => void;
  moq: string;
  setMoq: (moq: string) => void;
  readyStock: boolean;
  setReadyStock: (val: boolean) => void;
  verifiedSupplier: boolean;
  setVerifiedSupplier: (val: boolean) => void;
  tradeAssurance: boolean;
  setTradeAssurance: (val: boolean) => void;
  gstVerified: boolean;
  setGstVerified: (val: boolean) => void;
  isoCertified: boolean;
  setIsoCertified: (val: boolean) => void;
  msme: boolean;
  setMsme: (val: boolean) => void;
  minRating: number | null;
  setMinRating: (rating: number | null) => void;
  
  // Actions
  onReset: () => void;
  resultsCount: number;
}

export default function MarketplaceSearchFilter({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  category,
  setCategory,
  industry,
  setIndustry,
  location,
  setLocation,
  sortOption,
  setSortOption,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  moq,
  setMoq,
  readyStock,
  setReadyStock,
  verifiedSupplier,
  setVerifiedSupplier,
  tradeAssurance,
  setTradeAssurance,
  gstVerified,
  setGstVerified,
  isoCertified,
  setIsoCertified,
  msme,
  setMsme,
  minRating,
  setMinRating,
  onReset,
  resultsCount,
}: MarketplaceSearchFilterProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categoriesList = [
    "All Categories",
    "Construction Materials",
    "Electronics & Electrical",
    "Machinery & Tools",
    "Chemicals & Plastics",
    "Textile & Apparel",
    "Packaging & Paper",
    "Medical Supplies",
    "Automotive Parts"
  ];

  const industriesList = [
    "All Industries",
    "Infrastructure",
    "Manufacturing",
    "Agriculture",
    "Medical",
    "Automotive"
  ];

  const locationsList = [
    "All Locations",
    "Mumbai",
    "Pune",
    "Ahmedabad",
    "Vadodara",
    "Surat",
    "Bengaluru",
    "Chennai",
    "New Delhi",
    "Noida",
    "Kolkata",
    "Ludhiana",
    "Gurugram"
  ];

  return (
    <section className="bg-white border-b border-outline-variant/30 py-6 px-s-md" id="search-filter-section">
      <div className="max-w-s-container-max mx-auto space-y-5">
        
        {/* Search Header Tabs & Bar */}
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/20 shadow-xs space-y-4">
          {/* Tabs */}
          <div className="flex border-b border-outline-variant/30 w-full sm:w-auto">
            {(["product", "supplier", "company"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSearchType(tab)}
                className={`px-6 py-2.5 font-bold text-xs uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  searchType === tab
                    ? "border-trade-orange text-trade-orange bg-white/40"
                    : "border-transparent text-secondary hover:text-trade-navy"
                }`}
              >
                {tab === "product" && "Search Products"}
                {tab === "supplier" && "Search Suppliers"}
                {tab === "company" && "Search Companies"}
              </button>
            ))}
          </div>

          {/* Search bar + Button */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/60">
                search
              </span>
              <input
                type="text"
                placeholder={`Enter keywords for ${searchType} sourcing (e.g. Cement, Copper Wire, Gear Pump)...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-outline-variant/60 rounded-xl outline-none focus:border-trade-orange text-trade-navy text-sm font-semibold bg-white"
              />
            </div>
            <button className="bg-trade-orange hover:bg-trade-orange/95 text-white font-black text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">search</span>
              Search Marketplace
            </button>
          </div>
        </div>

        {/* Quick Dropdowns Sourcing Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-secondary uppercase tracking-wider mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-outline-variant/50 rounded-lg px-3 py-2 bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange min-w-[160px]"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Industry Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-secondary uppercase tracking-wider mb-1">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="border border-outline-variant/50 rounded-lg px-3 py-2 bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange min-w-[160px]"
              >
                {industriesList.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Location Select */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-secondary uppercase tracking-wider mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="border border-outline-variant/50 rounded-lg px-3 py-2 bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange min-w-[160px]"
              >
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-secondary uppercase tracking-wider mb-1">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-outline-variant/50 rounded-lg px-3 py-2 bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange min-w-[140px]"
              >
                <option value="popular">Popularity</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Advanced Toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="border border-outline-variant px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider text-trade-navy hover:bg-surface-variant transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Advanced Filters
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="text-secondary/70 hover:text-trade-orange text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results indicator line */}
        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3 text-xs text-secondary font-bold">
          <span>Found {resultsCount} B2B products matching query</span>
          {resultsCount === 0 && (
            <span className="text-trade-orange">Try clearing or widening filter parameters</span>
          )}
        </div>

      </div>

      {/* Advanced Filter slide-out Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black"
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 border-l border-outline-variant/30"
            >
              {/* Header */}
              <div className="p-5 border-b border-outline-variant/20 flex items-center justify-between bg-trade-navy text-white">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                  <h3 className="font-headline-md text-sm font-black uppercase tracking-wider">Advanced Sourcing Filters</h3>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              {/* Content body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-secondary">
                {/* Price range */}
                <div className="space-y-2">
                  <h4 className="font-bold text-trade-navy uppercase text-[11px] tracking-widest">Target Unit Cost (₹)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={priceMin}
                      onChange={(e) => setPriceMin(e.target.value)}
                      className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={priceMax}
                      onChange={(e) => setPriceMax(e.target.value)}
                      className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange"
                    />
                  </div>
                </div>

                {/* MOQ threshold */}
                <div className="space-y-2">
                  <h4 className="font-bold text-trade-navy uppercase text-[11px] tracking-widest">Max MOQ Required</h4>
                  <input
                    type="number"
                    placeholder="Enter maximum MOQ threshold"
                    value={moq}
                    onChange={(e) => setMoq(e.target.value)}
                    className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg bg-white text-trade-navy font-bold text-xs outline-none focus:border-trade-orange"
                  />
                </div>

                {/* Status Badges Checks */}
                <div className="space-y-3">
                  <h4 className="font-bold text-trade-navy uppercase text-[11px] tracking-widest">Sourcing Status Badges</h4>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-trade-navy">
                      <input
                        type="checkbox"
                        checked={readyStock}
                        onChange={(e) => setReadyStock(e.target.checked)}
                        className="rounded accent-trade-orange"
                      />
                      Ready Stock
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-trade-navy">
                      <input
                        type="checkbox"
                        checked={tradeAssurance}
                        onChange={(e) => setTradeAssurance(e.target.checked)}
                        className="rounded accent-trade-orange"
                      />
                      Trade Assurance Protection
                    </label>
                  </div>
                </div>

                {/* Verification Checkboxes */}
                <div className="space-y-3">
                  <h4 className="font-bold text-trade-navy uppercase text-[11px] tracking-widest">Verification Parameter Compliance</h4>
                  <div className="flex flex-col gap-2.5">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-trade-navy">
                      <input
                        type="checkbox"
                        checked={verifiedSupplier}
                        onChange={(e) => setVerifiedSupplier(e.target.checked)}
                        className="rounded accent-trade-orange"
                      />
                      Verified Supplier Status
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-trade-navy">
                      <input
                        type="checkbox"
                        checked={gstVerified}
                        onChange={(e) => setGstVerified(e.target.checked)}
                        className="rounded accent-trade-orange"
                      />
                      GST Verified Registration
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-trade-navy">
                      <input
                        type="checkbox"
                        checked={isoCertified}
                        onChange={(e) => setIsoCertified(e.target.checked)}
                        className="rounded accent-trade-orange"
                      />
                      ISO 9001 Certification
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-trade-navy">
                      <input
                        type="checkbox"
                        checked={msme}
                        onChange={(e) => setMsme(e.target.checked)}
                        className="rounded accent-trade-orange"
                      />
                      MSME Registered Entity
                    </label>
                  </div>
                </div>

                {/* Supplier Rating */}
                <div className="space-y-3">
                  <h4 className="font-bold text-trade-navy uppercase text-[11px] tracking-widest">Minimum Supplier Rating</h4>
                  <div className="flex gap-2">
                    {[3, 4, 4.5, 4.7].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setMinRating(minRating === rate ? null : rate)}
                        className={`flex-1 py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                          minRating === rate
                            ? "bg-trade-orange border-trade-orange text-white"
                            : "bg-surface border-outline-variant/30 text-trade-navy hover:bg-surface-variant"
                        }`}
                      >
                        {rate}★ +
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-outline-variant/20 bg-surface-container-low flex gap-3">
                <button
                  onClick={() => {
                    onReset();
                    setDrawerOpen(false);
                  }}
                  className="flex-1 py-2.5 border border-outline-variant text-trade-navy rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex-[2] py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Apply Filter Constraints
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
