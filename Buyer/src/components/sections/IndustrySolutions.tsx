"use client";

import React from "react";
import Image from "next/image";

interface IndustryCard {
  id: string;
  name: string;
  image: string;
  description: string;
  gradient: string;
  icon?: string;
}

export default function IndustrySolutions() {
  const industries: IndustryCard[] = [
    {
      id: "construction",
      name: "Construction Supply Chain",
      image: "/D2D market/1.jpg",
      description: "Direct supply systems for commercial cement aggregates, structural steel rebars, and heavy plumbing lines.",
      gradient: "from-slate-950/90 via-slate-900/85 to-trade-navy/80",
    },
    {
      id: "manufacturing",
      name: "Plant Manufacturing",
      image: "/D2D market/2.jpg",
      description: "Equipping automatic lines with heavy castings, custom metal extrusions, and bulk raw components.",
      gradient: "from-zinc-950/90 via-slate-950/85 to-trade-navy/80",
    },
    {
      id: "healthcare",
      name: "Clinical Healthcare",
      image: "/built for high/8.jpeg",
      description: "Global sterile clinical disposables, hospital diagnosis equipment, and medical-grade packaging panels.",
      gradient: "from-teal-950/95 via-slate-900/85 to-trade-navy/80",
    },
    {
      id: "agriculture",
      name: "Commercial Agriculture",
      image: "/D2D market/8.jpg",
      description: "Drip irrigation pipe layouts, bulk organic yarn reels, and agricultural fertilizer compounding ingredients.",
      gradient: "from-emerald-950/90 via-slate-950/85 to-trade-navy/80",
    },
    {
      id: "food_processing",
      name: "Food Processing Infrastructure",
      image: "/D2D market/3.jpg",
      description: "Bulk uPVC wash systems, processing tools, storage boxes, and transport containers.",
      gradient: "from-amber-950/80 via-neutral-900/85 to-trade-navy/80",
    },
    {
      id: "electronics",
      name: "High-Tech Electronics",
      image: "/D2D market/4.jpeg",
      description: "Distribution panel grids, super-insulated winding copper, and automated LED circuit assemblies.",
      gradient: "from-indigo-950/90 via-slate-900/85 to-trade-navy/80",
    },
    {
      id: "automotive",
      name: "Automotive Assembly",
      image: "/built for high/7.jpeg",
      description: "Heavy-duty fuel/air filter elements, engine cable harnesses, and forged steel chassis mounts.",
      gradient: "from-neutral-950/90 via-slate-900/85 to-trade-navy/80",
    },
    {
      id: "infrastructure",
      name: "Civic Infrastructure Projects",
      image: "/built for high/2.jpeg",
      description: "Safety helmets, TMT structural sections, grid transformers, and heavy-duty logistics cartons.",
      gradient: "from-gray-950/90 via-slate-900/85 to-trade-navy/80",
    },
    {
      id: "oil_gas",
      name: "Oil & Gas Refinement",
      image: "/built for high/3.jpeg",
      description: "LABSA chemical formulations, caustic soda flakes, and high-pressure fluid gear valves.",
      gradient: "from-stone-950/95 via-neutral-900/85 to-trade-navy/80",
    },
    {
      id: "renewable_energy",
      name: "Renewable Clean Energy",
      icon: "solar_power",
      image: "/built for high/5.jpeg",
      description: "Industrial photovoltaic panel arrays, backup grid regulators, and inverter controllers.",
      gradient: "from-cyan-950/90 via-slate-900/85 to-trade-navy/80",
    },
  ];

  return (
    <section className="bg-white border-t border-outline-variant/30 py-10 px-s-md" id="industry-solutions-section">
      <div className="max-w-s-container-max mx-auto space-y-6">
        
        {/* Section Header */}
        <div className="pb-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-trade-navy text-[24px]">corporate_fare</span>
            <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
              Industry Supply Solutions
            </h2>
          </div>
          <span className="text-[12.5px] text-secondary font-medium">
            Tailored supply chain pathways and procurement frameworks for key sectors
          </span>
        </div>

        {/* Large Banner Grid: 2 columns on desktop, 1 on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.id}
              className="relative rounded-xl overflow-hidden min-h-[220px] flex flex-col justify-between p-6 md:p-8 border border-outline-variant/20 group shadow-xs hover:border-trade-orange/40 transition-all duration-300"
            >
              {/* Background Image Frame */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-700"
                />
                
                {/* Subtle B2B gradient overlay using TradeVistar colors */}
                <div className={`absolute inset-0 bg-gradient-to-r ${ind.gradient} mix-blend-multiply opacity-95 group-hover:opacity-90 transition-opacity duration-300`}></div>
              </div>

              {/* Banner Content (Header + description) */}
              <div className="relative z-10 max-w-lg space-y-2">
                <h3 className="font-headline-lg text-[18px] md:text-[20px] font-black text-white leading-tight uppercase tracking-wide">
                  {ind.name}
                </h3>
                <p className="text-[13px] text-white/80 leading-relaxed font-semibold">
                  {ind.description}
                </p>
              </div>

              {/* Sourcing Actions Block */}
              <div className="relative z-10 pt-4 flex gap-3 border-t border-white/10 mt-6">
                <a
                  href="#marketplace-section"
                  className="px-4 py-2 bg-trade-orange hover:bg-trade-orange/90 text-white rounded-lg text-[11px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-sm cursor-pointer"
                >
                  Explore Products
                </a>
                <a
                  href="#marketplace-section"
                  className="px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-trade-navy rounded-lg text-[11px] font-black uppercase tracking-wider transition-all border border-white/20 hover:border-white cursor-pointer"
                >
                  Find Suppliers
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
