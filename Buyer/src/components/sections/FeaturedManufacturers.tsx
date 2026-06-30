"use client";

import React from "react";
import Image from "next/image";

interface ManufacturerProfile {
  id: string;
  name: string;
  image: string;
  products: string[];
  exportCountries: string[];
  certification: string;
}

export default function FeaturedManufacturers() {
  const manufacturers: ManufacturerProfile[] = [
    {
      id: "MFG-201",
      name: "Apex Heavy Forgings Plant",
      image: "/D2D market/2.jpg",
      products: ["Hydraulic Gear Pumps", "Steel Cylinders", "Extrusions"],
      exportCountries: ["Germany", "USA", "Japan", "South Korea"],
      certification: "ISO 9001 & CE Certified",
    },
    {
      id: "MFG-202",
      name: "Coimbatore Textile Spinning Unit",
      image: "/built for high/4.jpeg",
      products: ["Carded Cotton Yarn", "Polyester Spools", "Woven Fabric"],
      exportCountries: ["UK", "Bangladesh", "Vietnam", "Italy"],
      certification: "GOTS & OEKO-TEX Standard",
    },
    {
      id: "MFG-203",
      name: "Gujarat Structural Rebar Rolling Mill",
      image: "/D2D market/1.jpg",
      products: ["TMT Steel Rebars", "Mild Steel Billets", "Structural Angles"],
      exportCountries: ["UAE", "Saudi Arabia", "Singapore", "Australia"],
      certification: "BIS Standard Certified Plant",
    },
    {
      id: "MFG-204",
      name: "Hindustan Alkalis Refining Complex",
      image: "/D2D market/7.jpg",
      products: ["99% Caustic Soda Flakes", "LABSA Compounds", "Industrial Alkalis"],
      exportCountries: ["USA", "Germany", "Netherlands", "Brazil"],
      certification: "ISO 14001 Environmental Compliance",
    },
  ];

  return (
    <section className="bg-white border-b border-outline-variant/30 py-10 px-s-md" id="featured-manufacturers-section">
      <div className="max-w-s-container-max mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-trade-navy text-[24px]">factory</span>
            <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
              Featured Manufacturers
            </h2>
          </div>
          <span className="text-[12.5px] text-secondary font-medium">
            High-capacity industrial production facilities and certified OEM/ODM factories
          </span>
        </div>

        {/* Manufacturers Grid (4 Columns Desktop, 2 Columns Tablet/Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {manufacturers.map((mfg) => (
            <div
              key={mfg.id}
              className="bg-white border border-outline-variant/20 rounded-xl overflow-hidden hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group shadow-xs"
            >
              {/* Factory Image Banner */}
              <div className="relative h-44 w-full bg-surface-container-low overflow-hidden border-b border-outline-variant/10">
                <Image
                  src={mfg.image}
                  alt={mfg.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Verified factory overlay badge */}
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm z-10 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[10px] fill-white">verified</span>
                  Verified Plant
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-headline-md text-[14px] text-trade-navy font-extrabold leading-snug group-hover:text-trade-orange transition-colors">
                    {mfg.name}
                  </h3>
                  
                  {/* Industry Specialty Tags */}
                  <div className="flex flex-wrap gap-1">
                    {mfg.products.map((prod) => (
                      <span
                        key={prod}
                        className="text-[9.5px] bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Operations & Exports */}
                <div className="space-y-2 pt-2 border-t border-outline-variant/10 text-[11px] text-secondary">
                  <div className="space-y-0.5">
                    <span className="block text-[8px] uppercase tracking-wider text-secondary/50 font-bold">Certification</span>
                    <strong className="text-trade-navy font-bold text-[10.5px]">
                      {mfg.certification}
                    </strong>
                  </div>
                  
                  <div className="space-y-0.5">
                    <span className="block text-[8px] uppercase tracking-wider text-secondary/50 font-bold">Export Footprint</span>
                    <p className="text-[10px] font-semibold text-slate-700 truncate">
                      {mfg.exportCountries.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* View Store Catalog Button */}
              <a
                href="#marketplace-section"
                className="w-full py-2.5 bg-surface-container-low hover:bg-trade-navy text-trade-navy hover:text-white text-[10.5px] font-black uppercase tracking-wider text-center transition-all border-t border-outline-variant/10 cursor-pointer block"
              >
                Visit Store
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
