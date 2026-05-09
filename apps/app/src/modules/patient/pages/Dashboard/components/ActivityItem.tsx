"use client";

import {
  Syringe,
  Activity,
  Pill,
  Thermometer,
  Stethoscope,
  FlaskConical,
  NotebookPen,
  ChevronRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { TimelineEvent } from "@cuidabox/api";

const TYPE_CONFIG = {
  vaccine: {
    icon: Syringe,
    bg: "bg-plum-100 dark:bg-plum-900/30",
    color: "text-plum-500",
  },
  vital: {
    icon: Activity,
    bg: "bg-sky-100 dark:bg-sky-900/30",
    color: "text-sky-500",
  },
  medication_given: {
    icon: Pill,
    bg: "bg-gold-100 dark:bg-gold-900/30",
    color: "text-gold-500",
  },
  symptom: {
    icon: Thermometer,
    bg: "bg-coral-100 dark:bg-coral-900/30",
    color: "text-coral-600",
  },
  visit: {
    icon: Stethoscope,
    bg: "bg-primary-100 dark:bg-primary-900/30",
    color: "text-primary-600",
  },
  exam: {
    icon: FlaskConical,
    bg: "bg-gold-100 dark:bg-gold-900/30",
    color: "text-gold-500",
  },
  note: {
    icon: NotebookPen,
    bg: "bg-neutral-100 dark:bg-neutral-800",
    color: "text-ink-600",
  },
} as const;

function getEventLabel(event: TimelineEvent, fallback: string): string {
  const p = event.payload;
  switch (event.type) {
    case "vaccine":
      return (p.name as string) ?? fallback;
    case "medication_given":
      return (p.medication_name as string) ?? fallback;
    case "symptom":
      return (p.description as string) ?? fallback;
    case "visit":
    case "exam":
      return (p.title as string) ?? fallback;
    case "note":
      return (p.content as string) ?? fallback;
    default:
      return fallback;
  }
}

function formatRelativeDate(isoDate: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(isoDate).getTime()) / 86_400_000,
  );
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Ayer";
  if (diff < 7) return `Hace ${diff} días`;
  return new Date(isoDate).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
  });
}

interface Props {
  event: TimelineEvent;
  typeLabel: string;
  patientId: string;
  isLast?: boolean;
}

export function ActivityItem({ event, typeLabel, patientId, isLast }: Props) {
  const config =
    TYPE_CONFIG[event.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.note;
  const Icon = config.icon;

  return (
    <Link
      href={`/patient/${patientId}/history/${event.id}`}
      className={`flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
        !isLast ? "border-b border-line/60" : ""
      }`}
    >
      <span
        className={`size-9 rounded-full grid place-items-center shrink-0 ${config.bg}`}
      >
        <Icon className={`size-4 ${config.color}`} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display text-[15px] text-primary-700 dark:text-neutral-100 leading-tight truncate">
          {getEventLabel(event, typeLabel)}
        </p>
        <p className="text-[12px] text-ink-400 mt-0.5">
          {formatRelativeDate(event.occurred_at)}
        </p>
      </div>
      <ChevronRight className="size-4 text-ink-400 shrink-0" />
    </Link>
  );
}
