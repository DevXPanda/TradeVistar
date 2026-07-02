"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "@/components/auth/LoginModal";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  key: string;
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { key: "sell-globally", label: "Sell Globally", href: "#why-sell" },
  {
    key: "solutions",
    label: "Solutions",
    dropdown: [
      { label: "Export Wholesale", href: "#why-sell" },
      { label: "B2B Escrow Settlements", href: "#why-sell" },
      { label: "Integrated Freight Logistics", href: "#why-sell" },
    ],
  },
  { key: "pricing", label: "Pricing", href: "#pricing-calculator" },
  {
    key: "resources",
    label: "Resources",
    dropdown: [
      { label: "Seller Success Guide", href: "#testimonials" },
      { label: "Pricing & Commissions", href: "#pricing-calculator" },
      { label: "Compliance & KYC", href: "#faq" },
    ],
  },
  {
    key: "support",
    label: "Support",
    dropdown: [
      { label: "Help Center", href: "#faq" },
      { label: "Contact Specialist", href: "#register" },
      { label: "API Documentation", href: "#" },
    ],
  },
];

export default function TopNavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-[78px] px-6 lg:px-10 flex items-center border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-md border-outline-variant/15"
          : "bg-white shadow-sm border-outline-variant/10"
      }`}
    >
      <div className="max-w-s-container-max mx-auto w-full grid grid-cols-[auto_1fr_auto] items-center gap-6">
        {/* Logo & Mobile Menu Toggle */}
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden bg-slate-50 hover:bg-slate-100 text-trade-navy rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-colors focus:outline-none mr-3 flex-shrink-0"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              alt="TradeVistar Logo"
              className="h-9 md:h-10 w-auto object-contain"
              src="/logo/tradevistar.png"
              width={168}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Navigation Links & Dropdowns - Desktop (centered) */}
        <div
          className="hidden md:flex items-center justify-center gap-9 h-full"
          onMouseLeave={() => setActiveHover(null)}
        >
          {navItems.map((item) => (
            <div
              key={item.key}
              className="relative h-full flex items-center"
              onMouseEnter={() => setActiveHover(item.key)}
            >
              {item.dropdown ? (
                <button className="text-secondary hover:text-trade-navy text-[13.5px] font-bold transition-colors cursor-pointer flex items-center gap-0.5 h-full focus:outline-none">
                  <span>{item.label}</span>
                  <span className="material-symbols-outlined text-[15px]">keyboard_arrow_down</span>
                </button>
              ) : (
                <Link
                  href={item.href!}
                  className="text-secondary hover:text-trade-navy text-[13.5px] font-bold transition-colors cursor-pointer flex items-center h-full"
                >
                  {item.label}
                </Link>
              )}

              {activeHover === item.key && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-primary-orange rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}

              {item.dropdown && (
                <AnimatePresence>
                  {activeHover === item.key && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-[220px] bg-white border border-outline-variant/15 rounded-xl shadow-xl z-50 py-2"
                    >
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="block px-4 py-2.5 text-[12.5px] text-left text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue transition-colors"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="text-primary-blue hover:text-secondary-blue hover:bg-primary-blue/5 font-bold text-[13px] px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Login
          </button>
          <Link
            href="/seller/register"
            className="group inline-flex items-center gap-1.5 bg-gradient-to-r from-primary-orange to-[#FC9D05] text-white font-bold text-[13px] px-6 py-3 rounded-xl shadow-md shadow-primary-orange/20 hover:shadow-lg hover:shadow-primary-orange/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Start Selling
            <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Action Buttons - Mobile */}
        <div className="md:hidden flex items-center gap-2 justify-self-end">
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="text-primary-blue hover:text-secondary-blue font-bold text-[12px] px-2 py-1.5 transition-colors cursor-pointer"
          >
            Login
          </button>
          <Link
            href="/seller/register"
            className="bg-gradient-to-r from-primary-orange to-[#FC9D05] text-white font-bold text-[12px] px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Start Selling
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Drawer Content */}
          <div className="relative flex w-full max-w-xs flex-col bg-white pb-12 shadow-xl z-50 h-full">
            <div className="flex px-4 pt-5 pb-2 items-center justify-between">
              <div className="flex items-center">
                <Image
                  alt="TradeVistar Logo"
                  className="h-9 w-auto object-contain"
                  src="/logo/tradevistar.png"
                  width={168}
                  height={40}
                  priority
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-trade-navy hover:bg-slate-100 focus:outline-none"
                onClick={() => setShowMobileMenu(false)}
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            {/* Navigation links drawer */}
            <div className="mt-4 px-4 py-6 space-y-6 border-t border-slate-100 overflow-y-auto flex-grow">
              <div className="flex flex-col gap-4">
                {navItems.map((item) =>
                  item.dropdown ? (
                    <div key={item.key} className="space-y-1.5">
                      <div className="px-2 font-black text-xs uppercase text-secondary tracking-wider">
                        {item.label}
                      </div>
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          onClick={() => setShowMobileMenu(false)}
                          className="block px-4 py-1.5 text-[13px] text-trade-navy font-bold hover:text-primary-blue"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.key}
                      href={item.href!}
                      onClick={() => setShowMobileMenu(false)}
                      className="block px-2 py-1.5 text-[14px] text-trade-navy font-bold hover:text-primary-blue"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              <div className="border-t border-slate-100 pt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowLoginModal(true);
                  }}
                  className="block text-center border border-primary-blue text-primary-blue font-bold text-[13px] py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Login
                </button>
                <Link
                  href="/seller/register"
                  onClick={() => setShowMobileMenu(false)}
                  className="block text-center bg-gradient-to-r from-primary-orange to-[#FC9D05] text-white font-bold text-[13px] py-2.5 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Start Selling
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>

    <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
