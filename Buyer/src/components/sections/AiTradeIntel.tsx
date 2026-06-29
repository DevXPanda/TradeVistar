"use client";

import { motion } from "framer-motion";

export default function AiTradeIntel() {
  return (
    <section className="py-s-xl px-s-md bg-trade-navy text-on-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-trade-orange/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-s-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-s-lg items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-s-md"
        >
          <div className="inline-flex items-center gap-s-xs px-3 py-1 bg-white/10 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-[14px] text-trade-orange">auto_awesome</span>
            <span className="text-label-caps text-[10px] tracking-widest uppercase">Proprietary AI Engine</span>
          </div>
          <h2 className="text-headline-lg">Intelligence that Drives Trade</h2>
          <p className="text-on-primary-container text-body-lg leading-relaxed">
            Our TradeVistar AI analyzes millions of data points to ensure your supply chain is resilient and cost-effective.
          </p>
          <div className="space-y-s-sm pt-s-md">
            <div className="flex items-start gap-s-md p-s-md bg-white/5 rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-trade-orange">hub</span>
              <div>
                <h4 className="font-bold mb-s-xs">Smart Supplier Matching</h4>
                <p className="text-body-md text-on-primary-container">
                  Dynamic matching based on historical fulfillment data, credit rating, and capacity.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-s-md p-s-md bg-white/5 rounded-xl border border-white/10">
              <span className="material-symbols-outlined text-trade-orange">insights</span>
              <div>
                <h4 className="font-bold mb-s-xs">Automated Quote Analysis</h4>
                <p className="text-body-md text-on-primary-container">
                  Instant anomaly detection in pricing and automated negotiation suggestions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-2xl border border-white/10 p-s-md bg-white/5 backdrop-blur-md">
            <div className="space-y-s-md">
              <div className="flex justify-between items-center border-b border-white/10 pb-s-sm">
                <span className="text-label-caps">AI Analysis Report #TV-882</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-[10px]">OPTIMIZED</span>
              </div>
              <div className="h-48 flex items-end gap-s-xs">
                {/* Bar 1 */}
                <div className="flex-1 h-full flex items-end">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="w-full bg-trade-orange/40 rounded-t-sm"
                  />
                </div>
                {/* Bar 2 */}
                <div className="flex-1 h-full flex items-end">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="w-full bg-trade-orange/60 rounded-t-sm"
                  />
                </div>
                {/* Bar 3 */}
                <div className="flex-1 h-full flex items-end">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "45%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="w-full bg-trade-orange/40 rounded-t-sm"
                  />
                </div>
                {/* Bar 4 */}
                <div className="flex-1 h-full flex items-end">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="w-full bg-trade-orange rounded-t-sm"
                  />
                </div>
                {/* Bar 5 */}
                <div className="flex-1 h-full flex items-end">
                  <motion.div
                    initial={{ height: "0%" }}
                    whileInView={{ height: "70%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="w-full bg-trade-orange/40 rounded-t-sm"
                  />
                </div>
              </div>
              <p className="text-label-sm text-on-primary-container">
                Prediction: Supply risk decreased by <span className="text-trade-orange font-bold">14.2%</span> through vendor diversification.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
