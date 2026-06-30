import React from "react";

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse pb-10">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>

      {/* 3-Column Skeleton Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-slate-200 rounded-2xl"></div>
          <div className="flex gap-2">
            <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
            <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
            <div className="w-16 h-16 bg-slate-200 rounded-lg"></div>
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-24 bg-slate-200 rounded"></div>
          <div className="h-32 bg-slate-200 rounded"></div>
        </div>

        {/* Seller Sidebar Column */}
        <div className="lg:col-span-3">
          <div className="h-[280px] bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
