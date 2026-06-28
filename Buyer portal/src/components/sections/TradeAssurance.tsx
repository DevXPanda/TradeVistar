"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TradeAssurance() {
  return (
    <section className="py-s-xl px-s-md bg-surface-container-lowest">
      <div className="max-w-s-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-s-lg items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden aspect-square"
        >
          <Image
            alt="Trade Assurance"
            className="w-full h-full object-cover"
            src="/footer side/7th poster.png"
            width={512}
            height={512}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass p-s-md rounded-2xl flex items-center gap-s-md border border-white/50">
              <span className="material-symbols-outlined text-4xl text-trade-orange">verified_user</span>
              <div>
                <p className="font-bold text-trade-navy text-body-md">Escrow Guaranteed</p>
                <p className="text-xs text-secondary">Zero-risk settlement</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-s-md"
        >
          <h2 className="text-headline-lg text-trade-navy">Enterprise Trade Assurance</h2>
          <p className="text-secondary text-body-lg">
            Every transaction on TradeVistar is backed by a multi-layered protection framework. We sit in the middle of your trade to ensure both parties fulfill their obligations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-md pt-s-sm">
            <div className="space-y-s-xs">
              <h4 className="font-bold flex items-center gap-s-xs text-body-md">
                <span className="material-symbols-outlined text-trade-orange text-sm">shield</span> Inspection Layer
              </h4>
              <p className="text-sm text-secondary text-body-md">
                Third-party QC agents verify quality at the factory before shipment.
              </p>
            </div>
            <div className="space-y-s-xs">
              <h4 className="font-bold flex items-center gap-s-xs text-body-md">
                <span className="material-symbols-outlined text-trade-orange text-sm">security</span> Payment Escrow
              </h4>
              <p className="text-sm text-secondary text-body-md">
                Funds are held in neutral bank accounts until delivery confirmation.
              </p>
            </div>
            <div className="space-y-s-xs">
              <h4 className="font-bold flex items-center gap-s-xs text-body-md">
                <span className="material-symbols-outlined text-trade-orange text-sm">gavel</span> Dispute Resolution
              </h4>
              <p className="text-sm text-secondary text-body-md">
                Fast-track mediation managed by industry trade experts.
              </p>
            </div>
            <div className="space-y-s-xs">
              <h4 className="font-bold flex items-center gap-s-xs text-body-md">
                <span className="material-symbols-outlined text-trade-orange text-sm">contract</span> Smart Contracts
              </h4>
              <p className="text-sm text-secondary text-body-md">
                Terms are encoded into digital ledger for immutable record keeping.
              </p>
            </div>
          </div>
          <div className="pt-s-md">
            <button className="w-full bg-trade-orange text-white px-6 py-4 rounded-lg font-bold font-label-sm hover:bg-trade-orange/90 transition-all active:scale-95 cursor-pointer">
              Learn About Assurance
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
