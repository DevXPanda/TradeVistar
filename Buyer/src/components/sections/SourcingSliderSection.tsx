"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Carousel } from "@/components/common/Carousel";

interface SourcingSliderSectionProps {
  title: string;
  description: string;
  iconName: string;
  products: Product[];
  onViewDetails?: (product: Product) => void;
  onQuote?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
  onChat?: (product: Product) => void;
}

export default function SourcingSliderSection({
  title,
  description,
  iconName,
  products,
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: SourcingSliderSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Modals state
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

  const handleOpenModal = (type: "details" | "buy" | "quote" | "chat", product: Product) => {
    setActiveModal({ type, product });
  };

  return (
    <section className="bg-background py-8 px-s-md border-b border-outline-variant/30">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap items-center gap-4.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-trade-navy text-[24px]">{iconName}</span>
              <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
                {title}
              </h2>
            </div>
            <span className="text-[12.5px] text-secondary font-medium hidden md:inline">
              {description}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>

            <div className="h-4 w-px bg-outline-variant/30 mx-1"></div>

            <a
              href="#marketplace-section"
              className="text-trade-orange text-[12px] font-black uppercase tracking-wider hover:underline flex items-center gap-0.5"
            >
              View All
              <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
            </a>
          </div>
        </div>

        {/* Carousel Slider */}
        <Carousel ref={sliderRef}>
          {products.map((product) => (
            <div key={product.id} className="w-[240px] flex-shrink-0">
              <ProductCard
                product={product}
                onViewDetails={onViewDetails || ((p) => handleOpenModal("details", p))}
                onQuote={onQuote || ((p) => handleOpenModal("quote", p))}
                onBuyNow={onBuyNow || ((p) => handleOpenModal("buy", p))}
                onChat={onChat || ((p) => handleOpenModal("chat", p))}
              />
            </div>
          ))}
        </Carousel>

      </div>

      {/* Modals & Popups Overlays */}
      {!onViewDetails && (
        <>
          <AnimatePresence>
            {activeModal.type !== null && modalProduct !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal({ type: null, product: null })}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-outline-variant/40 rounded-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl p-6 z-50 flex flex-col space-y-6"
            >
              <button
                onClick={() => setActiveModal({ type: null, product: null })}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              {activeModal.type === "details" && (
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 border border-outline-variant/40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={modalProduct.image} alt={modalProduct.name} fill className="object-cover" />
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
        </>
      )}
    </section>
  );
}
