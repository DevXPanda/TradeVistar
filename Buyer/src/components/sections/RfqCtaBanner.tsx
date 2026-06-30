"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RfqCtaBanner() {
  const [activeModal, setActiveModal] = useState<"rfq" | "sales" | null>(null);

  // Form states
  const [rfqItem, setRfqItem] = useState("");
  const [rfqQty, setRfqQty] = useState("");
  const [rfqDesc, setRfqDesc] = useState("");

  const [salesEmail, setSalesEmail] = useState("");
  const [salesPhone, setSalesPhone] = useState("");
  const [salesInquiry, setSalesInquiry] = useState("");

  return (
    <section className="bg-background py-10 px-s-md" id="rfq-cta-section">
      <div className="max-w-s-container-max mx-auto">
        
        {/* Banner Container */}
        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-trade-navy rounded-2xl p-8 md:p-12 text-white overflow-hidden shadow-lg border border-outline-variant/10 text-center flex flex-col items-center justify-center space-y-6 min-h-[260px]">
          
          {/* Dotted-grid texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Decorative shapes */}
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

      {/* RFQ Submission Modal overlay */}
      <AnimatePresence>
        {activeModal === "rfq" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-50 p-6 border border-outline-variant/30 text-secondary"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-headline-lg text-[18px] text-trade-navy font-black uppercase tracking-wide">
                    Request for Quote (RFQ)
                  </h3>
                  <p className="text-[12px] text-secondary mt-1">
                    Submit your corporate request details and receive manufacturer pricing proposals.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Corporate RFQ Submitted!\nItem: ${rfqItem}\nTarget Volume: ${rfqQty}`);
                    setActiveModal(null);
                    setRfqItem("");
                    setRfqQty("");
                    setRfqDesc("");
                  }}
                  className="space-y-4 text-xs font-semibold text-trade-navy"
                >
                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Product name / Category</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Portland Cement, Copper Wire"
                      value={rfqItem}
                      onChange={(e) => setRfqItem(e.target.value)}
                      className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Target Quantity</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 5000"
                      value={rfqQty}
                      onChange={(e) => setRfqQty(e.target.value)}
                      className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Details / Packaging Requests</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Explain specifications, testing standards, delivery destination..."
                      value={rfqDesc}
                      onChange={(e) => setRfqDesc(e.target.value)}
                      className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Post Requirement
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Talk to Sales Modal */}
        {activeModal === "sales" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative z-50 p-6 border border-outline-variant/30 text-secondary"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-headline-lg text-[18px] text-trade-navy font-black uppercase tracking-wide">
                    Speak with Procurement
                  </h3>
                  <p className="text-[12px] text-secondary mt-1">
                    Connect with our account manager to discuss contract margins and logistical solutions.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Sales inquiry registered for ${salesEmail}. Our sourcing specialist will call you shortly.`);
                    setActiveModal(null);
                    setSalesEmail("");
                    setSalesPhone("");
                    setSalesInquiry("");
                  }}
                  className="space-y-4 text-xs font-semibold text-trade-navy"
                >
                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="corporate@company.com"
                      value={salesEmail}
                      onChange={(e) => setSalesEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={salesPhone}
                      onChange={(e) => setSalesPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[10px] tracking-wider block font-bold">Procurement Inquiry</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Outline bulk supply requirements, annual contracts, or logistical margins..."
                      value={salesInquiry}
                      onChange={(e) => setSalesInquiry(e.target.value)}
                      className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="flex-1 py-2.5 border border-outline-variant hover:bg-surface-variant text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Contact Specialist
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
