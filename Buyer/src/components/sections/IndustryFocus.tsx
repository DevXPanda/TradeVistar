"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const sectors = [
  {
    category: "Hardware",
    title: "House Hardware Materials & Fittings",
    image: "/built for high/5.jpeg",
    icon: "sensor_door",
    circleColor: "bg-[#0284c7]",
  },
  {
    category: "Electrical",
    title: "House Electrical Materials & Supplies",
    image: "/built for high/8.jpeg",
    icon: "bolt",
    circleColor: "bg-[#ea580c]",
  },
  {
    category: "Apparel",
    title: "Apparel, Garments & Textiles",
    image: "/built for high/3.jpeg",
    icon: "checkroom",
    circleColor: "bg-[#8b5cf6]",
  },
  {
    category: "Machinery",
    title: "Industrial Machinery & Gears",
    image: "/built for high/4.jpeg",
    icon: "precision_manufacturing",
    circleColor: "bg-[#e11d48]",
  },
  {
    category: "Toys",
    title: "Kids Toys & Games Products",
    image: "/built for high/6.jpeg",
    icon: "toys",
    circleColor: "bg-[#db2777]",
  },
  {
    category: "Packaging",
    title: "Packaging Materials & Machinery",
    image: "/built for high/1.jpeg",
    icon: "inventory",
    circleColor: "bg-[#0284c7]",
  },
  {
    category: "Chemicals",
    title: "Chemicals, Dyes, Solvents & Allied Products",
    image: "/built for high/2.jpeg",
    icon: "science",
    circleColor: "bg-[#16a34a]",
  },
  {
    category: "Construction",
    title: "Building Construction Material & Equipment",
    image: "/built for high/7.jpeg",
    icon: "construction",
    circleColor: "bg-[#d97706]",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function IndustryFocus() {
  return (
    <section className="py-s-xl px-s-md bg-surface-container-low">
      <div className="max-w-s-container-max mx-auto space-y-s-lg">
        <h2 className="text-headline-lg text-trade-navy text-center">
          Built for High-Growth Sectors
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-s-md"
        >
          {sectors.map((sec, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] h-full"
            >
              {/* Product Image Frame - natural aspect ratio */}
              <div className="bg-white w-full overflow-hidden relative border-b border-slate-50">
                <Image
                  alt={sec.title}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-500"
                  src={sec.image}
                  width={300}
                  height={200}
                  priority={index < 4}
                />
              </div>

              {/* Icon and Title below Image */}
              <div className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3 bg-white flex-grow">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${sec.circleColor} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                  <span className="material-symbols-outlined text-[16px] sm:text-[20px]">
                    {sec.icon}
                  </span>
                </div>
                <h5 className="text-trade-navy font-bold text-[12px] sm:text-[14px] leading-tight group-hover:text-trade-orange transition-colors">
                  {sec.title}
                </h5>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
