"use client";

import React, { useState } from "react";

export default function SupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    alert("Support ticket submitted! Ticket reference: TKT-2024-" + Math.floor(1000 + Math.random() * 9000));
    setSubject("");
    setMessage("");
  };

  const faqs = [
    { q: "How long does verification take?", a: "Business GSTIN verification runs instantly. PAN-linked manual audits are completed within 2 business days of file submissions." },
    { q: "What is secure credit escrow limit?", a: "Escrow enables verified enterprise buyers to purchase products on credit settlements backed by financial deposits validated on TradeVistar." },
    { q: "How do I raise disputes for custom shipments?", a: "Go to the Orders ledger tab, select the specific order tracking row, and click 'File Logistics Dispute' to log shipment shortfalls." },
  ];

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Help & Support</h1>
        <p className="font-body-md text-secondary mt-1">Submit technical queries, check trade guidelines, and consult logistics documentation.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-s-lg">
        {/* Support Request Form */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold mb-s-md">Open Support Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Issue with credit escrow verification status"
                className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface">Detailed Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Detail your request..."
                className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-trade-navy hover:bg-trade-orange hover:shadow-md hover:shadow-trade-orange/10 text-white font-bold rounded-lg transition-all active:scale-95 text-label-sm text-[12px] cursor-pointer"
            >
              Submit Ticket Request
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm h-fit space-y-4">
          <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold">Common FAQs</h3>
          
          <div className="space-y-4 divide-y divide-outline-variant/20">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`${idx > 0 ? "pt-3" : ""}`}>
                <p className="font-body-md text-trade-navy font-semibold leading-snug">{faq.q}</p>
                <p className="text-[12px] text-secondary mt-1 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
