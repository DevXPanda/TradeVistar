"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Product, MOCK_PRODUCTS } from "@/data/products";

export default function Marketplace() {
  // States for filters
  const [searchType, setSearchType] = useState<"product" | "supplier" | "company">("product");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [sortOption, setSortOption] = useState<string>("popular");

  // Sidebar Filter States
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterIndustry, setFilterIndustry] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [moqValue, setMoqValue] = useState<string>("");
  const [country, setCountry] = useState<string>("India");
  const [state, setState] = useState<string>("All States");
  const [city, setCity] = useState<string>("All Cities");
  const [supplierTypes, setSupplierTypes] = useState<string[]>([]);
  
  // Verification Checks
  const [tradeAssurance, setTradeAssurance] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);
  const [msme, setMsme] = useState(false);
  const [isoCertified, setIsoCertified] = useState(false);
  const [readyStock, setReadyStock] = useState(false);
  
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState<number | null>(null);

  // Mobile sidebar filter visible state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Infinite scroll states
  const [visibleCount, setVisibleCount] = useState(8);
  const observerRef = React.useRef<HTMLDivElement | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Mock Actions Modal States
  const [activeModal, setActiveModal] = useState<{
    type: "details" | "buy" | "quote" | "chat" | null;
    product: Product | null;
  }>({ type: null, product: null });

  const modalProduct = activeModal.product;

  // Custom mock values for request modal
  const [quoteQty, setQuoteQty] = useState("");
  const [quotePrice, setQuotePrice] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [buyQty, setBuyQty] = useState("");

  // Extracted unique metadata dynamically for filter dropdowns
  const categoriesList = ["Construction Materials", "Electronics & Electrical", "Machinery & Tools", "Chemicals & Plastics", "Textile & Apparel", "Packaging & Paper"];
  const industriesList = ["Infrastructure", "Manufacturing", "Agriculture"];
  const statesList = ["All States", "Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh", "West Bengal", "Punjab"];
  const citiesList = useMemo(() => {
    if (state === "All States") return ["All Cities"];
    const cities: Record<string, string[]> = {
      "Maharashtra": ["All Cities", "Mumbai", "Pune"],
      "Gujarat": ["All Cities", "Ahmedabad", "Vadodara", "Surat"],
      "Karnataka": ["All Cities", "Bengaluru"],
      "Tamil Nadu": ["All Cities", "Chennai", "Coimbatore"],
      "Delhi": ["All Cities", "New Delhi"],
      "Uttar Pradesh": ["All Cities", "Noida"],
      "West Bengal": ["All Cities", "Kolkata"],
      "Punjab": ["All Cities", "Ludhiana"],
    };
    return cities[state] || ["All Cities"];
  }, [state]);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    // Search query B2B filtering
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      if (searchType === "product") {
        result = result.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
      } else if (searchType === "supplier") {
        result = result.filter(p => p.supplierName.toLowerCase().includes(query));
      } else if (searchType === "company") {
        result = result.filter(p => p.supplierName.toLowerCase().includes(query));
      }
    }

    // Category Dropdown / Sidebar Category Multi-select
    if (selectedCategory !== "All Categories") {
      result = result.filter(p => p.category === selectedCategory);
    } else if (filterCategory.length > 0) {
      result = result.filter(p => filterCategory.includes(p.category));
    }

    // Industry multi-select
    if (filterIndustry.length > 0) {
      result = result.filter(p => filterIndustry.includes(p.industry));
    }

    // Price filtering
    if (priceMin !== "") {
      result = result.filter(p => p.priceMin >= parseFloat(priceMin));
    }
    if (priceMax !== "") {
      result = result.filter(p => p.priceMax <= parseFloat(priceMax));
    }

    // MOQ filtering
    if (moqValue !== "") {
      result = result.filter(p => p.moq <= parseInt(moqValue));
    }

    // Location filtering
    if (country !== "All" && country !== "") {
      result = result.filter(p => p.country === country);
    }
    if (state !== "All States") {
      result = result.filter(p => p.state === state);
    }
    if (city !== "All Cities") {
      result = result.filter(p => p.city === city);
    }

    // Supplier Type Checkboxes
    if (supplierTypes.length > 0) {
      result = result.filter(p => supplierTypes.includes(p.supplierType));
    }

    // Badges Checkboxes
    if (tradeAssurance) {
      result = result.filter(p => p.tradeAssurance);
    }
    if (gstVerified) {
      result = result.filter(p => p.gstVerified);
    }
    if (msme) {
      result = result.filter(p => p.msme);
    }
    if (isoCertified) {
      result = result.filter(p => p.isoCertified);
    }
    if (readyStock) {
      result = result.filter(p => p.readyStock);
    }

    // Rating
    if (minRating !== null) {
      result = result.filter(p => p.supplierRating >= minRating);
    }

    // Delivery time
    if (maxDeliveryTime !== null) {
      result = result.filter(p => p.deliveryTime <= maxDeliveryTime);
    }

    // Sorting
    const sorted = [...result];
    if (sortOption === "price_low") {
      sorted.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortOption === "price_high") {
      sorted.sort((a, b) => b.priceMax - a.priceMax);
    } else if (sortOption === "moq_low") {
      sorted.sort((a, b) => a.moq - b.moq);
    } else if (sortOption === "rating") {
      sorted.sort((a, b) => b.supplierRating - a.supplierRating);
    } // "popular" uses default database order

    return sorted;
  }, [
    searchType, searchQuery, selectedCategory, sortOption,
    filterCategory, filterIndustry, priceMin, priceMax, moqValue,
    country, state, city, supplierTypes, tradeAssurance,
    gstVerified, msme, isoCertified, readyStock, minRating, maxDeliveryTime
  ]);

  // Visible products list based on infinite scroll visibleCount
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  // Reset visible count on filter updates (asynchronously to avoid React cascading render warnings)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCount(8);
    }, 0);
    return () => clearTimeout(timer);
  }, [
    searchType, searchQuery, selectedCategory, sortOption,
    filterCategory, filterIndustry, priceMin, priceMax, moqValue,
    country, state, city, supplierTypes, tradeAssurance,
    gstVerified, msme, isoCertified, readyStock, minRating, maxDeliveryTime
  ]);

  // Infinite scroll intersection observer setup
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
        }
      },
      { threshold: 0.1 }
    );

    const currentSentinel = observerRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [visibleCount, filteredProducts.length]);

  const toggleCategoryFilter = (catName: string) => {
    setFilterCategory(prev =>
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  const toggleIndustryFilter = (indName: string) => {
    setFilterIndustry(prev =>
      prev.includes(indName) ? prev.filter(i => i !== indName) : [...prev, indName]
    );
  };

  const toggleSupplierTypeFilter = (type: string) => {
    setSupplierTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setFilterCategory([]);
    setFilterIndustry([]);
    setPriceMin("");
    setPriceMax("");
    setMoqValue("");
    setCountry("India");
    setState("All States");
    setCity("All Cities");
    setSupplierTypes([]);
    setTradeAssurance(false);
    setGstVerified(false);
    setMsme(false);
    setIsoCertified(false);
    setReadyStock(false);
    setMinRating(null);
    setMaxDeliveryTime(null);
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSortOption("popular");
  };

  return (
    <section className="bg-background py-s-lg px-s-md" id="marketplace-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Marketplace Toolbar */}
        <div 
          id="marketplace-toolbar"
          className="bg-white border border-outline-variant/30 rounded-xl p-4 shadow-sm space-y-4 relative z-20"
        >
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
              <button
                onClick={() => setSearchType("product")}
                className={`px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all ${
                  searchType === "product" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setSearchType("supplier")}
                className={`px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all ${
                  searchType === "supplier" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Suppliers
              </button>
              <button
                onClick={() => setSearchType("company")}
                className={`px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all ${
                  searchType === "company" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Companies
              </button>
            </div>
            <div className="font-label-sm text-secondary text-[12px] font-medium">
              <span className="text-trade-navy font-bold">{filteredProducts.length}</span> Products Found
            </div>
          </div>

          {/* Search Inputs, Dropdowns, Sorting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            {/* Search Input bar */}
            <div className="lg:col-span-4 relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60">
                search
              </span>
              <input
                type="text"
                placeholder={`Search B2B ${searchType}s...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px]"
              />
            </div>

            {/* Category Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                }}
                className="w-full px-3 py-2.5 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px] text-on-surface cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px] text-on-surface cursor-pointer"
              >
                <option value="popular">Sort: Popularity</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="moq_low">MOQ: Low to High</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

            {/* Filter Toggle Button (Mobile/Tablet Only) & Reset */}
            <div className="lg:col-span-2 flex gap-2">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex-1 lg:hidden flex items-center justify-center gap-1.5 px-3 py-2.5 bg-surface-container border border-outline-variant/50 rounded-lg font-label-sm text-[12px] text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">filter_list</span>
                Filters
              </button>
              <button
                onClick={resetFilters}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 border border-outline-variant rounded-lg font-label-sm text-[12px] text-secondary hover:bg-surface-variant transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar + Main Grid Split */}
        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          
          {/* Left Sidebar Filters (Desktop viewport - Static) */}
          <aside className="hidden lg:block w-72 bg-white border border-outline-variant/30 rounded-xl p-5 shadow-sm space-y-6 flex-shrink-0 sticky top-24 max-h-[85vh] overflow-y-auto hide-scrollbar">
            {/* Filter sections header */}
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
              <h3 className="font-headline-md text-[16px] text-trade-navy font-bold">Filters</h3>
              <button onClick={resetFilters} className="text-trade-orange text-[11px] font-bold hover:underline">
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Categories</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {categoriesList.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterCategory.includes(cat)}
                      onChange={() => toggleCategoryFilter(cat)}
                      className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Industry */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Industry</h4>
              <div className="space-y-1.5">
                {industriesList.map(ind => (
                  <label key={ind} className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterIndustry.includes(ind)}
                      onChange={() => toggleIndustryFilter(ind)}
                      className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                    />
                    {ind}
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold text-left">Price Range (₹)</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => { setPriceMin(e.target.value); }}
                  className="w-full px-2 py-1.5 border border-outline-variant/50 rounded text-[12px] outline-none focus:border-trade-orange"
                />
                <span className="text-secondary">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => { setPriceMax(e.target.value); }}
                  className="w-full px-2 py-1.5 border border-outline-variant/50 rounded text-[12px] outline-none focus:border-trade-orange"
                />
              </div>
            </div>

            {/* MOQ Filter */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Max MOQ Requirement</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10000"
                  value={moqValue}
                  onChange={(e) => { setMoqValue(e.target.value); }}
                  className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-trade-orange"
                />
                <div className="flex justify-between text-[11px] text-secondary font-medium">
                  <span>1 Unit</span>
                  <span className="text-trade-orange font-bold">Under {moqValue || "Any"} Units</span>
                  <span>10,000 Units</span>
                </div>
              </div>
            </div>

            {/* Location (Country, State, City) */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Location</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-[11px] text-secondary uppercase font-semibold block mb-0.5">Country</label>
                  <select
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); }}
                    className="w-full p-2 border border-outline-variant/50 rounded text-[12px] outline-none cursor-pointer"
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-secondary uppercase font-semibold block mb-0.5">State</label>
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setCity("All Cities");
                    }}
                    className="w-full p-2 border border-outline-variant/50 rounded text-[12px] outline-none cursor-pointer"
                  >
                    {statesList.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-secondary uppercase font-semibold block mb-0.5">City</label>
                  <select
                    value={city}
                    onChange={(e) => { setCity(e.target.value); }}
                    className="w-full p-2 border border-outline-variant/50 rounded text-[12px] outline-none cursor-pointer"
                    disabled={state === "All States"}
                  >
                    {citiesList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Supplier Type */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Supplier Type</h4>
              <div className="space-y-1.5">
                {["Manufacturer", "Exporter", "Wholesaler"].map(type => (
                  <label key={type} className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={supplierTypes.includes(type)}
                      onChange={() => toggleSupplierTypeFilter(type)}
                      className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Verified & Assurance Badges */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Verification</h4>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={tradeAssurance}
                    onChange={(e) => { setTradeAssurance(e.target.checked); }}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  🛡️ Trade Assurance
                </label>
                <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gstVerified}
                    onChange={(e) => { setGstVerified(e.target.checked); }}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  GST Verified
                </label>
                <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={msme}
                    onChange={(e) => { setMsme(e.target.checked); }}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  MSME Registered
                </label>
                <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isoCertified}
                    onChange={(e) => { setIsoCertified(e.target.checked); }}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  ISO Certified
                </label>
                <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={readyStock}
                    onChange={(e) => { setReadyStock(e.target.checked); }}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  Ready Stock Available
                </label>
              </div>
            </div>

            {/* Star Rating */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Supplier Rating</h4>
              <div className="flex flex-col gap-1.5">
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => {
                      setMinRating(minRating === rating ? null : rating);
                    }}
                    className={`flex items-center gap-1.5 text-[13px] px-2 py-1 rounded transition-colors text-left ${
                      minRating === rating ? "bg-trade-orange/15 text-trade-orange font-semibold" : "text-secondary hover:bg-surface-container"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px] text-amber-500 fill-amber-500">star</span>
                    <span>{rating} & Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div className="space-y-2 pt-3 border-t border-outline-variant/20">
              <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Delivery Time</h4>
              <div className="flex flex-col gap-1.5">
                {[3, 5, 7].map(days => (
                  <button
                    key={days}
                    onClick={() => {
                      setMaxDeliveryTime(maxDeliveryTime === days ? null : days);
                    }}
                    className={`flex items-center gap-2 text-[13px] px-2 py-1 rounded transition-colors text-left ${
                      maxDeliveryTime === days ? "bg-trade-orange/15 text-trade-orange font-semibold" : "text-secondary hover:bg-surface-container"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    <span>Within {days} Days</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Grid */}
          <div className="flex-1 w-full space-y-6">
            
            {/* Grid of Cards */}
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-5 w-full">
                {visibleProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:border-trade-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col group relative"
                  >
                    {/* Trade Assurance Top Badge */}
                    {product.tradeAssurance && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]">shield</span>
                        Assurance
                      </div>
                    )}

                    {/* Ready Stock Badge */}
                    {product.readyStock && (
                      <div className="absolute top-2 right-2 bg-trade-navy text-white text-[9px] font-semibold px-2 py-0.5 rounded-full shadow-sm z-10">
                        Ready Stock
                      </div>
                    )}

                    {/* Image Area */}
                    <Link 
                      href={`/products/${product.id}`} 
                      className="relative w-full aspect-square bg-surface-container-low overflow-hidden cursor-pointer block"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={product.id === "PROD-1001" || product.id === "PROD-1002"}
                      />
                    </Link>

                    {/* Information Area */}
                    <div className="p-3 flex-grow flex flex-col justify-between space-y-2">
                      <div className="space-y-1">
                        {/* Supplier Info */}
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider truncate max-w-[120px]">
                            {product.supplierName}
                          </span>
                          <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] text-amber-700 font-bold">
                            <span className="material-symbols-outlined text-[11px] text-amber-500 fill-amber-500">star</span>
                            {product.supplierRating}
                          </div>
                        </div>

                        {/* Product Title */}
                        <h3 className="font-headline-md text-[13px] md:text-[14px] text-trade-navy font-bold leading-tight line-clamp-2 hover:text-trade-orange transition-colors">
                          <Link href={`/products/${product.id}`} className="cursor-pointer">
                            {product.name}
                          </Link>
                        </h3>

                        {/* Short Description */}
                        <p className="text-[11px] text-secondary leading-normal line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Technical/B2B specs */}
                      <div className="space-y-1.5 pt-1.5 border-t border-outline-variant/10">
                        {/* Price */}
                        <div className="flex flex-wrap items-baseline gap-1">
                          <span className="font-display-lg text-[14px] md:text-[16px] text-trade-orange font-extrabold">
                            ₹{product.priceMin.toLocaleString("en-IN")} - ₹{product.priceMax.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-secondary font-medium">/{product.unit}</span>
                        </div>

                        {/* MOQ & Location */}
                        <div className="flex justify-between items-center text-[10px] text-secondary">
                          <span className="font-semibold bg-surface-container px-1.5 py-0.5 rounded text-[9px] text-on-surface">
                            MOQ: {product.moq} {product.unit}s
                          </span>
                          <span className="flex items-center gap-0.5 font-medium">
                            <span className="material-symbols-outlined text-[11px]">location_on</span>
                            {product.city}
                          </span>
                        </div>

                        {/* Verification badging */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {product.gstVerified && (
                            <span className="text-[8px] bg-blue-50 text-blue-700 font-bold px-1 py-0.5 rounded border border-blue-100">
                              GST
                            </span>
                          )}
                          {product.msme && (
                            <span className="text-[8px] bg-purple-50 text-purple-700 font-bold px-1 py-0.5 rounded border border-purple-100">
                              MSME
                            </span>
                          )}
                          {product.isoCertified && (
                            <span className="text-[8px] bg-slate-50 text-slate-700 font-bold px-1 py-0.5 rounded border border-slate-100">
                              ISO
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Interactive B2B Buttons Grid */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2">
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="px-2 py-1.5 bg-trade-orange/10 hover:bg-trade-orange text-trade-orange hover:text-white rounded border border-trade-orange/20 text-[10.5px] font-bold transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">request_quote</span>
                          RFQ
                        </button>
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="px-2 py-1.5 bg-trade-navy/5 hover:bg-trade-navy hover:text-white text-trade-navy rounded border border-outline-variant/30 text-[10.5px] font-bold transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[12px]">chat</span>
                          Chat
                        </button>
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="col-span-2 px-2.5 py-1.5 bg-trade-navy hover:bg-trade-navy/90 text-white rounded text-[11px] font-bold transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[13px]">shopping_cart</span>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Sentinel for infinite scroll */}
                {visibleCount < filteredProducts.length && (
                  <div 
                    ref={observerRef} 
                    className="w-full flex justify-center py-8 col-span-full"
                  >
                    <div className="flex items-center gap-2 text-secondary">
                      <div className="w-5 h-5 border-2 border-trade-orange border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-label-sm text-[12px]">Loading more products...</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-outline-variant/30 rounded-xl p-12 text-center space-y-4">
                <span className="material-symbols-outlined text-4xl text-secondary/40">search_off</span>
                <h3 className="font-headline-md text-trade-navy font-bold text-[16px]">No Products Found</h3>
                <p className="text-secondary text-[13px] max-w-sm mx-auto">
                  We couldn&apos;t find any products matching your specific query or filter checkboxes. Try resetting your parameters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-trade-orange text-white rounded-lg font-label-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all text-[12px]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Mobile Filter Drawer Overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative flex flex-col w-72 h-full bg-white p-5 gap-6 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                <h3 className="font-headline-md text-[16px] text-trade-navy font-bold">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-secondary hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Categories</h4>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {categoriesList.map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterCategory.includes(cat)}
                        onChange={() => toggleCategoryFilter(cat)}
                        className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Industry</h4>
                <div className="space-y-1.5">
                  {industriesList.map(ind => (
                    <label key={ind} className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterIndustry.includes(ind)}
                        onChange={() => toggleIndustryFilter(ind)}
                        className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                      />
                      {ind}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold text-left">Price Range (₹)</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => { setPriceMin(e.target.value); }}
                    className="w-full px-2 py-1.5 border border-outline-variant/50 rounded text-[12px] outline-none focus:border-trade-orange"
                  />
                  <span className="text-secondary">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => { setPriceMax(e.target.value); }}
                    className="w-full px-2 py-1.5 border border-outline-variant/50 rounded text-[12px] outline-none focus:border-trade-orange"
                  />
                </div>
              </div>

              {/* MOQ */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Max MOQ Requirement</h4>
                <input
                  type="range"
                  min="1"
                  max="10000"
                  value={moqValue}
                  onChange={(e) => { setMoqValue(e.target.value); }}
                  className="w-full h-1 bg-surface-container rounded-lg appearance-none cursor-pointer accent-trade-orange"
                />
                <div className="flex justify-between text-[10px] text-secondary font-medium">
                  <span>1 Unit</span>
                  <span className="text-trade-orange font-bold">Under {moqValue || "Any"}</span>
                  <span>10,000 Units</span>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Location</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-secondary uppercase font-semibold block mb-0.5">Country</label>
                    <select
                      value={country}
                      onChange={(e) => { setCountry(e.target.value); }}
                      className="w-full p-2 border border-outline-variant/50 rounded text-[12px] outline-none cursor-pointer"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-secondary uppercase font-semibold block mb-0.5">State</label>
                    <select
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setCity("All Cities");
                      }}
                      className="w-full p-2 border border-outline-variant/50 rounded text-[12px] outline-none cursor-pointer"
                    >
                      {statesList.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-secondary uppercase font-semibold block mb-0.5">City</label>
                    <select
                      value={city}
                      onChange={(e) => { setCity(e.target.value); }}
                      className="w-full p-2 border border-outline-variant/50 rounded text-[12px] outline-none cursor-pointer"
                      disabled={state === "All States"}
                    >
                      {citiesList.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Supplier Type */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Supplier Type</h4>
                <div className="space-y-1.5">
                  {["Manufacturer", "Exporter", "Wholesaler"].map(type => (
                    <label key={type} className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                      <input
                        type="checkbox"
                        checked={supplierTypes.includes(type)}
                        onChange={() => toggleSupplierTypeFilter(type)}
                        className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Verified Badges */}
              <div className="space-y-2 pt-3 border-t border-outline-variant/20">
                <h4 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Verification</h4>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tradeAssurance}
                      onChange={(e) => { setTradeAssurance(e.target.checked); }}
                      className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                    />
                    🛡️ Trade Assurance
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gstVerified}
                      onChange={(e) => { setGstVerified(e.target.checked); }}
                      className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                    />
                    GST Verified
                  </label>
                  <label className="flex items-center gap-2 text-[13px] text-secondary hover:text-trade-navy cursor-pointer">
                    <input
                      type="checkbox"
                      checked={readyStock}
                      onChange={(e) => { setReadyStock(e.target.checked); }}
                      className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                    />
                    Ready Stock
                  </label>
                </div>
              </div>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full mt-4 py-2.5 bg-trade-orange text-white rounded-lg font-label-sm text-[12px] font-bold shadow-md hover:brightness-105"
              >
                Apply Filters
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Mock Action Modals */}
      <AnimatePresence>
        {activeModal.type !== null && modalProduct !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal({ type: null, product: null })}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-outline-variant/40 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 z-50 flex flex-col space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal({ type: null, product: null })}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>

              {activeModal.type === "details" && (
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 border border-outline-variant/40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={modalProduct.image}
                        alt={modalProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-on-surface font-semibold">
                          ID: {modalProduct.id}
                        </span>
                        <span className="text-[10px] bg-trade-orange/15 text-trade-orange font-bold px-2 py-0.5 rounded">
                          {modalProduct.category}
                        </span>
                      </div>
                      <h2 className="font-headline-lg text-[18px] md:text-[20px] text-trade-navy font-bold leading-tight">
                        {modalProduct.name}
                      </h2>
                      <p className="text-[12px] text-secondary font-medium">
                        Supplier: <span className="text-trade-navy font-bold">{modalProduct.supplierName}</span> ({modalProduct.supplierType})
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-[13px] text-secondary">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Price Range</p>
                      <p className="font-bold text-[16px] text-trade-orange">
                        ₹{modalProduct.priceMin.toLocaleString("en-IN")} - ₹{modalProduct.priceMax.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Min. Order Qty</p>
                      <p className="font-bold text-[15px] text-trade-navy">
                        {modalProduct.moq} {modalProduct.unit}s
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Hub Location</p>
                      <p className="font-semibold text-trade-navy flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        {modalProduct.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Est. Lead Time</p>
                      <p className="font-semibold text-trade-navy flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {modalProduct.deliveryTime} Days
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Product Specifications</h3>
                    <p className="text-[13px] text-secondary leading-relaxed">
                      {modalProduct.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Certifications & Verifications</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.gstVerified ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        GST Verified
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.tradeAssurance ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">shield</span>
                        Trade Assurance
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.msme ? "bg-purple-50 text-purple-800 border-purple-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">business</span>
                        MSME Registered
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.isoCertified ? "bg-blue-50 text-blue-800 border-blue-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        ISO 9001 Certified
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-outline-variant/20">
                    <button
                      onClick={() => setActiveModal({ type: "buy", product: modalProduct })}
                      className="flex-1 py-3 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-[12px] transition-all"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => setActiveModal({ type: "quote", product: modalProduct })}
                      className="flex-1 py-3 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-bold text-[12px] transition-all"
                    >
                      Send RFQ
                    </button>
                  </div>
                </div>
              )}

              {activeModal.type === "quote" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] bg-trade-orange/15 text-trade-orange font-bold px-2 py-0.5 rounded">
                      RFQ Engine
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-bold mt-1">
                      Request Quotation for {modalProduct.name}
                    </h2>
                    <p className="text-[12px] text-secondary mt-1">
                      Send a secure bulk RFQ to <span className="text-trade-navy font-bold">{modalProduct.supplierName}</span>.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Successfully sent RFQ for ${quoteQty} units to ${modalProduct.supplierName}!`);
                      setActiveModal({ type: null, product: null });
                      setQuoteQty("");
                      setQuotePrice("");
                    }}
                    className="space-y-4 text-[13px] text-secondary"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy">Required Quantity</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min={modalProduct.moq}
                            placeholder={`Min: ${modalProduct.moq}`}
                            value={quoteQty}
                            onChange={(e) => setQuoteQty(e.target.value)}
                            className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 uppercase font-semibold text-[10px]">
                            {modalProduct.unit}s
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy">Target Price / Unit (₹)</label>
                        <input
                          type="number"
                          placeholder={`Range: ₹${modalProduct.priceMin}-₹${modalProduct.priceMax}`}
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(e.target.value)}
                          className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy">Requirement Details / Special Instructions</label>
                      <textarea
                        rows={3}
                        placeholder="Detail sizing, customization specifications, packaging needs, or delivery timelines requested."
                        className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy"
                      ></textarea>
                    </div>

                    <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/20 flex gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px] flex-shrink-0">verified_user</span>
                      <p className="text-[11.5px] leading-relaxed text-secondary">
                        <span className="text-trade-navy font-bold">TradeVistar Guarantee:</span> Your communication, quotes, and target discussions with the manufacturer are covered under secure escrow protection policies.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal({ type: "details", product: modalProduct })}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-[12px] transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-grow-[2] py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-bold text-[12px] transition-all shadow-md"
                      >
                        Submit RFQ Proposal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeModal.type === "buy" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                      Escrow Checkout
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-bold mt-1">
                      Direct Purchase Contract
                    </h2>
                    <p className="text-[12px] text-secondary mt-1">
                      Complete direct payment utilizing protected trade escrow.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Purchase order of ${buyQty} units successfully registered under escrow!`);
                      setActiveModal({ type: null, product: null });
                      setBuyQty("");
                    }}
                    className="space-y-4 text-[13px] text-secondary"
                  >
                    <div className="flex gap-3 items-center p-3 border border-outline-variant/20 rounded-xl">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image src={modalProduct.image} alt={modalProduct.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-trade-navy">{modalProduct.name}</h4>
                        <p className="text-[11px]">Price: ₹{modalProduct.priceMin.toLocaleString("en-IN")} / {modalProduct.unit}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy">Purchase Volume</label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min={modalProduct.moq}
                          value={buyQty}
                          placeholder={`MOQ: ${modalProduct.moq}`}
                          onChange={(e) => setBuyQty(e.target.value)}
                          className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 uppercase font-semibold text-[10px]">
                          {modalProduct.unit}s
                        </span>
                      </div>
                    </div>

                    {buyQty && parseInt(buyQty) >= modalProduct.moq && (
                      <div className="p-3 bg-surface-container-low border border-outline-variant/30 rounded-xl space-y-2 text-[12px]">
                        <div className="flex justify-between">
                          <span>Subtotal ({buyQty} units)</span>
                          <span className="font-bold text-trade-navy">₹{(parseInt(buyQty) * modalProduct.priceMin).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (18% Integrated)</span>
                          <span className="font-bold text-trade-navy">₹{(parseInt(buyQty) * modalProduct.priceMin * 0.18).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Logistics & Freight</span>
                          <span className="text-emerald-600 font-bold">Calculated on Dispatch</span>
                        </div>
                        <div className="h-px bg-outline-variant/30 my-1"></div>
                        <div className="flex justify-between text-[13px]">
                          <span className="font-bold text-trade-navy">Total Pay (Escrow Locked)</span>
                          <span className="font-extrabold text-trade-orange">₹{(parseInt(buyQty) * modalProduct.priceMin * 1.18).toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal({ type: "details", product: modalProduct })}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-[12px]"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-grow-[2] py-2.5 bg-trade-navy hover:bg-trade-navy/90 text-white rounded-lg font-bold text-[12px] transition-all shadow-md"
                      >
                        Lock Escrow & Pay
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeModal.type === "chat" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
                    <div className="w-8 h-8 rounded-full bg-trade-navy/10 flex items-center justify-center font-bold text-trade-navy text-[12px] flex-shrink-0">
                      💬
                    </div>
                    <div>
                      <h4 className="font-bold text-trade-navy">{modalProduct.supplierName}</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Representative Online (Lead time response &lt;5 mins)
                      </p>
                    </div>
                  </div>

                  <div className="h-48 bg-surface-container-low rounded-xl border border-outline-variant/20 p-3 overflow-y-auto space-y-3 flex flex-col justify-end text-[12px]">
                    <div className="self-start bg-white border border-outline-variant/30 p-2.5 rounded-lg max-w-[80%] text-secondary">
                      Hello! Thanks for showing interest in <span className="font-bold text-trade-navy">{modalProduct.name}</span>. How can I help you today? We offer customized branding and freight logistics quotes.
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Message: "${chatMessage}" sent to ${modalProduct.supplierName}!`);
                      setChatMessage("");
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Type your bulk inquiry details..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-grow px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy text-[13px]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-[12px] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      Send
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Continue to Purchase Login Prompt Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-sm overflow-hidden shadow-2xl relative z-10 p-6 text-center space-y-5"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 bg-trade-orange/10 rounded-full flex items-center justify-center text-trade-orange mx-auto">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <h3 className="font-headline-md text-[18px] text-trade-navy font-bold">Continue to Purchase</h3>
                <p className="text-secondary text-[13px] leading-relaxed">
                  Please login to continue your business transaction.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  className="w-full py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  Login
                </Link>

                <Link
                  href="/register?role=buyer"
                  className="w-full py-2.5 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  Create Buyer Account
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    alert("Google OAuth is simulated. Redirecting to Google Login...");
                    setAuthModalOpen(false);
                  }}
                  className="w-full py-2.5 bg-white hover:bg-surface-container text-secondary border border-outline-variant rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.08-.63-.12-1.27-.12-1.91z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="w-full py-2 bg-transparent text-secondary hover:text-trade-navy rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
