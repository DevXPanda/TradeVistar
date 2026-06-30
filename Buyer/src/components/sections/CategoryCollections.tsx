"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/data/products";

interface CategoryCollectionsProps {
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

interface CollectionItem {
  name: string;
  products: Product[];
}

export default function CategoryCollections({
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: CategoryCollectionsProps) {
  // Helper to create clean mock products for consumer categories matching the screenshot items
  const makeProduct = (
    id: string,
    name: string,
    category: string,
    price: number,
    image: string,
    rating = 4.5,
    reviews = 2
  ): Product => ({
    id,
    name,
    category,
    industry: "Consumer Goods",
    priceMin: price,
    priceMax: price * 1.1,
    unit: "piece",
    moq: 1,
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    supplierName: "Global Trade Hub",
    supplierRating: rating,
    supplierType: "Wholesaler",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: false,
    readyStock: true,
    deliveryTime: 2,
    image,
    description: `High-quality ${name} sourced for bulk and retail distribution. Available with pan-India shipping support.`,
    gallery: [],
    specifications: { Grade: "Premium", Material: "Sourced" },
    packagingDetails: "Retail box packaging",
    shippingInfo: { port: "Mumbai Port", transitTime: "1-2 Days", methods: ["Express Courier"] },
    supplierProfile: { established: 2020, factorySize: "2000 sqm", employees: 30, description: "Leading distributor of consumer electronics and apparel.", certificates: [], factoryImages: [] },
    reviews: Array.from({ length: reviews }).map((_, i) => ({
      id: `rev-${id}-${i}`,
      author: "Rajesh K.",
      rating: 5,
      comment: "Excellent quality and packaging.",
      date: "2026-06-15",
      verified: true,
      purchaseQty: "100 pcs",
    })),
  });

  const collections: CollectionItem[] = [
    {
      name: "Women's Fashion",
      products: [
        makeProduct("WF-1", "Women Beautiful White Sneakers", "Women's Fashion", 70, "/built for high/6.jpeg", 3.0, 1),
        makeProduct("WF-2", "Bohemiantee Shirt Tops", "Women's Fashion", 22, "/D2D market/8.jpg", 5.0, 3),
        makeProduct("WF-3", "Leather Single Shoes", "Women's Fashion", 32, "/built for high/7.jpeg", 4.5, 1),
        makeProduct("WF-4", "Handbag Bags For Women", "Women's Fashion", 50, "/built for high/8.jpeg", 4.8, 2),
        makeProduct("WF-5", "Vimly Women Blazer Set", "Women's Fashion", 200, "/D2D market/1.jpg", 4.2, 1),
        makeProduct("WF-6", "Star Of David Moissanite Necklace", "Women's Fashion", 29, "/built for high/5.jpeg", 5.0, 4),
      ],
    },
    {
      name: "Phone & Gadgets",
      products: [
        makeProduct("PG-1", "Iphone 12 Pro Max", "Phone & Gadgets", 590, "/D2D market/4.jpeg", 4.7, 5),
        makeProduct("PG-2", "SHARK 8 4G Smartphone", "Phone & Gadgets", 149, "/built for high/1.jpeg", 4.3, 2),
        makeProduct("PG-3", "Iphone 13 Pro S", "Phone & Gadgets", 629, "/D2D market/4.jpeg", 4.8, 4),
        makeProduct("PG-4", "Iphone 15 Pro Max", "Phone & Gadgets", 1249, "/built for high/2.jpeg", 4.9, 12),
        makeProduct("PG-5", "Galaxy S23 Ultra", "Phone & Gadgets", 1199, "/D2D market/4.jpeg", 4.8, 8),
        makeProduct("PG-6", "Redmi Note 13 Pro 5G", "Phone & Gadgets", 299, "/built for high/3.jpeg", 4.5, 3),
      ],
    },
    {
      name: "Men's Fashion",
      products: [
        makeProduct("MF-1", "Men Designer Polo T-Shirt", "Men's Fashion", 18, "/D2D market/8.jpg", 4.4, 2),
        makeProduct("MF-2", "Classic Denim Jacket", "Men's Fashion", 45, "/D2D market/1.jpg", 4.6, 1),
        makeProduct("MF-3", "Lightweight Running Sneakers", "Men's Fashion", 55, "/built for high/6.jpeg", 4.2, 2),
        makeProduct("MF-4", "Formal Brown Leather Belt", "Men's Fashion", 12, "/built for high/7.jpeg", 4.8, 4),
      ],
    },
    {
      name: "Kid's Fashion",
      products: [
        makeProduct("KF-1", "Cotton Kids Romper Set", "Kid's Fashion", 15, "/D2D market/8.jpg", 4.8, 3),
        makeProduct("KF-2", "Lightup Kids Sneakers", "Kid's Fashion", 25, "/built for high/6.jpeg", 4.5, 1),
        makeProduct("KF-3", "Striped Summer Dress for Girls", "Kid's Fashion", 20, "/D2D market/1.jpg", 4.7, 2),
        makeProduct("KF-4", "Kids Fleece Winter Hoodies", "Kid's Fashion", 30, "/built for high/7.jpeg", 4.9, 5),
      ],
    },
    {
      name: "Health & Beauty",
      products: [
        makeProduct("HB-1", "Hydrating Aloe Face Cream", "Health & Beauty", 9, "/built for high/8.jpeg", 4.9, 6),
        makeProduct("HB-2", "Organic Tea Tree Serum", "Health & Beauty", 14, "/built for high/5.jpeg", 4.6, 2),
        makeProduct("HB-3", "Beauty Lip Jelly Matte", "Health & Beauty", 12, "/built for high/8.jpeg", 4.7, 4),
        makeProduct("HB-4", "Professional Make-up Set", "Health & Beauty", 65, "/built for high/2.jpeg", 4.8, 3),
      ],
    },
    {
      name: "Electronics & Gadgets",
      products: [
        makeProduct("EG-1", "MacBook Air M1 2020", "Electronics & Gadgets", 1158, "/D2D market/4.jpeg", 4.8, 14),
        makeProduct("EG-2", "Wireless Smart Watch Plus", "Electronics & Gadgets", 150, "/built for high/1.jpeg", 4.5, 9),
        makeProduct("EG-3", "Bluetooth Headsets Pro", "Electronics & Gadgets", 80, "/built for high/2.jpeg", 4.7, 5),
        makeProduct("EG-4", "Ultra LED Gaming Monitor", "Electronics & Gadgets", 320, "/built for high/3.jpeg", 4.9, 6),
      ],
    },
    {
      name: "Home & Kitchen",
      products: [
        makeProduct("HK-1", "Electric Kitchen Blender 1000W", "Home & Kitchen", 250, "/built for high/3.jpeg", 4.6, 7),
        makeProduct("HK-2", "Fireplaces Cook Stoves Set", "Home & Kitchen", 1200, "/built for high/2.jpeg", 4.8, 11),
        makeProduct("HK-3", "RO Water Purifier System", "Home & Kitchen", 269, "/built for high/1.jpeg", 4.5, 4),
        makeProduct("HK-4", "Waterproof Sofa Seat Protector", "Home & Kitchen", 25, "/built for high/7.jpeg", 4.7, 5),
      ],
    },
  ];

  return (
    <div className="space-y-10" id="category-collections-section">
      {collections.map((col) => {
        return (
          <CategorySlider
            key={col.name}
            name={col.name}
            products={col.products}
            onViewDetails={onViewDetails}
            onQuote={onQuote}
            onBuyNow={onBuyNow}
            onChat={onChat}
          />
        );
      })}
    </div>
  );
}

// Category Slider Sub-component with proper scroll features
interface CategorySliderProps {
  name: string;
  products: Product[];
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

function CategorySlider({
  name,
  products,
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: CategorySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-10 px-s-md border-b border-outline-variant/20 relative">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex justify-between items-end pb-2">
          <h2 className="font-headline-lg text-[22px] md:text-[24px] text-trade-navy font-black tracking-tight">
            {name}
          </h2>
          <button
            onClick={() => {
              document.getElementById("search-filter-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-trade-navy hover:text-primary-blue text-xs font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            View All
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        {/* Desktop View (md and larger): Carousel Slider */}
        <div className="hidden md:flex relative items-center group">
          
          {/* Left Navigation Chevron Button overlaying card edges */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/5"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_left</span>
          </button>

          {/* Carousel Slider */}
          <div
            ref={sliderRef}
            className="w-full flex gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product) => (
              <div key={product.id} className="w-[190px] flex-shrink-0 snap-start">
                <ProductCard
                  product={product}
                  onViewDetails={onViewDetails}
                  onQuote={onQuote}
                  onBuyNow={onBuyNow}
                  onChat={onChat}
                  isCompact={true}
                />
              </div>
            ))}
          </div>

          {/* Right Navigation Chevron Button overlaying card edges */}
          <button
            onClick={scrollRight}
            className="absolute right-2 z-20 w-10 h-10 rounded-full bg-primary-blue hover:bg-secondary-blue text-white flex items-center justify-center shadow-lg active:scale-95 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-90 group-hover:pointer-events-auto transition-all duration-300 border border-white/5"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-[20px] font-black">chevron_right</span>
          </button>

        </div>

        {/* Mobile View (smaller than md): Static 2-Column Grid */}
        <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-6">
          {products.slice(0, 4).map((product) => (
            <div key={`grid-mob-${product.id}`} className="flex justify-center">
              <ProductCard
                product={product}
                onViewDetails={onViewDetails}
                onQuote={onQuote}
                onBuyNow={onBuyNow}
                onChat={onChat}
                isCompact={true}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
