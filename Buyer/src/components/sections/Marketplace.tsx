"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import FilterSection from "@/components/common/FilterSection";

export default function Marketplace() {
  // Navigation tabs for Search Type
  const [searchType, setSearchType] = useState<"product" | "supplier" | "manufacturer" | "company">("product");
  const [searchQuery, setSearchQuery] = useState("");

  // Toolbar Quick Filters
  const [toolbarCategory, setToolbarCategory] = useState("All Categories");
  const [toolbarIndustry, setToolbarIndustry] = useState("All Industries");
  const [toolbarLocation, setToolbarLocation] = useState("All Locations");

  // Layout View Mode (Grid vs List)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Sidebar Filter Collapse States
  const [collapsedFilters, setCollapsedFilters] = useState<Record<string, boolean>>({
    categories: false,
    industry: false,
    location: false,
    supplierType: false,
    moq: false,
    priceRange: false,
    verification: false,
    rating: false,
    delivery: false,
    shipping: false,
  });

  // Sidebar Filter Values
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterIndustry, setFilterIndustry] = useState<string[]>([]);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("All States");
  const [city, setCity] = useState("All Cities");
  const [supplierTypes, setSupplierTypes] = useState<string[]>([]); // Manufacturer, Wholesaler, Exporter
  const [moqInput, setMoqInput] = useState<string>("");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  
  // Badges & Verifications
  const [tradeAssurance, setTradeAssurance] = useState(false);
  const [readyStock, setReadyStock] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);
  const [isoCertified, setIsoCertified] = useState(false);
  const [msmeVerified, setMsmeVerified] = useState(false);
  
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState<number | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string[]>([]);

  // Sorting Option
  const [sortOption, setSortOption] = useState<string>("popular");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Standard grid is 5 cols, so multiples of 5 fit best!

  // Auth/Action Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<{
    type: "details" | "buy" | "quote" | "chat" | null;
    product: Product | null;
  }>({ type: null, product: null });

  // Input states inside modals
  const [quoteQty, setQuoteQty] = useState("");
  const [quotePrice, setQuotePrice] = useState("");
  const [buyQty, setBuyQty] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const modalProduct = activeModal.product;

  // Constants lists
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

  const toggleCollapsed = (section: string) => {
    setCollapsedFilters((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilterCategory = (cat: string) => {
    setFilterCategory((prev) =>
      prev.includes(cat) ? prev.filter((item) => item !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const toggleFilterIndustry = (ind: string) => {
    setFilterIndustry((prev) =>
      prev.includes(ind) ? prev.filter((item) => item !== ind) : [...prev, ind]
    );
    setCurrentPage(1);
  };

  const toggleSupplierType = (type: string) => {
    setSupplierTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const toggleShippingMethod = (method: string) => {
    setShippingMethod((prev) =>
      prev.includes(method) ? prev.filter((item) => item !== method) : [...prev, method]
    );
    setCurrentPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setToolbarCategory("All Categories");
    setToolbarIndustry("All Industries");
    setToolbarLocation("All Locations");
    setFilterCategory([]);
    setFilterIndustry([]);
    setCountry("India");
    setState("All States");
    setCity("All Cities");
    setSupplierTypes([]);
    setMoqInput("");
    setPriceMin("");
    setPriceMax("");
    setTradeAssurance(false);
    setReadyStock(false);
    setGstVerified(false);
    setIsoCertified(false);
    setMsmeVerified(false);
    setMinRating(null);
    setMaxDeliveryTime(null);
    setShippingMethod([]);
    setSortOption("popular");
    setCurrentPage(1);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      if (searchType === "product") {
        result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      } else if (searchType === "supplier") {
        result = result.filter(p => p.supplierName.toLowerCase().includes(q));
      } else if (searchType === "manufacturer") {
        result = result.filter(p => p.supplierName.toLowerCase().includes(q) && p.supplierType === "Manufacturer");
      } else if (searchType === "company") {
        result = result.filter(p => p.supplierName.toLowerCase().includes(q));
      }
    }

    // Search Type specific database filter overrides
    if (searchType === "manufacturer") {
      result = result.filter(p => p.supplierType === "Manufacturer");
    }

    // Toolbar Category Dropdown
    if (toolbarCategory !== "All Categories") {
      result = result.filter(p => p.category === toolbarCategory);
    }
    // Sidebar Categories (multi-select fallback if toolbar category is not set)
    else if (filterCategory.length > 0) {
      result = result.filter(p => filterCategory.includes(p.category));
    }

    // Toolbar Industry Dropdown
    if (toolbarIndustry !== "All Industries") {
      result = result.filter(p => p.industry === toolbarIndustry);
    }
    // Sidebar Industry
    else if (filterIndustry.length > 0) {
      result = result.filter(p => filterIndustry.includes(p.industry));
    }

    // Toolbar Location Dropdown
    if (toolbarLocation !== "All Locations") {
      result = result.filter(p => p.state === toolbarLocation || p.city === toolbarLocation);
    }

    // Sidebar Location Filters
    if (country !== "All" && country !== "") {
      result = result.filter(p => p.country.toLowerCase() === country.toLowerCase());
    }
    if (state !== "All States") {
      result = result.filter(p => p.state === state);
    }
    if (city !== "All Cities") {
      result = result.filter(p => p.city === city);
    }

    // Sidebar Supplier Types
    if (supplierTypes.length > 0) {
      result = result.filter(p => supplierTypes.includes(p.supplierType));
    }

    // MOQ
    if (moqInput !== "") {
      const parsedMoq = parseInt(moqInput);
      if (!isNaN(parsedMoq)) {
        result = result.filter(p => p.moq <= parsedMoq);
      }
    }

    // Price Range
    if (priceMin !== "") {
      const parsedMin = parseFloat(priceMin);
      if (!isNaN(parsedMin)) {
        result = result.filter(p => p.priceMin >= parsedMin);
      }
    }
    if (priceMax !== "") {
      const parsedMax = parseFloat(priceMax);
      if (!isNaN(parsedMax)) {
        result = result.filter(p => p.priceMax <= parsedMax);
      }
    }

    // Badges / Availability
    if (tradeAssurance) {
      result = result.filter(p => p.tradeAssurance);
    }
    if (readyStock) {
      result = result.filter(p => p.readyStock);
    }
    if (gstVerified) {
      result = result.filter(p => p.gstVerified);
    }
    if (isoCertified) {
      result = result.filter(p => p.isoCertified);
    }
    if (msmeVerified) {
      result = result.filter(p => p.msme);
    }

    // Ratings
    if (minRating !== null) {
      result = result.filter(p => p.supplierRating >= minRating);
    }

    // Delivery Days
    if (maxDeliveryTime !== null) {
      result = result.filter(p => p.deliveryTime <= maxDeliveryTime);
    }

    // Shipping Methods
    if (shippingMethod.length > 0) {
      result = result.filter(p => 
        p.shippingInfo && p.shippingInfo.methods.some(m => 
          shippingMethod.some(sm => m.toLowerCase().includes(sm.toLowerCase()))
        )
      );
    }

    // Sorting Options
    const sorted = [...result];
    if (sortOption === "popular") {
      // Keep mock database weight
      sorted.sort((a, b) => b.supplierRating - a.supplierRating);
    } else if (sortOption === "latest") {
      sorted.sort((a, b) => b.id.localeCompare(a.id));
    } else if (sortOption === "moq_low") {
      sorted.sort((a, b) => a.moq - b.moq);
    } else if (sortOption === "price_low") {
      sorted.sort((a, b) => a.priceMin - b.priceMin);
    } else if (sortOption === "price_high") {
      sorted.sort((a, b) => b.priceMax - a.priceMax);
    } else if (sortOption === "rating") {
      sorted.sort((a, b) => b.supplierRating - a.supplierRating);
    }

    return sorted;
  }, [
    searchType, searchQuery, toolbarCategory, toolbarIndustry, toolbarLocation,
    filterCategory, filterIndustry, country, state, city, supplierTypes,
    moqInput, priceMin, priceMax, tradeAssurance, readyStock, gstVerified,
    isoCertified, msmeVerified, minRating, maxDeliveryTime, shippingMethod, sortOption
  ]);

  // Paginated Products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredProducts.slice(startIndex, startIndex + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // Total pages calculation
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll smoothly to top of content toolbar
      const toolbarElement = document.getElementById("marketplace-toolbar-anchor");
      if (toolbarElement) {
        toolbarElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="bg-background py-8 px-s-md" id="marketplace-section">
      {/* Anchor point to scroll to on filter/page change */}
      <div id="marketplace-toolbar-anchor" className="relative -top-24"></div>

      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* ======================================================================= */}
        {/* 1. STICKY MARKETPLACE TOOLBAR */}
        {/* ======================================================================= */}
        <div 
          className="sticky top-[80px] z-30 bg-white/95 backdrop-blur border border-outline-variant/30 rounded-xl p-4 shadow-sm space-y-4 transition-all duration-300"
          id="marketplace-toolbar"
        >
          {/* Header & Sourcing Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/30 w-full md:w-auto overflow-x-auto hide-scrollbar">
              <button
                onClick={() => { setSearchType("product"); setCurrentPage(1); }}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all text-center whitespace-nowrap cursor-pointer ${
                  searchType === "product" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => { setSearchType("supplier"); setCurrentPage(1); }}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all text-center whitespace-nowrap cursor-pointer ${
                  searchType === "supplier" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Suppliers
              </button>
              <button
                onClick={() => { setSearchType("manufacturer"); setCurrentPage(1); }}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all text-center whitespace-nowrap cursor-pointer ${
                  searchType === "manufacturer" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Manufacturers
              </button>
              <button
                onClick={() => { setSearchType("company"); setCurrentPage(1); }}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-md font-label-sm text-[12px] font-bold transition-all text-center whitespace-nowrap cursor-pointer ${
                  searchType === "company" ? "bg-white text-trade-navy shadow-sm" : "text-secondary hover:text-trade-navy"
                }`}
              >
                Companies
              </button>
            </div>

            <div className="font-label-sm text-secondary text-[12.5px] font-medium flex items-center gap-1.5 ml-1 md:ml-0">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Sourcing Network:</span>
              <strong className="text-trade-navy font-bold">{filteredProducts.length}</strong>
              <span className="text-secondary/70">listings found</span>
            </div>
          </div>

          {/* Advanced Search Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2.5">
            {/* Search input with type description */}
            <div className="sm:col-span-2 lg:col-span-4 relative group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/60 text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder={`Search bulk ${searchType}s...`}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px] text-trade-navy"
              />
            </div>

            {/* Category Dropdown */}
            <div className="lg:col-span-2.5">
              <select
                value={toolbarCategory}
                onChange={(e) => { setToolbarCategory(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px] text-trade-navy font-semibold cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                {categoriesList.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Industry Dropdown */}
            <div className="lg:col-span-2.5">
              <select
                value={toolbarIndustry}
                onChange={(e) => { setToolbarIndustry(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px] text-trade-navy font-semibold cursor-pointer"
              >
                <option value="All Industries">All Industries</option>
                {industriesList.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={toolbarLocation}
                onChange={(e) => { setToolbarLocation(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none text-[13px] text-trade-navy font-semibold cursor-pointer"
              >
                <option value="All Locations">All Locations</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Punjab">Punjab</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="lg:col-span-1 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 border border-outline-variant hover:bg-surface-variant hover:text-trade-navy rounded-lg font-label-sm text-[12px] text-secondary font-bold transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 2. MARKETPLACE CONTENT */}
        {/* ======================================================================= */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* ========================================== */}
          {/* LEFT SIDEBAR FILTERS (300px width) */}
          {/* ========================================== */}
          <aside className="w-full lg:w-[300px] flex-shrink-0 bg-white border border-outline-variant/30 rounded-xl p-5 shadow-xs space-y-4 sticky top-[170px] max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
            
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-trade-navy text-[18px]">filter_list</span>
                <h3 className="font-headline-md text-[14.5px] text-trade-navy font-black tracking-wide uppercase">Sidebar Filters</h3>
              </div>
              <button onClick={handleResetFilters} className="text-trade-orange text-[11px] font-black tracking-wide uppercase hover:underline">
                Clear All
              </button>
            </div>

            {/* Filter Group: Categories */}
            <FilterSection title="Categories">
              {categoriesList.map(cat => (
                <label key={cat} className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={filterCategory.includes(cat)}
                    onChange={() => toggleFilterCategory(cat)}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  <span className={filterCategory.includes(cat) ? "font-bold text-trade-navy" : ""}>{cat}</span>
                </label>
              ))}
            </FilterSection>

            {/* Filter Group: Industry */}
            <FilterSection title="Industry Focus">
              {industriesList.map(ind => (
                <label key={ind} className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={filterIndustry.includes(ind)}
                    onChange={() => toggleFilterIndustry(ind)}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  <span className={filterIndustry.includes(ind) ? "font-bold text-trade-navy" : ""}>{ind}</span>
                </label>
              ))}
            </FilterSection>

            {/* Filter Group: Location */}
            <FilterSection title="Location Profile">
              <div>
                <label className="text-[10px] text-secondary uppercase font-bold tracking-wider block mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => { setCountry(e.target.value); setCurrentPage(1); }}
                  className="w-full p-2 border border-outline-variant/50 rounded-lg text-[12px] text-trade-navy font-semibold outline-none cursor-pointer bg-white"
                >
                  <option value="India">India</option>
                  <option value="All">All Countries</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-secondary uppercase font-bold tracking-wider block mb-1">State</label>
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("All Cities");
                    setCurrentPage(1);
                  }}
                  className="w-full p-2 border border-outline-variant/50 rounded-lg text-[12px] text-trade-navy font-semibold outline-none cursor-pointer bg-white"
                >
                  {statesList.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-secondary uppercase font-bold tracking-wider block mb-1">City</label>
                <select
                  value={city}
                  onChange={(e) => { setCity(e.target.value); setCurrentPage(1); }}
                  className="w-full p-2 border border-outline-variant/50 rounded-lg text-[12px] text-trade-navy font-semibold outline-none cursor-pointer bg-white"
                  disabled={state === "All States"}
                >
                  {citiesList.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </FilterSection>

            {/* Filter Group: Supplier Type */}
            <FilterSection title="Supplier Structure">
              {[
                { name: "Manufacturer", label: "Manufacturer" },
                { name: "Wholesaler", label: "Wholesaler" },
                { name: "Exporter", label: "Exporter" },
              ].map(type => (
                <label key={type.name} className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={supplierTypes.includes(type.name)}
                    onChange={() => toggleSupplierType(type.name)}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  <span className={supplierTypes.includes(type.name) ? "font-bold text-trade-navy" : ""}>{type.label}</span>
                </label>
              ))}
            </FilterSection>

            {/* Filter Group: Minimum Order Quantity (MOQ) */}
            <FilterSection title="Max MOQ Target">
              <div className="relative">
                <input
                  type="number"
                  placeholder="Ex: 500 units"
                  value={moqInput}
                  onChange={(e) => { setMoqInput(e.target.value); setCurrentPage(1); }}
                  className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-lg text-[12.5px] outline-none focus:border-trade-orange text-trade-navy font-semibold bg-white"
                />
                {moqInput && (
                  <button onClick={() => setMoqInput("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-trade-navy">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                )}
              </div>
              <p className="text-[10px] text-secondary leading-tight">
                Shows products with min order requirements less than or equal to this count.
              </p>
            </FilterSection>

            {/* Filter Group: Price Range */}
            <FilterSection title="Price Range (₹)">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => { setPriceMin(e.target.value); setCurrentPage(1); }}
                  className="w-full px-2 py-1.5 border border-outline-variant/50 rounded-lg text-[12px] text-trade-navy font-semibold outline-none focus:border-trade-orange bg-white"
                />
                <span className="text-secondary">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => { setPriceMax(e.target.value); setCurrentPage(1); }}
                  className="w-full px-2 py-1.5 border border-outline-variant/50 rounded-lg text-[12px] text-trade-navy font-semibold outline-none focus:border-trade-orange bg-white"
                />
              </div>
            </FilterSection>

            {/* Filter Group: Verification & Assurance Badges */}
            <FilterSection title="Trust & Verifications">
              <label className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={tradeAssurance}
                  onChange={(e) => { setTradeAssurance(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                />
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <span className="material-symbols-outlined text-[15px] fill-emerald-600">shield</span>
                  Trade Assurance
                </span>
              </label>

              <label className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={readyStock}
                  onChange={(e) => { setReadyStock(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                />
                <span className="flex items-center gap-1 font-semibold text-trade-navy">
                  <span className="material-symbols-outlined text-[15px]">inventory_2</span>
                  Ready Stock
                </span>
              </label>

              <label className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={gstVerified}
                  onChange={(e) => { setGstVerified(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-blue-500">task_alt</span>
                  GST Verified
                </span>
              </label>

              <label className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={isoCertified}
                  onChange={(e) => { setIsoCertified(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-purple-600">verified</span>
                  ISO Certified
                </span>
              </label>

              <label className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={msmeVerified}
                  onChange={(e) => { setMsmeVerified(e.target.checked); setCurrentPage(1); }}
                  className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                />
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-orange-600">business</span>
                  MSME Verified
                </span>
              </label>
            </FilterSection>

            {/* Filter Group: Supplier Rating */}
            <FilterSection title="Supplier Rating">
              {[4.5, 4.0, 3.5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => {
                    setMinRating(minRating === rating ? null : rating);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center gap-1.5 text-[12.5px] px-2 py-1 rounded-lg transition-colors text-left ${
                    minRating === rating
                      ? "bg-trade-orange/10 text-trade-orange font-bold border border-trade-orange/20"
                      : "text-secondary hover:bg-surface-container border border-transparent"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] text-amber-500 fill-amber-500">star</span>
                  <span>{rating} Stars & Up</span>
                </button>
              ))}
            </FilterSection>

            {/* Filter Group: Delivery Time */}
            <FilterSection title="Lead/Delivery Time">
              {[3, 5, 7, 10].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setMaxDeliveryTime(maxDeliveryTime === days ? null : days);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center gap-2 text-[12.5px] px-2 py-1 rounded-lg transition-colors text-left ${
                    maxDeliveryTime === days
                      ? "bg-trade-navy/5 text-trade-navy font-bold border border-trade-navy/15"
                      : "text-secondary hover:bg-surface-container border border-transparent"
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                  <span>Dispatch inside {days} days</span>
                </button>
              ))}
            </FilterSection>

            {/* Filter Group: Shipping / Logistic Support */}
            <FilterSection title="Shipping Options">
              {[
                { name: "road", label: "Road Freight (Trucks)" },
                { name: "railway", label: "Railway Freight" },
                { name: "port", label: "Sea/Port Freight" },
              ].map(method => (
                <label key={method.name} className="flex items-center gap-2 text-[12.5px] text-secondary hover:text-trade-navy cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={shippingMethod.includes(method.name)}
                    onChange={() => toggleShippingMethod(method.name)}
                    className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                  />
                  <span className={shippingMethod.includes(method.name) ? "font-bold text-trade-navy" : ""}>{method.label}</span>
                </label>
              ))}
            </FilterSection>

          </aside>

          {/* ========================================== */}
          {/* RIGHT PRODUCT DISPLAY SECTION */}
          {/* ========================================== */}
          <div className="flex-1 w-full space-y-4">

            {/* ==================================================== */}
            {/* TOP RESULT TOOLBAR (Sorting & Grid/List Toggle) */}
            {/* ==================================================== */}
            <div className="bg-white border border-outline-variant/30 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
              
              <div className="flex items-center gap-2.5 text-[13px] text-secondary font-medium">
                <span>Sorted by:</span>
                <div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-lg border border-outline-variant/30">
                  <select
                    value={sortOption}
                    onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
                    className="bg-transparent border-none outline-none text-trade-navy font-bold text-[12.5px] cursor-pointer"
                  >
                    <option value="popular">Popularity</option>
                    <option value="latest">Latest Addition</option>
                    <option value="moq_low">MOQ (Low to High)</option>
                    <option value="price_low">Price (Low to High)</option>
                    <option value="price_high">Price (High to Low)</option>
                    <option value="rating">Supplier Rating</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Result counts info */}
                <div className="text-[12px] text-secondary/80 font-medium">
                  Showing <strong className="text-trade-navy font-bold">{filteredProducts.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> - <strong className="text-trade-navy font-bold">{Math.min(currentPage * pageSize, filteredProducts.length)}</strong> of <strong className="text-trade-navy font-bold">{filteredProducts.length}</strong> items
                </div>

                {/* Grid / List Toggles */}
                <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                      viewMode === "grid" ? "bg-white text-trade-navy shadow-xs" : "text-secondary hover:text-trade-navy"
                    }`}
                    title="Grid View"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                      viewMode === "list" ? "bg-white text-trade-navy shadow-xs" : "text-secondary hover:text-trade-navy"
                    }`}
                    title="List View"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ==================================================== */}
            {/* PRODUCT LAYOUT CONTAINER */}
            {/* ==================================================== */}
            {paginatedProducts.length > 0 ? (
              
              // GRID MODE (Exactly 5 Cards per Row on wide viewports)
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={(p) => setActiveModal({ type: "details", product: p })}
                      onQuote={(p) => setActiveModal({ type: "quote", product: p })}
                      onBuyNow={(p) => setActiveModal({ type: "buy", product: p })}
                      onChat={(p) => setActiveModal({ type: "chat", product: p })}
                    />
                  ))}
                </div>
              ) : (
                // LIST MODE (Row listing style like professional sourcing directories)
                <div className="flex flex-col gap-4.5 w-full">
                  {paginatedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layoutId={`product-card-${product.id}`}
                      className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row group relative"
                    >
                      {/* Left: Product Image */}
                      <div 
                        onClick={() => setActiveModal({ type: "details", product })}
                        className="relative w-full md:w-[240px] aspect-video md:aspect-square bg-surface-container-low overflow-hidden cursor-pointer flex-shrink-0 border-b md:border-b-0 md:border-r border-outline-variant/10"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 240px"
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        {/* Badges Overlay on Image */}
                        <div className="absolute top-2.5 left-2.5 z-10 flex gap-1">
                          {product.tradeAssurance && (
                            <span className="bg-emerald-500 text-white text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 select-none">
                              🛡️ Assurance
                            </span>
                          )}
                          {product.readyStock && (
                            <span className="bg-trade-navy text-white text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 select-none">
                              📦 Stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Specifications and Information */}
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          {/* Supplier details line */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[11px] text-trade-navy font-extrabold uppercase tracking-widest bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/30">
                              {product.supplierName}
                            </span>
                            <span className="text-[11px] text-secondary font-medium flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px] text-amber-500 fill-amber-500">star</span>
                              {product.supplierRating} rating
                            </span>
                            <span className="text-secondary/55 text-[11px]">•</span>
                            <span className="text-[11px] text-secondary font-semibold flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[13px]">location_on</span>
                              {product.city}, {product.state}
                            </span>
                          </div>

                          {/* Product Title */}
                          <h3 
                            onClick={() => setActiveModal({ type: "details", product })}
                            className="font-headline-lg text-[16px] md:text-[18px] text-trade-navy font-black leading-tight hover:text-trade-orange transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          {/* Short description */}
                          <p className="text-[12.5px] text-secondary leading-relaxed max-w-2xl">
                            {product.description}
                          </p>

                          {/* Specifications parameters */}
                          {product.specifications && (
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5 text-[11.5px] text-secondary/90">
                              {Object.entries(product.specifications).slice(0, 3).map(([key, val]) => (
                                <div key={key} className="flex gap-1.5">
                                  <span className="font-bold text-trade-navy">{key}:</span>
                                  <span>{val}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer verification icons */}
                        <div className="flex flex-wrap gap-1.5">
                          {product.gstVerified && (
                            <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                              GST Verified
                            </span>
                          )}
                          {product.isoCertified && (
                            <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-100 uppercase tracking-wide">
                              ISO 9001
                            </span>
                          )}
                          {product.msme && (
                            <span className="text-[9px] bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded border border-orange-100 uppercase tracking-wide">
                              MSME Registered
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Sourcing Price Quote Panel */}
                      <div className="p-5 w-full md:w-[200px] border-t md:border-t-0 md:border-l border-outline-variant/20 flex flex-col justify-between bg-surface-container-lowest flex-shrink-0">
                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-0.5">Bulk Price</p>
                            <p className="font-display-lg text-[18px] text-trade-orange font-black">
                              ₹{product.priceMin.toLocaleString("en-IN")} - ₹{product.priceMax.toLocaleString("en-IN")}
                            </p>
                            <p className="text-[10px] text-secondary mt-0.5">Per unit: / {product.unit}</p>
                          </div>

                          <div className="text-[11.5px] text-secondary">
                            <span className="font-bold text-trade-navy">MOQ:</span> {product.moq} {product.unit}s
                          </div>
                        </div>

                        {/* Sourcing Buttons */}
                        <div className="space-y-1.5 pt-4">
                          <button
                            onClick={() => setActiveModal({ type: "quote", product })}
                            className="w-full py-2 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-black tracking-wide text-[11px] uppercase transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">request_quote</span>
                            Request RFQ
                          </button>
                          
                          <button
                            onClick={() => setActiveModal({ type: "chat", product })}
                            className="w-full py-2 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant rounded-lg font-black tracking-wide text-[11px] uppercase transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">chat</span>
                            Chat Sourcing
                          </button>
                          
                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              onClick={() => setActiveModal({ type: "details", product })}
                              className="py-1.5 bg-white hover:bg-surface-container text-trade-navy rounded-lg border border-outline-variant text-[10px] font-black tracking-wide uppercase transition-all flex items-center justify-center cursor-pointer"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => setActiveModal({ type: "buy", product })}
                              className="py-1.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-[10px] font-black tracking-wide uppercase transition-all flex items-center justify-center cursor-pointer"
                            >
                              Buy
                            </button>
                          </div>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              )

            ) : (
              // EMPTY STATE
              <div className="bg-white border border-outline-variant/30 rounded-xl p-12 text-center space-y-4">
                <span className="material-symbols-outlined text-4xl text-secondary/40">search_off</span>
                <h3 className="font-headline-md text-trade-navy font-bold text-[16px]">No Products Found</h3>
                <p className="text-secondary text-[13px] max-w-sm mx-auto">
                  We couldn&apos;t find any products matching your specific query or filter checkboxes. Try resetting your parameters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-trade-orange text-white rounded-lg font-label-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all text-[12px] cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* ==================================================== */}
            {/* 3. ENTERPRISE STYLE PAGINATION */}
            {/* ==================================================== */}
            {filteredProducts.length > 0 && (
              <div className="bg-white border border-outline-variant/30 rounded-xl p-3.5 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
                
                {/* Page Size Selector */}
                <div className="flex items-center gap-2 text-[12.5px] text-secondary font-medium">
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-surface-container-low px-2 py-1 rounded-lg border border-outline-variant/30 font-bold text-trade-navy text-[12.5px] outline-none cursor-pointer"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={15}>15 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={30}>30 per page</option>
                  </select>
                  <span>records</span>
                </div>

                {/* Page Number Buttons */}
                <div className="flex items-center gap-1.5">
                  {/* First Page */}
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-outline-variant/30 flex items-center justify-center text-trade-navy hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="First Page"
                  >
                    <span className="material-symbols-outlined text-[16px]">first_page</span>
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-outline-variant/30 flex items-center justify-center text-trade-navy hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Previous Page"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>

                  {/* Middle pages representation */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                    .map((page, idx, arr) => {
                      const prevPage = arr[idx - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;

                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && (
                            <span className="px-1.5 text-secondary text-[12.5px] tracking-widest">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded-lg border text-[12.5px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                              currentPage === page
                                ? "bg-trade-navy border-trade-navy text-white shadow-xs"
                                : "bg-white border-outline-variant/30 text-trade-navy hover:bg-surface-container"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}

                  {/* Next Page */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-outline-variant/30 flex items-center justify-center text-trade-navy hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Next Page"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-outline-variant/30 flex items-center justify-center text-trade-navy hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                    title="Last Page"
                  >
                    <span className="material-symbols-outlined text-[16px]">last_page</span>
                  </button>
                </div>

                {/* Jump to page */}
                <div className="hidden sm:flex items-center gap-1.5 text-[12.5px] text-secondary font-medium">
                  <span>Page</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (!isNaN(page)) {
                        handlePageChange(page);
                      }
                    }}
                    className="w-10 text-center py-0.5 rounded-lg border border-outline-variant/40 text-trade-navy font-bold focus:border-trade-orange outline-none bg-surface-container-low"
                  />
                  <span>of <strong className="text-trade-navy font-bold">{totalPages}</strong></span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ======================================================================= */}
      {/* 4. MODALS & POPUPS INTERACTIVITY */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {activeModal.type !== null && modalProduct !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal({ type: null, product: null })}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-outline-variant/40 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 z-50 flex flex-col space-y-6"
            >
              {/* Exit button */}
              <button
                onClick={() => setActiveModal({ type: null, product: null })}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              {/* MODAL VIEW: View Details */}
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
                        <span className="text-[10px] bg-surface-container px-2 py-0.5 rounded text-on-surface font-semibold uppercase">
                          ID: {modalProduct.id}
                        </span>
                        <span className="text-[10px] bg-trade-orange/15 text-trade-orange font-bold px-2 py-0.5 rounded">
                          {modalProduct.category}
                        </span>
                      </div>
                      <h2 className="font-headline-lg text-[17px] md:text-[19px] text-trade-navy font-black leading-tight">
                        {modalProduct.name}
                      </h2>
                      <p className="text-[12px] text-secondary font-medium">
                        Supplier: <span className="text-trade-navy font-bold">{modalProduct.supplierName}</span> ({modalProduct.supplierType})
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 text-[12.5px] text-secondary">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Price Range</p>
                      <p className="font-black text-[16px] text-trade-orange">
                        ₹{modalProduct.priceMin.toLocaleString("en-IN")} - ₹{modalProduct.priceMax.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Min. Order Qty (MOQ)</p>
                      <p className="font-bold text-[14.5px] text-trade-navy">
                        {modalProduct.moq} {modalProduct.unit}s
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Hub Location</p>
                      <p className="font-bold text-trade-navy flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">location_on</span>
                        {modalProduct.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-secondary/60 tracking-wider">Est. Lead Time</p>
                      <p className="font-bold text-trade-navy flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {modalProduct.deliveryTime} Days
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Product Specifications</h3>
                    <p className="text-[13px] text-secondary leading-relaxed">
                      {modalProduct.description}
                    </p>
                  </div>

                  {modalProduct.specifications && (
                    <div className="space-y-2">
                      <h4 className="font-label-sm text-[11px] text-trade-navy uppercase tracking-wider font-bold">Technical Specifications Matrix</h4>
                      <div className="border border-outline-variant/30 rounded-xl overflow-hidden text-[12px]">
                        {Object.entries(modalProduct.specifications).map(([key, val], idx) => (
                          <div key={key} className={`flex p-2.5 ${idx % 2 === 0 ? "bg-surface-container-low" : "bg-white"}`}>
                            <span className="w-1/3 text-secondary font-bold">{key}</span>
                            <span className="w-2/3 text-trade-navy font-medium">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-label-sm text-[12px] text-trade-navy uppercase tracking-wider font-bold">Certifications & Verification Standard</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.gstVerified ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        GST Verified
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.tradeAssurance ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">shield</span>
                        Trade Assurance
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.msme ? "bg-orange-50 text-orange-800 border-orange-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">business</span>
                        MSME Registered
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${modalProduct.isoCertified ? "bg-purple-50 text-purple-800 border-purple-200 font-bold" : "bg-gray-50 border-gray-100 text-secondary"}`}>
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        ISO 9001 Certified
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3 border-t border-outline-variant/20">
                    <button
                      onClick={() => setActiveModal({ type: "buy", product: modalProduct })}
                      className="flex-1 py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-[12px] transition-all cursor-pointer"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => setActiveModal({ type: "quote", product: modalProduct })}
                      className="flex-1 py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-bold text-[12px] transition-all cursor-pointer"
                    >
                      Send RFQ
                    </button>
                  </div>
                </div>
              )}

              {/* MODAL VIEW: Request Quote (RFQ) */}
              {activeModal.type === "quote" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] bg-trade-orange/15 text-trade-orange font-bold px-2 py-0.5 rounded uppercase">
                      B2B Sourcing RFQ
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-bold mt-1">
                      Quotation Proposal for {modalProduct.name}
                    </h2>
                    <p className="text-[12px] text-secondary mt-1">
                      Direct request details to supplier: <strong className="text-trade-navy">{modalProduct.supplierName}</strong>.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`RFQ proposal for ${quoteQty} ${modalProduct.unit}s submitted successfully to ${modalProduct.supplierName}. Target price set to ₹${quotePrice || modalProduct.priceMin} / unit.`);
                      setActiveModal({ type: null, product: null });
                      setQuoteQty("");
                      setQuotePrice("");
                    }}
                    className="space-y-4 text-[13px] text-secondary"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">Target Quantity</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min={modalProduct.moq}
                            placeholder={`Min: ${modalProduct.moq}`}
                            value={quoteQty}
                            onChange={(e) => setQuoteQty(e.target.value)}
                            className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold bg-white"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 uppercase font-semibold text-[10px] pointer-events-none">
                            {modalProduct.unit}s
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">Target Price (₹/unit)</label>
                        <input
                          type="number"
                          placeholder={`Range: ₹${modalProduct.priceMin}-${modalProduct.priceMax}`}
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(e.target.value)}
                          className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Quotation Details / Requirements</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Please elaborate on your bulk requirements, logistics packaging requests, or customization specifications..."
                        className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy bg-white"
                      ></textarea>
                    </div>

                    <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px] flex-shrink-0">verified_user</span>
                      <p className="text-[11.5px] leading-relaxed text-secondary">
                        <strong className="text-trade-navy font-bold">Sourcing Safety Guaranteed:</strong> Your communication and RFQ negotiations with the supplier are covered under TradeVistar secure escrow and arbitration agreements.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal({ type: "details", product: modalProduct })}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-[12px] transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-grow-[2] py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-bold text-[12px] transition-all shadow-md cursor-pointer"
                      >
                        Submit RFQ Proposal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* MODAL VIEW: Buy Now */}
              {activeModal.type === "buy" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
                      Escrow Checkout
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-bold mt-1">
                      Secure Escrow Purchase Order
                    </h2>
                    <p className="text-[12px] text-secondary mt-1">
                      Initiate direct payment contract protected by escrow.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAuthModalOpen(true);
                      setActiveModal({ type: null, product: null });
                    }}
                    className="space-y-4 text-[13px] text-secondary"
                  >
                    <div className="flex gap-3 items-center p-3 border border-outline-variant/20 rounded-xl bg-surface-container-low">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image src={modalProduct.image} alt={modalProduct.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-trade-navy">{modalProduct.name}</h4>
                        <p className="text-[11px]">Sourcing Unit Cost: ₹{modalProduct.priceMin.toLocaleString("en-IN")} / {modalProduct.unit}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Order Volume</label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min={modalProduct.moq}
                          value={buyQty}
                          placeholder={`Minimum target: ${modalProduct.moq}`}
                          onChange={(e) => setBuyQty(e.target.value)}
                          className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold bg-white"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 uppercase font-semibold text-[10px] pointer-events-none">
                          {modalProduct.unit}s
                        </span>
                      </div>
                    </div>

                    {buyQty && parseInt(buyQty) >= modalProduct.moq && (
                      <div className="p-3.5 bg-surface-container-low border border-outline-variant/30 rounded-xl space-y-2 text-[12.5px]">
                        <div className="flex justify-between">
                          <span>Sourcing Subtotal ({buyQty} units)</span>
                          <span className="font-bold text-trade-navy">₹{(parseInt(buyQty) * modalProduct.priceMin).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Integrated GST (18%)</span>
                          <span className="font-bold text-trade-navy">₹{(parseInt(buyQty) * modalProduct.priceMin * 0.18).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>freight Logistics fee</span>
                          <span className="text-emerald-600 font-bold">Estimated on Shipping</span>
                        </div>
                        <div className="h-px bg-outline-variant/30 my-1"></div>
                        <div className="flex justify-between text-[13.5px]">
                          <span className="font-black text-trade-navy">Total Sourcing Cost (Escrow Locked)</span>
                          <span className="font-black text-trade-orange">₹{(parseInt(buyQty) * modalProduct.priceMin * 1.18).toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal({ type: "details", product: modalProduct })}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-[12px] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-grow-[2] py-2.5 bg-trade-navy hover:bg-trade-navy/90 text-white rounded-lg font-bold text-[12px] transition-all shadow-md cursor-pointer"
                      >
                        Lock Escrow Contract
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* MODAL VIEW: Chat Supplier */}
              {activeModal.type === "chat" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-outline-variant/20">
                    <div className="w-9 h-9 rounded-full bg-trade-navy/10 flex items-center justify-center font-bold text-trade-navy text-[14px] flex-shrink-0">
                      💬
                    </div>
                    <div>
                      <h4 className="font-bold text-trade-navy text-[14px]">{modalProduct.supplierName}</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        Representative Online (Response time &lt;5 mins)
                      </p>
                    </div>
                  </div>

                  <div className="h-44 bg-surface-container-low rounded-xl border border-outline-variant/20 p-3.5 overflow-y-auto space-y-3 flex flex-col justify-end text-[12px]">
                    <div className="self-start bg-white border border-outline-variant/30 p-2.5 rounded-lg max-w-[85%] text-secondary leading-relaxed">
                      Hello! Sourcing representative for <strong className="text-trade-navy font-bold">{modalProduct.name}</strong> is ready. Please let us know your requirements or quantity requests.
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Message details: "${chatMessage}" delivered to ${modalProduct.supplierName}. You will receive a chat notification response in the buyer dashboard shortly.`);
                      setChatMessage("");
                      setActiveModal({ type: null, product: null });
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Type details of your sourcing query here..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-grow px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy text-[13px] bg-white"
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

      {/* CONTINUOUS AUTH SIGNIN CHECK PROMPT */}
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
              className="bg-white rounded-2xl border border-outline-variant/30 w-full max-w-sm overflow-hidden shadow-2xl relative z-50 p-6 text-center space-y-5"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 bg-trade-orange/10 rounded-full flex items-center justify-center text-trade-orange mx-auto">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <h3 className="font-headline-md text-[17px] text-trade-navy font-black tracking-wide uppercase">Authenticate Transaction</h3>
                <p className="text-secondary text-[12.5px] leading-relaxed">
                  Please sign in to register secure escrow orders and RFQ communications.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  className="w-full py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer uppercase tracking-wider font-black"
                >
                  Login Portal
                </Link>

                <Link
                  href="/register?role=buyer"
                  className="w-full py-2.5 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer uppercase tracking-wider font-black"
                >
                  Create Buyer Account
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    alert("Simulated OAuth: Redirecting to Google Login...");
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
                className="w-full py-2 bg-transparent text-secondary hover:text-trade-navy rounded-lg text-xs font-bold transition-colors cursor-pointer uppercase tracking-wider"
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
