import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full border border-outline-variant rounded-lg px-4 py-2.5 text-sm font-bold text-trade-navy bg-white placeholder:text-secondary/60 placeholder:font-medium focus:outline-none focus:border-primary-blue focus:ring-1 focus:ring-primary-blue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
