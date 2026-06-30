"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import { Carousel } from "@/components/common/Carousel";

interface IndustryCollectionsProps {
  onViewDetails: (product: Product) => void;
  onQuote: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onChat: (product: Product) => void;
}

// Custom defined items for Medical and Automotive to ensure sliders are populated
export const MEDICAL_PRODUCTS: Product[] = [
  {
    id: "PROD-MED-1",
    name: "Enterprise N95 Surgical Respirator Masks",
    category: "Medical Supplies",
    industry: "Medical",
    priceMin: 12,
    priceMax: 18,
    unit: "piece",
    moq: 5000,
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    supplierName: "MediSafe India Healthcare",
    supplierRating: 4.8,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 3,
    image: "/built for high/2.jpeg",
    description: "5-layer filtration surgical N95 respirator masks, NIOSH approved, high fluid resistance, comfortable nose foam and elastic headbands.",
    gallery: [],
    specifications: { "Filtration Efficiency": ">= 95%", "Standard": "NIOSH N95", "Ply": "5-Ply" },
    packagingDetails: "50 pcs per box, 20 boxes per carton",
    shippingInfo: { port: "Chennai Port", transitTime: "2-3 Days", methods: ["Air Cargo", "Road Carrier"] },
    supplierProfile: { established: 2018, factorySize: "10,000 sqm", employees: 120, description: "MediSafe is an ISO 13485 certified manufacturer of medical PPE.", certificates: [], factoryImages: [] },
    reviews: []
  },
  {
    id: "PROD-MED-2",
    name: "Disposable Syringes with Needle (2ml)",
    category: "Medical Supplies",
    industry: "Medical",
    priceMin: 2.5,
    priceMax: 4.0,
    unit: "piece",
    moq: 20000,
    location: "Noida, Uttar Pradesh",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    supplierName: "LifeLine Medical Devices",
    supplierRating: 4.7,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 5,
    image: "/built for high/3.jpeg",
    description: "Sterile single-use 2ml syringes with 24G needles, luer mount slip, non-toxic, non-pyrogenic, clear barrel with bold scale markings.",
    gallery: [],
    specifications: { "Volume": "2ml", "Needle Gauge": "24G", "Sterilization": "EO Gas" },
    packagingDetails: "Individual blister pack, 100 pcs per box, 10 boxes per carton",
    shippingInfo: { port: "Dadri ICD", transitTime: "3-5 Days", methods: ["Road Carrier"] },
    supplierProfile: { established: 2012, factorySize: "15,000 sqm", employees: 150, description: "LifeLine Medical Devices is a premier disposable medical manufacturer.", certificates: [], factoryImages: [] },
    reviews: []
  }
];

export const AUTOMOTIVE_PRODUCTS: Product[] = [
  {
    id: "PROD-AUTO-1",
    name: "Semi-Metallic Disc Brake Pads Set",
    category: "Automotive Parts",
    industry: "Automotive",
    priceMin: 450,
    priceMax: 600,
    unit: "set",
    moq: 500,
    location: "Pune, Maharashtra",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    supplierName: "Apex Auto Components",
    supplierRating: 4.6,
    supplierType: "Manufacturer",
    tradeAssurance: true,
    gstVerified: true,
    msme: true,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 4,
    image: "/D2D market/6.jpeg",
    description: "High friction coefficient semi-metallic brake pads, low dust, silent braking performance, high thermal stability for commercial vehicles.",
    gallery: [],
    specifications: { "Material": "Semi-Metallic", "Coefficient of Friction": "0.42", "OEM Standard": "Yes" },
    packagingDetails: "1 set per individual brand box, 50 sets per outer carton",
    shippingInfo: { port: "JNPT Port", transitTime: "2-4 Days", methods: ["Road Transport"] },
    supplierProfile: { established: 2007, factorySize: "22,000 sqm", employees: 180, description: "Apex Auto Components is a major TS16949 automotive parts manufacturer.", certificates: [], factoryImages: [] },
    reviews: []
  },
  {
    id: "PROD-AUTO-2",
    name: "High-Tensile Steel Alloy Wheels (16 inch)",
    category: "Automotive Parts",
    industry: "Automotive",
    priceMin: 2200,
    priceMax: 2800,
    unit: "wheel",
    moq: 200,
    location: "Gurugram, Haryana",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
    supplierName: "WheelForce Alloys Ltd",
    supplierRating: 4.8,
    supplierType: "Exporter",
    tradeAssurance: true,
    gstVerified: true,
    msme: false,
    isoCertified: true,
    readyStock: true,
    deliveryTime: 6,
    image: "/D2D market/2.jpg",
    description: "Premium high-tensile strength alloy wheels, 16-inch size, multi-spoke design, powder-coated finish for corrosion protection.",
    gallery: [],
    specifications: { "Size": "16 x 6.5 J", "PCD": "5 x 114.3", "Material": "Aluminum Alloy A356.2" },
    packagingDetails: "1 pc per foam-protected carton",
    shippingInfo: { port: "Mundra Port", transitTime: "4-6 Days", methods: ["Rail Freight", "Road Carrier"] },
    supplierProfile: { established: 2010, factorySize: "30,000 sqm", employees: 220, description: "WheelForce Alloys is an OEM and aftermarket alloy wheel exporter.", certificates: [], factoryImages: [] },
    reviews: []
  }
];

