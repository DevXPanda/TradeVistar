"use client";

import React from "react";
import { motion } from "framer-motion";
import TopNavBar from "@/components/sections/TopNavBar";
import Footer from "@/components/sections/Footer";
import HeroCarousel from "@/components/seller-register/HeroCarousel";
import RegisterForm from "@/components/seller-register/RegisterForm";
import { Badge } from "@/components/ui/badge";
import AnimatedNumber from "@/components/common/AnimatedNumber";

const trustStats = [
  { value: "50K+", label: "Verified Suppliers", color: "text-primary-blue" },
  { value: "190+", label: "Countries Served", color: "text-[#034FA6]" },
  { value: "1M+", label: "Products Listed", color: "text-primary-green" },
  { value: "24×7", label: "Seller Support", color: "text-primary-orange" },
];

const features = [
  {
    icon: "bolt",
    title: "0% Setup Fees",
    desc: "Start selling with zero listing or setup cost.",
  },
  {
    icon: "security",
    title: "Escrow Protection",
    desc: "Payments held securely until delivery is confirmed.",
  },
  {
    icon: "insights",
    title: "AI Growth Tools",
    desc: "Smart pricing and demand forecasting built in.",
  },
  {
    icon: "support_agent",
    title: "Dedicated Support",
    desc: "A named account manager for every seller.",
  },
];

export default function SellerRegisterPage() {
  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col">
      <TopNavBar />

      <main className="flex-grow pt-[78px]">
        <section className="relative py-12 md:py-16 px-s-md bg-white overflow-hidden">
          <div className="max-w-s-container-max mx-auto relative z-10 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left: intro + carousel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="lg:col-span-7 space-y-8 order-2 lg:order-1"
              >
                <div className="space-y-4">
                  <Badge>Seller Registration</Badge>
                  <h1 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold leading-tight tracking-tight">
                    Grow your export business with TradeVistar
                  </h1>
                  <p className="text-secondary text-sm leading-relaxed max-w-md">
                    Join 50,000+ verified exporters selling to enterprise buyers in 190+ countries — with escrow-protected payments and AI-powered growth tools.
                  </p>
                </div>

                <HeroCarousel />
              </motion.div>

              {/* Right: multi-step registration form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24"
              >
                <RegisterForm />
              </motion.div>
            </div>

            {/* Feature highlights — single row, equal-width cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                  className="bg-white border border-outline-variant/15 rounded-2xl p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-blue/5 text-primary-blue flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{f.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[13px] text-trade-navy">{f.title}</h4>
                    <p className="text-[11.5px] text-secondary leading-relaxed mt-1">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated trust stats strip */}
        <section className="bg-white border-y border-outline-variant/10 py-10 px-s-md">
          <div className="max-w-s-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="flex flex-col items-center text-center"
              >
                <span className={`font-black text-2xl sm:text-3xl tracking-tight ${s.color}`}>
                  <AnimatedNumber value={s.value} />
                </span>
                <span className="text-[11px] text-secondary font-bold uppercase tracking-wider mt-1">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
