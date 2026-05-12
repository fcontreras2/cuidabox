"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Pill,
  FlaskConical,
  Activity,
  ChevronRight,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { eventsClient } from "@cuidabox/api";
import { cn } from "@/shared/lib/cn";
import { formatSlotShort } from "@/shared/lib/doses";
import type { DoseSlot } from "@/shared/lib/doses";
import type { StepCard } from "../useMedications";

const STEP_ICON = {
  medication: Pill,
  exam: FlaskConical,
  action: Activity,
} as const;

const STEP_ICON_COLOR = {
  medication:
    "bg-gold-100 dark:bg-gold-900/40 text-gold-600 dark:text-gold-400",
  exam: "bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400",
  action:
    "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400",
} as const;

export function MedicationCard({
  card,
  patientId,
}: {
  card: StepCard;
  patientId: string;
}) {
  const { step, treatment, progress } = card;
  const queryClient = useQueryClient();
  const Icon = STEP_ICON[step.type];

  const { mutate, isPending: isMarking } = useMutation({
    mutationFn: ({ slot, skipped }: { slot: DoseSlot; skipped?: boolean }) => {
      if (step.type === "medication") {
        return eventsClient.create(patientId, {
          type: "medication_given",
          occurred_at: new Date().toISOString(),
          payload: {
            medication_name: step.medication?.medication_name ?? step.title,
            dose: step.medication?.dose ?? null,
            unit: step.medication?.unit ?? null,
            time: slot.time,
            step_id: step.id,
            ...(skipped ? { status: "skipped" } : {}),
          },
        });
      }
      return eventsClient.create(patientId, {
        type: step.type === "exam" ? "exam" : "note",
        occurred_at: new Date().toISOString(),
        payload: { step_id: step.id, title: step.title },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patient-events-all", patientId],
      });
      queryClient.invalidateQueries({
        queryKey: ["patient-events-recent", patientId],
      });
    },
  });

  const oldest = progress.oldestPending;
  const { taken, skipped, pending, total } = progress;
  const takenPct = total > 0 ? (taken / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;
  const skippedPct = total > 0 ? (skipped / total) * 100 : 0;

  const title =
    step.type === "medication" && step.medication
      ? `${step.medication.medication_name} · ${step.medication.dose ?? ""} ${step.medication.unit ?? ""}`.trim()
      : step.title;

  const subtitle =
    step.type === "medication" && step.medication?.frequency
      ? `${treatment.title} · ${step.medication.frequency}`
      : treatment.title;

  const isOverdue = oldest && oldest.scheduledAt < new Date();

  return (
    <article className="rounded-[20px] bg-paper border border-line overflow-hidden dark:bg-neutral-900/60">
      {/* Header — tappable, links to detail */}
      <Link
        href={`/patient/${patientId}/medications/${step.id}`}
        className="flex items-start gap-3 px-4 pt-4 pb-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
      >
        <span
          className={cn(
            "size-10 rounded-2xl grid place-items-center shrink-0",
            STEP_ICON_COLOR[step.type],
          )}
        >
          <Icon className="size-5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-[15px] text-primary-700 dark:text-neutral-100 leading-tight line-clamp-1">
            {title}
          </p>
          <p className="text-[12px] text-ink-400 mt-0.5 line-clamp-1">
            {subtitle}
          </p>
        </div>
        <ChevronRight className="size-4 text-ink-300 shrink-0 mt-1" />
      </Link>

      {/* Oldest pending dose */}
      {oldest && (
        <div
          className={cn(
            "mx-4 mb-3 flex items-center gap-2.5 rounded-[14px] px-3.5 py-2.5 border",
            isOverdue
              ? "bg-coral-50 dark:bg-coral-950/30 border-coral-200 dark:border-coral-800"
              : "bg-gold-50 dark:bg-gold-950/30 border-gold-200 dark:border-gold-800",
          )}
        >
          <AlertCircle
            className={cn(
              "size-4 shrink-0",
              isOverdue ? "text-coral-500" : "text-gold-500",
            )}
          />
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-[10px] uppercase tracking-[0.12em] font-semibold",
                isOverdue ? "text-coral-500" : "text-gold-600",
              )}
            >
              Pendiente desde
            </p>
            <p
              className={cn(
                "font-display text-[17px] leading-tight mono-num",
                isOverdue
                  ? "text-coral-700 dark:text-coral-300"
                  : "text-gold-700 dark:text-gold-300",
              )}
            >
              {formatSlotShort(oldest.date, oldest.time)}
            </p>
          </div>
        </div>
      )}

      {/* Tricolor progress bar */}
      {total > 0 && (
        <div className="px-4 pb-3">
          <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex">
            {takenPct > 0 && (
              <div
                className="h-full bg-primary-500 shrink-0 transition-all"
                style={{ width: `${takenPct}%` }}
              />
            )}
            {pendingPct > 0 && (
              <div
                className="h-full bg-gold-400 shrink-0 transition-all"
                style={{ width: `${pendingPct}%` }}
              />
            )}
            {skippedPct > 0 && (
              <div
                className="h-full bg-coral-400 shrink-0 transition-all"
                style={{ width: `${skippedPct}%` }}
              />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]">
            {taken > 0 && (
              <span className="text-primary-600">{taken} tomadas</span>
            )}
            {pending > 0 && (
              <span className="text-gold-600">{pending} pend.</span>
            )}
            {skipped > 0 && (
              <span className="text-coral-500">{skipped} omitidas</span>
            )}
            <span className="text-ink-400 ml-auto">{total} total</span>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {oldest && (
        <>
          <div className="border-t border-line/60" />
          <div
            className={cn(
              "flex gap-2 p-3",
              step.type === "medication" ? "justify-between" : "justify-center",
            )}
          >
            <button
              type="button"
              disabled={isMarking}
              onClick={() => mutate({ slot: oldest })}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 h-11 rounded-[14px] text-[13.5px] font-semibold transition-colors",
                isMarking
                  ? "bg-primary-100 text-primary-400 cursor-not-allowed"
                  : "bg-primary-700 hover:bg-primary-500 text-cream dark:bg-primary-600 dark:hover:bg-primary-500",
              )}
            >
              <Check className="size-4" />
              {step.type === "medication" ? "Tomado" : "Marcar como hecho"}
            </button>

            {step.type === "medication" && (
              <button
                type="button"
                disabled={isMarking}
                onClick={() => mutate({ slot: oldest, skipped: true })}
                className={cn(
                  "flex items-center justify-center gap-1.5 h-11 px-4 rounded-[14px] text-[13.5px] font-semibold border transition-colors",
                  isMarking
                    ? "border-line text-ink-300 cursor-not-allowed"
                    : "border-line text-ink-600 hover:border-coral-300 hover:text-coral-600",
                )}
              >
                <X className="size-4" />
                No tomado
              </button>
            )}
          </div>
        </>
      )}
    </article>
  );
}
