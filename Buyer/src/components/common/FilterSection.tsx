"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSectionProps {
  title: string;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export default function FilterSection({
  title,
  isCollapsible = true,
  defaultExpanded = true,
  children,
}: FilterSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-outline-variant/20 pb-3">
      <button
        type="button"
        onClick={() => isCollapsible && setExpanded(!expanded)}
        className="w-full flex justify-between items-center py-1 text-left text-trade-navy font-bold text-[12px] uppercase tracking-wider hover:text-trade-orange transition-colors cursor-pointer"
        disabled={!isCollapsible}
      >
        <span>{title}</span>
        {isCollapsible && (
          <span
            className="material-symbols-outlined text-[18px] transition-transform duration-200"
            style={{ transform: expanded ? "none" : "rotate(-90deg)" }}
          >
            expand_more
          </span>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-1.5 pt-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
