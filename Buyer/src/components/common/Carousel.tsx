"use client";

import React, { forwardRef } from "react";

interface CarouselProps {
  children: React.ReactNode;
  gapClass?: string;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, gapClass = "gap-5" }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex overflow-x-auto ${gapClass} pb-4 scroll-smooth hide-scrollbar snap-x snap-mandatory`}
      >
        {children}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";
