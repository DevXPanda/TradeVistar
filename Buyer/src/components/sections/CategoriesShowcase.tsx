"use client";

import React from "react";
import Image from "next/image";

interface CategoryShowcaseCard {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: string;
  supplierCount: string;
  description: string;
}

export default function CategoriesShowcase() {
  const categories: CategoryShowcaseCard[] = [
    {
      id: "construction",
      name: "Construction Materials",
      icon: "hardware",
      image: "/D2D market/1.jpg",
      productCount: "4,820+",
      supplierCount: "340+",
      description: "OPC 53 structural cement, high yield Fe 550D TMT steel rebars, and aggregates.",
    },
    {
      id: "machinery",
      name: "Industrial Machinery",
      icon: "precision_manufacturing",
      image: "/D2D market/6.jpeg",
      productCount: "3,150+",
      supplierCount: "220+",
      description: "Hydraulic gear pumps, high-pressure valves, cylinders, and tooling apparatus.",
    },
    {
      id: "electrical",
      name: "Electrical Equipment",
      icon: "electrical_services",
      image: "/D2D market/5.jpeg",
      productCount: "2,980+",
      supplierCount: "190+",
      description: "Distribution transformers, transmission switches, and copper winding coils.",
    },
    {
      id: "chemicals",
      name: "Chemicals",
      icon: "science",
      image: "/D2D market/7.jpg",
      productCount: "5,400+",
      supplierCount: "410+",
      description: "99% pure caustic soda flakes, LABSA sulfonated compounds, and organic acids.",
    },
    {
      id: "agriculture",
      name: "Agriculture",
      icon: "agriculture",
      image: "/D2D market/8.jpg",
      productCount: "1,850+",
      supplierCount: "150+",
      description: "Irrigation piping systems, raw agricultural fibers, and bulk organic yarns.",
    },
    {
      id: "packaging",
      name: "Packaging",
      icon: "package_2",
      image: "/built for high/1.jpeg",
      productCount: "6,200+",
      supplierCount: "480+",
      description: "Double-wall corrugated shipping boxes, packaging reels, and paper wraps.",
    },
    {
      id: "automotive",
      name: "Automotive Parts",
      icon: "directions_car",
      image: "/built for high/7.jpeg",
      productCount: "2,740+",
      supplierCount: "210+",
      description: "Engine air/oil filters, copper wire harnesses, and structural engine mountings.",
    },
    {
      id: "textile",
      name: "Textile",
      icon: "apparel",
      image: "/built for high/4.jpeg",
      productCount: "3,950+",
      supplierCount: "290+",
      description: "Organic carded cotton spools, industrial polyester threads, and woven fabrics.",
    },
    {
      id: "medical",
      name: "Medical Equipment",
      icon: "medical_services",
      image: "/built for high/8.jpeg",
      productCount: "1,620+",
      supplierCount: "120+",
      description: "Sterile clinical syringes, N95 surgical gear, and diagnostic apparatus.",
    },
    {
      id: "solar",
      name: "Solar",
      icon: "solar_power",
      image: "/built for high/5.jpeg",
      productCount: "1,240+",
      supplierCount: "95+",
      description: "B2B photovoltaic LED panels, grid controllers, and solar inverters.",
    },
    {
      id: "home_improvement",
      name: "Home Improvement",
      icon: "home",
      image: "/D2D market/3.jpg",
      productCount: "4,110+",
      supplierCount: "310+",
      description: "uPVC agricultural pipes, plumbing systems, and fixtures for structural updates.",
    },
    {
      id: "office_supplies",
      name: "Office Supplies",
      icon: "edit",
      image: "/D2D market/4.jpeg",
      productCount: "2,350+",
      supplierCount: "180+",
      description: "Corrugated logistics storage drawers, binders, spools, and corporate paper sheets.",
    },
  ];

  return (
    <section className="bg-background py-10 px-s-md border-b border-outline-variant/30" id="categories-showcase-section">
      <div className="max-w-s-container-max mx-auto space-y-8">
        
        {/* Section Title */}
        <div className="pb-4 border-b border-outline-variant/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-trade-navy text-[24px]">grid_view</span>
            <h2 className="font-headline-lg text-[18px] md:text-[22px] text-trade-navy font-black tracking-wide uppercase">
              Popular Sourcing Categories
            </h2>
          </div>
          <span className="text-[12.5px] text-secondary font-medium">
            Explore active manufacturers and suppliers by product division
          </span>
        </div>

        {/* Categories Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-outline-variant/20 rounded-xl overflow-hidden hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group shadow-xs"
            >
              {/* Header Image with Float Icon */}
              <div className="relative h-28 w-full bg-surface-container-low overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Visual dark overlay for high readability */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>

                {/* Floating Icon Box */}
                <div className="absolute -bottom-3 right-4 w-9 h-9 bg-trade-navy text-white rounded-lg flex items-center justify-center shadow-md border border-outline-variant/20 group-hover:bg-trade-orange transition-colors duration-300">
                  <span className="material-symbols-outlined text-[19px]">
                    {cat.icon}
                  </span>
                </div>
              </div>

              {/* Information Content */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-extrabold leading-snug group-hover:text-trade-orange transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-secondary leading-normal line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Sourcing Metrics Row */}
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-outline-variant/10 text-[10px] text-secondary">
                  <div className="bg-surface-container-low px-2 py-1 rounded border border-outline-variant/20">
                    <span className="block text-[8px] uppercase tracking-wider text-secondary/60 font-bold">Products</span>
                    <strong className="text-trade-navy font-black">{cat.productCount}</strong>
                  </div>
                  <div className="bg-surface-container-low px-2 py-1 rounded border border-outline-variant/20">
                    <span className="block text-[8px] uppercase tracking-wider text-secondary/60 font-bold">Suppliers</span>
                    <strong className="text-trade-navy font-black">{cat.supplierCount}</strong>
                  </div>
                </div>
              </div>

              {/* View Catalog bottom button */}
              <a
                href="#marketplace-section"
                className="w-full py-2 bg-surface-container-low hover:bg-trade-navy text-trade-navy hover:text-white text-[10.5px] font-black uppercase tracking-wider text-center transition-all duration-200 border-t border-outline-variant/10 cursor-pointer block"
              >
                Browse Catalog
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
