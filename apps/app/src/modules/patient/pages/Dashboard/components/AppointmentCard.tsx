"use client";

import { Link } from "@/i18n/navigation";
import { Calendar, ChevronRight, CalendarPlus } from "lucide-react";
import type { AppointmentSnapshot } from "@cuidabox/api";

interface Props {
  appointment: AppointmentSnapshot | null | undefined;
  patientId: string;
  noneLabel: string;
  scheduleLabel: string;
  isLoading?: boolean;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const time = date.toLocaleTimeString("es", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (date.toDateString() === now.toDateString()) return `Hoy · ${time}`;
  if (date.toDateString() === tomorrow.toDateString())
    return `Mañana · ${time}`;
  const dateStr = date.toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  return `${dateStr[0].toUpperCase()}${dateStr.slice(1)} · ${time}`;
}

export function AppointmentCard({
  appointment,
  patientId,
  noneLabel,
  scheduleLabel,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="h-[76px] rounded-[20px] bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
    );
  }

  if (!appointment) {
    return (
      <Link
        href={`/patient/${patientId}/history`}
        className="flex items-center gap-3 rounded-[20px] border border-dashed border-line bg-paper/40 dark:bg-neutral-900/40 px-4 py-4 hover:border-coral-200 transition-colors"
      >
        <span className="size-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 grid place-items-center text-ink-400 shrink-0">
          <CalendarPlus className="size-4" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] text-ink-500 dark:text-neutral-400">
            {noneLabel}
          </p>
          <p className="text-[12px] text-coral-500 font-medium mt-0.5">
            {scheduleLabel} →
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/patient/${patientId}/history`}
      className="flex items-center gap-4 rounded-[20px] bg-paper border border-line p-4 hover:border-coral-200 hover:shadow-sage transition-all"
    >
      <span className="size-11 rounded-2xl bg-sky-100 dark:bg-sky-900/30 grid place-items-center text-sky-500 shrink-0">
        <Calendar className="size-5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display text-[16px] text-primary-700 dark:text-neutral-100 leading-tight truncate">
          {appointment.title}
        </p>
        <p className="text-[12.5px] text-ink-400 mt-0.5">
          {appointment.doctor_name && <span>{appointment.doctor_name} · </span>}
          <span className="font-display-italic text-coral-500">
            {formatDate(appointment.scheduled_at)}
          </span>
        </p>
      </div>
      <ChevronRight className="size-4 text-ink-400 shrink-0" />
    </Link>
  );
}
