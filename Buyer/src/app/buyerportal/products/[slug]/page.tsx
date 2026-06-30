"use client";

import React, { use } from "react";
import ProductDetailsContainer from "@/components/product/ProductDetailsContainer";
import { getProductBySlug } from "@/lib/product/productHelpers";
import { ProductType } from "@/types/product";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BuyerPortalProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4">
        <span className="material-symbols-outlined text-[64px] text-trade-orange animate-pulse">
          error
        </span>
        <h1 className="text-xl font-black text-trade-navy mt-4">Product Not Found</h1>
        <p className="text-xs text-secondary mt-1 max-w-md font-semibold leading-relaxed">
          The catalog item slug `{slug}` could not be resolved in the dashboard catalog.
        </p>
        <Link
          href="/buyerportal/products"
          className="mt-6 px-6 py-2.5 bg-trade-orange hover:bg-trade-navy text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <ProductDetailsContainer product={product as unknown as ProductType} />
    </div>
  );
}
