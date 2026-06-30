"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/product";
import { Product } from "@/data/products";
import { getAllProducts, getProductSlug } from "@/lib/product/productHelpers";
import { formatPrice } from "@/lib/product/formatPrice";
import Breadcrumb from "./Breadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductPricing from "./ProductPricing";
import ProductMOQ from "./ProductMOQ";
import ProductVariants from "./ProductVariants";
import ProductActions from "./ProductActions";
import ProductSellerCard from "./ProductSellerCard";
import ProductTabs from "./ProductTabs";
import ProductOverview from "./ProductOverview";
import ProductSpecifications from "./ProductSpecifications";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailsContainerProps {
  product: ProductType;
}

export default function ProductDetailsContainer({ product }: ProductDetailsContainerProps) {
  const router = useRouter();

  // B2B Actions state
  const [activeModal, setActiveModal] = useState<"buy" | "quote" | "chat" | null>(null);
  const [selectedQty, setSelectedQty] = useState(product.moq);
  const [selectedPrice, setSelectedPrice] = useState(product.priceMin);
  const [targetPriceInput, setTargetPriceInput] = useState("");
  const [quoteRemarks, setQuoteRemarks] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  // Other products from same supplier (excluding current product)
  const allProducts = getAllProducts();
  const otherStoreProducts = useMemo(() => {
    return allProducts.filter(
      (p) => p.supplierName === product.supplierName && p.id !== product.id
    ) as unknown as ProductType[];
  }, [product, allProducts]);

  // Derived related products in the same category
  const relatedProducts = useMemo(() => {
    return allProducts.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 8) as unknown as ProductType[];
  }, [product, allProducts]);

  // Pricing calculations
  const subtotal = selectedQty * selectedPrice;
  const gstAmount = subtotal * 0.18; // 18% Integrated GST
  const totalEscrow = subtotal + gstAmount;

  const handleQtyChange = (qty: number, totalPrice: number) => {
    setSelectedQty(qty);
    setSelectedPrice(qty > 0 ? totalPrice / qty : product.priceMin);
  };

  const handleRFQSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `RFQ Proposal Submitted Successfully!\nQuantity: ${selectedQty} ${product.unit}s\nTarget Bidding: ₹${targetPriceInput || selectedPrice} / unit\nRemarks: "${quoteRemarks || "None"}"`
    );
    setActiveModal(null);
    setTargetPriceInput("");
    setQuoteRemarks("");
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message Sent to ${product.supplierName}!\nMessage details: "${chatMessage}"`);
    setActiveModal(null);
    setChatMessage("");
  };

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Procurement Order Created!\nEscrow funded: ₹${totalEscrow.toLocaleString("en-IN")}\nForwarding to TradeVistar secure banking gateway...`
    );
    setActiveModal(null);
  };

  const handleViewProduct = (prod: ProductType) => {
    router.push(`/products/${getProductSlug(prod.name)}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumbs */}
      <Breadcrumb category={product.category} productName={product.name} />

      {/* 2. Main columns area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Gallery (col-span-5) */}
        <div className="lg:col-span-5">
          <ProductGallery
            primaryImage={product.image}
            gallery={product.gallery}
            productName={product.name}
          />
        </div>

        {/* Center Column: Specifications, MOQ pricing, Quantity Selector & Actions (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <ProductInfo product={product} />
          
          <ProductPricing
            priceMin={product.priceMin}
            priceMax={product.priceMax}
            unit={product.unit}
            moq={product.moq}
            deliveryTime={product.deliveryTime}
          />

          <ProductMOQ
            moq={product.moq}
            priceMin={product.priceMin}
            priceMax={product.priceMax}
            unit={product.unit}
            onQtyChange={handleQtyChange}
          />

          <ProductVariants category={product.category} />

          <ProductActions
            onBuyNow={() => setActiveModal("buy")}
            onAddToCart={() => alert(`"${product.name}" added to procurement order cart!`)}
            onSendRFQ={() => setActiveModal("quote")}
          />
        </div>

        {/* Right Column: Seller Sidebar (col-span-3) */}
        <div className="lg:col-span-3">
          <ProductSellerCard
            product={product}
            onContactSupplier={() => alert(`Supplier Profile: ${product.supplierProfile.description}`)}
            onChat={() => setActiveModal("chat")}
            onViewProduct={handleViewProduct}
            otherStoreProducts={otherStoreProducts}
          />
        </div>

      </div>

      {/* 3. Detailed Information Tab Panels */}
      <div className="border-t border-outline-variant/10 pt-8">
        <ProductTabs
          overviewContent={
            <ProductOverview
              description={product.description}
              specifications={product.specifications}
              packagingDetails={product.packagingDetails}
            />
          }
          specsContent={<ProductSpecifications specifications={product.specifications} />}
          shippingContent={
            <div className="space-y-4 text-xs font-semibold text-secondary leading-relaxed">
              <div>
                <h4 className="text-[13px] font-black text-trade-navy uppercase tracking-wider block mb-1">
                  Logistics & Port clearance
                </h4>
                <p>Dispatch Location Port: <strong className="text-trade-navy">{product.shippingInfo.port}</strong></p>
                <p>Est. Transit Time Frame: <strong className="text-trade-navy">{product.shippingInfo.transitTime}</strong></p>
              </div>
              <div className="pt-3 border-t border-outline-variant/5">
                <h4 className="text-[13px] font-black text-trade-navy uppercase tracking-wider block mb-1">
                  Approved Carriage Operations
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {product.shippingInfo.methods.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          }
          reviewsContent={<ProductReviews reviews={product.reviews} rating={product.supplierRating} />}
        />
      </div>

      {/* 4. Related Products section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-outline-variant/10">
          <RelatedProducts
            products={relatedProducts}
            onViewDetails={(prod) => router.push(`/products/${getProductSlug(prod.name)}`)}
          />
        </div>
      )}

      {/* 5. Modals Overlay */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="bg-white rounded-2xl border border-outline-variant/30 w-full max-w-lg overflow-hidden shadow-2xl relative z-50 p-6 text-secondary">
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-trade-navy cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>

            {/* RFQ proposal form modal */}
            {activeModal === "quote" && (
              <div className="space-y-4 text-xs font-semibold text-trade-navy">
                <div>
                  <span className="text-[10px] bg-trade-orange/15 text-trade-orange font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    RFQ Quotation proposal
                  </span>
                  <h2 className="font-headline-lg text-[18px] text-trade-navy font-black mt-1 uppercase tracking-wide">
                    Request custom pricing
                  </h2>
                  <p className="text-[11px] text-secondary mt-1 font-medium">
                    Submit a target quote bidding directly to: <strong className="text-trade-navy">{product.supplierName}</strong>.
                  </p>
                </div>

                <form onSubmit={handleRFQSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-secondary uppercase text-[9.5px] tracking-wider block font-bold">QTY Requested</label>
                      <input
                        type="number"
                        readOnly
                        value={selectedQty}
                        className="w-full px-3 py-2 border border-outline-variant/40 rounded-lg outline-none bg-slate-50 text-secondary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-secondary uppercase text-[9.5px] tracking-wider block font-bold">Target Price (₹ / unit)</label>
                      <input
                        type="number"
                        placeholder={`Range: ₹${product.priceMin}-${product.priceMax}`}
                        value={targetPriceInput}
                        onChange={(e) => setTargetPriceInput(e.target.value)}
                        className="w-full px-3 py-2 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[9.5px] tracking-wider block font-bold">Logistics Spec Requirements</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Specify customized packaging requirements, testing standards, or shipping coordination request details..."
                      value={quoteRemarks}
                      onChange={(e) => setQuoteRemarks(e.target.value)}
                      className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white text-trade-navy font-medium"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="flex-1 py-2.5 border border-outline-variant hover:bg-slate-50 text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-trade-orange hover:bg-trade-orange/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Send proposal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Direct Chat modal */}
            {activeModal === "chat" && (
              <div className="space-y-4 text-xs font-semibold text-trade-navy">
                <div>
                  <span className="text-[10px] bg-[#0A47BC]/15 text-[#0A47BC] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Supplier instant chat
                  </span>
                  <h2 className="font-headline-lg text-[18px] text-trade-navy font-black mt-1 uppercase tracking-wide">
                    Contact {product.supplierName}
                  </h2>
                </div>

                <form onSubmit={handleChatSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-secondary uppercase text-[9.5px] tracking-wider block font-bold">Message Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder={`Inquire about "${product.name}" specs, availability, discounts, or delivery timeline...`}
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="w-full p-3 border border-outline-variant/60 rounded-lg outline-none focus:border-trade-orange bg-white font-medium"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="flex-1 py-2.5 border border-outline-variant hover:bg-slate-50 text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#0A47BC] hover:bg-[#0A47BC]/95 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Buy Escrow Modal */}
            {activeModal === "buy" && (
              <div className="space-y-4 text-xs font-semibold text-trade-navy">
                <div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    Escrow secured transaction
                  </span>
                  <h2 className="font-headline-lg text-[18px] text-trade-navy font-black mt-1 uppercase tracking-wide">
                    Fund Procurement Order
                  </h2>
                </div>

                <form onSubmit={handleBuySubmit} className="space-y-4">
                  <div className="border border-outline-variant/25 rounded-2xl p-3 bg-slate-50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-secondary">Subtotal ({selectedQty} units)</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Integrated GST (18%)</span>
                      <span>{formatPrice(gstAmount)}</span>
                    </div>
                    <div className="border-t border-outline-variant/10 pt-2 flex justify-between font-black text-[13px] text-trade-navy">
                      <span>Total Escrow Amount</span>
                      <span className="text-trade-orange">{formatPrice(totalEscrow)}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex gap-2">
                    <span className="material-symbols-outlined text-emerald-700 text-[18px] flex-shrink-0">shield</span>
                    <p className="text-[11px] leading-relaxed text-secondary font-medium">
                      Funds will be held securely in escrow. Pay-out is only released to <strong className="text-trade-navy font-black">{product.supplierName}</strong> once you receive and verify the products.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="flex-1 py-2.5 border border-outline-variant hover:bg-slate-50 text-secondary rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Fund Escrow & Pay
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
