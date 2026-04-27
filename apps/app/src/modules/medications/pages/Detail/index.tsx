"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Pill,
  Pencil,
  XCircle,
  Clock,
  AlertCircle,
  Check,
  CircleDashed,
  ChevronRight,
  Calendar,
  StickyNote,
} from "lucide-react";
import { Button } from "fcontreras2-ui";
import {
  PhoneFrame,
  PatientAvatar,
  SectionTitle,
  BackButton,
} from "@/shared/components";
import { useDetail } from "./useDetail";
import { cn } from "@/shared/lib/cn";

interface Props {
  id: string;
}

export default function MedicationDetail({ id }: Props) {
  const t = useTranslations("modules-medications-pages-Detail");
  const result = useDetail(id);

  if (!result.med) {
    return (
      <PhoneFrame>
        <div className="flex-1 grid place-items-center px-8 text-center">
          <div>
            <h1 className="font-display text-[24px] text-primary-700">
              {t("notFoundTitle")}
            </h1>
            <p className="text-[14px] text-ink-600 mt-2">
              {t("notFoundSubtitle")}
            </p>
            <Link
              href="/medications"
              className="inline-flex mt-6 h-12 items-center px-5 rounded-full bg-coral-500 text-paper text-[14px] font-semibold hover:bg-coral-600 transition-colors"
            >
              {t("notFoundCta")}
            </Link>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const { med, detail, doctor } = result;
  const isActive = med.status === "active";
  const progress = med.doseProgress;
  const progressPct = progress
    ? Math.min(100, Math.round((progress.taken / progress.total) * 100))
    : 0;

  return (
    <PhoneFrame>
      {/* Header — gold/coral for active, neutral for past */}
      <header
        className={cn(
          "relative px-6 pt-12 pb-7 text-paper overflow-hidden bg-gradient-to-br",
          isActive
            ? "from-gold-500 to-coral-500"
            : "from-primary-500 to-primary-700",
        )}
      >
        <div
          aria-hidden
          className="absolute -top-16 -right-12 size-52 rounded-full bg-paper/15 blur-3xl"
        />
        <div className="relative flex items-center justify-between">
          <BackButton variant="dark" fallbackHref="/medications" />
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t("edit")}
              className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors text-paper"
            >
              <Pencil className="size-4" />
            </button>
            {isActive && (
              <button
                type="button"
                aria-label={t("stop")}
                className="size-9 rounded-full bg-paper/15 grid place-items-center hover:bg-paper/25 transition-colors text-paper"
              >
                <XCircle className="size-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative mt-5 flex items-start gap-4">
          <span className="size-14 rounded-3xl bg-paper/20 grid place-items-center shrink-0">
            <Pill className="size-7" />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] font-semibold opacity-85">
              {med.reason ?? (isActive ? "Activo" : "Pasado")}
            </p>
            <h1 className="font-display text-[28px] leading-tight mt-1">
              {med.name}
            </h1>
            <p className="font-display-italic text-[15px] mt-1 opacity-95">
              {med.shortDose} · {med.schedule}
            </p>
          </div>
        </div>

        {/* Date strip */}
        {detail && (
          <div className="relative mt-5 flex items-center gap-2 text-[12px] opacity-90">
            <Calendar className="size-3.5" />
            <span className="font-medium">{t("startDate")}:</span>
            <span>{detail.startDate}</span>
            {detail.endDate && (
              <>
                <span className="opacity-60 mx-1">→</span>
                <span className="font-medium">{t("endDate")}:</span>
                <span>{detail.endDate}</span>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-6 space-y-7">
        {/* Progress bar (active only) */}
        {isActive && progress && (
          <section className="rounded-[20px] bg-paper border border-line p-4">
            <div className="flex items-end justify-between gap-3 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400">
                  {t("progressTitle")}
                </p>
                <p className="font-display text-[22px] text-primary-700 leading-tight mono-num mt-1">
                  {progress.taken}{" "}
                  <span className="text-ink-400">/ {progress.total}</span>
                </p>
              </div>
              <span className="font-display-italic text-coral-600 text-[15px] mono-num">
                {progressPct}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-cream overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-coral-500 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Next dose card */}
            <div className="mt-4 flex items-center gap-3 rounded-[16px] bg-coral-100/60 border border-coral-200 px-4 py-3">
              <span className="size-10 rounded-2xl bg-coral-500 text-paper grid place-items-center shrink-0">
                <Clock className="size-[18px]" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-coral-600">
                  {t("nextDose")}
                </p>
                <p className="font-display text-[20px] text-primary-700 leading-tight mono-num mt-0.5">
                  {med.nextDoseAt}
                </p>
              </div>
              <Button
                size="sm"
                className="!bg-primary-700 hover:!bg-primary-500 !text-cream !rounded-full !h-10 !px-4"
              >
                {t("markGiven")}
              </Button>
            </div>
          </section>
        )}

        {/* Schedule */}
        {detail && detail.doseTimes.length > 0 && (
          <section>
            <SectionTitle>{t("scheduleTitle")}</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {detail.doseTimes.map((time) => (
                <span
                  key={time}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper border border-line text-[14px] font-medium px-3.5 py-1.5 text-primary-700 mono-num"
                >
                  <Clock className="size-3.5 text-ink-400" />
                  {time}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Presentation */}
        {detail && (
          <section>
            <SectionTitle>{t("presentationTitle")}</SectionTitle>
            <div className="rounded-[18px] bg-paper border border-line px-4 py-3.5">
              <p className="text-[14.5px] text-ink-600">{detail.presentation}</p>
            </div>
          </section>
        )}

        {/* Instructions */}
        {detail && (
          <section>
            <SectionTitle>
              <span className="inline-flex items-center gap-2">
                <StickyNote className="size-4 text-primary-600" />
                {t("instructionsTitle")}
              </span>
            </SectionTitle>
            <div className="rounded-[18px] bg-cream border border-line/60 px-4 py-3.5">
              <p className="text-[14.5px] text-ink-600 leading-relaxed">
                {detail.instructions}
              </p>
            </div>
          </section>
        )}

        {/* Warnings */}
        {detail?.warnings && detail.warnings.length > 0 && (
          <section>
            <SectionTitle>
              <span className="inline-flex items-center gap-2">
                <AlertCircle className="size-4 text-coral-600" />
                {t("warningsTitle")}
              </span>
            </SectionTitle>
            <ul className="flex flex-col gap-2">
              {detail.warnings.map((w) => (
                <li
                  key={w}
                  className="rounded-[14px] bg-coral-100/60 border border-coral-200 px-4 py-2.5 text-[13.5px] text-coral-600 flex items-start gap-2"
                >
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Doctor */}
        {doctor && (
          <section>
            <SectionTitle>{t("doctorTitle")}</SectionTitle>
            <Link
              href="/doctors"
              className="flex items-center gap-3 rounded-[18px] bg-paper border border-line p-4 hover:border-coral-200 hover:shadow-sage transition-all"
            >
              <PatientAvatar
                name={doctor.name.replace(/^(Dra?\.\s*)/, "")}
                color={doctor.avatarColor}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-display text-[16px] text-primary-700 leading-tight">
                  {doctor.name}
                </p>
                <p className="text-[12.5px] text-ink-600 mt-0.5">
                  {doctor.specialty}
                </p>
              </div>
              <ChevronRight className="size-4 text-ink-400" />
            </Link>
          </section>
        )}

        {/* Dose history */}
        {detail && detail.doseHistory.length > 0 && (
          <section>
            <SectionTitle>{t("historyTitle")}</SectionTitle>
            <ul className="rounded-[18px] bg-paper border border-line overflow-hidden">
              {detail.doseHistory.map((d, i) => {
                const isLast = i === detail.doseHistory.length - 1;
                const tone =
                  d.status === "taken"
                    ? "bg-primary-100 text-primary-600"
                    : d.status === "missed"
                      ? "bg-coral-100 text-coral-600"
                      : "bg-gold-100 text-gold-500";
                const Icon =
                  d.status === "taken"
                    ? Check
                    : d.status === "missed"
                      ? XCircle
                      : CircleDashed;
                const statusLabel =
                  d.status === "taken"
                    ? t("statusTaken")
                    : d.status === "missed"
                      ? t("statusMissed")
                      : t("statusScheduled");
                return (
                  <li
                    key={d.id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3",
                      !isLast && "border-b border-line/60",
                    )}
                  >
                    <span
                      className={cn(
                        "size-9 rounded-full grid place-items-center shrink-0",
                        tone,
                      )}
                    >
                      <Icon className="size-[16px]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[15px] text-primary-700 leading-tight">
                        {d.label}
                      </p>
                      <p className="text-[12px] text-ink-400 mt-0.5">
                        {d.takenAt}
                      </p>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-ink-400">
                      {statusLabel}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </PhoneFrame>
  );
}
