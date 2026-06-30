"use client";

import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/product";

interface ProductSellerCardProps {
  product: ProductType;
  onContactSupplier: () => void;
  onChat: () => void;
  onViewProduct: (prod: ProductType) => void;
  otherStoreProducts: ProductType[];
}

export default function ProductSellerCard({
  product,
  onContactSupplier,
  onChat,
  onViewProduct,
  otherStoreProducts,
}: ProductSellerCardProps) {
  
  // Policies mock dataset matching mockup 2
  const policies = [
    { text: "Fast Delivery all across the country", icon: "local_shipping" },
    { text: "Safe Payment Protection", icon: "shield_lock" },
    { text: "7 Days Easy Return Policy", icon: "assignment_return" },
    { text: "100% Authentic Products", icon: "verified" },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Verification List Card (Top Card) matching mockup 2 */}
      <div className="bg-white border border-outline-variant/15 rounded-2xl p-4 divide-y divide-outline-variant/10 text-xs font-semibold text-trade-navy">
        <div className="pb-3 flex items-center justify-between">
          <span className="text-secondary font-bold">GST Verified</span>
          <span className="material-symbols-outlined text-emerald-600 text-[18px] font-black">
            check_circle
          </span>
        </div>
        <div className="py-3 flex items-center justify-between">
          <span className="text-secondary font-bold">Tradevistar Verified</span>
          <span className="material-symbols-outlined text-primary-blue text-[18px] font-black">
            verified
          </span>
        </div>
        <div className="py-3 flex items-center justify-between">
          <span className="text-secondary font-bold">Respond rate (%)</span>
          <span className="text-emerald-600 font-black text-[13px]">98%</span>
        </div>
        <div className="pt-3 flex items-center justify-between">
          <span className="text-secondary font-bold">Tradevistar Verified</span>
          <span className="material-symbols-outlined text-primary-blue text-[18px] font-black">
            verified
          </span>
        </div>
      </div>

      {/* 2. Seller Card (Bottom Card) matching mockup 2 */}
      <div className="bg-white border border-outline-variant/15 rounded-2xl p-4 shadow-xs space-y-4">
        
        {/* Brand row layout */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue flex-shrink-0">
            <span className="material-symbols-outlined text-[20px] font-black">
              store
            </span>
          </div>
          <div>
            <h4 className="text-[13.5px] font-black text-trade-navy leading-tight">
              {product.supplierName}
            </h4>
            <p className="text-[10px] text-secondary font-semibold mt-0.5">Verified Vendor</p>
          </div>
        </div>

        {/* Seller reviews & products statistics counts */}
        <div className="grid grid-cols-2 gap-2 text-center py-2.5 border-y border-outline-variant/10 text-xs font-semibold text-primary-blue">
          <div className="flex flex-col items-center justify-center cursor-pointer hover:underline">
            <p className="font-black text-[13px] leading-none">
              {product.reviews.length || 2} Reviews
            </p>
          </div>
          <div className="border-l border-outline-variant/10 flex flex-col items-center justify-center cursor-pointer hover:underline">
            <p className="font-black text-[13px] leading-none">
              19 Products
            </p>
          </div>
        </div>

        {/* About Vendor Action Button */}
        <button
          onClick={onContactSupplier}
          className="w-full py-2.5 bg-primary-blue hover:bg-secondary-blue text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
        >
          About Vendor
        </button>

      </div>

      {/* 3. More From The Store (Bottom Listing) */}
      {otherStoreProducts.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h4 className="text-[13px] text-trade-navy font-black tracking-tight">
              More From The Store
            </h4>
            <button className="text-primary-blue hover:text-secondary-blue text-[10px] font-black uppercase tracking-wider flex items-center transition-colors">
              View All
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {otherStoreProducts.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                onClick={() => onViewProduct(prod)}
                className="bg-white border border-outline-variant/10 rounded-xl p-2.5 flex gap-3 cursor-pointer hover:border-trade-orange/50 hover:shadow-xs transition-all duration-300 group"
              >
                <div className="relative w-12 h-12 bg-white border border-outline-variant/10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="48px"
                    className="object-contain p-0.5 group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between py-0.2">
                  <h5 className="text-[11px] font-bold text-trade-navy leading-snug line-clamp-1 group-hover:text-trade-orange transition-colors">
                    {prod.name}
                  </h5>
                  <p className="text-[12px] text-trade-orange font-black">
                    ₹{prod.priceMin.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
