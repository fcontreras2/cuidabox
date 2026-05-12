"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Button, Tabs, TabList, Tab, Skeleton } from "fcontreras2-ui";
import {
  PhoneFrame,
  PatientAvatar,
  SectionTitle,
  TabBar,
} from "@/shared/components";
import { useMedications } from "./useMedications";
import { MedicationCard } from "./components/MedicationCard";

export default function MedicationsMain() {
  const t = useTranslations("modules-patient-pages-Medications");
  const {
    activePatient,
    patientId,
    isLoading,
    culminatedLoading,
    activeStepCards,
    culminatedStepCards,
  } = useMedications();
  const [tab, setTab] = useState<"active" | "culminated">("active");

  return (
    <PhoneFrame>
      <header className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PatientAvatar
            name={activePatient.shortName || "-"}
            color={activePatient.avatarColor}
            size="md"
          />
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-400 font-semibold">
              {t("treatmentsOf")}
            </p>
            <p className="font-display text-[18px] leading-none text-primary-700 dark:text-neutral-100">
              {activePatient.shortName}
            </p>
          </div>
        </div>
      </header>

      <section className="px-6 pb-4">
        <p className="font-display-italic text-[16px] text-coral-600">
          {t("titleAccent")}
        </p>
        <h1 className="mt-1 font-display text-[34px] leading-[1.08] tracking-tight text-primary-700 dark:text-neutral-100">
          {t("title")}
        </h1>
      </section>

      {/* Tab selector — fuera del área scrolleable */}
      <div className="px-6 pb-3">
        <Tabs
          variant="pill"
          size="sm"
          value={tab}
          onChange={(v) => setTab(v as "active" | "culminated")}
          className="!w-auto"
        >
          <TabList className="!rounded-full !bg-cream-2 dark:!bg-neutral-800">
            <Tab value="active" className="!rounded-full">
              {t("tabActive")}
              {!isLoading && activeStepCards.length > 0 && (
                <span className="ml-1.5 mono-num text-coral-600">
                  {activeStepCards.length}
                </span>
              )}
            </Tab>
            <Tab value="culminated" className="!rounded-full">
              {t("tabCulminated")}
              {!culminatedLoading && culminatedStepCards.length > 0 && (
                <span className="ml-1.5 mono-num text-ink-400">
                  {culminatedStepCards.length}
                </span>
              )}
            </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* Contenido scrolleable — flex-1 para ocupar el espacio entre tabs y TabBar */}
      <main className="flex-1 overflow-y-auto px-6 pb-6">
        {tab === "active" && (
          <>
            <SectionTitle>{t("sectionActive")}</SectionTitle>

            {isLoading ? (
              <div className="flex flex-col gap-3">
                {[1, 2].map((i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={190}
                    className="rounded-[20px]!"
                  />
                ))}
              </div>
            ) : activeStepCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 rounded-[20px] border border-dashed border-line bg-paper/40 dark:bg-neutral-900/40">
                <p className="text-[13.5px] text-ink-400">{t("emptyActive")}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {activeStepCards.map((card) => (
                  <MedicationCard
                    key={card.step.id}
                    card={card}
                    patientId={patientId}
                  />
                ))}
              </div>
            )}

            <Button
              variant="outline"
              size="lg"
              fullWidth
              leftIcon={<Plus className="size-4" />}
              className="!border-line !text-primary-700 !rounded-[18px] !h-14 !bg-paper/50 hover:!bg-paper mt-4"
            >
              {t("addMedication")}
            </Button>
          </>
        )}

        {tab === "culminated" && (
          <>
            <SectionTitle>{t("sectionCulminated")}</SectionTitle>

            {culminatedLoading ? (
              <div className="flex flex-col gap-3">
                <Skeleton
                  variant="rectangular"
                  height={120}
                  className="rounded-[20px]!"
                />
              </div>
            ) : culminatedStepCards.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 rounded-[20px] border border-dashed border-line bg-paper/40 dark:bg-neutral-900/40">
                <p className="text-[13.5px] text-ink-400">
                  {t("emptyCulminated")}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {culminatedStepCards.map((card) => (
                  <MedicationCard
                    key={card.step.id}
                    card={card}
                    patientId={patientId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <TabBar active="medications" />
    </PhoneFrame>
  );
}
