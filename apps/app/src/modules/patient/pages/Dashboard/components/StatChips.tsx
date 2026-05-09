"use client";

import { Pill } from "lucide-react";
import { Skeleton } from "fcontreras2-ui";

interface Props {
  treatmentsCount: number;
  treatmentsLabel: string;
  isLoading?: boolean;
}

export function StatChips({
  treatmentsCount,
  treatmentsLabel,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <Skeleton variant="rectangular" height={80} className="rounded-[20px]!" />
    );
  }

  return (
    <div className="rounded-[20px] bg-gold-50 border border-gold-100 dark:bg-gold-900/20 dark:border-gold-800/30 p-4 flex items-center gap-4">
      <span className="inline-grid place-items-center size-10 rounded-full bg-gold-100 dark:bg-gold-800/40 text-gold-600 dark:text-gold-400 shrink-0">
        <Pill className="size-5" />
      </span>
      <div>
        <p className="font-display text-[32px] leading-none text-primary-700 dark:text-neutral-100">
          {treatmentsCount}
        </p>
        <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400 mt-1">
          {treatmentsLabel}
        </p>
      </div>
    </div>
  );
}
