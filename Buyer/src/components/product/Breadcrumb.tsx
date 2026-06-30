import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
  category: string;
  productName: string;
}

export default function Breadcrumb({ category, productName }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-secondary font-medium py-3 border-b border-outline-variant/10">
      <Link href="/" className="hover:text-trade-orange transition-colors">
        Home
      </Link>
      <span className="material-symbols-outlined text-[10px] text-secondary/40 select-none">
        chevron_right
      </span>
      <span className="hover:text-trade-orange cursor-pointer transition-colors">
        {category}
      </span>
      <span className="material-symbols-outlined text-[10px] text-secondary/40 select-none">
        chevron_right
      </span>
      <span className="text-trade-navy font-bold truncate max-w-[200px] md:max-w-none">
        {productName}
      </span>
    </div>
  );
}
