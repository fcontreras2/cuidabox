"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { Skeleton } from "fcontreras2-ui";
import { Link } from "@/i18n/navigation";
import { PhoneFrame, BackButton, TabBar } from "@/shared/components";
import { cn } from "@/shared/lib/cn";
import { MedicationCard } from "../Medications/components/MedicationCard";
import { useTreatmentDetail } from "./useTreatmentDetail";
import type { TreatmentStep } from "@cuidabox/api";

type StepType = TreatmentStep["type"];
type Filter = "all" | StepType;

export default function TreatmentDetail({ id }: { id: string }) {
  const t = useTranslations("modules-patient-pages-TreatmentDetail");
  const { patientId, isLoading, treatment, stepCards, overallProgress } =
    useTreatmentDetail(id);
  const [filter, setFilter] = useState<Filter>("all");

  const filterLabel: Record<StepType, string> = {
    medication: t("filterMedication"),
    exam: t("filterExam"),
    action: t("filterAction"),
  };

  if (isLoading) {
    return (
      <PhoneFrame>
        <Skeleton variant="rectangular" height={200} />
        <div className="px-6 pt-6 space-y-4">
          <Skeleton
            variant="rectangular"
            height={80}
            className="rounded-[20px]!"
          />
          <Skeleton
            variant="rectangular"
            height={180}
            className="rounded-[20px]!"
          />
          <Skeleton
            variant="rectangular"
            height={180}
            className="rounded-[20px]!"
          />
        </div>
      </PhoneFrame>
    );
  }

  if (!treatment) {
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
              className="inline-flex mt-6 h-12 items-center px-5 rounded-full bg-primary-700 text-paper text-[14px] font-semibold hover:bg-primary-500 transition-colors"
            >
              {t("notFoundCta")}
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const { taken, skipped, pending, total } = overallProgress;
  const takenPct = total > 0 ? (taken / total) * 100 : 0;
  const pendingPct = total > 0 ? (pending / total) * 100 : 0;
  const skippedPct = total > 0 ? (skipped / total) * 100 : 0;
  const completedPct = total > 0 ? Math.round((taken / total) * 100) : 0;

  const presentTypes = [
    ...new Set(treatment.steps.map((s) => s.type)),
  ] as StepType[];

  const filteredCards =
    filter === "all"
      ? stepCards
      : stepCards.filter((c) => c.step.type === filter);

  return (
    <PhoneFrame>
      {/* Header */}
      <header className="relative px-6 pt-12 pb-7 text-paper overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950">
        <div
          aria-hidden
          className="absolute -top-16 -right-12 size-52 rounded-full bg-paper/10 blur-3xl"
        />

        <div className="relative flex items-center justify-between">
          <BackButton
            variant="dark"
            fallbackHref={`/patient/${patientId}/medications`}
          />
        </div>

        <div className="relative mt-5">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold opacity-75">
            {t("progressTitle")} · {completedPct}%
          </p>
          <h1 className="font-display text-[28px] leading-tight mt-1">
            {treatment.title}
          </h1>
          {treatment.start_date && (
            <div className="flex items-center gap-2 mt-3 text-[12px] opacity-85">
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
        </div>

        {/* Overall tricolor progress bar */}
        {total > 0 && (
          <div className="relative mt-5 space-y-1.5">
            <div className="h-2 rounded-full bg-paper/20 overflow-hidden flex">
              {takenPct > 0 && (
                <div
                  className="h-full bg-paper shrink-0 transition-all"
                  style={{ width: `${takenPct}%` }}
                />
              )}
              {pendingPct > 0 && (
                <div
                  className="h-full bg-gold-300 shrink-0 transition-all"
                  style={{ width: `${pendingPct}%` }}
                />
              )}
              {skippedPct > 0 && (
                <div
                  className="h-full bg-coral-300 shrink-0 transition-all"
                  style={{ width: `${skippedPct}%` }}
                />
              )}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.1em] opacity-85">
              {taken > 0 && <span>{taken} tomadas</span>}
              {pending > 0 && (
                <span className="text-gold-200">{pending} pend.</span>
              )}
              {skipped > 0 && (
                <span className="text-coral-200">{skipped} omit.</span>
              )}
              <span className="ml-auto opacity-70">{total} total</span>
            </div>
          </div>
        )}
      </header>

      {/* Filter pills — only when multiple types present */}
      {presentTypes.length > 1 && (
        <div className="px-6 pt-4 pb-1 flex gap-2 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "shrink-0 h-8 px-4 rounded-full text-[12.5px] font-semibold transition-colors",
              filter === "all"
                ? "bg-primary-700 text-paper dark:bg-primary-600"
                : "bg-neutral-100 dark:bg-neutral-800 text-ink-600 hover:bg-neutral-200 dark:hover:bg-neutral-700",
            )}
          >
            {t("filterAll")}
          </button>
          {presentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={cn(
                "shrink-0 h-8 px-4 rounded-full text-[12.5px] font-semibold transition-colors",
                filter === type
                  ? "bg-primary-700 text-paper dark:bg-primary-600"
                  : "bg-neutral-100 dark:bg-neutral-800 text-ink-600 hover:bg-neutral-200 dark:hover:bg-neutral-700",
              )}
            >
              {filterLabel[type]}
            </button>
          ))}
        </div>
      )}

      {/* Step cards */}
      <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {filteredCards.length === 0 ? (
          <div className="flex items-center justify-center py-10 px-4 rounded-[20px] border border-dashed border-line bg-paper/40 dark:bg-neutral-900/40">
            <p className="text-[13.5px] text-ink-400">{t("emptyFilter")}</p>
          </div>
        ) : (
          filteredCards.map((card) => (
            <MedicationCard
              key={card.step.id}
              card={card}
              patientId={patientId}
            />
          ))
        )}
      </main>

      <TabBar active="medications" />
    </PhoneFrame>
  );
}
