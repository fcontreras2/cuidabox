"use client";

import { useTranslations } from "next-intl";
import { ChevronDown, Bell } from "lucide-react";
import { PhoneFrame, PatientAvatar, SectionTitle, TabBar } from "@/shared/components";
import { useMain } from "./useMain";
import { NowCard } from "./components/NowCard";
import { UpcomingList } from "./components/UpcomingList";

export default function DashboardMain() {
  const t = useTranslations("modules-dashboard-pages-Main");
  const { activePatient, upcoming, nextDose } = useMain();

  return (
    <PhoneFrame>
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-3 group"
          aria-label="Cambiar de paciente"
        >
          <PatientAvatar
            name={activePatient.shortName}
            color={activePatient.avatarColor}
            size="md"
          />
          <span className="text-left">
            <span className="block text-[11px] uppercase tracking-[0.12em] text-ink-400 font-semibold">
              {t("viewing")}
            </span>
            <span className="font-display text-[18px] leading-none text-primary-700 inline-flex items-center gap-1">
              {activePatient.shortName}
              <ChevronDown className="size-4 text-ink-400 group-hover:text-primary-700" />
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative size-10 rounded-full bg-paper border border-line grid place-items-center text-primary-700 hover:border-coral-200 transition-colors"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-coral-500 ring-2 ring-paper" />
        </button>
      </header>

      <section className="px-6 pb-6">
        <p className="font-display-italic text-[16px] text-coral-600">
          {t("morningGreeting")} María
        </p>
        <h1 className="mt-1 font-display text-[34px] leading-[1.08] tracking-tight text-primary-700">
          {t("important")}
        </h1>
      </section>

      <main className="flex-1 overflow-y-auto px-6 pb-6">
        <SectionTitle>{t("nowMoment")}</SectionTitle>
        {nextDose && <NowCard medication={nextDose} />}
        <SectionTitle className="mt-8">{t("upcoming")}</SectionTitle>
        <UpcomingList items={upcoming} />
      </main>

      <TabBar active="home" />
    </PhoneFrame>
  );
}
