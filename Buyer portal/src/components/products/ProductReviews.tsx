"use client";

import React from "react";

interface ProductReviewsProps {
  supplierRating: number;
}

export default function ProductReviews({ supplierRating }: ProductReviewsProps) {
  // B2B mock reviews database
  const reviewItems = [
    {
      author: "Prakash T. (Procurement Officer)",
      company: "Rohan Builders Pvt. Ltd.",
      rating: 5,
      date: "May 12, 2026",
      comment: "Excellent batch delivery. The structural tensile specifications fully match the certifications. Escrow release went without any friction. Highly recommended supplier.",
    },
    {
      author: "Aditi S. (Supply Chain Specialist)",
      company: "Apex Infrastructures",
      rating: 4,
      date: "April 28, 2026",
      comment: "Good response times. Sourcing was smooth, although delivery logistics took 2 days longer than the initially agreed lead schedule. Will procure again.",
    },
  ];

  return (
    <div className="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
        <h3 className="font-headline-md text-[14px] text-trade-navy font-bold">
          Procurement Feedback
        </h3>
        <div className="flex items-center gap-1 font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded text-[11px]">
          <span className="material-symbols-outlined text-[13px] text-amber-500 fill-amber-500">star</span>
          <span>{supplierRating} Rating</span>
        </div>
      </div>

      <div className="space-y-4 divide-y divide-outline-variant/10">
        {reviewItems.map((rev, index) => (
          <div key={index} className={`space-y-2 ${index > 0 ? "pt-4" : ""}`}>
            <div className="flex justify-between items-start text-xs">
              <div>
                <h4 className="font-bold text-trade-navy leading-none">{rev.author}</h4>
                <span className="text-[10px] text-secondary font-medium mt-0.5 block">{rev.company}</span>
              </div>
              <span className="text-[10px] text-secondary">{rev.date}</span>
            </div>
            
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`material-symbols-outlined text-[12px] ${
                    i < rev.rating ? "text-amber-500 fill-amber-500" : "text-outline-variant"
                  }`}
                >
                  star
                </span>
              ))}
            </div>

            <p className="text-secondary text-[11px] leading-relaxed font-medium">
              &quot;{rev.comment}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
