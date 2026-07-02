"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const float = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
};

export function GlobalTradeIllustration() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gt-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path d="M40 90 C 110 40, 180 130, 250 100" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="3 4" />
      <path d="M250 100 C 300 85, 340 50, 375 70" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="3 4" />
      <path d="M250 100 C 210 150, 150 145, 105 190" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeDasharray="3 4" />
      <circle cx="250" cy="100" r="4" fill="#FC9D05" />
      <circle cx="40" cy="90" r="3" fill="#fff" />
      <circle cx="375" cy="70" r="3" fill="#fff" />
      <circle cx="105" cy="190" r="3" fill="#fff" />
      {/* Cargo ship */}
      <g>
        <path d="M120 205 L280 205 L262 232 L138 232 Z" fill="url(#gt-panel)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <rect x="150" y="178" width="26" height="24" rx="2" fill="#0399ED" fillOpacity="0.8" />
        <rect x="180" y="172" width="26" height="30" rx="2" fill="#FC9D05" fillOpacity="0.85" />
        <rect x="210" y="180" width="26" height="22" rx="2" fill="#1E932D" fillOpacity="0.8" />
        <rect x="240" y="176" width="22" height="26" rx="2" fill="#ffffff" fillOpacity="0.7" />
      </g>
      {/* Plane */}
      <path d="M300 55 L330 45 L322 55 L332 60 L300 62 Z" fill="#ffffff" fillOpacity="0.85" />
    </svg>
  );
}

export function VerifiedBuyersIllustration() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vb-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="90" y="55" width="220" height="150" rx="18" fill="url(#vb-card)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <circle cx="150" cy="110" r="26" fill="#ffffff" fillOpacity="0.15" />
      <circle cx="150" cy="110" r="26" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="168" cy="128" r="11" fill="#1E932D" />
      <path d="M163 128 L167 132 L174 124" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="195" y="98" width="90" height="8" rx="4" fill="#ffffff" fillOpacity="0.55" />
      <rect x="195" y="114" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />
      <rect x="115" y="155" width="70" height="20" rx="10" fill="#FC9D05" fillOpacity="0.9" />
      <rect x="195" y="155" width="90" height="20" rx="10" fill="#ffffff" fillOpacity="0.12" />
      <rect x="195" y="155" width="90" height="20" rx="10" stroke="#ffffff" strokeOpacity="0.4" />
    </svg>
  );
}

export function EscrowIllustration() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="es-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FC9D05" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FC9D05" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="120" r="90" fill="url(#es-glow)" />
      {/* Seller node */}
      <circle cx="80" cy="130" r="24" fill="#ffffff" fillOpacity="0.14" stroke="rgba(255,255,255,0.4)" />
      <circle cx="80" cy="122" r="8" fill="#ffffff" fillOpacity="0.7" />
      <path d="M65 145 q15 -14 30 0" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" fill="none" />
      {/* Buyer node */}
      <circle cx="320" cy="130" r="24" fill="#ffffff" fillOpacity="0.14" stroke="rgba(255,255,255,0.4)" />
      <circle cx="320" cy="122" r="8" fill="#ffffff" fillOpacity="0.7" />
      <path d="M305 145 q15 -14 30 0" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="2" fill="none" />
      {/* Flow lines */}
      <path d="M104 130 L166 130" stroke="#ffffff" strokeOpacity="0.4" strokeDasharray="4 4" />
      <path d="M234 130 L296 130" stroke="#ffffff" strokeOpacity="0.4" strokeDasharray="4 4" />
      {/* Vault / shield */}
      <path d="M200 78 L236 92 V130 C236 158 220 175 200 182 C180 175 164 158 164 130 V92 Z" fill="#ffffff" fillOpacity="0.16" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M186 128 L196 138 L216 114" stroke="#FC9D05" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AIGrowthIllustration() {
  const bars = [40, 65, 50, 85, 70, 100];
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ai-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect x="70" y="50" width="260" height="160" rx="16" fill="url(#ai-panel)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <rect x="92" y="70" width="60" height="8" rx="4" fill="#ffffff" fillOpacity="0.5" />
      <circle cx="300" cy="74" r="10" fill="#0399ED" fillOpacity="0.8" />
      <path d="M296 74 l3 3 l6 -7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={95 + i * 35}
          y={185 - h}
          width="18"
          height={h}
          rx="3"
          fill={i === bars.length - 1 ? "#FC9D05" : "#ffffff"}
          fillOpacity={i === bars.length - 1 ? 0.95 : 0.35}
        />
      ))}
    </svg>
  );
}

export function SuccessIllustration() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 190 L130 140 L190 165 L260 90 L340 60" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 5" fill="none" />
      <circle cx="340" cy="60" r="4" fill="#FC9D05" />
      {/* Trophy */}
      <g>
        <rect x="176" y="150" width="48" height="14" rx="3" fill="#ffffff" fillOpacity="0.2" />
        <rect x="192" y="128" width="16" height="24" fill="#ffffff" fillOpacity="0.5" />
        <path d="M162 90 h76 v18 c0 24 -17 40 -38 40 c-21 0 -38 -16 -38 -40 Z" fill="#ffffff" fillOpacity="0.18" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" />
        <path d="M162 96 c-14 0 -22 10 -22 22 c0 10 8 18 20 20" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
        <path d="M238 96 c14 0 22 10 22 22 c0 10 -8 18 -20 20" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
        <path d="M186 115 l10 12 l18 -22" stroke="#FC9D05" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function FloatingWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div animate={float.animate} transition={float.transition} className="w-full h-full">
      {children}
    </motion.div>
  );
}
