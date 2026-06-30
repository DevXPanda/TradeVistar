"use client";

import React, { useEffect } from "react";
import TopNavBar from "@/components/sections/TopNavBar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Product details page error:", error);
  }, [error]);

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
      <TopNavBar />
      
      <main className="flex-grow pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <span className="material-symbols-outlined text-[64px] text-red-500">
          warning
        </span>
        <h1 className="text-xl font-black text-trade-navy mt-4">Something Went Wrong</h1>
        <p className="text-xs text-secondary mt-1 max-w-md font-semibold leading-relaxed">
          An error occurred while loading this product listing.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-trade-navy hover:bg-trade-navy/90 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 bg-trade-orange hover:bg-trade-orange/90 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
          >
            Go Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
