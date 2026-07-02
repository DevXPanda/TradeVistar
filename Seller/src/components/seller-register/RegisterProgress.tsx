"use client";

import React from "react";

export type RegisterStep = "account" | "business" | "success";

interface RegisterProgressProps {
  currentStep: RegisterStep;
}

export default function RegisterProgress({ currentStep }: RegisterProgressProps) {
  const stepsList: { key: RegisterStep; label: string; icon: string }[] = [
    { key: "account", label: "Email & Password", icon: "person" },
    { key: "business", label: "Business Details", icon: "business_center" },
  ];

  const stepIdx = stepsList.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-between relative mb-8 px-1">
      <div className="absolute top-4 left-0 w-full h-0.5 bg-outline-variant/20 -z-10" />
      <div
        className="absolute top-4 left-0 h-0.5 bg-primary-orange transition-all duration-500 -z-10"
        style={{
          width: `${(Math.max(stepIdx, 0) / (stepsList.length - 1)) * 100}%`,
        }}
      />

      {stepsList.map((step, idx) => {
        const isCompleted = idx < stepIdx || currentStep === "success";
        const isActive = step.key === currentStep;

        return (
          <div key={step.key} className="flex flex-col items-center flex-1 relative z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                isCompleted
                  ? "bg-primary-orange text-white"
                  : isActive
                  ? "bg-trade-navy text-white ring-4 ring-trade-navy/10"
                  : "bg-white border border-outline-variant text-secondary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
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
  );
}
