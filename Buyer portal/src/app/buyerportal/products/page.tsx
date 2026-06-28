"use client";

import React, { useState } from "react";

export default function ProductsPage() {
  const [cartCount, setCartCount] = useState(0);
  const products = [
    { name: "Heavy Duty Hydraulic Cylinder", price: "₹24,500", moq: "5 Units", specs: "200mm Stroke, 500 Bar", tag: "Hydraulics" },
    { name: "Stainless Steel Pipe Elbow 90°", price: "₹850", moq: "50 Units", specs: "ANSI Grade, 3-inch", tag: "Hardware" },
    { name: "High Torque Electric Motor AC", price: "₹48,200", moq: "2 Units", specs: "15 HP, 3-Phase, 1440 RPM", tag: "Electrical" },
    { name: "Pneumatic Solenoid Control Valve", price: "₹3,400", moq: "10 Units", specs: "5/2 Way, 24V DC", tag: "Pneumatics" },
    { name: "Industrial Nitrile Seal O-Ring Kit", price: "₹1,200", moq: "20 Kits", specs: "Assorted sizes, high-temp", tag: "Hardware" },
    { name: "Reinforced Rubber Pressure Hose", price: "₹450 / m", moq: "100 Meters", specs: "WP 20 Bar, ID 1/2 inch", tag: "Pneumatics" },
  ];

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-s-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Supplies Product Catalog</h1>
          <p className="font-body-md text-secondary mt-1">Browse commercial parts, industrial catalog listings, and order directly.</p>
        </div>
        <div className="flex items-center gap-s-sm bg-white border border-outline-variant px-4 py-2.5 rounded-lg shadow-sm w-fit font-label-sm font-bold text-trade-navy">
          <span className="material-symbols-outlined text-[20px] text-trade-orange">shopping_cart</span>
          Catalog Cart: {cartCount} items
        </div>
      </div>

      {/* Grid List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-s-md">
        {products.map((prod, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm hover:border-trade-orange hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
          >
            <div>
              <span className="px-2 py-0.5 bg-trade-navy/5 text-trade-navy text-[10px] font-bold rounded uppercase tracking-wider">
                {prod.tag}
              </span>
              <h4 className="font-headline-md text-base text-trade-navy font-bold mt-2 leading-snug">{prod.name}</h4>
              <p className="text-[12px] text-secondary mt-1 font-medium italic">{prod.specs}</p>
              <div className="mt-4 flex justify-between items-baseline">
                <span className="text-xl font-bold text-trade-navy">{prod.price}</span>
                <span className="text-[11px] text-secondary">MOQ: {prod.moq}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCartCount((c) => c + 1);
                alert(`${prod.name} added to cart!`);
              }}
              className="w-full py-2 bg-trade-navy hover:bg-trade-orange text-white text-[12px] font-bold rounded transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
              Add to Procurement Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
