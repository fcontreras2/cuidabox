"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { treatmentsClient, eventsClient } from "@cuidabox/api";
import type { Treatment, TreatmentStep } from "@cuidabox/api";
import { usePatients } from "@/shared/hooks/usePatients";
import { computeDoseSlots, computeProgress } from "@/shared/lib/doses";
import type { DoseSlot, StepProgress } from "@/shared/lib/doses";

export interface StepCard {
  step: TreatmentStep;
  treatment: Treatment;
  slots: DoseSlot[];
  progress: StepProgress;
}

export function useMedications() {
  const { activePatient } = usePatients();
  const params = useParams();
  const patientId = typeof params?.id === "string" ? params.id : "";

  const { data: activeTreatmentsData, isLoading: activeTreatmentsLoading } =
    useQuery({
      queryKey: ["patient-treatments-active", patientId],
      queryFn: () =>
        treatmentsClient.list(patientId, { status: "active", limit: 20 }),
      staleTime: 2 * 60 * 1000,
      enabled: !!patientId,
    });

  const { data: completedTreatmentsData, isLoading: completedLoading } =
    useQuery({
      queryKey: ["patient-treatments-completed", patientId],
      queryFn: () =>
        treatmentsClient.list(patientId, { status: "completed", limit: 20 }),
      staleTime: 5 * 60 * 1000,
      enabled: !!patientId,
    });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["patient-events-medication", patientId],
    queryFn: () =>
      eventsClient.getTimeline(patientId, {
        type: "medication_given",
        limit: 100,
      }),
    staleTime: 60 * 1000,
    enabled: !!patientId,
  });

  const events = useMemo(() => eventsData?.data ?? [], [eventsData]);
  const activeTreatments = useMemo(
    () => activeTreatmentsData?.data ?? [],
    [activeTreatmentsData],
  );
  const completedTreatments = useMemo(
    () => completedTreatmentsData?.data ?? [],
    [completedTreatmentsData],
  );

  const activeStepCards = useMemo<StepCard[]>(() => {
    return activeTreatments
      .flatMap((treatment) =>
        treatment.steps.map((step) => {
          const slots = computeDoseSlots(step, treatment, events);
          const progress = computeProgress(slots);
          return { step, treatment, slots, progress };
        }),
      )
      .filter((c) => c.progress.pending > 0 || c.progress.scheduled > 0)
      .sort((a, b) => {
        const aTime =
          a.progress.oldestPending?.scheduledAt.getTime() ?? Infinity;
        const bTime =
          b.progress.oldestPending?.scheduledAt.getTime() ?? Infinity;
        return aTime - bTime;
      });
  }, [activeTreatments, events]);

  const culminatedStepCards = useMemo<StepCard[]>(() => {
    const fromActive = activeTreatments
      .flatMap((treatment) =>
        treatment.steps.map((step) => {
          const slots = computeDoseSlots(step, treatment, events);
          const progress = computeProgress(slots);
          return { step, treatment, slots, progress };
        }),
      )
      .filter(
        (c) =>
          c.progress.pending === 0 &&
          c.progress.scheduled === 0 &&
          c.progress.total > 0,
      );

    const fromCompleted = completedTreatments.flatMap((treatment) =>
      treatment.steps.map((step) => {
        const slots = computeDoseSlots(step, treatment, events);
        const progress = computeProgress(slots);
        return { step, treatment, slots, progress };
      }),
    );

    return [...fromActive, ...fromCompleted];
  }, [activeTreatments, completedTreatments, events]);

  return {
    activePatient,
    patientId,
    isLoading: activeTreatmentsLoading || eventsLoading,
    culminatedLoading: completedLoading,
    activeStepCards,
    culminatedStepCards,
  };
}
