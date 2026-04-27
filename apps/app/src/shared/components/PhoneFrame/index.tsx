"use client";

import { type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[420px] min-h-screen bg-cream relative flex flex-col",
        "md:my-10 md:h-[760px] md:min-h-0 md:rounded-[40px] md:overflow-hidden",
        "md:shadow-[0_28px_56px_-18px_rgba(45,74,62,0.22),0_6px_14px_rgba(45,74,62,0.06)]",
        "md:ring-1 md:ring-line",
        className,
      )}
    >
      {children}
    </div>
  );
}
