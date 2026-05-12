"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  CalendarClock,
  ChevronRight,
} from "lucide-react";
import { Skeleton } from "fcontreras2-ui";
import { Link } from "@/i18n/navigation";
import { eventsClient } from "@cuidabox/api";
import type { Treatment } from "@cuidabox/api";
import { cn } from "@/shared/lib/cn";

interface Props {
  treatment: Treatment | null;
  patientId: string;
  isLoading?: boolean;
  labels: {
    noTreatment: string;
    daysLeft: string;
    nextDose: string;
    markTaken: string;
    pendingToday: string;
    progressTaken: string;
    progressPending: string;
    progressMissed: string;
  };
}

interface DoseSchedule {
  nextTime: string | null;
  nextMedName: string | null;
  pendingCount: number;
  pastCount: number;
  totalToday: number;
}

function computeDoseSchedule(treatment: Treatment): DoseSchedule {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const allTimes: Array<{ minutes: number; time: string; medName: string }> =
    [];

  for (const step of treatment.steps) {
    if (step.type !== "medication" || !step.medication?.times_of_day) continue;
    for (const t of step.medication.times_of_day) {
      const [h, m] = t.split(":").map(Number);
      allTimes.push({
        minutes: h * 60 + m,
        time: t,
        medName: step.medication.medication_name,
      });
    }
  }

  allTimes.sort((a, b) => a.minutes - b.minutes);

  const upcoming = allTimes.filter((t) => t.minutes > nowMinutes);
  const past = allTimes.filter((t) => t.minutes <= nowMinutes);

  return {
    nextTime: upcoming[0]?.time ?? null,
    nextMedName: upcoming[0]?.medName ?? null,
    pendingCount: upcoming.length,
    pastCount: past.length,
    totalToday: allTimes.length,
  };
}

function computeProgress(treatment: Treatment): {
  elapsedPct: number;
  remainingPct: number;
  daysLeft: number;
  totalDays: number;
} {
  if (!treatment.start_date || !treatment.end_date) {
    return { elapsedPct: 0, remainingPct: 100, daysLeft: 0, totalDays: 0 };
  }

  const start = new Date(treatment.start_date);
  const end = new Date(treatment.end_date);
  const now = new Date();

  const totalMs = end.getTime() - start.getTime();
  const elapsedMs = Math.min(now.getTime() - start.getTime(), totalMs);
  const remainingMs = Math.max(end.getTime() - now.getTime(), 0);

  const totalDays = Math.round(totalMs / 86_400_000);
  const daysLeft = Math.ceil(remainingMs / 86_400_000);
  const elapsedPct = totalMs > 0 ? Math.round((elapsedMs / totalMs) * 100) : 0;
  const remainingPct = 100 - elapsedPct;

  return { elapsedPct, remainingPct, daysLeft, totalDays };
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

export function TreatmentCard({
  treatment,
  patientId,
  isLoading,
  labels,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: markTaken, isPending: isMarking } = useMutation({
    mutationFn: (payload: { medication_name: string; time: string }) =>
      eventsClient.create(patientId, {
        type: "medication_given",
        occurred_at: new Date().toISOString(),
        payload: {
          medication_name: payload.medication_name,
          dose: treatment?.steps[0]?.medication?.dose,
          unit: treatment?.steps[0]?.medication?.unit,
          time: payload.time,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient-events-recent", patientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["patient-events-all", patientId],
      });
    },
  });

  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={200}
        className="rounded-[20px]!"
      />
    );
  }

  if (!treatment) {
    return (
      <div className="flex items-center gap-3 rounded-[20px] border border-dashed border-line bg-paper/40 px-4 py-5">
        <span className="size-10 rounded-2xl bg-primary-50 grid place-items-center text-primary-400 shrink-0">
          <Pill className="size-5" />
        </span>
        <p className="text-[13.5px] text-ink-400">{labels.noTreatment}</p>
      </div>
    );
  }

  const { elapsedPct, remainingPct, daysLeft, totalDays } =
    computeProgress(treatment);
  const { nextTime, nextMedName, pendingCount, pastCount } =
    computeDoseSchedule(treatment);

  const hasMissedRisk = pastCount > 0 && nextTime === null;

  return (
    <div className="rounded-[20px] bg-paper border border-line overflow-hidden">
      {/* Title row — tappable, links to medications */}
      <Link
        href={`/patient/${patientId}/treatments/${treatment.id}`}
        className="px-4 pt-4 pb-3 flex items-center gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors"
      >
        <span className="size-10 rounded-2xl bg-gold-100 dark:bg-gold-900/40 text-gold-600 dark:text-gold-400 grid place-items-center shrink-0">
          <Pill className="size-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[15px] text-primary-700 dark:text-neutral-100 leading-tight line-clamp-1">
            {treatment.title}
          </p>
          {totalDays > 0 && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <CalendarClock className="size-3 text-ink-400" />
              <p className="text-[12px] text-ink-400">
                {daysLeft > 0 ? `${daysLeft} ${labels.daysLeft}` : "Último día"}
              </p>
            </div>
          )}
        </div>
        {hasMissedRisk && (
          <span className="inline-flex items-center gap-1 rounded-full bg-coral-100 text-coral-600 text-[11px] font-semibold px-2 py-0.5">
            <AlertCircle className="size-3" />
            {pastCount}
          </span>
        )}
        <ChevronRight className="size-4 text-ink-300 shrink-0" />
      </Link>

      {/* Progress bar */}
      {totalDays > 0 && (
        <div className="px-4 pb-3">
          <div className="flex justify-between text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400 mb-1.5">
            <span className="text-primary-600">
              {elapsedPct}% {labels.progressTaken}
            </span>
            <span>
              {remainingPct}% {labels.progressPending}
            </span>
          </div>
          <div className="h-2 rounded-full bg-cream dark:bg-neutral-800 overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
              style={{ width: `${elapsedPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-line/60" />

      {/* Next dose */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400">
            {labels.nextDose}
          </p>
          {nextTime && nextMedName ? (
            <p className="font-display text-[18px] text-primary-700 dark:text-neutral-100 leading-tight mt-0.5 mono-num">
              {formatTime(nextTime)}{" "}
              <span className="text-[13px] font-sans font-normal text-ink-600">
                · {nextMedName}
              </span>
            </p>
          ) : (
            <p className="text-[14px] text-ink-400 mt-0.5">
              {pendingCount === 0 ? "Sin dosis programadas" : "No hay más hoy"}
            </p>
          )}
          {pendingCount > 0 && (
            <p className="text-[11px] text-ink-400 mt-0.5">
              {pendingCount} {labels.pendingToday}
            </p>
          )}
        </div>

        {nextTime && nextMedName && (
          <button
            type="button"
            disabled={isMarking}
            onClick={() =>
              markTaken({ medication_name: nextMedName, time: nextTime })
            }
            className={cn(
              "inline-flex items-center gap-1.5 h-11 px-5 rounded-full text-[14px] font-semibold transition-colors shrink-0",
              isMarking
                ? "bg-primary-100 text-primary-400 cursor-not-allowed"
                : "bg-primary-700 hover:bg-primary-500 text-cream",
            )}
          >
            <CheckCircle2 className="size-4" />
            {labels.markTaken}
          </button>
        )}
      </div>
    </div>
  );
}
