"use client";

import {
  Thermometer,
  Pill,
  Stethoscope,
  Syringe,
  FlaskConical,
  Moon,
  NotebookPen,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TimelineEvent, TimelineEventType } from "@/shared/types";

const ICONS: Record<TimelineEventType, typeof Thermometer> = {
  fever: Thermometer,
  medication: Pill,
  appointment: Stethoscope,
  vaccine: Syringe,
  exam: FlaskConical,
  sleep: Moon,
  note: NotebookPen,
};

const TILE: Record<TimelineEventType, string> = {
  fever: "bg-coral-100 text-coral-600",
  medication: "bg-gold-100 text-gold-500",
  appointment: "bg-sky-100 text-sky-500",
  vaccine: "bg-plum-100 text-plum-500",
  exam: "bg-gold-100 text-gold-500",
  sleep: "bg-plum-100 text-plum-500",
  note: "bg-primary-100 text-primary-600",
};

export function TimelineEventCard({ event }: { event: TimelineEvent }) {
  const Icon = ICONS[event.type];
  return (
    <Link href={`/history/${event.id}`} className="block relative pl-12 group">
      <span
        className={`absolute left-2 top-3 size-7 rounded-full grid place-items-center ring-4 ring-cream ${TILE[event.type]}`}
      >
        <Icon className="size-3.5" />
      </span>
      <div className="rounded-[18px] bg-paper border border-line p-4 group-hover:border-coral-200 group-hover:shadow-sage transition-all">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h4 className="font-display text-[17px] leading-tight text-primary-700">
            {event.title}
          </h4>
          <span className="font-display-italic text-[13px] text-coral-600 mono-num shrink-0">
            {event.timeLabel}
          </span>
        </div>
        {event.description && (
          <p className="text-[13.5px] text-ink-600 leading-relaxed">
            {event.description}
          </p>
        )}
        {event.meta && (
          <span className="inline-block mt-2 text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400">
            {event.meta}
          </span>
        )}
      </div>
    </Link>
  );
}
