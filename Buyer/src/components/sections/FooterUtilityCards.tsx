"use client";

import React from "react";

interface UtilityCard {
  title: string;
  icon: string;
  linkId: string;
}

export default function FooterUtilityCards() {
  const cards: UtilityCard[] = [
    {
      title: "About us",
      icon: "domain",
      linkId: "about-us",
    },
    {
      title: "Contact Us",
      icon: "support_agent",
      linkId: "contact-us",
    },
    {
      title: "FAQ",
      icon: "question_answer",
      linkId: "faq",
    },
    {
      title: "Blog",
      icon: "article",
      linkId: "blog",
    },
  ];

  return (
    <section className="bg-slate-50/50 py-8 px-s-md border-t border-b border-outline-variant/15" id="footer-utility-cards-section">
      <div className="max-w-s-container-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => {
              // Smooth scroll to relevant elements on the page if they exist
              if (card.linkId === "blog") {
                document.getElementById("latest-blogs-section")?.scrollIntoView({ behavior: "smooth" });
              } else if (card.linkId === "faq") {
                document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" });
              } else {
                // Fallback to top scroll
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="bg-white border border-outline-variant/15 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3.5 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            {/* Filled Large Icon */}
            <span
              className="material-symbols-outlined text-trade-navy group-hover:text-trade-orange text-[48px] transition-colors"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              {card.icon}
            </span>

            {/* Title */}
            <h3 className="font-display-lg text-[14px] font-black text-trade-navy tracking-tight group-hover:text-trade-orange transition-colors">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