interface IndustrySectionData {
  id: string;
  title: string;
  icon: string;
  description: string;
  products: Product[];
}

export default function IndustryCollections({
  onViewDetails,
  onQuote,
  onBuyNow,
  onChat,
}: IndustryCollectionsProps) {
  
  // Categorize MOCK_PRODUCTS and merge with custom additions
  const industrySections: IndustrySectionData[] = [
    {
      id: "construction",
      title: "Construction Materials & Steel",
      icon: "domain",
      description: "TMT steel rebars, structural cement, and uPVC pipe installations.",
      products: MOCK_PRODUCTS.filter(
        (p) => p.category === "Construction Materials" || p.industry === "Infrastructure"
      ),
    },
    {
      id: "machinery",
      title: "Industrial Machinery & Tools",
      icon: "construction",
      description: "Hydraulic gear pumps, high pressure valves, and site safety gear.",
      products: MOCK_PRODUCTS.filter((p) => p.category === "Machinery & Tools"),
    },
    {
      id: "electrical",
      title: "Electrical Grid & Power Components",
      icon: "electrical_services",
      description: "Transformers, super enamelled copper wires, and power systems.",
      products: MOCK_PRODUCTS.filter((p) => p.category === "Electronics & Electrical"),
    },
    {
      id: "chemicals",
      title: "Chemicals, Alkalis & Polymers",
      icon: "science",
      description: "High purity Caustic Soda flakes, LABSA 90% surfactant paste, and organics.",
      products: MOCK_PRODUCTS.filter((p) => p.category === "Chemicals & Plastics"),
    },
    {
      id: "packaging",
      title: "Industrial Packaging & Paper",
      icon: "package_2",
      description: "Heavy duty 5-ply corrugated cardboard carton boxes.",
      products: MOCK_PRODUCTS.filter((p) => p.category === "Packaging & Paper"),
    },
    {
      id: "agriculture",
      title: "Agriculture Sourcing & Irrigation",
      icon: "agriculture",
      description: "Irrigation piping systems, fertilizer composites, and organic cotton.",
      products: MOCK_PRODUCTS.filter(
        (p) => p.industry === "Agriculture" || p.category === "Textile & Apparel"
      ),
    },
    {
      id: "medical",
      title: "Medical Equipment & Surgical Supplies",
      icon: "medical_services",
      description: "NIOSH N95 respirator face masks, sterile disposable syringes, and PPE.",
      products: MEDICAL_PRODUCTS,
    },
    {
      id: "automotive",
      title: "Automotive Components & Alloy Wheels",
      icon: "minor_crash",
      description: "High performance semi-metallic brake pad sets and steel alloy wheels.",
      products: AUTOMOTIVE_PRODUCTS,
    },
  ];

  // Keep track of scroll refs for each carousel slider
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scroll = (id: string, direction: "left" | "right") => {
    const slider = sliderRefs.current[id];
    if (slider) {
      const scrollAmount = direction === "left" ? -300 : 300;
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white border-y border-outline-variant/30 py-12 px-s-md" id="industry-collections-section">
      <div className="max-w-s-container-max mx-auto space-y-12">
        
        {/* Main Section Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-headline-lg text-[22px] md:text-[26px] text-trade-navy font-black tracking-wide uppercase">
            Industry Collections
          </h2>
          <p className="text-[13px] text-secondary font-medium">
            Discover catalog items segmented by industrial sector to optimize business procurement schedules.
          </p>
        </div>

        {/* Industry Sliders List */}
        <div className="space-y-10">
          {industrySections.map((section) => (
            <div key={section.id} className="space-y-4">
              {/* Individual Industry Subheader */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-outline-variant/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-trade-orange text-[22px]">
                      {section.icon}
                    </span>
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-black uppercase tracking-wide">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-[11.5px] text-secondary/80 font-medium">
                    {section.description}
                  </p>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => scroll(section.id, "left")}
                    className="w-7 h-7 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <span className="material-symbols-outlined text-[14px]">chevron_left</span>
                  </button>
                  <button
                    onClick={() => scroll(section.id, "right")}
                    className="w-7 h-7 rounded-lg border border-outline-variant/40 flex items-center justify-center text-trade-navy hover:bg-surface-container active:scale-95 transition-all cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Slider Carousel */}
              <Carousel ref={(el) => { sliderRefs.current[section.id] = el; }}>
                {section.products.map((product) => (
                  <ProductCard
                    key={`${section.id}-${product.id}`}
                    product={product}
                    onViewDetails={onViewDetails}
                    onQuote={onQuote}
                    onBuyNow={onBuyNow}
                    onChat={onChat}
                  />
                ))}
              </Carousel>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
