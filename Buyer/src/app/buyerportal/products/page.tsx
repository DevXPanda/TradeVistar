"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS, Product } from "@/data/products";
import WishlistGrid from "@/components/dashboard/WishlistGrid";
import CompareTable from "@/components/dashboard/CompareTable";

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "browse";

  // General Cart Count state
  const [cartCount, setCartCount] = useState(0);

  // Wishlist initial B2B mock state list (e.g. 4 products saved by default)
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    return [
      MOCK_PRODUCTS[0], // PROD-1001 Cement
      MOCK_PRODUCTS[2], // PROD-1003 Metal Elbow
      MOCK_PRODUCTS[4], // PROD-1005 Rebars
      MOCK_PRODUCTS[8], // PROD-1009 PE Granules
    ];
  });

  // Remove item from wishlist
  const handleRemove = (productId: string) => {
    setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
  };

  // Compare items initial state
  const [compareItems, setCompareItems] = useState<Product[]>(() => {
    return [
      MOCK_PRODUCTS[0], // Cement
      MOCK_PRODUCTS[2], // Metal Elbow
      MOCK_PRODUCTS[4], // Steel Rebars
    ];
  });

  const handleRemoveCompare = (productId: string) => {
    setCompareItems((prev) => prev.filter((p) => p.id !== productId));
  };

  // Move to Cart action
  const handleMoveToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    setWishlistItems((prev) => prev.filter((p) => p.id !== product.id));
    alert(`"${product.name}" moved to cart successfully!`);
  };

  // Render Wishlist or Saved Products Tab
  const isWishlistTab = activeTab === "wishlist" || activeTab === "saved";

  return (
    <div className="flex flex-col gap-s-lg pb-10">
      
      {/* Tab Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-s-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight font-extrabold">
          {activeTab === "compare" ? "Product Comparison" : isWishlistTab ? "My Saved & Wishlist Products" : "Supplies Product Catalog"}
          </h1>
          <p className="font-body-md text-secondary mt-1">
            {activeTab === "compare" 
              ? "Review and compare technical specifications, pricing, and supplier ratings side-by-side."
              : isWishlistTab 
              ? "Access and manage bulk B2B raw materials, equipment, and components saved for future purchase." 
              : "Browse commercial parts, industrial catalog listings, and order directly."}
          </p>
        </div>
        
        <div className="flex items-center gap-s-sm bg-white border border-outline-variant px-4 py-2.5 rounded-lg shadow-sm w-fit font-label-sm font-bold text-trade-navy">
          <span className="material-symbols-outlined text-[20px] text-trade-orange">shopping_cart</span>
          Catalog Cart: {cartCount} items
        </div>
      </div>

      {/* Main Grid View */}
      {isWishlistTab ? (
        <div className="space-y-6">
          <WishlistGrid 
            wishlistItems={wishlistItems}
            handleMoveToCart={handleMoveToCart}
            handleRemove={handleRemove}
          />
        </div>
      ) : activeTab === "compare" ? (
        <div className="space-y-6">
          <CompareTable 
            compareItems={compareItems}
            onRemoveCompare={handleRemoveCompare}
            onAddToCart={(prodName) => {
              setCartCount((c) => c + 1);
              alert(`"${prodName}" added to cart!`);
            }}
          />
        </div>
      ) : (
        /* Original Product Catalog Grid */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-s-md">
          {MOCK_PRODUCTS.slice(0, 6).map((prod) => (
            <div
              key={prod.id}
              className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm hover:border-trade-orange hover:shadow-md transition-all duration-200 flex flex-col justify-between gap-4"
            >
              <div>
                <span className="px-2 py-0.5 bg-trade-navy/5 text-trade-navy text-[10px] font-bold rounded uppercase tracking-wider">
                  {prod.category}
                </span>
                <h4 className="font-headline-md text-base text-trade-navy font-bold mt-2 leading-snug">{prod.name}</h4>
                <p className="text-[12px] text-secondary mt-1 font-medium italic">{prod.description}</p>
                <div className="mt-4 flex justify-between items-baseline">
                  <span className="text-xl font-bold text-trade-navy">₹{prod.priceMin.toLocaleString("en-IN")}</span>
                  <span className="text-[11px] text-secondary">MOQ: {prod.moq} {prod.unit}s</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCartCount((c) => c + 1);
                  alert(`"${prod.name}" added to cart!`);
                }}
                className="w-full py-2 bg-trade-navy hover:bg-trade-orange text-white text-[12px] font-bold rounded transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                Add to Procurement Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-trade-orange border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
