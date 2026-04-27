"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function SectionTitle({
  children,
  hint,
  className,
}: {
  children: ReactNode;
  hint?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-3 mb-4", className)}>
      <h3 className="font-display text-[22px] leading-tight tracking-tight text-primary-700">
        {children}
      </h3>
      {hint && <span className="text-xs text-ink-400 font-medium">{hint}</span>}
    </div>
  );
}
