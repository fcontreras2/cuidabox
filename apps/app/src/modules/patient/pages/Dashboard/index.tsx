"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Bell, Plus } from "lucide-react";
import { Skeleton } from "fcontreras2-ui";
import { Link } from "@/i18n/navigation";
import {
  PhoneFrame,
  PatientAvatar,
  SectionTitle,
  TabBar,
} from "@/shared/components";
import { useDashboard } from "./useDashboard";
import { TreatmentCard } from "./components/TreatmentCard";
import { AppointmentCard } from "./components/AppointmentCard";
import { ActivityItem } from "./components/ActivityItem";
import { PatientSheet } from "./components/PatientSheet";

export default function PatientDashboard({ id }: { id: string }) {
  const t = useTranslations("modules-patient-pages-Dashboard");
  const { isLoading, patient, summary, recentEvents, allEvents, activeTreatments } =
    useDashboard(id);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <PhoneFrame>
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => !isLoading && patient && setSheetOpen(true)}
          className="flex items-center gap-3 -ml-1 rounded-2xl px-1 py-1 hover:bg-paper/60 transition-colors"
          aria-label={t("viewingLabel")}
        >
          {isLoading || !patient ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <PatientAvatar
              name={patient.shortName}
              color={patient.avatarColor}
              size="md"
            />
          )}
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-400 font-semibold">
              {t("viewing")}
            </p>
            {isLoading || !patient ? (
              <Skeleton variant="text" width={90} height={20} />
            ) : (
              <p className="font-display text-[18px] leading-none text-primary-700 dark:text-neutral-100">
                {patient.shortName}
              </p>
            )}
          </div>
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

      <main className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
        {/* Tratamientos activos */}
        <section>
          <SectionTitle
            hint={
              !isLoading && activeTreatments.length > 1
                ? `${activeTreatments.length}`
                : undefined
            }
          >
            {t("treatment.title")}
          </SectionTitle>

          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={200}
              className="rounded-[20px]!"
            />
          ) : activeTreatments.length === 0 ? (
            <TreatmentCard
              treatment={null}
              patientId={id}
              events={allEvents}
              isLoading={false}
              labels={{
                noTreatment: t("treatment.none"),
                daysLeft: t("treatment.daysLeft"),
                nextDose: t("treatment.nextDose"),
                markTaken: t("treatment.markTaken"),
                pendingToday: t("treatment.pendingToday"),
                progressTaken: t("treatment.progressTaken"),
                progressPending: t("treatment.progressPending"),
                progressMissed: t("treatment.progressMissed"),
              }}
            />
          ) : (
            <div className="space-y-2">
              <div
                ref={carouselRef}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const index = Math.round(
                    el.scrollLeft / (el.offsetWidth - 24),
                  );
                  setActiveSlide(index);
                }}
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-6 pb-1 scrollbar-none"
                style={{ scrollbarWidth: "none", scrollPaddingLeft: "1.5rem" }}
              >
                {activeTreatments.map((treatment, i) => (
                  <div
                    key={treatment.id}
                    className={`snap-start shrink-0 w-[calc(100%-60px)] ${i === 0 ? "ml-6" : ""} ${i === activeTreatments.length - 1 ? "mr-6" : ""}`}
                  >
                    <TreatmentCard
                      treatment={treatment}
                      patientId={id}
                      events={allEvents}
                      isLoading={false}
                      labels={{
                        noTreatment: t("treatment.none"),
                        daysLeft: t("treatment.daysLeft"),
                        nextDose: t("treatment.nextDose"),
                        markTaken: t("treatment.markTaken"),
                        pendingToday: t("treatment.pendingToday"),
                        progressTaken: t("treatment.progressTaken"),
                        progressPending: t("treatment.progressPending"),
                        progressMissed: t("treatment.progressMissed"),
                      }}
                    />
                  </div>
                ))}
              </div>

              {activeTreatments.length > 1 && (
                <div className="flex justify-center gap-1.5">
                  {activeTreatments.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Tratamiento ${i + 1}`}
                      onClick={() => {
                        const el = carouselRef.current;
                        if (!el) return;
                        el.scrollTo({
                          left: i * el.offsetWidth,
                          behavior: "smooth",
                        });
                        setActiveSlide(i);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeSlide
                          ? "w-4 bg-primary-600"
                          : "w-1.5 bg-neutral-300 dark:bg-neutral-600"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Próxima cita */}
        <section>
          <SectionTitle>{t("appointment.title")}</SectionTitle>
          <AppointmentCard
            appointment={summary?.next_appointment}
            patientId={id}
            noneLabel={t("appointment.none")}
            scheduleLabel={t("appointment.schedule")}
            isLoading={isLoading}
          />
        </section>

        {/* Actividad reciente */}
        <section>
          <SectionTitle
            hint={
              !isLoading && recentEvents.length > 0
                ? `${recentEvents.length}`
                : undefined
            }
          >
            {t("activity.title")}
          </SectionTitle>

          {isLoading ? (
            <div className="rounded-[20px] bg-paper border border-line overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 ${i < 2 ? "border-b border-line/60" : ""}`}
                >
                  <Skeleton variant="circular" width={36} height={36} />
                  <div className="flex-1">
                    <Skeleton variant="text" width="65%" height={15} />
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={12}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : recentEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8 px-4 rounded-[20px] border border-dashed border-line bg-paper/40 dark:bg-neutral-900/40">
              <p className="text-[13.5px] text-ink-400">
                {t("activity.empty")}
              </p>
              <Link
                href={`/patient/${id}/register`}
                className="text-[13px] text-coral-500 font-medium hover:text-coral-600 transition-colors"
              >
                {t("activity.firstEvent")} →
              </Link>
            </div>
          ) : (
            <>
              <div className="rounded-[20px] bg-paper border border-line overflow-hidden">
                {recentEvents.map((event, i) => (
                  <ActivityItem
                    key={event.id}
                    event={event}
                    typeLabel={t(`activity.types.${event.type}`)}
                    patientId={id}
                    isLast={i === recentEvents.length - 1}
                  />
                ))}
              </div>
              <Link
                href={`/patient/${id}/history`}
                className="block text-center text-[13px] text-coral-500 font-medium mt-3 hover:text-coral-600 transition-colors"
              >
                {t("activity.viewAll")} →
              </Link>
            </>
          )}
        </section>

        {/* Quick action */}
        <Link
          href={`/patient/${id}/register`}
          className="flex items-center justify-center gap-2 h-14 w-full rounded-[20px] border border-line bg-paper/50 hover:bg-paper text-primary-700 text-[15px] font-semibold transition-colors"
        >
          <Plus className="size-4" />
          {t("registerEvent")}
        </Link>
      </main>

      <TabBar active="home" />

      <PatientSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        patientName={patient?.name ?? ""}
        age={patient?.age ?? ""}
        bloodType={patient?.blood_type ?? null}
        allergiesCount={summary?.active_allergies_count ?? 0}
      />
    </PhoneFrame>
  );
}
