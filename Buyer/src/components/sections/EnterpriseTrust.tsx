"use client";

import React, { useState, useEffect } from "react";

interface CounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

function AnimatedCounter({ target, duration = 1500, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = target;
    if (start === end) return;

    const totalFrames = Math.round(duration / 16.7);
    const increment = end / totalFrames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const nextValue = Math.round(increment * currentFrame);
      if (nextValue >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextValue);
      }
    }, 16.7);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

interface ChoiceCard {
  title: string;
  icon: string;
  description: string;
}

export default function EnterpriseTrust() {
  const choiceCards: ChoiceCard[] = [
    {
      title: "Fast Procurement",
      icon: "speed",
      description: "Direct request workflows that complete catalog bidding and dispatch inside 48 hours.",
    },
    {
      title: "Verified Suppliers",
      icon: "verified",
      description: "Physical industrial factory checks, GST validations, and quality assurance audits.",
    },
    {
      title: "Trade Assurance",
      icon: "shield",
      description: "Escrow payment locks securing complete compliance and on-time shipping agreements.",
    },
    {
      title: "Bulk Pricing",
      icon: "sell",
      description: "Tiered wholesale quotes directly from manufacturers, eliminating broker commissions.",
    },
    {
      title: "Secure Payments",
      icon: "credit_card",
      description: "Escrow locks supporting commercial NEFT, credit channels, and digital payments.",
    },
    {
      title: "Dedicated Support",
      icon: "support_agent",
      description: "Personal account manager coordination for logistics tracking and RFQ details.",
    },
    {
      title: "Fast Delivery",
      icon: "local_shipping",
      description: "Integrated road, rail, and sea port logistic corridors to transport high tonnage goods.",
    },
    {
      title: "GST Ready",
      icon: "receipt_long",
      description: "Automated HSN code matching on invoices to claim Instant Input Tax Credit (ITC).",
    },
  ];

  return (
    <section className="bg-background py-10 px-s-md border-b border-outline-variant/30" id="enterprise-trust-section">
      <div className="max-w-s-container-max mx-auto space-y-12">
        
        {/* Animated Platform Stats */}
        <div className="bg-white border border-outline-variant/20 rounded-2xl p-6 md:p-8 shadow-xs grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="space-y-1">
            <span className="block text-[24px] md:text-[28px] font-black text-trade-navy leading-none">
              <AnimatedCounter target={15000} suffix="+" />
            </span>
            <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
              Verified Suppliers
            </span>
          </div>

          <div className="space-y-1 border-l border-outline-variant/10 md:border-l-0 lg:border-l">
            <span className="block text-[24px] md:text-[28px] font-black text-trade-navy leading-none">
              <AnimatedCounter target={250000} suffix="+" />
            </span>
            <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
              Active Products
            </span>
          </div>

          <div className="space-y-1 border-l border-outline-variant/10">
            <span className="block text-[24px] md:text-[28px] font-black text-trade-navy leading-none">
              <AnimatedCounter target={450} suffix="+" />
            </span>
            <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
              Cities Serviced
            </span>
          </div>

          <div className="space-y-1 border-l border-outline-variant/10 md:border-l-0 lg:border-l">
            <span className="block text-[24px] md:text-[28px] font-black text-trade-navy leading-none">
              <AnimatedCounter target={120000} suffix="+" />
            </span>
            <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
              Orders Completed
            </span>
          </div>

          <div className="space-y-1 border-l border-outline-variant/10">
            <span className="block text-[24px] md:text-[28px] font-black text-trade-navy leading-none">
              <AnimatedCounter target={750} prefix="₹" suffix="+ Cr" />
            </span>
            <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
              Transactions
            </span>
          </div>

          <div className="space-y-1 border-l border-outline-variant/10">
            <span className="block text-[24px] md:text-[28px] font-black text-trade-navy leading-none">
              <AnimatedCounter target={120} suffix="+" />
            </span>
            <span className="text-[11px] text-secondary font-bold uppercase tracking-wider">
              Countries
            </span>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="space-y-8">
          {/* Subsection Title */}
          <div className="text-center space-y-2">
            <h2 className="font-headline-lg text-[20px] md:text-[24px] text-trade-navy font-black tracking-wide uppercase">
              Why Businesses Choose TradeVistar
            </h2>
            <p className="text-[13px] text-secondary font-medium max-w-xl mx-auto">
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
                  <span className="material-symbols-outlined text-[20px]">
                    {card.icon}
                  </span>
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
