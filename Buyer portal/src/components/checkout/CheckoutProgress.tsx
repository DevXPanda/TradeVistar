"use client";

import React from "react";

type CheckoutStep = "shipping" | "billing" | "summary" | "payment" | "review" | "success";

interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const stepsList: { key: CheckoutStep; label: string; icon: string }[] = [
    { key: "shipping", label: "Shipping Address", icon: "location_on" },
    { key: "billing", label: "Billing Details", icon: "receipt_long" },
    { key: "summary", label: "Order Summary", icon: "shopping_bag" },
    { key: "payment", label: "Payment Method", icon: "payments" },
    { key: "review", label: "Review Order", icon: "rate_review" },
    { key: "success", label: "Order Success", icon: "check_circle" },
  ];

  const stepIdx = stepsList.findIndex((s) => s.key === currentStep);

  return (
    <div className="bg-white border border-outline-variant/30 rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto">
      <div className="min-w-[600px] flex items-center justify-between relative">
        {/* Timeline Connector bar background */}
        <div className="absolute top-5 left-0 w-full h-0.5 bg-outline-variant/20 -z-10" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-trade-orange transition-all duration-500 -z-10"
          style={{
            width: `${
              (stepIdx / (stepsList.length - 1)) * 100
            }%`,
          }}
        />

        {stepsList.map((step, idx) => {
          const isCompleted = idx < stepIdx;
          const isActive = step.key === currentStep;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? "bg-trade-orange text-white"
                    : isActive
                    ? "bg-trade-navy text-white ring-4 ring-trade-navy/10"
                    : "bg-white border border-outline-variant text-secondary"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCompleted ? "check" : step.icon}
                </span>
              </div>
              <span 
                className={`text-[10px] md:text-[11px] font-bold mt-2 text-center transition-colors ${
                  isActive ? "text-trade-navy" : "text-secondary"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
