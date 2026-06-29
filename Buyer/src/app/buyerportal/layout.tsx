"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuData = [
  {
    name: "Dashboard",
    icon: "dashboard",
    href: "/buyerportal",
  },
  {
    name: "Procurement",
    icon: "request_quote",
    children: [
      { name: "Create RFQ", href: "/buyerportal/procurement?action=create" },
      { name: "My RFQs", href: "/buyerportal/procurement" },
      { name: "Received Quotations", href: "/buyerportal/procurement?tab=quotes" },
      { name: "Compare Quotes", href: "/buyerportal/procurement?tab=compare" },
      { name: "Sample Requests", href: "/buyerportal/procurement?tab=samples" },
    ],
  },
  {
    name: "Orders",
    icon: "shopping_cart",
    children: [
      { name: "All Orders", href: "/buyerportal/orders" },
      { name: "Pending Orders", href: "/buyerportal/orders?status=pending" },
      { name: "In Transit", href: "/buyerportal/orders?status=intransit" },
      { name: "Delivered", href: "/buyerportal/orders?status=delivered" },
      { name: "Cancelled", href: "/buyerportal/orders?status=cancelled" },
      { name: "Return Requests", href: "/buyerportal/orders?status=returns" },
    ],
  },
  {
    name: "Suppliers",
    icon: "group",
    children: [
      { name: "Discover Suppliers", href: "/buyerportal/suppliers" },
      { name: "Saved Suppliers", href: "/buyerportal/suppliers?tab=saved" },
      { name: "Recently Viewed", href: "/buyerportal/suppliers?tab=recent" },
      { name: "Verified Suppliers", href: "/buyerportal/suppliers?tab=verified" },
    ],
  },
  {
    name: "Products",
    icon: "inventory_2",
    children: [
      { name: "Browse Products", href: "/buyerportal/products" },
      { name: "Wishlist", href: "/buyerportal/products?tab=wishlist" },
      { name: "Saved Products", href: "/buyerportal/products?tab=saved" },
      { name: "Product Comparisons", href: "/buyerportal/products?tab=compare" },
    ],
  },
  {
    name: "Payments",
    icon: "account_balance_wallet",
    children: [
      { name: "Invoices", href: "/buyerportal/payments" },
      { name: "Payment History", href: "/buyerportal/payments?tab=history" },
      { name: "Escrow Transactions", href: "/buyerportal/payments?tab=escrow" },
      { name: "Refunds", href: "/buyerportal/payments?tab=refunds" },
    ],
  },
  {
    name: "Business Profile",
    icon: "business_center",
    children: [
      { name: "Company Information", href: "/buyerportal/profile" },
      { name: "GST Details", href: "/buyerportal/profile?tab=gst" },
      { name: "Business Address", href: "/buyerportal/profile?tab=address" },
      { name: "Bank Details", href: "/buyerportal/profile?tab=bank" },
      { name: "Trademark", href: "/buyerportal/profile?tab=trademark" },
      { name: "Documents", href: "/buyerportal/profile?tab=docs" },
    ],
  },
  {
    name: "Notifications",
    icon: "notifications",
    badge: 4,
    children: [
      { name: "New Quotes", href: "/buyerportal/notifications?tab=quotes" },
      { name: "Order Updates", href: "/buyerportal/notifications?tab=orders" },
      { name: "Payment Updates", href: "/buyerportal/notifications?tab=payments" },
      { name: "Dispute Updates", href: "/buyerportal/notifications?tab=disputes" },
    ],
  },
  {
    name: "Account Settings",
    icon: "settings",
    children: [
      { name: "Profile", href: "/buyerportal/profile?tab=personal" },
      { name: "Contact Person", href: "/buyerportal/profile?tab=contact" },
      { name: "Pickup Address", href: "/buyerportal/profile?tab=pickup" },
      { name: "Security", href: "/buyerportal/profile?tab=security" },
      { name: "Change Password", href: "/buyerportal/profile?tab=password" },
    ],
  },
  {
    name: "Help & Support",
    icon: "help",
    children: [
      { name: "Order Issues", href: "/buyerportal/support?tab=orders" },
      { name: "Product Quality Issues", href: "/buyerportal/support?tab=quality" },
      { name: "Damaged Goods", href: "/buyerportal/support?tab=damaged" },
      { name: "Payment Issues", href: "/buyerportal/support?tab=payments" },
      { name: "Delivery Issues", href: "/buyerportal/support?tab=delivery" },
      { name: "Account Support", href: "/buyerportal/support?tab=account" },
    ],
  },
];

