"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopNavBar() {
  const [searchVal, setSearchVal] = useState("");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", hasDropdown: false },
    { name: "Brand", href: "#popular-brands-section", hasDropdown: false },
    { name: "Offers", href: "#", hasDropdown: true },
    { name: "Delhi", href: "#", hasDropdown: true },
    { name: "Sellers", href: "#", hasDropdown: false },
    { name: "Seller Zone", href: "#", hasDropdown: true },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm border-b border-outline-variant/15 flex flex-col">
      {/* 1. Main Navbar (White Background) */}
      <div className="bg-white h-[72px] px-s-md flex items-center border-b border-outline-variant/10">
        <div className="max-w-s-container-max mx-auto w-full flex justify-between items-center gap-4">
          
          {/* Logo & Brand / Hamburger Menu */}
          <div className="flex items-center flex-shrink-0">
            {/* Hamburger Button (Mobile only) */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden bg-slate-50 hover:bg-slate-100 text-trade-navy rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors focus:outline-none mr-2 flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>

            {/* Logo Image */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                alt="TradeVistar Logo"
                className="h-8 w-auto object-contain"
                src="/logo/tradevistar.png"
                width={140}
                height={32}
                priority
              />
            </Link>
          </div>

          {/* Search Box (Centered - Desktop only) */}
          <div className="hidden md:flex flex-grow max-w-[500px] mx-6">
            <div className="flex w-full border border-primary-blue focus-within:border-secondary-blue rounded-lg overflow-hidden transition-colors">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="flex-grow px-4 py-2 text-[13px] text-trade-navy bg-slate-50/50 outline-none placeholder:text-secondary/50 font-medium"
              />
              <button className="bg-primary-blue hover:bg-secondary-blue text-white px-5 flex items-center justify-center transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
            </div>
          </div>

          {/* Right Action Icons - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Wishlist */}
            <div className="bg-slate-50 hover:bg-slate-100 transition-colors rounded-full w-10 h-10 flex items-center justify-center relative cursor-pointer">
              <span className="material-symbols-outlined text-trade-navy text-[20px]">favorite</span>
              <span className="absolute top-[-2px] right-[-2px] bg-trade-orange text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white">
                0
              </span>
            </div>

            {/* Profile */}
            <Link
              href="/buyerportal/profile"
              className="bg-slate-50 hover:bg-slate-100 transition-colors rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-trade-navy text-[20px]">person</span>
            </Link>

            {/* Cart Icon & Info */}
            <div className="flex items-center">
              <div className="bg-slate-50 hover:bg-slate-100 transition-colors rounded-full w-10 h-10 flex items-center justify-center relative cursor-pointer flex-shrink-0">
                <span className="material-symbols-outlined text-trade-navy text-[20px]">shopping_cart</span>
                <span className="absolute top-[-2px] right-[-2px] bg-trade-orange text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  0
                </span>
              </div>
              <div className="hidden lg:flex flex-col text-left leading-none text-[11px] select-none ml-2 gap-0.5">
                <span className="text-secondary font-semibold">My cart</span>
                <span className="text-trade-navy font-black flex items-center">
                  ₹0.00 <span className="material-symbols-outlined text-[11px] ml-0.5 font-bold">keyboard_arrow_down</span>
                </span>
              </div>
            </div>

          </div>

          {/* Right Action Icons - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            
            {/* Search Icon Toggle */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="bg-slate-50 hover:bg-slate-100 text-trade-navy rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Profile */}
            <Link
              href="/buyerportal/profile"
              className="bg-slate-50 hover:bg-slate-100 text-trade-navy rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>

            {/* Cart Icon & Badge */}
            <div className="bg-slate-50 hover:bg-slate-100 text-trade-navy rounded-full w-10 h-10 flex items-center justify-center relative cursor-pointer transition-colors flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
              <span className="absolute top-[-2px] right-[-2px] bg-trade-orange text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-white">
                0
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden bg-white px-4 py-2 border-b border-outline-variant/10">
          <div className="flex w-full border border-primary-blue focus-within:border-secondary-blue rounded-lg overflow-hidden transition-colors">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="flex-grow px-4 py-2 text-[13px] text-trade-navy bg-slate-50/50 outline-none placeholder:text-secondary/50 font-medium"
            />
            <button className="bg-primary-blue hover:bg-secondary-blue text-white px-5 flex items-center justify-center transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Sub-Navbar (Primary Blue Background - Desktop only) */}
      <div className="hidden md:flex bg-primary-blue h-[46px] px-s-md items-center">
        <div className="max-w-s-container-max mx-auto w-full flex justify-between items-center h-full">
          
          {/* Left Block: Categories Dropdown & Links */}
          <div className="flex items-center gap-6 h-full">
            
            {/* Categories Dropdown Button */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="bg-white text-primary-blue rounded px-3 py-1.5 flex items-center gap-2 font-bold text-[12.5px] cursor-pointer shadow-xs border border-outline-variant/10"
              >
                <span className="material-symbols-outlined text-[16px] font-bold">apps</span>
                <span>Categories</span>
                <span className="material-symbols-outlined text-[14px] font-bold">arrow_drop_down</span>
              </button>

              {/* Mock Dropdown items */}
              {showCategoryMenu && (
                <div className="absolute left-0 top-[38px] w-[200px] bg-white border border-outline-variant/15 rounded-md shadow-lg z-50 py-2">
                  <Link
                    href="#category-collections-section"
                    onClick={() => setShowCategoryMenu(false)}
                    className="block px-4 py-2 text-[12px] text-trade-navy font-bold hover:bg-slate-50 hover:text-primary-blue"
                  >
                    Women&apos;s Fashion
                  </Link>
                  <Link
                    href="#category-collections-section"
                    onClick={() => setShowCategoryMenu(false)}
                    className="block px-4 py-2 text-[12px] text-trade-navy font-bold hover:bg-slate-50 hover:text-primary-blue"
                  >
                    Men&apos;s Fashion
                  </Link>
                  <Link
                    href="#category-collections-section"
                    onClick={() => setShowCategoryMenu(false)}
                    className="block px-4 py-2 text-[12px] text-trade-navy font-bold hover:bg-slate-50 hover:text-primary-blue"
                  >
                    Phone & Gadgets
                  </Link>
                  <Link
                    href="#category-collections-section"
                    onClick={() => setShowCategoryMenu(false)}
                    className="block px-4 py-2 text-[12px] text-trade-navy font-bold hover:bg-slate-50 hover:text-primary-blue"
                  >
                    Home & Kitchen
                  </Link>
                </div>
              )}
            </div>

            {/* Navigation links */}
            <div className="hidden lg:flex items-center gap-6 h-full">
              {navLinks.map((link) => {
                if (link.name === "Seller Zone") {
                  return (
                    <div key={link.name} className="relative group/seller h-full flex items-center">
                      <button
                        className="text-white/95 hover:text-secondary-blue text-[13px] font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
                      >
                        <span>Seller Zone</span>
                        <span className="material-symbols-outlined text-[12px]">keyboard_arrow_down</span>
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 top-[38px] w-[140px] bg-white border border-outline-variant/15 rounded-md shadow-lg z-50 py-1.5 opacity-0 invisible group-hover/seller:opacity-100 group-hover/seller:visible transition-all duration-200">
                        <Link
                          href="/seller/register"
                          className="block px-3 py-1.5 text-[11px] text-left text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue"
                        >
                          Become a seller
                        </Link>
                        <Link
                          href="/seller/login"
                          className="block px-3 py-1.5 text-[11px] text-left text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue"
                        >
                          Seller Login
                        </Link>
                      </div>
                    </div>
                  );
                }

                if (link.name === "Offers") {
                  return (
                    <div key={link.name} className="relative group/offers h-full flex items-center">
                      <button className="text-white/95 hover:text-secondary-blue text-[13px] font-semibold flex items-center gap-0.5 transition-colors cursor-pointer">
                        <span>Offers</span>
                        <span className="material-symbols-outlined text-[12px]">keyboard_arrow_down</span>
                      </button>
                      <div className="absolute left-0 top-[38px] w-[140px] bg-white border border-outline-variant/15 rounded-md shadow-lg z-50 py-1.5 opacity-0 invisible group-hover/offers:opacity-100 group-hover/offers:visible transition-all duration-200">
                        <Link href="#" className="block px-3 py-1.5 text-[11px] text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue">Flash Deals</Link>
                        <Link href="#" className="block px-3 py-1.5 text-[11px] text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue">Bulk Discounts</Link>
                      </div>
                    </div>
                  );
                }

                if (link.name === "Delhi") {
                  return (
                    <div key={link.name} className="relative group/delhi h-full flex items-center">
                      <button className="text-white/95 hover:text-secondary-blue text-[13px] font-semibold flex items-center gap-0.5 transition-colors cursor-pointer">
                        <span>Delhi</span>
                        <span className="material-symbols-outlined text-[12px]">keyboard_arrow_down</span>
                      </button>
                      <div className="absolute left-0 top-[38px] w-[140px] bg-white border border-outline-variant/15 rounded-md shadow-lg z-50 py-1.5 opacity-0 invisible group-hover/delhi:opacity-100 group-hover/delhi:visible transition-all duration-200">
                        <Link href="#" className="block px-3 py-1.5 text-[11px] text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue">Delhi NCR</Link>
                        <Link href="#" className="block px-3 py-1.5 text-[11px] text-slate-800 font-bold hover:bg-slate-50 hover:text-primary-blue">New Delhi</Link>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/95 hover:text-secondary-blue text-[13px] font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
                  >
                    <span>{link.name}</span>
                    {link.hasDropdown && (
                      <span className="material-symbols-outlined text-[12px]">keyboard_arrow_down</span>
                    )}
                  </Link>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Sidebar Navigation Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 flex">
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
                  className="h-8 w-auto object-contain"
                  src="/logo/tradevistar.png"
                  width={140}
                  height={32}
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

            {/* Links */}
            <div className="mt-4 px-4 py-6 space-y-6 border-t border-slate-100 overflow-y-auto flex-grow">
              <div className="flex flex-col gap-4">
                <div className="font-bold text-xs uppercase text-secondary tracking-wider">Categories</div>
                <Link
                  href="#category-collections-section"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-2 py-1 text-[13px] text-trade-navy font-bold hover:text-primary-blue"
                >
                  Women&apos;s Fashion
                </Link>
                <Link
                  href="#category-collections-section"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-2 py-1 text-[13px] text-trade-navy font-bold hover:text-primary-blue"
                >
                  Men&apos;s Fashion
                </Link>
                <Link
                  href="#category-collections-section"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-2 py-1 text-[13px] text-trade-navy font-bold hover:text-primary-blue"
                >
                  Phone & Gadgets
                </Link>
                <Link
                  href="#category-collections-section"
                  onClick={() => setShowMobileMenu(false)}
                  className="block px-2 py-1 text-[13px] text-trade-navy font-bold hover:text-primary-blue"
                >
                  Home & Kitchen
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                <div className="font-bold text-xs uppercase text-secondary tracking-wider">Navigation</div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-2 py-1 text-[13px] text-trade-navy font-bold hover:text-primary-blue uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
