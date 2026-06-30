"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { getProductSlug } from "@/lib/product/productHelpers";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
  isFlashDeal?: boolean;
  discountPercentage?: number;
  originalPriceMin?: number;
  originalPriceMax?: number;
  isCompact?: boolean;
  hideStars?: boolean;
}

export default function ProductCard({
  product,
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
  isFlashDeal = false,
  discountPercentage,
  originalPriceMin,
  originalPriceMax,
  isCompact = false,
  hideStars = false,
}: ProductCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCardClick = () => {
    const slug = getProductSlug(product.name);
    if (pathname && pathname.startsWith("/buyerportal")) {
      router.push(`/buyerportal/products/${slug}`);
    } else {
      router.push(`/products/${slug}`);
    }
  };
  if (isCompact) {
    const discountedPrice = discountPercentage 
      ? Math.round(product.priceMin * (1 - discountPercentage / 100)) 
      : product.priceMin;

    return (
      <div
        onClick={handleCardClick}
        className="w-full h-[300px] flex-shrink-0 bg-white border border-outline-variant/15 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative cursor-pointer snap-start mx-auto"
      >
        {/* Discount / Badges */}
        {discountPercentage && (
          <span className="absolute top-2 left-2 z-10 bg-trade-orange text-white text-[8.5px] font-black uppercase px-1.5 py-0.5 rounded shadow-sm">
            {discountPercentage}% Off
          </span>
        )}

        {/* Image Frame - Centered contain with white bg */}
        <div className="relative w-full aspect-square bg-white overflow-hidden border-b border-outline-variant/10 flex items-center justify-center p-2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="190px"
            className="object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-3 flex-grow flex flex-col justify-between text-center space-y-2">
          <div className="space-y-1">
            <h3 className="font-headline-md text-[12.5px] text-trade-navy font-bold leading-tight line-clamp-2 group-hover:text-primary-blue transition-colors">
              {product.name}
            </h3>
            <p className="font-display-lg text-[13.5px] text-trade-navy font-black">
              ₹{discountedPrice.toLocaleString("en-IN")}
              {discountPercentage && (
                <span className="text-[10px] text-secondary font-medium line-through ml-1.5">
                  ₹{product.priceMin.toLocaleString("en-IN")}
                </span>
              )}
            </p>
          </div>

          {/* Rating stars */}
          {!hideStars && (
            <div className="flex items-center justify-center gap-0.5 pb-1">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`material-symbols-outlined text-[11px] ${
                      i < Math.floor(product.supplierRating) ? "fill-amber-500" : ""
                    }`}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-[9.5px] text-secondary font-bold ml-1">
                ({product.reviews.length || 2})
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <motion.div
      layoutId={`product-card-${product.id}`}
      className={`bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:border-primary-blue/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col group relative ${
        isFlashDeal ? "w-[280px]" : "w-full"
      }`}
    >
      {/* Badge Cluster on Top-Left */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {isFlashDeal && discountPercentage && (
          <span className="bg-trade-orange text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm select-none">
            {discountPercentage}% Off
          </span>
        )}
        {product.tradeAssurance && (
          <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 select-none">
            <span className="material-symbols-outlined text-[10px] fill-white">shield</span>
            Assurance
          </span>
        )}
        {product.gstVerified && (
          <span className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 select-none">
            <span className="material-symbols-outlined text-[10px] fill-white">verified</span>
            Verified
          </span>
        )}
        {!isFlashDeal && product.readyStock && (
          <span className="bg-trade-navy text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 select-none">
            <span className="material-symbols-outlined text-[10px]">inventory_2</span>
            Ready Stock
          </span>
        )}
      </div>

      {/* Image Frame */}
      <div
        onClick={handleCardClick}
        className="relative w-full aspect-square bg-surface-container-low overflow-hidden cursor-pointer block border-b border-outline-variant/10"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={isFlashDeal ? "280px" : "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />

        {isFlashDeal && (
          <span className="absolute bottom-3 left-3 bg-trade-navy/90 backdrop-blur-xs text-white text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5 select-none">
            <span className="material-symbols-outlined text-[10px]">alarm</span>
            Limited Offer
          </span>
        )}
      </div>

      {/* Info and Actions */}
      <div className="p-3 flex-grow flex flex-col justify-between space-y-2.5">
        <div className="space-y-1.5">
          {/* Supplier details line */}
          <div className="flex justify-between items-center gap-1">
            <span className="text-[10px] text-secondary font-bold uppercase tracking-wider truncate max-w-[100px]">
              {product.supplierName}
            </span>
            <div className="flex items-center gap-0.5 bg-amber-50 px-1 rounded text-[9.5px] text-amber-700 font-extrabold flex-shrink-0">
              <span className="material-symbols-outlined text-[10px] text-amber-500 fill-amber-500">star</span>
              {product.supplierRating}
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={handleCardClick}
            className="font-headline-md text-[13px] text-trade-navy font-extrabold leading-tight line-clamp-2 hover:text-primary-blue transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short description info */}
          <p className="text-[11px] text-secondary leading-normal line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Sourcing Parameters */}
        <div className="space-y-2 pt-2 border-t border-outline-variant/10">
          {/* Price formatting */}
          <div className="flex flex-wrap items-baseline gap-0.5">
            <span className="font-display-lg text-[13.5px] text-trade-orange font-black">
              ₹{product.priceMin.toLocaleString("en-IN")} - ₹{product.priceMax.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-secondary font-medium">/{product.unit}</span>
          </div>

          {/* Flash Deal regular price cross out */}
          {isFlashDeal && originalPriceMin && originalPriceMax && (
            <div className="text-[10.5px] text-secondary/60 line-through">
              Est. Regular: ₹{originalPriceMin.toLocaleString("en-IN")} - ₹{originalPriceMax.toLocaleString("en-IN")}
            </div>
          )}

          {/* MOQ & Location details */}
          <div className={`flex justify-between items-center text-[10px] text-secondary ${isFlashDeal ? "bg-surface-container-low px-2 py-1.5 rounded-lg border border-outline-variant/20" : ""}`}>
            <span className="font-bold text-trade-navy">
              MOQ: {product.moq} {product.unit}s
            </span>
            <span className="flex items-center gap-0.5 font-semibold text-[9.5px]">
              <span className="material-symbols-outlined text-[10.5px]">location_on</span>
              {product.city}
            </span>
          </div>

          {/* Enterprise Verification Badges */}
          {!isFlashDeal && (
            <div className="flex flex-wrap gap-1">
              {product.gstVerified && (
                <span className="text-[8px] bg-blue-50 text-blue-700 font-bold px-1 py-0.5 rounded border border-blue-100 uppercase tracking-wide">
                  GST
                </span>
              )}
              {product.isoCertified && (
                <span className="text-[8px] bg-purple-50 text-purple-700 font-bold px-1 py-0.5 rounded border border-purple-100 uppercase tracking-wide">
                  ISO
                </span>
              )}
              {product.msme && (
                <span className="text-[8px] bg-orange-50 text-orange-700 font-bold px-1 py-0.5 rounded border border-orange-100 uppercase tracking-wide">
                  MSME
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Interactive Sourcing Buttons */}
        {isFlashDeal ? (
          <button
            onClick={handleCardClick}
            className="w-full py-2 bg-trade-orange hover:bg-secondary-blue text-white hover:text-white rounded-lg text-[11px] font-black uppercase tracking-wider text-center transition-all duration-300 block cursor-pointer"
          >
            View Flash Deal
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-1 pt-1.5">
            <button
              onClick={() => onQuote(product)}
              className="px-1.5 py-1.5 bg-primary-blue/10 hover:bg-primary-blue text-primary-blue hover:text-white rounded-lg border border-primary-blue/20 text-[10px] font-black tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
              title="Request Quote"
            >
              <span className="material-symbols-outlined text-[11px]">request_quote</span>
              Request Quote
            </button>
            <button
              onClick={() => onChat(product)}
              className="px-1.5 py-1.5 bg-trade-navy/5 hover:bg-trade-navy hover:text-white text-trade-navy rounded-lg border border-outline-variant/30 text-[10px] font-black tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
              title="Chat Supplier"
            >
              <span className="material-symbols-outlined text-[11px]">chat</span>
              Chat Supplier
            </button>

            <button
              onClick={handleCardClick}
              className="px-1 py-1.5 bg-white hover:bg-surface-container text-trade-navy rounded-lg border border-outline-variant text-[10px] font-black tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
              title="View Details"
            >
              View Details
            </button>
            <button
              onClick={() => onBuyNow(product)}
              className="px-1 py-1.5 bg-trade-orange hover:bg-secondary-blue text-white rounded-lg text-[10px] font-black tracking-wide uppercase transition-all active:scale-95 flex items-center justify-center gap-0.5 cursor-pointer"
              title="Buy Now"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
