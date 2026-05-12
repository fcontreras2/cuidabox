"use client";

import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Pill,
  FlaskConical,
  Activity,
  Clock,
  AlertCircle,
  Check,
  X,
  CheckCircle2,
  XCircle,
  CircleDashed,
  Calendar,
  Pencil,
} from "lucide-react";
import { Skeleton } from "fcontreras2-ui";
import { Link } from "@/i18n/navigation";
import { eventsClient } from "@cuidabox/api";
import {
  PhoneFrame,
  SectionTitle,
  BackButton,
  TabBar,
} from "@/shared/components";
import { cn } from "@/shared/lib/cn";
import {
  formatSlotShort,
  formatSlotFull,
  formatMarkedAt,
} from "@/shared/lib/doses";
import type { DoseSlot } from "@/shared/lib/doses";
import { useMedicationDetail } from "./useMedicationDetail";

const STEP_GRADIENT = {
  medication: "from-gold-500 to-coral-500",
  exam: "from-sky-500 to-primary-600",
  action: "from-primary-500 to-primary-700",
} as const;

const STEP_ICON = {
  medication: Pill,
  exam: FlaskConical,
  action: Activity,
} as const;

export default function MedicationDetail({ id }: { id: string }) {
  const t = useTranslations("modules-patient-pages-MedicationDetail");
  const { patientId, isLoading, treatment, step, slots, progress } =
    useMedicationDetail(id);

  const queryClient = useQueryClient();
  const { mutate, isPending: isMarking } = useMutation({
    mutationFn: ({ slot, skipped }: { slot: DoseSlot; skipped?: boolean }) => {
      if (step?.type === "medication") {
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
        type: step?.type === "exam" ? "exam" : "note",
        occurred_at: new Date().toISOString(),
        payload: { step_id: step?.id, title: step?.title },
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

  if (isLoading) {
    return (
      <PhoneFrame>
        <Skeleton variant="rectangular" height={200} />
        <div className="px-6 pt-6 space-y-4">
          <Skeleton
            variant="rectangular"
            height={120}
            className="rounded-[20px]!"
          />
          <Skeleton
            variant="rectangular"
            height={80}
            className="rounded-[20px]!"
          />
          <Skeleton
            variant="rectangular"
            height={300}
            className="rounded-[20px]!"
          />
        </div>
      </PhoneFrame>
    );
  }

  if (!step || !treatment || !slots || !progress) {
    return (
      <PhoneFrame>
        <div className="flex-1 grid place-items-center px-8 text-center">
          <div>
            <h1 className="font-display text-[24px] text-primary-700 dark:text-neutral-100">
              {t("notFoundTitle")}
            </h1>
            <p className="text-[14px] text-ink-600 mt-2">
              {t("notFoundSubtitle")}
            </p>
            <Link
              href={`/patient/${patientId}/medications`}
              className="inline-flex mt-6 h-12 items-center px-5 rounded-full bg-coral-500 text-paper text-[14px] font-semibold hover:bg-coral-600 transition-colors"
            >
              {t("notFoundCta")}
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const Icon = STEP_ICON[step.type];
  const gradient = STEP_GRADIENT[step.type];
  const oldest = progress.oldestPending;
  const { taken, skipped, pending, total } = progress;
  const takenPct = total > 0 ? (taken / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;
  const skippedPct = total > 0 ? (skipped / total) * 100 : 0;

  const title =
    step.type === "medication" && step.medication
      ? step.medication.medication_name
      : step.title;

  const subtitle =
    step.type === "medication" && step.medication
      ? `${step.medication.dose ?? ""} ${step.medication.unit ?? ""} · ${step.medication.frequency ?? ""}`.trim()
      : treatment.title;

  const sortedSlots = [...slots].sort(
    (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime(),
  );

  return (
    <PhoneFrame>
      {/* Gradient header */}
      <header
        className={cn(
          "relative px-6 pt-12 pb-7 text-paper overflow-hidden bg-gradient-to-br",
          gradient,
        )}
      >
        <div
          aria-hidden
          className="absolute -top-16 -right-12 size-52 rounded-full bg-paper/15 blur-3xl"
        />
        <div className="relative flex items-center justify-between">
          <BackButton
            variant="dark"
            fallbackHref={`/patient/${patientId}/medications`}
          />
          <button
            type="button"
            aria-label={t("edit")}
            className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors text-paper"
          >
            <Pencil className="size-4" />
          </button>
        </div>

        <div className="relative mt-5 flex items-start gap-4">
          <span className="size-14 rounded-3xl bg-paper/20 grid place-items-center shrink-0">
            <Icon className="size-7" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold opacity-85">
              {treatment.title}
            </p>
            <h1 className="font-display text-[28px] leading-tight mt-1">
              {title}
            </h1>
            <p className="font-display-italic text-[15px] mt-1 opacity-95">
              {subtitle}
            </p>
          </div>
        </div>

        {treatment.start_date && (
          <div className="relative mt-5 flex items-center gap-2 text-[12px] opacity-90">
            <Calendar className="size-3.5" />
            <span className="font-medium">{t("startDate")}:</span>
            <span>{treatment.start_date}</span>
            {treatment.end_date && (
              <>
                <span className="opacity-60 mx-1">→</span>
                <span className="font-medium">{t("endDate")}:</span>
                <span>{treatment.end_date}</span>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-6 space-y-6">
        {/* Progress + action */}
        <section className="rounded-[20px] bg-paper dark:bg-neutral-900/60 border border-line p-4 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400">
                {t("progressTitle")}
              </p>
              <p className="font-display text-[22px] text-primary-700 dark:text-neutral-100 leading-tight mono-num mt-1">
                {taken}{" "}
                <span className="text-ink-400 text-[16px]">/ {total}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em]">
              {pending > 0 && (
                <span className="text-gold-600">{pending} pend.</span>
              )}
              {skipped > 0 && (
                <span className="text-coral-500">{skipped} omit.</span>
              )}
            </div>
          </div>

          {/* Tricolor bar */}
          <div className="h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex">
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

          {/* Oldest pending + action buttons */}
          {oldest && (
            <div className="rounded-[14px] bg-gold-50 dark:bg-gold-950/30 border border-gold-200 dark:border-gold-800 p-3 space-y-2.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-gold-500 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] font-semibold text-gold-600">
                    {t("nextDose")}
                  </p>
                  <p className="font-display text-[18px] text-gold-700 dark:text-gold-300 leading-tight mono-num">
                    {formatSlotShort(oldest.date, oldest.time)}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "flex gap-2",
                  step.type === "medication"
                    ? "justify-between"
                    : "justify-center",
                )}
              >
                <button
                  type="button"
                  disabled={isMarking}
                  onClick={() => mutate({ slot: oldest })}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 h-10 rounded-[12px] text-[13px] font-semibold transition-colors",
                    isMarking
                      ? "bg-primary-100 text-primary-400 cursor-not-allowed"
                      : "bg-primary-700 hover:bg-primary-500 text-cream dark:bg-primary-600",
                  )}
                >
                  <Check className="size-4" />
                  {step.type === "medication" ? t("markTaken") : t("markDone")}
                </button>
                {step.type === "medication" && (
                  <button
                    type="button"
                    disabled={isMarking}
                    onClick={() => mutate({ slot: oldest, skipped: true })}
                    className={cn(
                      "flex items-center justify-center gap-1.5 h-10 px-4 rounded-[12px] text-[13px] font-semibold border transition-colors",
                      isMarking
                        ? "border-line text-ink-300 cursor-not-allowed"
                        : "border-gold-300 text-gold-700 hover:border-coral-300 hover:text-coral-600",
                    )}
                  >
                    <X className="size-4" />
                    {t("markSkipped")}
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Schedule chips — medication only */}
        {step.type === "medication" &&
          step.medication?.times_of_day?.length && (
            <section>
              <SectionTitle>{t("scheduleTitle")}</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {step.medication.times_of_day.map((time) => (
                  <span
                    key={time}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper dark:bg-neutral-900/60 border border-line text-[14px] font-medium px-3.5 py-1.5 text-primary-700 dark:text-neutral-100 mono-num"
                  >
                    <Clock className="size-3.5 text-ink-400" />
                    {time}
                  </span>
                ))}
              </div>
            </section>
          )}

        {/* Description */}
        {step.description && (
          <section>
            <SectionTitle>{t("descriptionTitle")}</SectionTitle>
            <div className="rounded-[18px] bg-cream dark:bg-neutral-900/40 border border-line/60 px-4 py-3.5">
              <p className="text-[14.5px] text-ink-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          </section>
        )}

        {/* Dose history */}
        <section>
          <SectionTitle>{t("historyTitle")}</SectionTitle>
          <ul className="rounded-[18px] bg-paper dark:bg-neutral-900/60 border border-line overflow-hidden">
            {sortedSlots.map((slot, i) => {
              const isLast = i === sortedSlots.length - 1;
              const isPending = slot.status === "pending";

              const iconEl = {
                taken: (
                  <CheckCircle2 className="size-[18px] text-primary-600" />
                ),
                skipped: <XCircle className="size-[18px] text-coral-500" />,
                pending: <AlertCircle className="size-[18px] text-gold-500" />,
                scheduled: (
                  <CircleDashed className="size-[18px] text-ink-300" />
                ),
              }[slot.status];

              const iconBg = {
                taken: "bg-primary-100 dark:bg-primary-900/40",
                skipped: "bg-coral-100 dark:bg-coral-900/40",
                pending: "bg-gold-100 dark:bg-gold-900/40",
                scheduled: "bg-neutral-100 dark:bg-neutral-800",
              }[slot.status];

              const statusLabel = {
                taken: t("statusTaken"),
                skipped: t("statusSkipped"),
                pending: t("statusPending"),
                scheduled: t("statusScheduled"),
              }[slot.status];

              return (
                <li
                  key={slot.key}
                  className={cn(
                    "px-4 py-3",
                    !isLast && "border-b border-line/60",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "size-9 rounded-full grid place-items-center shrink-0",
                        iconBg,
                      )}
                    >
                      {iconEl}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[14px] text-primary-700 dark:text-neutral-100 leading-tight mono-num">
                        {formatSlotFull(slot.date, slot.time)}
                      </p>
                      {slot.markedAt && (
                        <p className="text-[11.5px] text-ink-400 mt-0.5">
                          {t("takenAt")} · {formatMarkedAt(slot.markedAt)}
                        </p>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[11px] uppercase tracking-[0.1em] font-semibold shrink-0",
                        {
                          taken: "text-primary-600",
                          skipped: "text-coral-500",
                          pending: "text-gold-600",
                          scheduled: "text-ink-400",
                        }[slot.status],
                      )}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* Inline action for pending slots */}
                  {isPending && (
                    <div
                      className={cn(
                        "flex gap-2 mt-2.5",
                        step.type === "medication"
                          ? "justify-between"
                          : "justify-center",
                      )}
                    >
                      <button
                        type="button"
                        disabled={isMarking}
                        onClick={() => mutate({ slot })}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-1.5 h-9 rounded-[10px] text-[12.5px] font-semibold transition-colors",
                          isMarking
                            ? "bg-primary-100 text-primary-400 cursor-not-allowed"
                            : "bg-primary-700 hover:bg-primary-500 text-cream dark:bg-primary-600",
                        )}
                      >
                        <Check className="size-3.5" />
                        {step.type === "medication"
                          ? t("markTaken")
                          : t("markDone")}
                      </button>
                      {step.type === "medication" && (
                        <button
                          type="button"
                          disabled={isMarking}
                          onClick={() => mutate({ slot, skipped: true })}
                          className={cn(
                            "flex items-center justify-center gap-1.5 h-9 px-3 rounded-[10px] text-[12.5px] font-semibold border transition-colors",
                            isMarking
                              ? "border-line text-ink-300 cursor-not-allowed"
                              : "border-line text-ink-600 hover:border-coral-300 hover:text-coral-600",
                          )}
                        >
                          <X className="size-3.5" />
                          {t("markSkipped")}
                        </button>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <TabBar />
    </PhoneFrame>
  );
}
