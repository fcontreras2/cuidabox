"use client";

import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Children, cloneElement, isValidElement } from "react";
import { cn } from "@/shared/lib/cn";

export type SettingsItemTone = "neutral" | "danger";

export interface SettingsItemProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  label: string;
  description?: string;
  trailing?: React.ReactNode;
  tone?: SettingsItemTone;
  onClick?: () => void;
  /** Set automatically when wrapped in <SettingsGroup>. */
  isFirst?: boolean;
  isLast?: boolean;
}

export function SettingsItem({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  description,
  trailing,
  tone = "neutral",
  onClick,
  isFirst,
  isLast,
}: SettingsItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors",
        "hover:bg-cream/60 active:bg-cream",
        !isLast && "border-b border-line/60",
        isFirst && "rounded-t-[18px]",
        isLast && "rounded-b-[18px]",
      )}
    >
      <span
        className={cn(
          "size-10 rounded-2xl grid place-items-center shrink-0",
          iconBg,
        )}
      >
        <Icon className={cn("size-[18px]", iconColor)} />
      </span>
      <span className="flex-1 min-w-0">
        <span
          className={cn(
            "block text-[15px] font-medium leading-tight",
            tone === "danger" ? "text-coral-600" : "text-primary-700",
          )}
        >
          {label}
        </span>
        {description && (
          <span className="block text-[12.5px] text-ink-400 mt-0.5 truncate">
            {description}
          </span>
        )}
      </span>
      {trailing ?? <ChevronRight className="size-4 text-ink-400 shrink-0" />}
    </button>
  );
}

export function SettingsGroup({ children }: { children: React.ReactNode }) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <div className="rounded-[18px] bg-paper border border-line overflow-hidden">
      {items.map((child, i) =>
        cloneElement(child as React.ReactElement<SettingsItemProps>, {
          isFirst: i === 0,
          isLast: i === items.length - 1,
        }),
      )}
    </div>
  );
}
