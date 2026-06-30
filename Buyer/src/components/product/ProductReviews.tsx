import React from "react";
import { Review } from "@/types/product";

interface ProductReviewsProps {
  reviews: Review[];
  rating: number;
}

export default function ProductReviews({ reviews, rating }: ProductReviewsProps) {
  const allReviews = reviews || [];
  
  return (
    <div className="space-y-6">
      {/* Overview ratings header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-5 bg-slate-50 border border-outline-variant/10 rounded-2xl">
        <div className="text-center sm:text-left">
          <p className="text-[32px] font-black text-trade-navy leading-none">{rating.toFixed(1)}</p>
          <div className="flex justify-center sm:justify-start text-amber-500 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[16px]"
                style={{
                  fontVariationSettings: i < Math.floor(rating) ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400"
                }}
              >
                star
              </span>
            ))}
          </div>
          <p className="text-[10px] text-secondary font-bold mt-1.5 uppercase tracking-wider">
            {allReviews.length} Verified Reviews
          </p>
        </div>
        
        <div className="flex-grow w-full border-t sm:border-t-0 sm:border-l border-outline-variant/10 pt-4 sm:pt-0 sm:pl-6 space-y-2 text-xs font-semibold text-secondary">
          <div className="flex items-center gap-3">
            <span className="w-10">5 Star</span>
            <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <span className="w-8 text-right">80%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10">4 Star</span>
            <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <span className="w-8 text-right">20%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-10">3 Star</span>
            <div className="flex-grow h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "0%" }}></div>
            </div>
            <span className="w-8 text-right">0%</span>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {allReviews.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-outline-variant/20 rounded-2xl">
            <span className="material-symbols-outlined text-[36px] text-secondary/40">rate_review</span>
            <p className="text-xs text-secondary mt-1 italic font-semibold">No customer reviews yet. Be the first to buy and review!</p>
          </div>
        ) : (
          allReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 border border-outline-variant/10 rounded-xl space-y-2 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-black text-trade-navy">{rev.author}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[10px]"
                          style={{
                            fontVariationSettings: i < rev.rating ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400"
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="text-[8.5px] font-black uppercase text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-100 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px] font-black">verified</span>
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-secondary/60 font-semibold">{rev.date}</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed font-semibold">{rev.comment}</p>
              {rev.purchaseQty && (
                <p className="text-[9.5px] text-secondary/50 font-bold uppercase tracking-wider">
                  Purchase Volume: {rev.purchaseQty}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
