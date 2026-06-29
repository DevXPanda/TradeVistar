"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/products";
import TopNavBar from "@/components/sections/TopNavBar";
import Footer from "@/components/sections/Footer";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";

// Step type definitions
type CheckoutStep = "shipping" | "billing" | "summary" | "payment" | "review" | "success";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const queryProductId = searchParams.get("productId") || "PROD-1001";
  const queryQty = parseInt(searchParams.get("qty") || "") || 0;

  // Retrieve matching product
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === queryProductId) || MOCK_PRODUCTS[0];
  }, [queryProductId]);

  // States
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form States - Shipping
  const [shippingCompany, setShippingCompany] = useState("");
  const [shippingGstin, setShippingGstin] = useState("");
  const [shippingName, setShippingName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingState, setShippingState] = useState("Maharashtra");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  // Form States - Billing
  const [billingCompany, setBillingCompany] = useState("");
  const [billingGstin, setBillingGstin] = useState("");
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Form States - Order Qty
  const [orderQty, setOrderQty] = useState(queryQty || product.moq);

  // Form States - Payment
  const [paymentMethod, setPaymentMethod] = useState<"escrow" | "card" | "lc" | "net30">("escrow");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // B2B Pricing Calculations
  const calculatedQty = Math.max(orderQty, product.moq);
  const itemUnitPrice = product.priceMin;
  const subtotal = calculatedQty * itemUnitPrice;
  const gstAmount = subtotal * 0.18; // 18% Integrated GST
  const grandTotal = subtotal + gstAmount;



  // Actions
  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (currentStep === "shipping") {
      setCurrentStep("billing");
    } else if (currentStep === "billing") {
      setCurrentStep("summary");
    } else if (currentStep === "summary") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setCurrentStep("review");
    } else if (currentStep === "review") {
      setIsProcessing(true);
      // Simulate enterprise processing loader
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep("success");
      }, 2000);
    }
  };

  const handleBackStep = () => {
    if (currentStep === "billing") {
      setCurrentStep("shipping");
    } else if (currentStep === "summary") {
      setCurrentStep("billing");
    } else if (currentStep === "payment") {
      setCurrentStep("summary");
    } else if (currentStep === "review") {
      setCurrentStep("payment");
    }
  };

  // Mock Invoice download
  const handleDownloadInvoice = () => {
    alert("Downloading Simulated Tax Invoice PDF...\nOrder Reference: TV-2026-CHQ832");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Form Section (col-span-8) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Step Progress Timeline Card */}
        {currentStep !== "success" && (
          <CheckoutProgress currentStep={currentStep} />
        )}

        {/* Dynamic Forms Switch */}
        <div className="bg-white border border-outline-variant/30 rounded-xl p-6 shadow-sm relative min-h-[400px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex-grow flex flex-col"
            >
              {/* Step 1: Shipping Address */}
              {currentStep === "shipping" && (
                <form onSubmit={handleNextStep} className="space-y-4 text-[13px] flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] text-trade-orange">location_on</span>
                      Corporate Shipping Address
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">Company Registered Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Buildcon Projects Private Limited"
                          value={shippingCompany}
                          onChange={(e) => setShippingCompany(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">Company GSTIN (Tax Registry) *</label>
                        <input
                          type="text"
                          required
                          maxLength={15}
                          placeholder="e.g. 27AAAAA0000A1Z5"
                          value={shippingGstin}
                          onChange={(e) => setShippingGstin(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none uppercase"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">Contact Person Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Kumar"
                          value={shippingName}
                          onChange={(e) => setShippingName(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">Corporate Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-trade-navy block">Warehouse / Delivery Site Address *</label>
                      <input
                        type="text"
                        required
                        placeholder="Plot No, Street, Industrial Area/Zone..."
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">State *</label>
                        <input
                          type="text"
                          required
                          value={shippingState}
                          onChange={(e) => setShippingState(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="Mumbai"
                          value={shippingCity}
                          onChange={(e) => setShippingCity(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-trade-navy block">PIN Code *</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="400001"
                          value={shippingZip}
                          onChange={(e) => setShippingZip(e.target.value)}
                          className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      Next: Billing Details
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Billing Details */}
              {currentStep === "billing" && (
                <form onSubmit={handleNextStep} className="space-y-4 text-[13px] flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] text-trade-orange">receipt_long</span>
                      Corporate Billing Details
                    </h3>

                    <label className="flex items-center gap-2 p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => {
                          setSameAsShipping(e.target.checked);
                          if (e.target.checked) {
                            setBillingCompany(shippingCompany);
                            setBillingGstin(shippingGstin);
                          }
                        }}
                        className="w-4 h-4 rounded border-outline-variant text-trade-orange focus:ring-trade-orange cursor-pointer"
                      />
                      <span className="font-bold text-trade-navy">Billing information is identical to Shipping Address</span>
                    </label>

                    {!sameAsShipping && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-trade-navy block">Billing Company Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Buildcon Projects Private Limited"
                            value={billingCompany}
                            onChange={(e) => setBillingCompany(e.target.value)}
                            className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-trade-navy block">Billing GSTIN *</label>
                          <input
                            type="text"
                            required
                            maxLength={15}
                            placeholder="e.g. 27AAAAA0000A1Z5"
                            value={billingGstin}
                            onChange={(e) => setBillingGstin(e.target.value)}
                            className="w-full p-2.5 bg-surface-container-low border border-outline-variant/50 focus:border-trade-orange focus:bg-white rounded-lg outline-none uppercase"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-trade-navy rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      Next: Order Summary
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Order Summary */}
              {currentStep === "summary" && (
                <div className="space-y-4 text-[13px] flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] text-trade-orange">shopping_bag</span>
                      Order Summary & Quantities
                    </h3>

                    {/* Product Card Details */}
                    <div className="flex flex-col md:flex-row gap-4 p-4 border border-outline-variant/30 rounded-xl bg-surface-container-low/40">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-outline-variant/30 bg-white flex-shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block">{product.category}</span>
                        <h4 className="font-bold text-trade-navy text-[14px] leading-tight">{product.name}</h4>
                        <p className="text-secondary text-[11px] font-medium block">Supplier: {product.supplierName}</p>
                        
                        <div className="pt-2 flex items-baseline gap-1">
                          <span className="text-trade-orange font-extrabold text-[15px]">
                            ₹{product.priceMin.toLocaleString("en-IN")} - ₹{product.priceMax.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-secondary font-medium">/{product.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Edit Section */}
                    <div className="p-4 border border-outline-variant/30 rounded-xl bg-white space-y-3">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div>
                          <label className="font-bold text-trade-navy block">Adjust Procurement Volume</label>
                          <span className="text-[11px] text-secondary font-medium block pt-0.5">Minimum Order Quantity (MOQ): {product.moq} {product.unit}s</span>
                        </div>
                        <div className="flex items-center border border-outline-variant/50 rounded-lg overflow-hidden bg-surface-container-low">
                          <button
                            type="button"
                            onClick={() => setOrderQty(Math.max(product.moq, orderQty - 50))}
                            className="px-3 py-2 hover:bg-surface-variant text-trade-navy font-bold border-r border-outline-variant/30 transition-colors"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={orderQty}
                            min={product.moq}
                            onChange={(e) => setOrderQty(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                            className="w-20 text-center font-bold outline-none text-xs bg-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setOrderQty(orderQty + 50)}
                            className="px-3 py-2 hover:bg-surface-variant text-trade-navy font-bold border-l border-outline-variant/30 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-trade-navy rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextStep()}
                      className="px-6 py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      Next: Payment Method
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment Method */}
              {currentStep === "payment" && (
                <form onSubmit={handleNextStep} className="space-y-4 text-[13px] flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] text-trade-orange">payments</span>
                      Payment Method
                    </h3>

                    <div className="space-y-3">
                      {/* B2B Escrow Wire */}
                      <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all bg-white hover:border-trade-orange/50 border-outline-variant/40">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "escrow"}
                          onChange={() => setPaymentMethod("escrow")}
                          className="mt-1 accent-trade-orange cursor-pointer"
                        />
                        <div className="space-y-1">
                          <strong className="text-trade-navy block">Secure Escrow Wire Transfer (RTGS / NEFT)</strong>
                          <span className="text-[11.5px] text-secondary block leading-relaxed">
                            Transfer directly to the TradeVistar secure Escrow account. Funds are released only upon successful site inspection and delivery.
                          </span>
                        </div>
                      </label>

                      {/* Corporate Card */}
                      <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all bg-white hover:border-trade-orange/50 border-outline-variant/40">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="mt-1 accent-trade-orange cursor-pointer"
                        />
                        <div className="space-y-1.5 w-full">
                          <strong className="text-trade-navy block">Corporate Credit / Debit Card</strong>
                          <span className="text-[11.5px] text-secondary block">
                            Secure card transactions with instant processing limits.
                          </span>
                          {paymentMethod === "card" && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                              <input
                                type="text"
                                required
                                placeholder="Card Number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="sm:col-span-3 p-2 border border-outline-variant/50 rounded-lg text-xs outline-none focus:border-trade-orange"
                              />
                              <input
                                type="text"
                                required
                                placeholder="Expiry MM/YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="p-2 border border-outline-variant/50 rounded-lg text-xs outline-none focus:border-trade-orange"
                              />
                              <input
                                type="password"
                                required
                                maxLength={3}
                                placeholder="CVV"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                                className="p-2 border border-outline-variant/50 rounded-lg text-xs outline-none focus:border-trade-orange"
                              />
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Letter of Credit */}
                      <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all bg-white hover:border-trade-orange/50 border-outline-variant/40">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "lc"}
                          onChange={() => setPaymentMethod("lc")}
                          className="mt-1 accent-trade-orange cursor-pointer"
                        />
                        <div className="space-y-1">
                          <strong className="text-trade-navy block">Letter of Credit (L/C) at Sight</strong>
                          <span className="text-[11.5px] text-secondary block leading-relaxed">
                            Irrevocable Letter of Credit issued by a tier-1 banking institution. Necessary documentation will be sent to your bank.
                          </span>
                        </div>
                      </label>

                      {/* Net-30 Terms */}
                      <label className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all bg-white hover:border-trade-orange/50 border-outline-variant/40">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "net30"}
                          onChange={() => setPaymentMethod("net30")}
                          className="mt-1 accent-trade-orange cursor-pointer"
                        />
                        <div className="space-y-1">
                          <strong className="text-trade-navy block">Net-30 Corporate Credit Terms</strong>
                          <span className="text-[11.5px] text-secondary block leading-relaxed">
                            Decline cash payment upfront. Subject to corporate KYC validation and credit limit confirmation within 2 business days.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-trade-navy rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-trade-navy hover:bg-trade-navy/95 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      Next: Review Order
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 5: Review Order */}
              {currentStep === "review" && (
                <div className="space-y-4 text-[13px] flex-grow flex flex-col justify-between relative">
                  <div className="space-y-4">
                    <h3 className="font-headline-md text-[16px] text-trade-navy font-bold border-b border-outline-variant/10 pb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[20px] text-trade-orange">rate_review</span>
                      Review B2B Order Details
                    </h3>

                    {/* Review Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Shipping Info Card */}
                      <div className="border border-outline-variant/30 rounded-xl p-4 space-y-2 bg-surface-container-low/20">
                        <strong className="text-trade-navy text-xs block font-bold border-b border-outline-variant/10 pb-1.5">Shipping Destination</strong>
                        <div className="text-secondary text-[12px] space-y-1">
                          <p className="font-bold text-trade-navy">{shippingCompany}</p>
                          <p>GSTIN: {shippingGstin}</p>
                          <p>Recipient: {shippingName}</p>
                          <p>Address: {shippingAddress}, {shippingCity}, {shippingState} - {shippingZip}</p>
                          <p>Phone: {shippingPhone}</p>
                        </div>
                      </div>

                      {/* Payment Method Card */}
                      <div className="border border-outline-variant/30 rounded-xl p-4 space-y-2 bg-surface-container-low/20">
                        <strong className="text-trade-navy text-xs block font-bold border-b border-outline-variant/10 pb-1.5">Payment Method</strong>
                        <div className="text-secondary text-[12px] space-y-1">
                          {paymentMethod === "escrow" && (
                            <p className="font-bold text-trade-navy">🛡️ Secure Escrow Wire Transfer</p>
                          )}
                          {paymentMethod === "card" && (
                            <p className="font-bold text-trade-navy">💳 Corporate Credit Card</p>
                          )}
                          {paymentMethod === "lc" && (
                            <p className="font-bold text-trade-navy">📄 Letter of Credit (L/C)</p>
                          )}
                          {paymentMethod === "net30" && (
                            <p className="font-bold text-trade-navy">💼 Net-30 Corporate Terms</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Processing Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-20 rounded-xl">
                      <div className="w-10 h-10 border-4 border-trade-orange border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-bold text-trade-navy text-xs uppercase tracking-wider">Processing B2B Escrow Lock...</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-2.5 bg-white border border-outline-variant hover:bg-surface-container text-trade-navy rounded-lg font-bold text-xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextStep()}
                      className="px-6 py-2.5 bg-trade-orange hover:brightness-105 text-white rounded-lg font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Place Order (Lock Escrow)
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6: Order Success */}
              {currentStep === "success" && (
                <CheckoutSuccess
                  supplierName={product.supplierName}
                  subtotal={subtotal}
                  gstAmount={gstAmount}
                  grandTotal={grandTotal}
                  handleDownloadInvoice={handleDownloadInvoice}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Pricing Receipt Card (col-span-4) */}
      {currentStep !== "success" && (
        <div className="lg:col-span-4 space-y-6">
          <CheckoutSummary
            calculatedQty={calculatedQty}
            unit={product.unit}
            subtotal={subtotal}
            gstAmount={gstAmount}
            grandTotal={grandTotal}
          />
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
      {/* Sticky Header */}
      <TopNavBar />

      <main className="flex-grow pt-24 pb-s-xl px-s-md">
        <div className="max-w-s-container-max mx-auto space-y-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
            <Link href="/" className="hover:text-trade-orange transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-trade-navy font-bold">B2B Checkout</span>
          </div>

          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-trade-orange border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <CheckoutContent />
          </Suspense>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