export default function BuyerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const [currentUrl, setCurrentUrl] = useState("");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Dashboard: true, // Default open Dashboard
  });

  // Track the current URL including query string safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.pathname + window.location.search;
      const handle = requestAnimationFrame(() => {
        setCurrentUrl(url);
        
        // Auto expand the parent category that corresponds to the active page
        const activeCat = menuData.find((cat) =>
          cat.children && cat.children.some((child) => child.href.split("?")[0] === window.location.pathname)
        );
        if (activeCat) {
          setOpenCategories((prev) => ({
            ...prev,
            [activeCat.name]: true,
          }));
        }
      });
      return () => cancelAnimationFrame(handle);
    }
  }, [pathname]);

  const isChildActive = (href: string) => {
    if (!currentUrl) {
      return pathname === href.split("?")[0];
    }
    return currentUrl === href;
  };

  const isLinkActive = (href: string) => {
    if (href === "/buyerportal") {
      return pathname === "/buyerportal";
    }
    return pathname.startsWith(href);
  };

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const renderNavMenu = (isMobile: boolean = false) => {
    return (
      <nav className="flex-grow flex flex-col gap-1 overflow-y-auto pr-1">
        {menuData.map((category) => {
          const showDivider = category.name === "Notifications";
          
          let content;

          // Render direct links with no children (e.g. Dashboard)
          if (!category.children || category.children.length === 0) {
            const active = pathname === category.href;
            content = (
              <Link
                href={category.href || "/buyerportal"}
                onClick={() => {
                  if (isMobile) {
                    setMobileMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-s-sm px-s-sm py-2.5 rounded-lg group transition-all duration-200 ${
                  active
                    ? "bg-trade-orange text-white shadow-sm font-semibold animate-none"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    active ? "text-white font-bold" : "text-white/60"
                  }`}
                >
                  {category.icon}
                </span>
                <span className="font-body-md text-[14px]">{category.name}</span>
              </Link>
            );
          } else {
            // Render collapsible categories
            const isOpen = !!openCategories[category.name];
            const isAnyChildActive = category.children.some(
              (child) => pathname === child.href.split("?")[0]
            );

            content = (
              <div className="flex flex-col gap-0.5">
                {/* Category Header Toggler */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className={`w-full flex items-center justify-between px-s-sm py-2 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                    isAnyChildActive
                      ? "bg-white/5 text-white font-semibold"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-s-sm">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isAnyChildActive ? "text-trade-orange font-bold" : "text-white/60"
                      }`}
                    >
                      {category.icon}
                    </span>
                    <span className="font-body-md text-[14px]">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {category.badge && (
                      <span className="bg-trade-orange text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {category.badge}
                      </span>
                    )}
                    <span
                      className="material-symbols-outlined text-[18px] text-white/50 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Category Submenus (collapsible) */}
                <div
                  className="transition-all duration-300 overflow-hidden flex flex-col gap-0.5 pl-8 pr-1"
                  style={{
                    maxHeight: isOpen ? `${category.children.length * 36}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {category.children.map((child) => {
                    const active = isChildActive(child.href);
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => {
                          if (isMobile) {
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`py-1.5 px-2.5 rounded text-[13px] transition-all duration-200 flex items-center gap-2 ${
                          active
                            ? "text-trade-orange font-bold bg-white/5"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {active && <div className="w-1.5 h-1.5 rounded-full bg-trade-orange"></div>}
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <React.Fragment key={category.name}>
              {showDivider && (
                <div className="my-2 border-t border-white/10" />
              )}
              {content}
            </React.Fragment>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="min-h-screen flex bg-background text-on-surface antialiased font-body-md">
      {/* Sidebar - Desktop view */}
      <aside className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-trade-navy text-white z-50 shadow-lg">
        <div className="p-s-md flex flex-col gap-s-lg h-full overflow-hidden">
          {/* Brand Logo */}
          <div className="flex items-center gap-s-xs">
            <Image
              alt="TradeVistar Logo"
              className="h-8 w-auto"
              src="/logo/tradevistar.png"
              width={28}
              height={32}
              priority
            />
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-white">TradeVistar</span>
          </div>

          {/* Navigation Accordion List */}
          {renderNavMenu(false)}

          {/* Footer Section */}
          <div className="mt-auto pt-s-md border-t border-white/5 flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-s-sm px-s-sm py-2.5 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-body-md text-body-md">Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={toggleMobileMenu}></div>

          {/* Drawer content */}
          <aside className="relative flex flex-col w-64 h-full bg-trade-navy text-white p-s-md gap-s-lg shadow-2xl animate-in slide-in-from-left duration-200 z-50 overflow-hidden">
            <div className="flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-s-xs">
                <Image
                  alt="TradeVistar Logo"
                  className="h-8 w-auto"
                  src="/logo/tradevistar.png"
                  width={28}
                  height={32}
                  priority
                />
                <span className="font-headline-md text-headline-md font-bold tracking-tight text-white">TradeVistar</span>
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Mobile Nav Accordion List */}
            {renderNavMenu(true)}

            <div className="mt-auto border-t border-white/5 pt-s-sm flex-shrink-0">
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className="flex items-center gap-s-sm px-s-sm py-2.5 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span className="font-body-md text-body-md">Sign Out</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Canvas Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* TopNavBar Header */}
        <header className="h-16 flex items-center justify-between px-s-md bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/30 shadow-sm">
          <div className="flex items-center gap-s-md flex-1">
            {/* Hamburger Button for mobile */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-secondary hover:bg-surface-container rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Global Search Bar (Desktop) */}
            <div className="hidden md:block relative w-full max-w-md group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-transparent focus:border-trade-orange focus:bg-white focus:ring-0 rounded-lg text-body-md font-body-md transition-all outline-none"
                placeholder="Global Search: RFQs, Orders, Suppliers..."
                type="text"
              />
            </div>
            {/* Global Search Icon Button (Mobile) */}
            <button className="md:hidden p-2 text-secondary hover:bg-surface-container rounded-lg transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          <div className="flex items-center gap-s-sm">
            {/* Business Switcher Dropdown */}
            <div className="relative">
              <div
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className="hidden md:flex items-center gap-s-xs px-s-sm py-1.5 bg-surface-container border border-outline-variant/50 rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <div className="w-6 h-6 rounded bg-trade-navy flex items-center justify-center text-[10px] font-bold text-white">
                  GL
                </div>
                <span className="font-label-sm text-label-sm text-on-surface">Global Logistics Ltd</span>
                <span className="material-symbols-outlined text-sm">unfold_more</span>
              </div>

              {companyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCompanyDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white border border-outline-variant/50 shadow-lg py-1 z-20">
                    <div className="px-4 py-2 border-b border-outline-variant/30">
                      <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Select Organization</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-body-md hover:bg-surface-container-low flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-trade-navy flex items-center justify-center text-[9px] font-bold text-white">GL</div>
                      Global Logistics Ltd
                    </button>
                    <button className="w-full text-left px-4 py-2 text-body-md hover:bg-surface-container-low flex items-center gap-2 text-secondary/60">
                      <div className="w-5 h-5 rounded bg-gray-400 flex items-center justify-center text-[9px] font-bold text-white">AI</div>
                      Apex Imports Inc
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="hidden md:block h-6 w-px bg-outline-variant/50 mx-s-xs"></div>

            {/* Email Icon */}
            <button className="relative p-2 text-secondary hover:bg-surface-container rounded-lg transition-colors">
              <span className="material-symbols-outlined">mail</span>
            </button>

            {/* Notifications Icon */}
            <button className="relative p-2 text-secondary hover:bg-surface-container rounded-lg transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-trade-orange rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Menu Trigger */}
            <div className="relative">
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-s-sm ml-s-sm pl-s-sm border-l border-outline-variant/50 cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <p className="font-label-sm text-label-sm text-on-surface font-bold">Rohan Mehta</p>
                  <p className="font-label-sm text-[10px] text-secondary uppercase tracking-tighter">
                    Senior Procurement Officer
                  </p>
                </div>
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-outline-variant/50 shadow-sm">
                  <Image
                    className="object-cover"
                    alt="Rohan Mehta"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFLv3DPleuRuCcVHyuEZWO6yTazUkq_hEs5ZdoJtnh0VKhwEUVSYq1P99JiUC9xYBf0lPrnzphaFzelXCGs5tMB7MeaXq2p08LcemBgx_FaqtC2-xbZOsq6L4onUgXgS6WJ_KrRqUHynxeBNfnatvzViabB_8aOUKza1sLFPfZNWPyxoInpyLO96LL5Zgki6buODoN482ng3bx9yyPqBGwwcGvY6jjMztR50yqHAm-7NtcRxd7HMb4Oo2bmHkMBGci7mA8AXLeqYdM"
                    fill
                    sizes="36px"
                    priority
                  />
                </div>
              </div>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-outline-variant/50 shadow-lg py-1 z-20">
                    <Link href="/buyerportal/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-body-md hover:bg-surface-container-low">
                      My Profile
                    </Link>
                    <Link href="/buyerportal/notifications" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-body-md hover:bg-surface-container-low">
                      Settings
                    </Link>
                    <div className="h-px bg-outline-variant/30 my-1"></div>
                    <Link href="/" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2 text-body-md text-red-500 hover:bg-red-50">
                      Sign Out
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-grow p-s-md lg:p-s-lg pb-28 lg:pb-s-lg max-w-[1440px] mx-auto w-full flex flex-col gap-s-lg animate-in fade-in duration-300 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-outline-variant/30 py-s-md px-s-md lg:px-s-lg pb-24 md:pb-s-md flex flex-col md:flex-row justify-between items-center gap-s-sm bg-white">
          <p className="font-label-sm text-[12px] text-secondary">
            © 2026 TradeVistar Global Infrastructure. All rights reserved.
          </p>
          <div className="flex gap-s-md">
            <Link className="font-label-sm text-[12px] text-secondary hover:text-trade-orange transition-colors" href="#">
              Compliance & KYC
            </Link>
            <Link className="font-label-sm text-[12px] text-secondary hover:text-trade-orange transition-colors" href="#">
              Privacy Policy
            </Link>
            <Link className="font-label-sm text-[12px] text-secondary hover:text-trade-orange transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="font-label-sm text-[12px] text-secondary hover:text-trade-orange transition-colors" href="#">
              API Documentation
            </Link>
          </div>
        </footer>

        {/* BottomNavBar - Mobile only */}
        <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 pb-safe bg-white/95 backdrop-blur-md border-t border-outline-variant/30 shadow-lg z-50 lg:hidden">
          <Link
            href="/buyerportal"
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              pathname === "/buyerportal"
                ? "text-trade-orange font-bold"
                : "text-secondary hover:text-trade-navy"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-[10px] font-medium mt-0.5">Feed</span>
          </Link>
          <Link
            href="/buyerportal/suppliers"
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isLinkActive("/buyerportal/suppliers")
                ? "text-trade-orange font-bold"
                : "text-secondary hover:text-trade-navy"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">public</span>
            <span className="text-[10px] font-medium mt-0.5">Markets</span>
          </Link>
          <Link
            href="/buyerportal/procurement"
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isLinkActive("/buyerportal/procurement")
                ? "text-trade-orange font-bold"
                : "text-secondary hover:text-trade-navy"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">sensors</span>
            <span className="text-[10px] font-medium mt-0.5">Signals</span>
          </Link>
          <Link
            href="/buyerportal/payments"
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isLinkActive("/buyerportal/payments")
                ? "text-trade-orange font-bold"
                : "text-secondary hover:text-trade-navy"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">security</span>
            <span className="text-[10px] font-medium mt-0.5">Vault</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
