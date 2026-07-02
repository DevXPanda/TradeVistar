import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("block text-[10px] font-bold text-secondary uppercase tracking-wide mb-1.5", className)}
      {...props}
    />
  );
}
