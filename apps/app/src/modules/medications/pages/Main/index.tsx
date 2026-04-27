"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Button, Tabs, TabList, Tab, TabPanel } from "fcontreras2-ui";
import { PhoneFrame, PatientAvatar, SectionTitle, TabBar } from "@/shared/components";
import { useMain } from "./useMain";
import { MedicationCard } from "./components/MedicationCard";

export default function MedicationsMain() {
  const t = useTranslations("modules-medications-pages-Main");
  const { activePatient, tab, setTab, active, past } = useMain();

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
              {t("treatmentsOf")}
            </p>
            <p className="font-display text-[18px] leading-none text-primary-700">
              {activePatient.shortName}
            </p>
          </div>
        </div>
      </header>

      <section className="px-6 pb-4">
        <p className="font-display-italic text-[16px] text-coral-600">{t("titleAccent")}</p>
        <h1 className="mt-1 font-display text-[34px] leading-[1.08] tracking-tight text-primary-700">
          {t("title")}
        </h1>
      </section>

      <Tabs
        variant="pill"
        size="sm"
        value={tab}
        onChange={(v) => setTab(v as "active" | "past")}
        className="!w-auto px-6 mb-2"
      >
        <TabList className="!rounded-full !bg-cream-2">
          <Tab value="active" className="!rounded-full">
            {t("tabActive")} <span className="ml-1.5 mono-num text-coral-600">{active.length}</span>
          </Tab>
          <Tab value="past" className="!rounded-full">
            {t("tabPast")} <span className="ml-1.5 mono-num text-ink-400">{past.length}</span>
          </Tab>
        </TabList>

        <main className="flex-1 overflow-y-auto px-6 pt-3 pb-6">
          <TabPanel value="active" className="!pt-0">
            <SectionTitle>{t("sectionActive")}</SectionTitle>
            <div className="flex flex-col gap-3">
              {active.map((m) => (
                <MedicationCard key={m.id} medication={m} />
              ))}
            </div>
            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={<Plus className="size-4" />}
              className="!border-line !text-primary-700 !rounded-[18px] !h-14 !bg-paper/50 hover:!bg-paper mt-4"
            >
              {t("addMedication")}
            </Button>
          </TabPanel>

          <TabPanel value="past" className="!pt-0">
            <SectionTitle>{t("sectionPast")}</SectionTitle>
            <div className="flex flex-col gap-3">
              {past.map((m) => (
                <MedicationCard key={m.id} medication={m} past />
              ))}
            </div>
          </TabPanel>
        </main>
      </Tabs>

      <TabBar />
    </PhoneFrame>
  );
}
