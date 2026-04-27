"use client";

import { Stethoscope, Syringe, FlaskConical, Pill, ChevronRight } from "lucide-react";
import { Card } from "fcontreras2-ui";
import type { UpcomingItem } from "@/shared/types";

const ICONS = {
  appointment: Stethoscope,
  vaccine: Syringe,
  exam: FlaskConical,
  medication: Pill,
};

const TILE_COLORS = {
  appointment: "bg-sky-100 text-sky-500",
  vaccine: "bg-plum-100 text-plum-500",
  exam: "bg-gold-100 text-gold-500",
  medication: "bg-coral-100 text-coral-600",
};

export function UpcomingList({ items }: { items: UpcomingItem[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => {
        const Icon = ICONS[item.type];
        return (
          <Card
            key={item.id}
            padding="none"
            shadow="none"
            className="!border-line bg-paper !rounded-[18px] p-4 hover:border-coral-200 transition-colors"
          >
            <button type="button" className="w-full flex items-center gap-4 text-left">
              <span className={`size-11 rounded-2xl grid place-items-center ${TILE_COLORS[item.type]}`}>
                <Icon className="size-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display text-[17px] leading-tight text-primary-700">
                  {item.title}
                </div>
                <div className="text-[13px] text-ink-600 mt-0.5">
                  <span className="font-display-italic text-coral-600">{item.when}</span>
                  {item.meta && (
                    <>
                      <span className="mx-1.5 text-ink-200">·</span>
                      {item.meta}
                    </>
                  )}
                </div>
              </div>
              <ChevronRight className="size-4 text-ink-400 shrink-0" />
            </button>
          </Card>
        );
      })}
    </div>
  );
}
