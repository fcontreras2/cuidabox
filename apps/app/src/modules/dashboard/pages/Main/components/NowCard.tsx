"use client";

import { Pill, Check } from "lucide-react";
import { Button } from "fcontreras2-ui";
import type { Medication } from "@/shared/types";

export function NowCard({ medication }: { medication: Medication }) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-coral-500 to-coral-600 text-paper shadow-warm p-6">
      <div
        aria-hidden
        className="absolute -top-12 -right-10 size-44 rounded-full bg-paper/15 blur-2xl"
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="size-11 rounded-2xl bg-paper/20 backdrop-blur grid place-items-center">
            <Pill className="size-5" />
          </span>
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] opacity-80 font-semibold">
              Toca darle
            </p>
            <p className="font-display text-[22px] leading-tight">
              {medication.name}{" "}
              <span className="opacity-90">{medication.shortDose}</span>
            </p>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed opacity-90 max-w-[260px]">
          La próxima dosis es a las{" "}
          <span className="font-display-italic">{medication.nextDoseAt}</span>. Está justo a tiempo.
        </p>
        <Button
          variant="secondary"
          size="lg"
          leftIcon={<Check className="size-4" />}
          className="!bg-paper !text-primary-700 !rounded-full !h-12 !px-6 hover:!bg-cream self-start font-medium"
        >
          Ya le di
        </Button>
      </div>
    </div>
  );
}
