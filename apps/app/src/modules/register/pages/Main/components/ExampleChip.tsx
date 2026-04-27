"use client";

import { Thermometer, Pill, Stethoscope, Moon, Syringe } from "lucide-react";
import type { QuickExample } from "@/shared/types";

const ICONS = {
  thermometer: Thermometer,
  pill: Pill,
  stethoscope: Stethoscope,
  moon: Moon,
  syringe: Syringe,
};

const TILE = {
  thermometer: "bg-coral-100 text-coral-600",
  pill: "bg-gold-100 text-gold-500",
  stethoscope: "bg-primary-100 text-primary-600",
  moon: "bg-plum-100 text-plum-500",
  syringe: "bg-sky-100 text-sky-500",
};

export function ExampleChip({
  example,
  onClick,
}: {
  example: QuickExample;
  onClick: (e: QuickExample) => void;
}) {
  const Icon = ICONS[example.icon];
  return (
    <button
      type="button"
      onClick={() => onClick(example)}
      className="w-full flex items-center gap-3 p-3.5 rounded-[18px] bg-paper border border-line hover:border-coral-200 hover:-translate-y-0.5 hover:shadow-sage transition-all text-left"
    >
      <span className={`size-10 rounded-2xl grid place-items-center ${TILE[example.icon]}`}>
        <Icon className="size-4" />
      </span>
      <span className="text-[14px] text-ink-900 leading-snug flex-1">
        {example.text}
      </span>
    </button>
  );
}
