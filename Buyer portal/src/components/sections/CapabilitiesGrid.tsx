"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    icon: "inventory",
    title: "Bulk Order Management",
    description: "Place and Manage large quantity orders with ease.",
  },
  {
    icon: "handshake",
    title: "Verified Suppliers network",
    description: "Source confidently from trusted and unified suppliers.",
  },
  {
    icon: "category",
    title: "Multiple Product Categories",
    description: "Explore Electronics, FMCG, Fashion, Industrial, Packaging and more.",
  },
  {
    icon: "trending_up",
    title: "Better Profit Margins",
    description: "Buy directly from suppliers and increase your Business porfitability.",
  },
  {
    icon: "local_shipping",
    title: "Fast Delivery Network",
    description: "Same-Day, Next-Day and Pan India delivery support.",
  },
  {
    icon: "manage_search",
    title: "Digital Product Discovery",
    description: "Search compare and discover products from thousands of suppliers.",
  },
  {
    icon: "insights",
    title: "Business Growth Support",
    description: "Expand your sourcing network and grow business faster.",
  },
  {
    icon: "shield",
    title: "Secure Business Transactions",
    description: "Safe payments and trusted order processing.",
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

export default function CapabilitiesGrid() {
  return (
    <section className="py-s-xl px-s-md bg-surface">
      <div className="max-w-s-container-max mx-auto flex flex-col items-center">
        <div className="w-full space-y-s-lg mb-8">
          <div className="space-y-s-xs">
            <h2 className="font-headline-lg text-headline-lg text-trade-navy">Direct B2B Marketplace</h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl leading-relaxed">
              TradeVistar is a unified B2B marketplace connecting retailers and distributors with verified manufacturers and suppliers.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s-md"
          >
            {capabilities.map((cap, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-s-md ghost-outline rounded-xl hover:bg-surface-container-low transition-colors group opacity-100 translate-y-0"
              >
                <span className="material-symbols-outlined text-trade-orange mb-s-md group-hover:scale-110 transition-transform">
                  {cap.icon}
                </span>
                <h4 className="font-headline-md text-[18px] mb-s-xs">{cap.title}</h4>
                <p className="font-body-md text-body-md text-secondary">{cap.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <a
          href="#"
          className="w-full sm:w-auto block sm:inline-block bg-trade-orange text-white px-12 py-4 rounded-xl font-bold text-base hover:bg-trade-orange/90 transition-all hover:translate-y-[-2px] active:scale-95 shadow-md text-center cursor-pointer"
        >
          View Documentation
        </a>
      </div>
    </section>
  );
}
