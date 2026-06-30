"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  primaryImage: string;
  gallery: string[];
  productName: string;
}

export default function ProductGallery({ primaryImage, gallery, productName }: ProductGalleryProps) {
  const allImages = gallery.length > 0 ? gallery : [primaryImage];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Large Image View Container with zoom effect */}
      <div 
        className="relative w-full aspect-square bg-white border border-outline-variant/15 rounded-2xl overflow-hidden flex items-center justify-center cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={selectedImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 500px"
          className={`object-contain p-4 transition-transform duration-200 ${isZoomed ? "scale-[1.6]" : "scale-100"}`}
          style={isZoomed ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : undefined}
        />
        
        {/* Floating Actions overlay matching mockup */}
        <div className="absolute top-4 right-4 flex flex-col gap-3.5 z-10">
          <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 text-trade-orange shadow-xs flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] font-black">box</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#E5EEFF] text-[#0A47BC] shadow-xs flex items-center justify-center transition-colors active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[16px] font-black">share</span>
          </button>
        </div>
      </div>

      {/* Thumbnail Horizontal list */}
      <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-none">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden bg-white border-2 flex-shrink-0 transition-all ${
              selectedImage === img
                ? "border-trade-orange shadow-xs scale-98"
                : "border-outline-variant/15 hover:border-trade-orange/50"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              sizes="64px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
