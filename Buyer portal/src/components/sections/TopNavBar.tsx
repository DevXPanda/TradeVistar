"use client";

import Link from "next/link";
import Image from "next/image";

export default function TopNavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-outline-variant/30 px-s-md py-s-xs">
      <div className="max-w-s-container-max mx-auto flex justify-between items-center h-16">
        <div className="flex items-center gap-s-lg">
          <Link href="/" className="flex items-center">
            <Image
              alt="TradeVistar Logo"
              className="h-8 w-auto"
              src="/logo/tradevistar.png"
              width={28}
              height={32}
              priority
            />
          </Link>
          <div className="hidden lg:flex items-center gap-s-md">
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              Solutions
            </Link>
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              Industries
            </Link>
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              Suppliers
            </Link>
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              Buyers
            </Link>
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              Pricing
            </Link>
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              Resources
            </Link>
            <Link
              className="text-secondary hover:text-trade-navy font-medium font-label-sm transition-colors"
              href="#"
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-s-sm">
          <Link
            className="hidden md:block font-label-sm font-bold text-trade-navy px-s-md py-2 transition-opacity active:opacity-80"
            href="/login"
          >
            Login
          </Link>
          <Link
            className="hidden lg:block font-label-sm font-bold text-secondary border border-outline-variant px-s-md py-2 rounded-lg hover:bg-surface-variant transition-colors"
            href="/register?role=supplier"
          >
            Become a Seller
          </Link>
          <Link
            className="font-label-sm font-bold bg-trade-orange text-white px-s-md py-2 rounded-lg hover:bg-trade-orange/90 transition-all active:scale-95 shadow-sm"
            href="/login?role=buyer"
          >
            Become Buyer
          </Link>
        </div>
      </div>
    </nav>
  );
}
