"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Carousel } from "@/components/common/Carousel";

interface CollectionData {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  gradient: string;
}

export default function FeaturedCollections() {
  const collections: CollectionData[] = [
    {
      id: "industrial",
      name: "Industrial Materials",
      icon: "precision_manufacturing",
      badge: "Raw Materials",
      description: "High-grade industrial chemicals, raw polymers, and yarn fibers for manufacturing plants.",
      gradient: "from-slate-800 to-slate-950",
    },
    {
      id: "electrical",
      name: "Electrical",
      icon: "electrical_services",
      badge: "Grid & Power",
      description: "Distribution transformers, super enamelled winding wires, and lightings for grids and panels.",
      gradient: "from-blue-950 to-slate-900",
    },
    {
      id: "construction",
      name: "Construction",
      icon: "domain",
      badge: "Infrastructure",
      description: "OPC 53 grade cement, Fe 550D TMT steel rebars, and building pipe systems.",
      gradient: "from-zinc-800 via-stone-900 to-black",
    },
    {
      id: "agriculture",
      name: "Agriculture",
      icon: "agriculture",
      badge: "Agri & Farm",
      description: "PVC piping for drip irrigation, GOTS certified organic yarns, and fertilizer compounding materials.",
      gradient: "from-emerald-950 to-slate-900",
    },
    {
      id: "machinery",
      name: "Machinery",
      icon: "construction",
      badge: "Heavy Equipment",
      description: "Hydraulic gear pumps, pressure valves, safety helmets, and earthmoving apparatus.",
      gradient: "from-gray-900 to-neutral-950",
    },
    {
      id: "packaging",
      name: "Packaging",
      icon: "package",
      badge: "Logistics & Wrap",
      description: "Double-wall corrugated shipping boxes, industrial paper, and strapping bands.",
      gradient: "from-amber-950/40 via-stone-900 to-slate-950",
    },
    {
      id: "chemicals",
      name: "Chemicals",
      icon: "science",
      badge: "Compounds",
      description: "99% pure Caustic Soda flakes, Linear Alkyl Benzene Sulfonic Acid (LABSA), and industrial alkalis.",
      gradient: "from-cyan-950 to-slate-950",
    },
    {
      id: "medical",
      name: "Medical",
      icon: "medical_services",
      badge: "Clinical Supplies",
      description: "Sterile B2B syringes, digital diagnostic equipment, N95 surgical gear, and medical packaging.",
      gradient: "from-teal-950 to-slate-900",
    },
    {
      id: "electronics",
      name: "Electronics",
      icon: "memory",
      badge: "Semiconductors",
      description: "B2B LED lighting panels, industrial controllers, sensors, and enamelled circuits.",
      gradient: "from-indigo-950 to-neutral-950",
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: "directions_car",
      badge: "Auto Parts",
      description: "Gear pumps for heavy loaders, auto structural parts, and packaging for assembly lines.",
      gradient: "from-rose-950/30 via-slate-900 to-black",
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("industrial");
  const sliderRef = useRef<HTMLDivElement>(null);

  const activeCollection = useMemo(() => {
    return collections.find((c) => c.id === activeTab) || collections[0];
  }, [activeTab]);

  // Filter products for the active collection dynamically
  const collectionProducts = useMemo(() => {
    switch (activeTab) {
      case "industrial":
        return MOCK_PRODUCTS.filter(
          (p) => p.category === "Chemicals & Plastics" || p.category === "Textile & Apparel"
        );
      case "electrical":
      case "electronics":
        return MOCK_PRODUCTS.filter((p) => p.category === "Electronics & Electrical");
      case "construction":
        return MOCK_PRODUCTS.filter((p) => p.category === "Construction Materials");
      case "agriculture":
        return MOCK_PRODUCTS.filter(
          (p) => p.id === "PROD-1003" || p.id === "PROD-1008" || p.category === "Textile & Apparel"
        );
      case "machinery":
        return MOCK_PRODUCTS.filter((p) => p.category === "Machinery & Tools");
      case "packaging":
        return MOCK_PRODUCTS.filter((p) => p.category === "Packaging & Paper");
      case "chemicals":
        return MOCK_PRODUCTS.filter((p) => p.category === "Chemicals & Plastics");
      case "medical":
        return MOCK_PRODUCTS.slice(0, 3).map((p, idx) => {
          const medicalItems = [
            {
              id: "MED-9001",
              name: "Disposable Sterile Syringes (2ml Luer Slip)",
              priceMin: 3.5,
              priceMax: 5,
              unit: "piece",
              moq: 10000,
              description: "Medical-grade sterile syringes with high clarity barrel, siliconized plunger, and protective sheath. CE & ISO compliant.",
            },
            {
              id: "MED-9002",
              name: "N95 Surgical Face Masks (5-Ply Protection)",
              priceMin: 12,
              priceMax: 18,
              unit: "piece",
              moq: 5000,
              description: "NIOSH certified N95 particulate respirator mask with adjustable nose clip and comfortable elastic head strap. Bulk sterile packs.",
            },
            {
              id: "MED-9003",
              name: "Digital Blood Pressure Monitor (Automatic)",
              priceMin: 650,
              priceMax: 720,
              unit: "unit",
              moq: 50,
              description: "Fully automatic upper arm blood pressure monitor with large LCD screen and memory log. Clinically validated for hospital use.",
            },
          ];
          return { ...p, ...medicalItems[idx] };
        });
      case "automotive":
        return MOCK_PRODUCTS.slice(2, 5).map((p, idx) => {
          const autoItems = [
            {
              id: "AUTO-8001",
              name: "Heavy-Duty Diesel Engine Filters (Spin-on)",
              priceMin: 220,
              priceMax: 260,
              unit: "piece",
              moq: 200,
              description: "Premium oil and fuel filters engineered for commercial fleet trucks, tractors, and industrial heavy generators.",
            },
            {
              id: "AUTO-8002",
              name: "Super-Conductor Copper Ignition Cable Harnesses",
              priceMin: 450,
              priceMax: 490,
              unit: "set",
              moq: 100,
              description: "Low-resistance silicon jacketed spark plug ignition cable harnesses for automotive engine assemblies.",
            },
            {
              id: "AUTO-8003",
              name: "Hydraulic Engine Mounting Brackets (Steel)",
              priceMin: 850,
              priceMax: 920,
              unit: "piece",
              moq: 50,
              description: "Vibration isolation mounting brackets made from high-strength forged steel and elastomer compound for cargo vehicles.",
            },
          ];
          return { ...p, ...autoItems[idx] };
        });
      default:
        return MOCK_PRODUCTS;
    }
  }, [activeTab]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-background py-10 px-s-md" id="featured-collections-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-outline-variant/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-trade-navy text-[24px]">category</span>
            <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
              Featured Collections
            </h2>
          </div>
          <span className="text-[12.5px] text-secondary font-medium hidden sm:inline">
            Browse premium enterprise goods by manufacturing sectors
          </span>
        </div>

        {/* Tab & Slider Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: 10 Collection Tabs */}
          <div className="lg:col-span-3 bg-white border border-outline-variant/30 rounded-xl p-3 shadow-xs space-y-1 w-full">
            <div className="text-[10px] text-secondary font-black uppercase tracking-widest px-3.5 py-2 border-b border-outline-variant/10 mb-2">
              Sourcing Portfolios
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1">
              {collections.map((col) => {
                const isActive = col.id === activeTab;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setActiveTab(col.id);
                      if (sliderRef.current) sliderRef.current.scrollLeft = 0;
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-left text-[12.5px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-trade-navy text-white shadow-xs"
                        : "text-secondary hover:bg-surface-container hover:text-trade-navy"
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isActive ? "text-trade-orange" : "text-secondary/80"}`}>
                      {col.icon}
                    </span>
                    <span className="truncate">{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Active Tab Content */}
          <div className="lg:col-span-9 space-y-5 w-full">
            
            {/* Banner Block */}
            <div className={`bg-gradient-to-r ${activeCollection.gradient} border border-outline-variant/30 rounded-xl p-6 md:p-8 text-white relative overflow-hidden shadow-xs flex flex-col justify-between min-h-[170px]`}>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
                  <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="space-y-2 relative z-10 max-w-xl">
                <span className="bg-trade-orange text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                  {activeCollection.badge}
                </span>
                <h3 className="font-headline-lg text-[20px] md:text-[24px] font-black leading-tight">
                  {activeCollection.name} Collection
                </h3>
                <p className="text-[13px] text-white/80 leading-relaxed font-medium">
                  {activeCollection.description}
                </p>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-white/10 relative z-10">
                <div className="flex gap-2">
                  <button 
                    onClick={scrollLeft}
                    className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">chevron_left</span>
                  </button>
                  <button 
                    onClick={scrollRight}
                    className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">chevron_right</span>
                  </button>
                </div>

                <a 
                  href="#marketplace-section"
                  className="px-4 py-1.5 bg-white/15 hover:bg-white text-[11px] font-black uppercase tracking-wider text-white hover:text-trade-navy rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  View All Products
                  <span className="material-symbols-outlined text-[13px]">arrow_right_alt</span>
                </a>
              </div>
            </div>

            {/* Carousel Slider */}
            <Carousel ref={sliderRef} gapClass="gap-4">
              {collectionProducts.map((product) => (
                <div key={`col-prod-${product.id}`} className="w-[230px] flex-shrink-0">
                  <ProductCard
                    product={product}
                    onViewDetails={() => {}}
                    onQuote={() => {}}
                    onBuyNow={() => {}}
                    onChat={() => {}}
                  />
                </div>
              ))}
            </Carousel>

          </div>

        </div>

      </div>
    </section>
  );
}
