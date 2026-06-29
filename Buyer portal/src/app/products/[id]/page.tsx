"use client";

import React, { useState, useMemo, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_PRODUCTS } from "@/data/products";
import TopNavBar from "@/components/sections/TopNavBar";
import Footer from "@/components/sections/Footer";
import ProductGallery from "@/components/products/ProductGallery";
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import SupplierCard from "@/components/products/SupplierCard";
import ProductReviews from "@/components/products/ProductReviews";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  // Retrieve selected product details
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === productId) || MOCK_PRODUCTS[0];
  }, [productId]);

  // Modal Dialog States
  const [activeModal, setActiveModal] = useState<"buy" | "quote" | "chat" | null>(null);
  const [quoteQty, setQuoteQty] = useState("");
  const [quotePrice, setQuotePrice] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [buyQty, setBuyQty] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Derived related products (4 items in same category/industry, excluding current)
  const relatedProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(
      (p) => p.id !== product.id && (p.category === product.category || p.industry === product.industry)
    ).slice(0, 4);
  }, [product]);

  // Escrow Subtotal Calculation
  const parsedBuyQty = parseInt(buyQty) || 0;
  const unitPrice = product.priceMin; 
  const escrowSubtotal = parsedBuyQty * unitPrice;
  const gstAmount = escrowSubtotal * 0.18; // 18% Integrated GST
  const escrowTotal = escrowSubtotal + gstAmount;

  // Form Handlers
  const handleRFQSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`RFQ Successfully Submitted!\nQuantity: ${quoteQty} ${product.unit}s\nTarget Price: ₹${quotePrice}/${product.unit}`);
    setActiveModal(null);
    setQuoteQty("");
    setQuotePrice("");
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent to ${product.supplierName}!\nMessage: "${chatMessage}"`);
    setActiveModal(null);
    setChatMessage("");
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Transaction Created!\nTotal Escrow Funded: ₹${escrowTotal.toLocaleString("en-IN")}\nRedirecting to secure gateway...`);
    setActiveModal(null);
    setBuyQty("");
  };

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
      {/* Sticky Header */}
      <TopNavBar />

      <main className="flex-grow pt-24 pb-s-xl px-s-md">
        <div className="max-w-s-container-max mx-auto space-y-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
            <Link href="/" className="hover:text-trade-orange transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="hover:text-trade-orange cursor-pointer transition-colors">{product.category}</span>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-trade-navy font-bold truncate max-w-[200px] md:max-w-none">{product.name}</span>
          </div>

          {/* Upper Section: Gallery & Primary Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Gallery (col-span-5) */}
            <div className="lg:col-span-5">
              <ProductGallery 
                productName={product.name}
                primaryImage={product.image}
              />
            </div>

            {/* Right Column: Key Details & B2B Action Card (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
              
              {/* Product Info Block */}
              <div className="flex-1 space-y-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-trade-navy/5 text-trade-navy rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.readyStock && (
                      <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Ready to Ship
                      </span>
                    )}
                  </div>
                  <h1 className="font-display-lg text-[22px] md:text-[26px] font-extrabold text-trade-navy leading-tight">
                    {product.name}
                  </h1>
                  
                  {/* Supplier & Rating Rating details */}
                  <div className="flex items-center gap-3 text-[13px]">
                    <span className="text-secondary font-medium">Supplier:</span>
                    <span className="text-trade-navy font-bold hover:underline cursor-pointer">
                      {product.supplierName}
                    </span>
                    <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-0.5 rounded text-[11px] text-amber-700 font-extrabold">
                      <span className="material-symbols-outlined text-[12px] text-amber-500 fill-amber-500">star</span>
                      {product.supplierRating}
                    </div>
                  </div>
                </div>

                {/* B2B Price Range Container */}
                <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4 divide-x divide-outline-variant/20">
                    <div>
                      <span className="text-xs text-secondary font-medium block">Price Range</span>
                      <span className="font-display-lg text-[20px] md:text-[24px] text-trade-orange font-black">
                        ₹{product.priceMin.toLocaleString("en-IN")} - ₹{product.priceMax.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-secondary font-semibold"> / {product.unit}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-xs text-secondary font-medium block">Minimum Order Qty (MOQ)</span>
                      <span className="font-headline-lg text-[18px] md:text-[20px] text-trade-navy font-black">
                        {product.moq.toLocaleString()} {product.unit}s
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/10 text-[12px] text-secondary font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-500">check_circle</span>
                      <span>Availability: <strong className="text-trade-navy">In Stock</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-trade-orange">local_shipping</span>
                      <span>Lead Time: <strong className="text-trade-navy">{product.deliveryTime} Days</strong></span>
                    </div>
                  </div>
                </div>

                {/* Description snippet */}
                <div className="space-y-1">
                  <h4 className="text-[12px] text-secondary font-bold uppercase tracking-wider">Overview</h4>
                  <p className="text-[13.5px] text-secondary leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

              </div>

              {/* B2B Sidebar Action Card (Buy, Quote, Chat) */}
              <div className="w-full md:w-64 bg-white border border-outline-variant/30 rounded-xl p-5 shadow-sm space-y-4 self-start">
                <h3 className="font-headline-md text-[14px] text-trade-navy font-bold">B2B Procurement</h3>
                
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full py-2.5 bg-trade-navy hover:bg-trade-navy/90 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">shopping_cart</span>
                    Buy Now (Escrow)
                  </button>

                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full py-2.5 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">add_shopping_cart</span>
                    Add to Cart
                  </button>

                  <div className="border-t border-outline-variant/20 my-3"></div>

                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full py-2.5 bg-trade-orange/10 hover:bg-trade-orange text-trade-orange hover:text-white border border-trade-orange/20 rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">request_quote</span>
                    Request Bulk Quote
                  </button>

                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="w-full py-2.5 bg-surface-container hover:bg-surface-variant text-secondary hover:text-trade-navy border border-transparent rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">chat</span>
                    Chat with Supplier
                  </button>

                  <div className="border-t border-outline-variant/20 my-3"></div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="py-2 bg-white hover:bg-surface-container text-secondary hover:text-trade-navy border border-outline-variant rounded-lg text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px] text-rose-500">favorite</span>
                      Wishlist
                    </button>
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="py-2 bg-white hover:bg-surface-container text-secondary hover:text-trade-navy border border-outline-variant rounded-lg text-[11px] font-bold transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span>
                      Catalogue
                    </button>
                  </div>
                </div>

                {/* Assurance details */}
                <div className="pt-2 border-t border-outline-variant/10 text-[10.5px] text-secondary space-y-1.5">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-emerald-500 font-bold">shield</span>
                    <span>Trade Assurance Covered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-blue-500 font-bold">verified</span>
                    <span>100% Secure B2B Escrow Payments</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Lower Fold: Tabs / Detail Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-outline-variant/30">
            
            {/* Left Main Details Column (col-span-8) */}
            <div className="lg:col-span-8 space-y-8">
              
              <ProductSpecsTable 
                specifications={product.specifications}
                description={product.description}
              />

              {/* Packaging & Shipping Section */}
              <div className="bg-white border border-outline-variant/30 rounded-xl p-6 space-y-4 shadow-xs">
                <h3 className="font-headline-md text-[16px] text-trade-navy font-black border-b border-outline-variant/10 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-trade-orange">local_shipping</span>
                  Packaging & Shipping Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px]">
                  {/* Packaging */}
                  <div className="space-y-2 bg-surface-container-low/30 p-4 rounded-lg border border-outline-variant/10">
                    <h4 className="font-bold text-trade-navy flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">inventory_2</span>
                      Packaging Details
                    </h4>
                    <p className="text-secondary leading-relaxed">{product.packagingDetails}</p>
                  </div>
                  {/* Shipping */}
                  <div className="space-y-2 bg-surface-container-low/30 p-4 rounded-lg border border-outline-variant/10">
                    <h4 className="font-bold text-trade-navy flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-secondary">sailing</span>
                      Shipping Logistics
                    </h4>
                    <div className="space-y-1 text-secondary">
                      <p>• Loading Port: <strong className="text-trade-navy">{product.shippingInfo.port}</strong></p>
                      <p>• Lead Time / Transit: <strong className="text-trade-navy">{product.shippingInfo.transitTime}</strong></p>
                      <p>• Approved Modes: <strong className="text-trade-navy">{product.shippingInfo.methods.join(", ")}</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <ProductReviews 
                supplierRating={product.supplierRating}
              />

            </div>

            {/* Right Supplier Cards Column (col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              
              <SupplierCard 
                supplierName={product.supplierName}
                location={product.location}
                gstVerified={product.gstVerified}
                msme={product.msme}
                isoCertified={product.isoCertified}
                supplierRating={product.supplierRating}
              />

            </div>
          </div>

          {/* Related Products Grid */}
          <div className="space-y-4 pt-8 border-t border-outline-variant/30">
            <h3 className="font-headline-md text-[18px] text-trade-navy font-black flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-trade-orange">grid_view</span>
              Related Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-5">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden hover:border-trade-orange/50 hover:shadow-lg transition-all duration-300 flex flex-col group relative"
                >
                  {/* Trade Assurance Top Badge */}
                  {p.tradeAssurance && (
                    <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">shield</span>
                      Assurance
                    </div>
                  )}
                  {/* Ready Stock Badge */}
                  {p.readyStock && (
                    <div className="absolute top-2 right-2 bg-trade-navy text-white text-[9px] font-semibold px-2 py-0.5 rounded-full shadow-sm z-10">
                      Ready Stock
                    </div>
                  )}

                  {/* Image Link */}
                  <Link href={`/products/${p.id}`} className="relative w-full aspect-square bg-surface-container-low overflow-hidden block">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Info */}
                  <div className="p-3 flex-grow flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider truncate max-w-[120px]">
                          {p.supplierName}
                        </span>
                        <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] text-amber-700 font-bold">
                          <span className="material-symbols-outlined text-[11px] text-amber-500 fill-amber-500">star</span>
                          {p.supplierRating}
                        </div>
                      </div>
                      <h3 className="font-headline-md text-[13px] md:text-[14px] text-trade-navy font-bold leading-tight line-clamp-2 hover:text-trade-orange transition-colors">
                        <Link href={`/products/${p.id}`}>{p.name}</Link>
                      </h3>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-outline-variant/10">
                      <div className="flex flex-wrap items-baseline gap-1">
                        <span className="font-display-lg text-[14px] md:text-[16px] text-trade-orange font-extrabold">
                          ₹{p.priceMin.toLocaleString("en-IN")} - ₹{p.priceMax.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-secondary font-medium">/{p.unit}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-secondary">
                        <span className="font-semibold bg-surface-container px-1.5 py-0.5 rounded text-[9px]">
                          MOQ: {p.moq} {p.unit}s
                        </span>
                        <span className="flex items-center gap-0.5 font-medium">
                          <span className="material-symbols-outlined text-[11px]">location_on</span>
                          {p.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* ==================================================== */}
      {/* interactive Modals adapting same styles as homepage */}
      {/* ==================================================== */}
      
      {/* 1. Request Bulk Quote (RFQ) Modal */}
      <AnimatePresence>
        {activeModal === "quote" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-lg overflow-hidden shadow-2xl relative z-10 p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-[16px] text-trade-navy font-bold">Request Bulk Quote (RFQ)</h3>
                  <span className="text-xs text-secondary block pt-0.5">{product.name}</span>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-secondary hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleRFQSubmit} className="space-y-4 text-[13px]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-trade-navy block">Target Quantity ({product.unit}s)</label>
                    <input
                      type="number"
                      required
                      min={product.moq}
                      placeholder={`Min ${product.moq}`}
                      value={quoteQty}
                      onChange={(e) => setQuoteQty(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-trade-navy block">Target Price (₹ per {product.unit})</label>
                    <input
                      type="number"
                      required
                      placeholder={`Catalog: ₹${product.priceMin}-₹${product.priceMax}`}
                      value={quotePrice}
                      onChange={(e) => setQuotePrice(e.target.value)}
                      className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-trade-navy block">Additional Specifications / Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Provide specific dimensions, standard certification requirements, customization needs, or delivery logistics terms..."
                    className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-trade-orange text-white rounded-lg font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                >
                  Submit Request for Quote
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Chat with Supplier Modal */}
      <AnimatePresence>
        {activeModal === "chat" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-trade-orange/10 rounded-full flex items-center justify-center text-trade-orange">
                    <span className="material-symbols-outlined text-[20px]">store</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-[15px] text-trade-navy font-bold">{product.supplierName}</h3>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider block">Online &bull; Response Time: &lt; 2 hrs</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-secondary hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="bg-surface-container-low rounded-lg p-3 max-h-32 overflow-y-auto text-xs text-secondary border border-outline-variant/10">
                <p className="italic">Auto-reference product context:</p>
                <strong className="text-trade-navy">{product.name}</strong>
                <p className="pt-1">Catalog pricing: ₹{product.priceMin}-₹{product.priceMax} / {product.unit}</p>
              </div>

              <form onSubmit={handleChatSubmit} className="space-y-3 text-[13px]">
                <div className="space-y-1">
                  <label className="font-semibold text-trade-navy block">Send instant B2B message</label>
                  <textarea
                    required
                    rows={4}
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder={`Write your inquiry for ${product.supplierName}...`}
                    className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-trade-navy text-white rounded-lg font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">send</span>
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Escrow Checkout / Buy Now Modal */}
      <AnimatePresence>
        {activeModal === "buy" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-md overflow-hidden shadow-2xl relative z-10 p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-[16px] text-trade-navy font-bold">Secure Escrow Checkout</h3>
                  <span className="text-xs text-secondary block pt-0.5">{product.name}</span>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-secondary hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <form onSubmit={handleBuySubmit} className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="font-semibold text-trade-navy block">Order Quantity ({product.unit}s)</label>
                  <input
                    type="number"
                    required
                    min={product.moq}
                    placeholder={`Minimum ${product.moq}`}
                    value={buyQty}
                    onChange={(e) => setBuyQty(e.target.value)}
                    className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                  />
                </div>

                {/* Pricing Summary Breakdown */}
                {parsedBuyQty >= product.moq ? (
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-lg p-3.5 space-y-2 text-[12.5px] text-secondary">
                    <div className="flex justify-between">
                      <span>Subtotal ({parsedBuyQty} x ₹{unitPrice}):</span>
                      <strong className="text-trade-navy">₹{escrowSubtotal.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Integrated GST (18%):</span>
                      <strong className="text-trade-navy">₹{gstAmount.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="border-t border-outline-variant/20 pt-2 flex justify-between text-[13.5px]">
                      <span className="font-bold text-trade-navy">Total (Escrow funding needed):</span>
                      <strong className="text-trade-orange font-black">₹{escrowTotal.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 text-amber-800 text-[11.5px] p-2.5 rounded-lg border border-amber-200">
                    ⚠️ Quantity must meet the Minimum Order Quantity (MOQ) of {product.moq} {product.unit}s to generate invoice.
                  </div>
                )}

                <div className="bg-emerald-50 text-emerald-800 text-[11px] p-2.5 rounded-lg border border-emerald-200 flex items-start gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600 font-bold">lock</span>
                  <p>
                    Funds are secured by TradeVistar B2B Escrow. Payment is only released to the supplier after you confirm delivery and inspect quality.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={parsedBuyQty < product.moq}
                  className="w-full py-2.5 bg-trade-navy text-white rounded-lg font-bold text-xs shadow-md hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Confirm & Fund Escrow
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Continue to Purchase Login Prompt Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-xl border border-outline-variant/30 w-full max-w-sm overflow-hidden shadow-2xl relative z-10 p-6 text-center space-y-5"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 bg-trade-orange/10 rounded-full flex items-center justify-center text-trade-orange mx-auto">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <h3 className="font-headline-md text-[18px] text-trade-navy font-bold">Continue to Purchase</h3>
                <p className="text-secondary text-[13px] leading-relaxed">
                  Please login to continue your business transaction.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/login"
                  className="w-full py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  Login
                </Link>

                <Link
                  href="/register?role=buyer"
                  className="w-full py-2.5 bg-white hover:bg-surface-container text-trade-navy border border-outline-variant rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  Create Buyer Account
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    alert("Google OAuth is simulated. Redirecting to Google Login...");
                    setAuthModalOpen(false);
                  }}
                  className="w-full py-2.5 bg-white hover:bg-surface-container text-secondary border border-outline-variant rounded-lg text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.08-.63-.12-1.27-.12-1.91z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAuthModalOpen(false)}
                className="w-full py-2 bg-transparent text-secondary hover:text-trade-navy rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
