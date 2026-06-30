"use client";

import React, { useState } from "react";

interface ProductTabsProps {
  overviewContent: React.ReactNode;
  specsContent: React.ReactNode;
  shippingContent: React.ReactNode;
  reviewsContent: React.ReactNode;
}

export default function ProductTabs({
  overviewContent,
  specsContent,
  shippingContent,
  reviewsContent,
}: ProductTabsProps) {
  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "specs", name: "Specifications" },
    { id: "shipping", name: "Shipping" },
    { id: "reviews", name: "Reviews" },
  ];

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Centered tab pill selector buttons matching mockup 2 */}
      <div className="flex justify-center items-center gap-3 scrollbar-none overflow-x-auto py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 text-xs font-black uppercase tracking-wider rounded-full transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#0A47BC] text-white shadow-xs"
                  : "text-secondary hover:text-trade-navy bg-slate-100/50 hover:bg-slate-100"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tab content wrapper card */}
      <div className="pt-3 border-t border-outline-variant/10">
        {activeTab === "overview" && <div className="animate-fade">{overviewContent}</div>}
        {activeTab === "specs" && <div className="animate-fade">{specsContent}</div>}
        {activeTab === "shipping" && <div className="animate-fade">{shippingContent}</div>}
        {activeTab === "reviews" && <div className="animate-fade">{reviewsContent}</div>}
      </div>
    </div>
  );
}
