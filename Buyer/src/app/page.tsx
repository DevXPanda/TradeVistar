"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// Core Layout & Section Components
import TopNavBar from "@/components/sections/TopNavBar";
import Hero from "@/components/sections/Hero";

import FeaturedProducts from "@/components/sections/FeaturedProducts";
import FlashDeals from "@/components/sections/FlashDeals";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import FeaturedDeals from "@/components/sections/FeaturedDeals";
import PromoBanner from "@/components/sections/PromoBanner";
import TrustedBrands from "@/components/sections/TrustedBrands";
import TopVerifiedSuppliers from "@/components/sections/TopVerifiedSuppliers";
import LatestProducts from "@/components/sections/LatestProducts";
import NewArrivals from "@/components/sections/NewArrivals";
import BestSellingTopRated from "@/components/sections/BestSellingTopRated";
import DoublePromoBanners from "@/components/sections/DoublePromoBanners";
import CategoryCollections from "@/components/sections/CategoryCollections";
import RecentlyViewedSection from "@/components/sections/RecentlyViewedSection";
import FooterUtilityCards from "@/components/sections/FooterUtilityCards";
import Footer from "@/components/sections/Footer";

// Data
import { Product, MOCK_PRODUCTS } from "@/data/products";
import { MEDICAL_PRODUCTS, AUTOMOTIVE_PRODUCTS } from "@/components/sections/IndustryCollections";

