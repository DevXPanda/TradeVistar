import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ className, glass = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        glass
          ? "glass border border-white/50 rounded-2xl shadow-2xl shadow-primary-blue/10 ring-1 ring-white/60"
          : "bg-white border border-outline-variant/20 rounded-2xl shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 md:p-8", className)} {...props} />;
}
