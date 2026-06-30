"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { getProductSlug } from "@/lib/product/productHelpers";

interface CompareTableProps {
  compareItems: Product[];
  onRemoveCompare: (productId: string) => void;
  onAddToCart: (productName: string) => void;
}

export default function CompareTable({
  compareItems,
  onRemoveCompare,
  onAddToCart,
}: CompareTableProps) {
  if (compareItems.length === 0) {
    return (
      <div className="bg-white border border-outline-variant/20 rounded-xl p-12 text-center text-secondary font-medium">
        <span className="material-symbols-outlined text-[36px] text-secondary/40 block mb-2">compare_arrows</span>
        No items selected for comparison.
      </div>
    );
  }

  return (
    <div className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs text-on-surface min-w-[700px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/30">
              <th className="p-4 font-bold text-trade-navy uppercase tracking-wider text-[10px] w-48 sticky left-0 bg-surface-container-low z-10">Comparison Specifications</th>
              {compareItems.map((product) => (
                <th key={product.id} className="p-4 border-l border-outline-variant/20 relative min-w-[180px] w-64">
                  <button
                    onClick={() => onRemoveCompare(product.id)}
                    className="absolute top-2 right-2 p-1 bg-surface-container hover:bg-red-50 hover:text-red-500 rounded-full text-secondary transition-colors cursor-pointer"
                    title="Remove from comparison"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                  <div className="space-y-2 mt-4">
                    <div className="relative w-16 h-16 mx-auto rounded border border-outline-variant/20 overflow-hidden bg-white">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] bg-trade-navy/5 text-trade-navy px-1.5 py-0.2 rounded font-bold uppercase tracking-wider block w-fit mx-auto">
                        {product.category}
                      </span>
                      <Link 
                        href={`/products/${getProductSlug(product.name)}`}
                        className="font-bold text-trade-navy hover:text-trade-orange hover:underline text-[12px] block mt-1 line-clamp-2 leading-tight"
                      >
                        {product.name}
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {/* Price Range */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Price Range</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-bold text-trade-orange text-[13px]">
                  ₹{product.priceMin.toLocaleString("en-IN")} - ₹{product.priceMax.toLocaleString("en-IN")}
                  <span className="text-[10px] text-secondary font-medium block mt-0.5">/ {product.unit}</span>
                </td>
              ))}
            </tr>

            {/* Minimum Order Qty (MOQ) */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">MOQ Requirement</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-semibold text-secondary">
                  {product.moq} {product.unit}s
                </td>
              ))}
            </tr>

            {/* Lead Time */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Delivery Lead Time</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-semibold text-trade-navy">
                  {product.deliveryTime} Days
                </td>
              ))}
            </tr>

            {/* Supplier Rating */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Supplier Rating</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20">
                  <div className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded w-fit text-[11px]">
                    <span className="material-symbols-outlined text-[12px] text-amber-500 fill-amber-500">star</span>
                    {product.supplierRating}
                  </div>
                </td>
              ))}
            </tr>

            {/* Trade Assurance */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Trade Assurance</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-bold">
                  {product.tradeAssurance ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">shield</span>
                      Covered
                    </span>
                  ) : (
                    <span className="text-secondary">N/A</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Certificates */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Certificates</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20">
                  <div className="flex flex-wrap gap-1">
                    {product.gstVerified && (
                      <span className="text-[8px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded border border-blue-100">
                        GST Verified
                      </span>
                    )}
                    {product.msme && (
                      <span className="text-[8px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.5 rounded border border-purple-100">
                        MSME Reg.
                      </span>
                    )}
                    {product.isoCertified && (
                      <span className="text-[8px] bg-slate-50 text-slate-700 font-bold px-1.5 py-0.5 rounded border border-slate-100">
                        ISO Certified
                      </span>
                    )}
                  </div>
                </td>
              ))}
            </tr>

            {/* Warranty */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Warranty Info</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-semibold text-secondary">
                  {product.id === "PROD-1001" ? "No Warranty" : product.id === "PROD-1003" ? "2 Years Industrial Guarantee" : "1 Year Manufacturer Warranty"}
                </td>
              ))}
            </tr>

            {/* Grade Specifications */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Grade / Standard</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-medium text-secondary">
                  {product.specifications["Grade"] || product.specifications["Standards"] || "N/A"}
                </td>
              ))}
            </tr>

            {/* Material Specifications */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Material</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-medium text-secondary">
                  {product.specifications["Material"] || "N/A"}
                </td>
              ))}
            </tr>

            {/* Dimensions Specifications */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Dimensions / Sizes</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20 font-medium text-secondary">
                  {product.specifications["Dimensions"] || product.specifications["Thickness"] || product.specifications["Format"] || "N/A"}
                </td>
              ))}
            </tr>

            {/* Actions Row */}
            <tr>
              <td className="p-4 font-bold text-trade-navy w-48 sticky left-0 bg-white z-10 border-r border-outline-variant/10">Sourcing Actions</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-4 border-l border-outline-variant/20">
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => onAddToCart(product.name)}
                      className="w-full py-1.5 bg-trade-navy hover:bg-trade-orange text-white text-[11px] font-bold rounded transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">add_shopping_cart</span>
                      Add to Order
                    </button>
                    <Link
                      href={`/checkout?productId=${product.id}&qty=${product.moq}`}
                      className="w-full py-1.5 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant text-[11px] font-bold rounded transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">shopping_cart</span>
                      Buy Now
                    </Link>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