export default function Home() {
  // Simulated logged-in state default to Rajesh K., Buildcon Projects (as shown in requirements/B2B context)
  const isLoggedIn = true;

  // Category filter state
  const [category, setCategory] = useState("All Categories");

  // Recently Viewed state
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

  // Action Modals State Coordinator
  const [activeModal, setActiveModal] = useState<{
    type: "details" | "buy" | "quote" | "chat" | null;
    product: Product | null;
  }>({ type: null, product: null });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [quoteQty, setQuoteQty] = useState("");
  const [quotePrice, setQuotePrice] = useState("");
  const [buyQty, setBuyQty] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const modalProduct = activeModal.product;



  // Combine mock products with custom collections
  const allProducts = useMemo(() => {
    return [...MOCK_PRODUCTS, ...MEDICAL_PRODUCTS, ...AUTOMOTIVE_PRODUCTS];
  }, []);

  // Filtered Products for Featured Products block
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (category !== "All Categories") {
        if (product.category !== category) return false;
      }
      return true;
    });
  }, [allProducts, category]);




  const recentlyViewedProducts = useMemo(() => {
    return recentlyViewedIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined);
  }, [recentlyViewedIds, allProducts]);

  // Modal Handlers
  const handleViewDetails = (product: Product) => {
    setActiveModal({ type: "details", product });
    
    // Add to recently viewed list dynamically
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 8); // Keep up to 8 recently viewed
    });
  };

  const handleQuoteRequest = (product: Product) => {
    setActiveModal({ type: "quote", product });
  };

  const handleBuyNow = (product: Product) => {
    setActiveModal({ type: "buy", product });
  };

  const handleChatSupplier = (product: Product) => {
    setActiveModal({ type: "chat", product });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface overflow-x-hidden">
      <TopNavBar />
      
      <main className="flex-grow">
        {/* Unchanged Hero Section */}
        <Hero />

        {/* 3. Flash Deals (Horizontal slider) */}
        <FlashDeals
          onViewDetails={handleViewDetails}
          onQuote={handleQuoteRequest}
          onBuyNow={handleBuyNow}
          onChat={handleChatSupplier}
        />

        {/* 2. Featured Products */}
        <FeaturedProducts
          products={filteredProducts}
          onViewDetails={handleViewDetails}
          onQuote={handleQuoteRequest}
          onBuyNow={handleBuyNow}
          onChat={handleChatSupplier}
        />

        {/* 4. Featured Categories (Large category cards) */}
        <FeaturedCategories
          onSelectCategory={setCategory}
          activeCategory={category}
        />

        {/* 5. Featured Deals */}
        <FeaturedDeals
          onViewDetails={handleViewDetails}
        />

        {/* 6. Promo Banner */}
        <PromoBanner />

        {/* 7. Top Verified Suppliers (Top Sellers) */}
        <TopVerifiedSuppliers />

        {/* 7.1. Latest Products */}
        <LatestProducts
          onViewDetails={handleViewDetails}
          onQuote={handleQuoteRequest}
          onBuyNow={handleBuyNow}
          onChat={handleChatSupplier}
        />

        {/* 7.2. New Arrivals */}
        <NewArrivals
          onViewDetails={handleViewDetails}
        />

        {/* 7.3. Best Selling & Top Rated */}
        <BestSellingTopRated
          onViewDetails={handleViewDetails}
        />

        {/* 7.4. Double Promo Banners */}
        <DoublePromoBanners />

        {/* 8. Brands (Endless Auto-Scrolling Circular Ticker) */}
        <TrustedBrands />

        {/* 9. Consumer Category Collections (7 categories with horizontal sliders) */}
        <CategoryCollections
          onViewDetails={handleViewDetails}
          onQuote={handleQuoteRequest}
          onBuyNow={handleBuyNow}
          onChat={handleChatSupplier}
        />







        {/* 12. Recently Viewed (if logged in) */}
        <RecentlyViewedSection
          products={recentlyViewedProducts}
          isLoggedIn={isLoggedIn}
          onViewDetails={handleViewDetails}
          onQuote={handleQuoteRequest}
          onBuyNow={handleBuyNow}
          onChat={handleChatSupplier}
        />



        {/* 17. Footer Utility Cards (About Us, Contact Us, FAQ, Blog) */}
        <FooterUtilityCards />
      </main>

      {/* Unchanged Footer Section */}
      <Footer />

      {/* ======================================================================= */}
      {/* SHARED ROOT ACTION MODALS (Integrated from Marketplace.tsx UX) */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {activeModal.type !== null && modalProduct !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal({ type: null, product: null })}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-outline-variant/30 w-full max-w-lg overflow-hidden shadow-2xl relative z-50 p-6 text-secondary"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModal({ type: null, product: null })}
                className="absolute right-4 top-4 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-trade-navy active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>

              {/* MODAL VIEW: Product Details */}
              {activeModal.type === "details" && (
                <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20">
                    <Image src={modalProduct.image} alt={modalProduct.name} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] bg-trade-orange/15 text-trade-orange font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      {modalProduct.category}
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-black tracking-wide leading-snug mt-1">
                      {modalProduct.name}
                    </h2>
                    <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">
                      Supplied by: <strong className="text-trade-navy font-black">{modalProduct.supplierName}</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-xs font-semibold">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-secondary/60 tracking-wider">Est. Unit Price</p>
                      <p className="font-black text-[13px] text-trade-orange mt-0.5">
                        ₹{modalProduct.priceMin.toLocaleString("en-IN")} - ₹{modalProduct.priceMax.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-secondary/60 tracking-wider">Min Order (MOQ)</p>
                      <p className="font-black text-[13px] text-trade-navy mt-0.5">
                        {modalProduct.moq} {modalProduct.unit}s
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-secondary/60 tracking-wider">Hub Location</p>
                      <p className="font-black text-[12px] text-trade-navy mt-0.5 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        {modalProduct.city}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-secondary/60 tracking-wider">Lead Time</p>
                      <p className="font-black text-[12px] text-trade-navy mt-0.5 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {modalProduct.deliveryTime} Days
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-label-sm text-[11px] text-trade-navy uppercase tracking-wider font-black">Product Overview</h4>
                    <p className="text-[12.5px] text-secondary leading-relaxed font-semibold">
                      {modalProduct.description}
                    </p>
                  </div>

                  {modalProduct.specifications && (
                    <div className="space-y-2">
                      <h4 className="font-label-sm text-[11px] text-trade-navy uppercase tracking-wider font-black">Technical Specifications Matrix</h4>
                      <div className="border border-outline-variant/20 rounded-xl overflow-hidden text-[11.5px] font-semibold">
                        {Object.entries(modalProduct.specifications).map(([key, val], idx) => (
                          <div key={key} className={`flex p-2.5 ${idx % 2 === 0 ? "bg-surface-container-low" : "bg-white"}`}>
                            <span className="w-1/3 text-secondary font-black">{key}</span>
                            <span className="w-2/3 text-trade-navy font-bold">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-3 border-t border-outline-variant/20">
                    <button
                      onClick={() => handleBuyNow(modalProduct)}
                      className="flex-1 py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleQuoteRequest(modalProduct)}
                      className="flex-1 py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
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
                    <span className="text-[10px] bg-trade-orange/15 text-trade-orange font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                      B2B Sourcing RFQ
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-black mt-1 uppercase tracking-wide">
                      Quotation Proposal
                    </h2>
                    <p className="text-[12.5px] text-secondary mt-1">
                      Direct request details to supplier: <strong className="text-trade-navy">{modalProduct.supplierName}</strong> for <strong className="text-trade-navy">{modalProduct.name}</strong>.
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
                    className="space-y-4 text-xs font-semibold text-trade-navy"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Target Quantity</label>
                        <div className="relative">
                          <input
                            type="number"
                            required
                            min={modalProduct.moq}
                            placeholder={`Min: ${modalProduct.moq}`}
                            value={quoteQty}
                            onChange={(e) => setQuoteQty(e.target.value)}
                            className="w-full px-3 py-2.5 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-bold"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 uppercase font-semibold text-[10px] pointer-events-none">
                            {modalProduct.unit}s
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Target Price (₹/unit)</label>
                        <input
                          type="number"
                          placeholder={`Range: ₹${modalProduct.priceMin}-${modalProduct.priceMax}`}
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(e.target.value)}
                          className="w-full px-3 py-2.5 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Quotation Specifications</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Elaborate on custom packaging, bulk testing requirements, or logistics clearances..."
                        className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy bg-white"
                      ></textarea>
                    </div>

                    <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px] flex-shrink-0">verified_user</span>
                      <p className="text-[11px] leading-relaxed text-secondary font-semibold">
                        <strong className="text-trade-navy font-black">Sourcing Safety Guaranteed:</strong> Sourcing communication and negotiations on TradeVistar are backed under secure escrow and dispute arbitration.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal({ type: "details", product: modalProduct })}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Submit RFQ
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* MODAL VIEW: Buy Now */}
              {activeModal.type === "buy" && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                      Escrow Checkout
                    </span>
                    <h2 className="font-headline-lg text-[18px] text-trade-navy font-black mt-1 uppercase tracking-wide">
                      Secure Escrow Order
                    </h2>
                    <p className="text-[12.5px] text-secondary mt-1">
                      Initiate a secure payment contract protected by TradeVistar.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAuthModalOpen(true);
                      setActiveModal({ type: null, product: null });
                    }}
                    className="space-y-4 text-xs font-semibold text-trade-navy"
                  >
                    <div className="flex gap-3 items-center p-3 border border-outline-variant/20 rounded-xl bg-surface-container-low">
                      <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image src={modalProduct.image} alt={modalProduct.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-black text-trade-navy">{modalProduct.name}</h4>
                        <p className="text-[10px] text-secondary">Unit Cost: ₹{modalProduct.priceMin.toLocaleString("en-IN")} / {modalProduct.unit}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Order Volume</label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          min={modalProduct.moq}
                          value={buyQty}
                          placeholder={`Min requirement: ${modalProduct.moq}`}
                          onChange={(e) => setBuyQty(e.target.value)}
                          className="w-full px-3 py-2.5 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold bg-white"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 uppercase font-semibold text-[10px] pointer-events-none">
                          {modalProduct.unit}s
                        </span>
                      </div>
                    </div>

                    {buyQty && parseInt(buyQty) >= modalProduct.moq && (
                      <div className="p-3.5 bg-surface-container-low border border-outline-variant/30 rounded-xl space-y-2 text-[12.5px] font-semibold text-secondary">
                        <div className="flex justify-between">
                          <span>Sourcing Subtotal ({buyQty} units)</span>
                          <span className="font-bold text-trade-navy">₹{(parseInt(buyQty) * modalProduct.priceMin).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Integrated GST (18%)</span>
                          <span className="font-bold text-trade-navy">₹{(parseInt(buyQty) * modalProduct.priceMin * 0.18).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Freight Logistics Fee</span>
                          <span className="text-emerald-600 font-bold">Calculated on dispatch</span>
                        </div>
                        <div className="h-px bg-outline-variant/30 my-1"></div>
                        <div className="flex justify-between text-[13px]">
                          <span className="font-black text-trade-navy">Total Sourcing Cost (Escrow Locked)</span>
                          <span className="font-black text-trade-orange">₹{(parseInt(buyQty) * modalProduct.priceMin * 1.18).toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModal({ type: "details", product: modalProduct })}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] py-2.5 bg-trade-navy hover:bg-trade-navy/90 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
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
                    <div className="w-9 h-9 rounded-full bg-trade-navy/10 flex items-center justify-center font-bold text-[14px] flex-shrink-0">
                      💬
                    </div>
                    <div>
                      <h4 className="font-black text-trade-navy text-[14px]">{modalProduct.supplierName}</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        Representative Online (Response &lt;5 mins)
                      </p>
                    </div>
                  </div>

                  <div className="h-44 bg-surface-container-low rounded-xl border border-outline-variant/20 p-3.5 overflow-y-auto space-y-3 flex flex-col justify-end text-[12px] font-semibold text-secondary">
                    <div className="self-start bg-white border border-outline-variant/30 p-2.5 rounded-lg max-w-[85%] leading-relaxed">
                      Hello! Sourcing representative for <strong className="text-trade-navy font-bold">{modalProduct.name}</strong> is online. Please state your target volume or customization query.
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Message details: "${chatMessage}" delivered to ${modalProduct.supplierName}. You will receive a chat notification response shortly.`);
                      setChatMessage("");
                      setActiveModal({ type: null, product: null });
                    }}
                    className="flex gap-2 text-xs"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Type details of your sourcing query here..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-grow px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-bold bg-white text-xs"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">send</span>
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
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-outline-variant/30 w-full max-w-sm overflow-hidden shadow-2xl relative z-[70] p-6 text-center space-y-5"
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
                  className="w-full py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-xs font-black transition-all active:scale-95 flex items-center justify-center cursor-pointer uppercase tracking-wider"
                >
                  Login Portal
                </Link>

                <Link
                  href="/register?role=buyer"
                  className="w-full py-2.5 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant rounded-lg text-xs font-black transition-all active:scale-95 flex items-center justify-center cursor-pointer uppercase tracking-wider"
                >
                  Create Buyer Account
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="w-full py-2 bg-transparent text-secondary hover:text-trade-navy rounded-lg text-xs font-black transition-colors cursor-pointer uppercase tracking-wider"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
