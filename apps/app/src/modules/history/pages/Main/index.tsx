"use client";

import { useTranslations } from "next-intl";
import { Filter } from "lucide-react";
import { PhoneFrame, PatientAvatar, SectionTitle, TabBar } from "@/shared/components";
import { useMain } from "./useMain";
import { TimelineEventCard } from "./components/TimelineEventCard";

export default function HistoryMain() {
  const t = useTranslations("modules-history-pages-Main");
  const { activePatient, grouped } = useMain();

  return (
    <PhoneFrame>
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PatientAvatar
            name={activePatient.shortName}
            color={activePatient.avatarColor}
            size="md"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-400 font-semibold">
              {t("viewing")}
            </p>
            <p className="font-display text-[18px] leading-none text-primary-700">
              {activePatient.shortName}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label={t("filter")}
          className="size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700 hover:border-coral-200 transition-colors"
        >
          <Filter className="size-4" />
        </button>
      </header>

      <section className="px-6 pb-6">
        <p className="font-display-italic text-[16px] text-coral-600">
          {t("historyOf")}
        </p>
        <h1 className="mt-1 font-display text-[34px] leading-[1.08] tracking-tight text-primary-700">
          {activePatient.shortName}, {t("dayByDay")}
        </h1>
      </section>

      <main className="flex-1 overflow-y-auto px-6 pb-6">
        {grouped.map((group, i) => (
          <div key={group.label} className={i === 0 ? "" : "mt-8"}>
            <SectionTitle hint={i === 0 ? t("mostRecent") : undefined}>
              {group.label}
            </SectionTitle>
            <div className="relative">
              <span
                aria-hidden
                className="absolute left-[21px] top-3 bottom-3 w-px bg-line"
              />
              <div className="flex flex-col gap-4">
                {group.events.map((ev) => (
                  <TimelineEventCard key={ev.id} event={ev} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>

      <TabBar active="history" />
    </PhoneFrame>
  );
}
