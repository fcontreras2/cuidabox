"use client";

import { Pill, Clock, Check, ChevronRight } from "lucide-react";
import { Button, Progress } from "fcontreras2-ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import type { Medication } from "@/shared/types";

export function MedicationCard({
  medication,
  past = false,
}: {
  medication: Medication;
  past?: boolean;
}) {
  const progress = medication.doseProgress;
  const pct = progress ? (progress.taken / progress.total) * 100 : 0;

  return (
    <article
      className={cn(
        "rounded-[20px] border transition-colors",
        past ? "border-line-soft bg-cream-2/40" : "border-line bg-paper hover:border-coral-200",
      )}
    >
      <Link
        href={`/medications/${medication.id}`}
        className="flex items-start gap-3 p-4"
      >
        <span
          className={cn(
            "size-11 rounded-2xl grid place-items-center shrink-0",
            past ? "bg-line-soft text-ink-400" : "bg-gold-100 text-gold-500",
          )}
        >
          <Pill className="size-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h4
            className={cn(
              "font-display text-[18px] leading-tight",
              past ? "text-ink-600" : "text-primary-700",
            )}
          >
            {medication.name}{" "}
            <span className="font-display-italic text-coral-600">
              {medication.shortDose}
            </span>
          </h4>
          <p className="text-[13px] text-ink-600 mt-0.5">{medication.schedule}</p>
        </div>
        {!past ? (
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-primary-700 bg-primary-100 px-2.5 py-1 rounded-full shrink-0">
            <Clock className="size-3" />
            {medication.nextDoseAt}
          </span>
        ) : (
          <ChevronRight className="size-4 text-ink-400 shrink-0 mt-1" />
        )}
      </Link>

      {progress && !past && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-[12px] mono-num">
            <span className="text-ink-400 uppercase tracking-[0.12em] font-semibold">
              Progreso del tratamiento
            </span>
            <span className="text-primary-700 font-semibold">
              {progress.taken}/{progress.total}
            </span>
          </div>
          <Progress
            value={pct}
            size="sm"
            className="!mt-2 [&>div]:!bg-line-soft [&>div>div]:!bg-gradient-to-r [&>div>div]:!from-coral-500 [&>div>div]:!to-coral-600"
          />
          <Button
            variant="outline"
            size="md"
            fullWidth
            leftIcon={<Check className="size-4" />}
            className="!border-line !text-primary-700 !rounded-full !mt-4 hover:!bg-cream-2"
          >
            Marcar dosis dada
          </Button>
        </div>
      )}
    </article>
  );
}
