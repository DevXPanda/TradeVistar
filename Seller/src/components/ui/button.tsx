import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "default" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-bold transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary-orange hover:bg-orange-600 text-white shadow-sm hover:shadow-orange-600/10",
  secondary: "bg-primary-blue hover:bg-secondary-blue text-white shadow-sm",
  outline: "border border-outline-variant hover:bg-slate-50 text-trade-navy bg-white",
  ghost: "hover:bg-slate-50 text-trade-navy bg-transparent",
  link: "text-primary-blue hover:text-secondary-blue bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs rounded-lg",
  default: "px-6 py-3 text-[13px] rounded-lg",
  lg: "px-8 py-3.5 text-sm rounded-lg",
  icon: "w-10 h-10 rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variant !== "link" && sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
