"use client";

import React, { use } from "react";
import TopNavBar from "@/components/sections/TopNavBar";
import Footer from "@/components/sections/Footer";
import ProductDetailsContainer from "@/components/product/ProductDetailsContainer";
import { getProductBySlug } from "@/lib/product/productHelpers";
import { ProductType } from "@/types/product";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PublicProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
        <TopNavBar />
        <main className="flex-grow pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
          <span className="material-symbols-outlined text-[64px] text-trade-orange animate-pulse">
            error
          </span>
          <h1 className="text-xl font-black text-trade-navy mt-4">Product Not Found</h1>
          <p className="text-xs text-secondary mt-1 max-w-md font-semibold leading-relaxed">
            The catalog item slug `{slug}` could not be resolved. It may have been retired or shifted.
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-2.5 bg-trade-orange hover:bg-trade-navy text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
          >
            Return to Marketplace
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
      <TopNavBar />

      <main className="flex-grow pt-24 pb-12 px-s-md">
        <div className="max-w-s-container-max mx-auto">
          <ProductDetailsContainer product={product as unknown as ProductType} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
