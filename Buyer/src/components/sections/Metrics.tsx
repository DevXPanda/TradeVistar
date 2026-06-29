"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "₹35,000 Cr+", label: "Trade Volume Facilitated" },
  { value: "85k+", label: "Verified Suppliers" },
  { value: "120+", label: "Countries Active" },
  { value: "99.9%", label: "Transaction Security" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export default function Metrics() {
  return (
    <section className="py-s-xl px-s-md bg-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-s-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-s-lg text-center"
      >
        {metrics.map((metric, index) => (
          <motion.div key={index} variants={itemVariants} className="space-y-s-xs">
            <span className="text-display-lg block">{metric.value}</span>
            <p className="text-label-caps text-secondary text-[10px] uppercase tracking-wider">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
