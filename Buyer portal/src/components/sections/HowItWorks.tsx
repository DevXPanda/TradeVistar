"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Post RFQ",
    description: "Define your needs and broadcast to verified suppliers.",
    active: true,
  },
  {
    number: "2",
    title: "Compare",
    description: "Analyze multiple quotes side-by-side with AI help.",
    active: false,
  },
  {
    number: "3",
    title: "Order",
    description: "Convert best quote to a legally binding purchase order.",
    active: false,
  },
  {
    number: "4",
    title: "Track",
    description: "Real-time GPS visibility for your freight movements.",
    active: false,
  },
  {
    number: "5",
    title: "Release",
    description: "Approve payment only after cargo verification.",
    active: false,
  },
  {
    number: "6",
    title: "Scale",
    description: "Unlock credit lines based on your trade history.",
    active: false,
  },
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
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HowItWorks() {
  return (
    <section className="py-s-xl px-s-md bg-surface">
      <div className="max-w-s-container-max mx-auto space-y-s-lg">
        <div className="text-center space-y-s-xs">
          <h2 className="text-headline-lg text-trade-navy">
            Seamless Trade Lifecycle
          </h2>
          <p className="text-secondary max-w-2xl mx-auto text-body-md">
            From discovery to fulfillment, we manage every layer of your enterprise procurement.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-s-gutter"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group p-s-md hover:bg-surface-container-lowest rounded-xl transition-all border border-transparent hover:border-outline-variant/20"
            >
              {step.active ? (
                <div className="w-12 h-12 rounded-full bg-trade-orange text-white flex items-center justify-center mx-auto mb-s-sm font-bold shadow-sm group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-surface-variant text-trade-navy flex items-center justify-center mx-auto mb-s-sm font-bold group-hover:bg-trade-orange group-hover:text-on-primary transition-all">
                  {step.number}
                </div>
              )}
              <h3 className="text-headline-md mb-s-xs">{step.title}</h3>
              <p className="text-secondary text-[12px] leading-snug">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
