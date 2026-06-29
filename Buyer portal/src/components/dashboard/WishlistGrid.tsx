"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";

interface WishlistGridProps {
  wishlistItems: Product[];
  handleMoveToCart: (product: Product) => void;
  handleRemove: (productId: string) => void;
}

export default function WishlistGrid({
  wishlistItems,
  handleMoveToCart,
  handleRemove,
}: WishlistGridProps) {
  if (wishlistItems.length === 0) {
    return (
      <div className="bg-white border border-outline-variant/20 rounded-xl p-12 text-center text-secondary font-medium">
        <span className="material-symbols-outlined text-[36px] text-secondary/40 block mb-2">favorite</span>
        Your B2B wishlist is currently empty.
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-5"
      >
        {wishlistItems.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:border-trade-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col group relative"
          >
            {/* Trade Assurance Badge */}
            {product.tradeAssurance && (
              <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[10px]">shield</span>
                Assurance
              </div>
            )}

            {/* Thumbnail Preview */}
            <div className="relative aspect-[4/3] w-full bg-slate-50 border-b border-outline-variant/10 overflow-hidden flex items-center justify-center p-3">
              <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Content Specifications */}
            <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
              <div className="space-y-1.5">
                <span className="text-[9px] bg-trade-navy/5 text-trade-navy px-1.5 py-0.5 rounded font-bold uppercase tracking-wider block w-fit">
                  {product.category}
                </span>
                <Link
                  href={`/products/${product.id}`}
                  className="font-bold text-trade-navy text-[12.5px] leading-tight block hover:text-trade-orange transition-colors line-clamp-2"
                >
                  {product.name}
                </Link>
                <div className="flex items-center gap-1 text-[11px] text-secondary">
                  <span className="material-symbols-outlined text-[12px]">location_on</span>
                  <span>{product.location}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-outline-variant/10 pt-2.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-[12.5px] font-extrabold text-trade-orange">
                    ₹{product.priceMin.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-secondary">
                    MOQ: {product.moq} {product.unit}s
                  </span>
                </div>

                {/* Rating score */}
                <div className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded w-fit text-[9px]">
                  <span className="material-symbols-outlined text-[10px] text-amber-500 fill-amber-500">star</span>
                  {product.supplierRating}
                </div>

                {/* Action CTA Buttons grid */}
                <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="px-2 py-1.5 bg-trade-navy/5 hover:bg-trade-navy/10 text-trade-navy rounded text-[10.5px] font-bold transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[12px]">add_shopping_cart</span>
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="px-2 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-100 text-[10.5px] font-bold transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[12px]">delete</span>
                    Remove
                  </button>

                  <Link
                    href={`/checkout?productId=${product.id}&qty=${product.moq}`}
                    className="col-span-2 px-2.5 py-1.5 bg-trade-navy hover:bg-trade-navy/90 text-white rounded text-[11px] font-bold transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">shopping_cart</span>
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
