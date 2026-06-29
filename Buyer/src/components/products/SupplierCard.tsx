"use client";

import React from "react";
import Image from "next/image";

interface SupplierCardProps {
  supplierName: string;
  location: string;
  gstVerified: boolean;
  msme: boolean;
  isoCertified: boolean;
  supplierRating: number;
}

export default function SupplierCard({
  supplierName,
  location,
  gstVerified,
  msme,
  isoCertified,
  supplierRating,
}: SupplierCardProps) {
  // Mock factory images
  const factoryImages = [
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=250&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=250&auto=format&fit=crop",
  ];

  return (
    <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Profile Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-1.5">
          <h3 className="font-display-md text-base text-trade-navy font-bold leading-tight">
            {supplierName}
          </h3>
          <div className="flex items-center gap-1 text-[11px] text-secondary font-medium">
            <span className="material-symbols-outlined text-[13px]">location_on</span>
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded w-fit text-[10px] mt-2">
            <span className="material-symbols-outlined text-[11px] text-amber-500 fill-amber-500">star</span>
            <span>{supplierRating} Supplier Score</span>
          </div>
        </div>

        <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center text-trade-navy shrink-0 border border-outline-variant/20 shadow-sm font-black text-sm">
          {supplierName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
      </div>

      {/* Trust Badging credentials */}
      <div className="space-y-2 pt-2 border-t border-outline-variant/10">
        <h4 className="text-[10px] text-secondary uppercase font-bold tracking-wider">
          Compliance Credentials
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {gstVerified && (
            <span className="text-[9px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-100 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[11px]">verified</span>
              GST Verified
            </span>
          )}
          {msme && (
            <span className="text-[9px] bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-100 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[11px]">domain</span>
              MSME Registered
            </span>
          )}
          {isoCertified && (
            <span className="text-[9px] bg-slate-50 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-100 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[11px]">verified_user</span>
              ISO 9001:2015
            </span>
          )}
        </div>
      </div>

      {/* Industrial Factory Gallery */}
      <div className="space-y-2 border-t border-outline-variant/10 pt-4">
        <h4 className="text-[10px] text-secondary uppercase font-bold tracking-wider">
          Factory Facility Layout
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {factoryImages.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-lg border border-outline-variant/20 overflow-hidden bg-slate-100 shadow-sm">
              <Image src={img} alt={`Factory ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Guarantee assurances */}
      <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl p-3.5 flex gap-2.5 items-start">
        <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">verified_user</span>
        <div className="text-[10.5px]">
          <h5 className="font-bold text-emerald-800 leading-none">Trade Assurance Guaranteed</h5>
          <p className="text-emerald-700 mt-1 leading-relaxed">
            Funds are securely held in a certified escrow account and only released to the vendor upon certified confirmation of delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
