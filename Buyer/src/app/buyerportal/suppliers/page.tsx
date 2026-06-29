"use client";

import React, { useState } from "react";

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const suppliers = [
    { name: "Aero-Core Parts Ltd", location: "Pune, Maharashtra", rating: 4.8, category: "Mechanical Components", verified: true, count: "12 Transactions" },
    { name: "Shree Metal Forgings", location: "Ahmedabad, Gujarat", rating: 4.6, category: "Metal Fabrication", verified: true, count: "5 Transactions" },
    { name: "Vikas Polymer Tubing", location: "Chennai, Tamil Nadu", rating: 4.5, category: "Polymer Tubing", verified: true, count: "2 Transactions" },
    { name: "Apex Tooling Industries", location: "Ludhiana, Punjab", rating: 4.2, category: "Precision Tools", verified: false, count: "0 Transactions" },
    { name: "Tata Steel Corp", location: "Jamshedpur, Jharkhand", rating: 4.9, category: "Raw Metal Materials", verified: true, count: "34 Transactions" },
  ];

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-s-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Vetted Trade Suppliers</h1>
          <p className="font-body-md text-secondary mt-1">Browse and connect with GST-verified enterprise manufacturing units.</p>
        </div>
        <div className="relative max-w-xs w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search suppliers..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md shadow-sm"
          />
        </div>
      </div>

      {/* Grid List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-s-md">
        {filteredSuppliers.map((sup, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm hover:border-trade-orange hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 flex items-center justify-center font-bold text-trade-navy">
                  {sup.name.charAt(0)}
                </div>
                {sup.verified ? (
                  <span className="flex items-center gap-0.5 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded-full uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[12px]">verified</span> Vetted
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold rounded-full uppercase tracking-wider">
                    Pending
                  </span>
                )}
              </div>
              <div className="mt-4">
                <h4 className="font-headline-md text-base text-trade-navy font-bold">{sup.name}</h4>
                <p className="text-secondary text-[12px] font-medium mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">map</span>
                  {sup.location}
                </p>
                <p className="text-[12px] font-label-caps text-secondary uppercase mt-2">{sup.category}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20 mt-2">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-amber-500 fill-amber-500">star</span>
                <span className="text-[12px] font-bold text-trade-navy">{sup.rating}</span>
                <span className="text-[11px] text-secondary">({sup.count})</span>
              </div>
              <button className="px-3 py-1.5 bg-trade-navy hover:bg-trade-orange hover:shadow-md hover:shadow-trade-orange/10 text-white text-[11px] font-bold rounded transition-all active:scale-95 cursor-pointer">
                Request RFQ Quote
              </button>
            </div>
          </div>
        ))}
        {filteredSuppliers.length === 0 && (
          <div className="col-span-full bg-white/80 p-s-xl border border-outline-variant/30 rounded-lg text-center shadow-sm">
            <span className="material-symbols-outlined text-4xl text-secondary/40">group_off</span>
            <p className="font-headline-md text-secondary mt-2">No verified suppliers matching search terms found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
