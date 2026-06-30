"use client";

import React, { useState } from "react";

interface ProductActionsProps {
  onBuyNow: () => void;
  onAddToCart: () => void;
  onSendRFQ: () => void;
}

export default function ProductActions({ onBuyNow, onAddToCart, onSendRFQ }: ProductActionsProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="space-y-3 pt-2 border-t border-outline-variant/10">
      
      {/* Row 1: Buy now & Add to cart */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBuyNow}
          className="flex-1 py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer text-center"
        >
          Buy now
        </button>
        
        <button
          onClick={onAddToCart}
          className="flex-1 py-2.5 bg-primary-blue hover:bg-secondary-blue text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer text-center"
        >
          Add to cart
        </button>
      </div>

      {/* Row 2: Request for Sample & Favorite */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSendRFQ}
          className="flex-grow py-2.5 bg-primary-blue hover:bg-secondary-blue text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-[0.98] cursor-pointer text-center flex items-center justify-center gap-1.5"
        >
          Request for Sample
          <span className="material-symbols-outlined text-[15px] font-black transform rotate-[-45deg]">
            send
          </span>
        </button>

        <button
          onClick={handleFavoriteClick}
          className={`px-3 py-2.5 border rounded-lg flex items-center gap-1.5 transition-all active:scale-90 cursor-pointer text-xs font-black h-[37px] ${
            isFavorited
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-outline-variant/30 bg-white text-secondary hover:border-outline-variant/50"
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              isFavorited ? "fill-red-500 text-red-500" : "text-secondary"
            }`}
          >
            favorite
          </span>
          <span className="text-[11px] font-bold select-none">
            {isFavorited ? 1 : 0}
          </span>
        </button>
      </div>

    </div>
  );
}
