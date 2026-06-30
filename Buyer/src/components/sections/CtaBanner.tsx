"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CtaBanner() {
  const [activeModal, setActiveModal] = useState<"rfq" | "sales" | null>(null);

  // Form states
  const [rfqItem, setRfqItem] = useState("");
  const [rfqQty, setRfqQty] = useState("");
  const [rfqDesc, setRfqDesc] = useState("");

  const [salesEmail, setSalesEmail] = useState("");
  const [salesPhone, setSalesPhone] = useState("");
  const [salesInquiry, setSalesInquiry] = useState("");

  return (
    <section className="bg-background py-10 px-s-md" id="cta-banner-section">
      <div className="max-w-s-container-max mx-auto">
        
        {/* Banner Container */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-trade-navy rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-lg border border-outline-variant/10 text-center flex flex-col items-center justify-center space-y-6 min-h-[260px]">
          
          {/* Engineering dotted-grid vector background texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Abstract geometric vector shape decor */}
          <div className="absolute right-10 bottom-0 w-44 h-44 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
          <div className="absolute left-10 top-0 w-44 h-44 rounded-full bg-trade-orange/5 blur-3xl pointer-events-none"></div>

          {/* Heading Content */}
          <div className="space-y-2 relative z-10 max-w-xl">
            <h2 className="font-headline-lg text-[22px] md:text-[28px] font-black uppercase tracking-wide leading-tight">
              Can&apos;t Find the Right Product?
            </h2>
            <p className="text-[13px] md:text-[14px] text-white/70 leading-relaxed font-semibold">
              Post your requirement and receive quotations from verified suppliers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full justify-center max-w-sm">
            <button
              onClick={() => setActiveModal("rfq")}
              className="px-6 py-3 bg-trade-orange hover:bg-trade-orange/95 text-white font-black text-xs uppercase tracking-wider rounded-lg active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Post RFQ
            </button>
            <button
              onClick={() => setActiveModal("sales")}
              className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-trade-navy font-black text-xs uppercase tracking-wider rounded-lg active:scale-95 transition-all border border-white/20 hover:border-white shadow-sm cursor-pointer"
            >
              Talk to Sales
            </button>
          </div>

        </div>

      </div>

      {/* ======================================================================= */}
      {/* INTERACTIVE POPUP DIALOGS */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white border border-outline-variant/40 rounded-2xl w-full max-w-md p-6 z-50 flex flex-col space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-secondary hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              {/* RFQ Submission Popup */}
              {activeModal === "rfq" && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-outline-variant/20">
                    <span className="text-[9px] bg-trade-orange/15 text-trade-orange font-bold px-2 py-0.5 rounded uppercase">
                      Open RFQ Dispatch
                    </span>
                    <h3 className="font-headline-lg text-[16px] text-trade-navy font-bold mt-1">
                      Submit Custom Sourcing Requirement
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Successfully submitted custom RFQ for ${rfqQty} units of "${rfqItem}". Verified manufacturers will bid shortly.`);
                      setRfqItem("");
                      setRfqQty("");
                      setRfqDesc("");
                      setActiveModal(null);
                    }}
                    className="space-y-4 text-[12.5px] text-secondary"
                  >
                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Product / Material Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Grade 316 Stainless Steel Tubes"
                        value={rfqItem}
                        onChange={(e) => setRfqItem(e.target.value)}
                        className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-semibold bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Required Quantity</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: 5000 units / 10 Metric Tons"
                        value={rfqQty}
                        onChange={(e) => setRfqQty(e.target.value)}
                        className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-semibold bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Inquiry Specification Details</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detailed dimensions, packaging request parameters, logistics dispatch terms, or required testing certificates..."
                        value={rfqDesc}
                        onChange={(e) => setRfqDesc(e.target.value)}
                        className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy bg-white"
                      ></textarea>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-grow-[2] py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-bold transition-all shadow-md cursor-pointer"
                      >
                        Publish Custom RFQ
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Talk to Sales Popup */}
              {activeModal === "sales" && (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-outline-variant/20">
                    <span className="text-[9px] bg-trade-navy/15 text-trade-navy font-bold px-2 py-0.5 rounded uppercase">
                      Enterprise Support
                    </span>
                    <h3 className="font-headline-lg text-[16px] text-trade-navy font-bold mt-1">
                      Request B2B Corporate Consultation
                    </h3>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert(`Consultation requested. A dedicated TradeVistar account representative will call you back at ${salesPhone} shortly.`);
                      setSalesEmail("");
                      setSalesPhone("");
                      setSalesInquiry("");
                      setActiveModal(null);
                    }}
                    className="space-y-4 text-[12.5px] text-secondary"
                  >
                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Corporate Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="Ex: procurement@company.com"
                        value={salesEmail}
                        onChange={(e) => setSalesEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-semibold bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Inquiry Mobile / Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: +91 98765 43210"
                        value={salesPhone}
                        onChange={(e) => setSalesPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-semibold bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Inquiry Category Focus</label>
                      <select
                        value={salesInquiry}
                        onChange={(e) => setSalesInquiry(e.target.value)}
                        className="w-full p-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange text-trade-navy font-semibold bg-white cursor-pointer"
                      >
                        <option value="raw_materials">Raw Industrial Materials</option>
                        <option value="equipment">Heavy Machinery & Electrical</option>
                        <option value="logistics">Integrated Freight Logistics Support</option>
                        <option value="finance">Buyer Escrow & Credit Options</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-grow-[2] py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold transition-all shadow-md cursor-pointer"
                      >
                        Request Call Back
                      </button>
                    </div>
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
