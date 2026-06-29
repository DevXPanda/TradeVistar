"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  productName: string;
  primaryImage: string;
}

export default function ProductGallery({ productName, primaryImage }: ProductGalleryProps) {
  // Gallery state
  const [activeMedia, setActiveMedia] = useState<{
    type: "image" | "video";
    url: string;
  }>({
    type: "image",
    url: primaryImage,
  });

  // Zoom magnifier effect state
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center center",
  });

  // Handle image magnifier hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: "scale(1.8)",
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  // Mock list of thumbnails for industrial components
  const thumbnails = [
    { type: "image" as const, url: primaryImage },
    { type: "image" as const, url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop" },
    { type: "image" as const, url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=400&auto=format&fit=crop" },
    { type: "video" as const, url: "https://assets.mixkit.co/videos/preview/mixkit-mechanical-components-rotation-simulation-40097-large.mp4" },
  ];

  return (
    <div className="space-y-4">
      {/* Primary Media Display Block */}
      <div 
        className="relative w-full aspect-[4/3] bg-white border border-outline-variant/30 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center cursor-zoom-in group"
        onMouseMove={activeMedia.type === "image" ? handleMouseMove : undefined}
        onMouseLeave={activeMedia.type === "image" ? handleMouseLeave : undefined}
      >
        {activeMedia.type === "image" ? (
          <div 
            className="w-full h-full relative transition-transform duration-100 ease-out"
            style={zoomStyle}
          >
            <Image 
              src={activeMedia.url} 
              alt={productName} 
              fill 
              className="object-contain p-4"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <video 
              src={activeMedia.url} 
              controls 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Hover Hint Overlay (only for image magnifier) */}
        {activeMedia.type === "image" && (
          <div className="absolute bottom-4 right-4 bg-trade-navy/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">zoom_in</span>
            Hover to Zoom
          </div>
        )}
      </div>

      {/* Thumbnails Swiper Row */}
      <div className="grid grid-cols-4 gap-3">
        {thumbnails.map((item, idx) => {
          const isActive = activeMedia.url === item.url;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveMedia({ type: item.type, url: item.url })}
              className={`relative aspect-square rounded-xl bg-white border overflow-hidden p-1 transition-all ${
                isActive 
                  ? "border-trade-orange ring-2 ring-trade-orange/10 scale-[0.98]" 
                  : "border-outline-variant/30 hover:border-trade-navy"
              }`}
            >
              {item.type === "image" ? (
                <div className="w-full h-full relative">
                  <Image src={item.url} alt={`Thumbnail ${idx}`} fill className="object-cover rounded-lg" />
                </div>
              ) : (
                <div className="w-full h-full relative bg-slate-900 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-2xl absolute z-10 text-white/90 drop-shadow">play_circle</span>
                  <div className="absolute inset-0 bg-black/35 z-0" />
                  <Image 
                    src={primaryImage} 
                    alt="Video thumbnail fallback" 
                    fill 
                    className="object-cover rounded-lg opacity-60" 
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
