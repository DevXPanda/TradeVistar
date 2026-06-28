"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    rating: 5,
    quote:
      "TradeVistar has reduced our procurement cycle by 40%. The ability to compare verified quotes instantly is a game-changer for our manufacturing units.",
    author: "Anish Mehta",
    role: "Head of Supply Chain, Zenith Motors",
  },
  {
    rating: 5,
    quote:
      "As a seller, the export credits and protected payment gateway have allowed us to scale into the European market with absolute confidence.",
    author: "Sarah Jenkins",
    role: "Managing Director, Global Fabrics",
  },
  {
    rating: 5,
    quote:
      "The transparency layer is what sets them apart. We no longer worry about vendor reliability or hidden logistics costs.",
    author: "Vikram Singh",
    role: "VP Procurement, TechCorp Solutions",
  },
];

export default function Testimonials() {
  return (
    <section className="py-s-xl px-s-md bg-surface overflow-hidden">
      <div className="max-w-s-container-max mx-auto space-y-s-lg">
        <h2 className="font-headline-lg text-headline-lg text-center text-trade-navy">Voices of the Network</h2>
        <div className="flex gap-s-md overflow-x-auto pb-s-lg snap-x scroll-smooth hide-scrollbar">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[350px] flex-1 snap-center p-s-lg glass ghost-outline rounded-2xl space-y-s-md transition-all duration-700 opacity-100 translate-y-0"
            >
              <div className="flex text-trade-orange">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="material-symbols-outlined">
                    star
                  </span>
                ))}
              </div>
              <p className="font-body-md text-body-md text-secondary italic">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-s-sm">
                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                <div>
                  <p className="font-bold text-sm">{t.author}</p>
                  <p className="text-xs text-secondary">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
