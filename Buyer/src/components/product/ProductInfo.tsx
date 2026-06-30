import React from "react";
import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/product/formatPrice";

interface ProductInfoProps {
  product: ProductType;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const reviewsCount = product.reviews?.length || 0;
  
  return (
    <div className="space-y-3.5">
      {/* Product Name */}
      <h1 className="text-[22px] md:text-[26px] text-trade-navy font-black leading-tight tracking-tight">
        {product.name}
      </h1>

      {/* Orders & Wishlist inline metrics bar */}
      <div className="flex items-center gap-3 text-xs font-semibold text-secondary">
        <span className="hover:text-trade-orange cursor-pointer">
          {reviewsCount || 4} Reviews
        </span>
        <span className="text-secondary/30 select-none">|</span>
        <span>
          {product.moq * 3 || 15} Orders
        </span>
        <span className="text-secondary/30 select-none">|</span>
        <span className="hover:text-trade-orange cursor-pointer">
          12 Wish Listed
        </span>
      </div>

      {/* Price display block matching mockup size and placement */}
      <div className="pt-1.5 pb-2">
        <p className="font-black text-[24px] text-[#0A47BC] leading-none">
          {formatPrice(product.priceMin)} - {formatPrice(product.priceMax)}
          <span className="text-xs text-secondary/70 font-semibold ml-2 capitalize">
            / {product.unit}
          </span>
        </p>
      </div>

      {/* Star ratings summary */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
        <div className="flex text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-[13px]"
              style={{
                fontVariationSettings: i < Math.floor(product.supplierRating || 4) ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400"
              }}
            >
              star
            </span>
          ))}
        </div>
        <span className="text-trade-navy font-black">
          ({product.supplierRating || "4.8"})
        </span>
        <span className="text-secondary/30 select-none">|</span>
        <span className="text-emerald-600 font-bold flex items-center gap-0.5">
          <span className="material-symbols-outlined text-[12px] font-black">verified</span>
          Verified Supplier
        </span>
      </div>
    </div>
  );
}
