"use client";

import React from "react";

export default function WhyChooseTradeVistar() {
  const choiceCards = [
    {
      title: "Verified Infrastructure",
      description: "We inspect factory floors, machinery capabilities, and warehouse storage arrays on-site.",
      icon: "fact_check",
    },
    {
      title: "Escrow Protection",
      description: "Payments are locked securely in escrow accounts until cargo matches buyer compliance.",
      icon: "security",
    },
    {
      title: "Low MOQ Sourcing",
      description: "Access direct manufacturer rates with flexible enterprise minimum order requirements.",
      icon: "shopping_basket",
    },
    {
      title: "Pan-India Logistics",
      description: "Seamless multimodal container transport across states with custom clearances.",
      icon: "local_shipping",
    },
  ];

  return (
    <section className="bg-white py-12 px-s-md border-y border-outline-variant/20" id="why-choose-section">
      <div className="max-w-s-container-max mx-auto space-y-8">
        
        {/* Title Block */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-headline-lg text-[20px] md:text-[24px] text-trade-navy font-black tracking-wide uppercase">
            Why Businesses Choose TradeVistar
          </h2>
          <p className="text-[13px] text-secondary font-medium">
            We align industrial sourcing with security, verification parameters, and wholesale convenience.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {choiceCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs"
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
              </div>

              {/* Text Content */}
              <div className="space-y-1">
                <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                  {card.title}
                </h3>
                <p className="text-[11.5px] text-secondary leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
