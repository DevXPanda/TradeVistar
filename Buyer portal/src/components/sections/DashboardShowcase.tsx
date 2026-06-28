"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardShowcase() {
  return (
    <section className="py-s-xl px-s-md bg-surface relative">
      <div className="max-w-s-container-max mx-auto text-center space-y-s-lg">
        <div className="space-y-s-xs">
          <h2 className="text-headline-lg text-trade-navy">India&apos;s Next Generation B2B Marketplace</h2>
          <p className="text-secondary max-w-2xl mx-auto text-body-md">
            Connecting manufacturers, Suppliers, Wholesalers, Retailers and Resellers and Business buyers through one powerful digital ecosystem.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl overflow-hidden relative"
        >
          <Image
            alt="TradeVistar Enterprise Banner"
            className="w-full h-auto"
            src="/enterprizes/b2b.jpeg"
            width={1280}
            height={720}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
