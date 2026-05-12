"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { treatmentsClient, eventsClient } from "@cuidabox/api";
import { computeDoseSlots, computeProgress } from "@/shared/lib/doses";
import type { StepCard } from "../Medications/useMedications";

export function useTreatmentDetail(treatmentId: string) {
  const params = useParams();
  const patientId = typeof params?.id === "string" ? params.id : "";

  const { data: activeTreatmentsData, isLoading: activeLoading } = useQuery({
    queryKey: ["patient-treatments-active", patientId],
    queryFn: () =>
      treatmentsClient.list(patientId, { status: "active", limit: 20 }),
    staleTime: 2 * 60 * 1000,
    enabled: !!patientId,
  });

  const { data: completedTreatmentsData } = useQuery({
    queryKey: ["patient-treatments-completed", patientId],
    queryFn: () =>
      treatmentsClient.list(patientId, { status: "completed", limit: 20 }),
    staleTime: 5 * 60 * 1000,
    enabled: !!patientId,
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["patient-events-all", patientId],
    queryFn: () => eventsClient.getTimeline(patientId, { limit: 200 }),
    staleTime: 60 * 1000,
    enabled: !!patientId,
  });

  const allTreatments = useMemo(
    () => [
      ...(activeTreatmentsData?.data ?? []),
      ...(completedTreatmentsData?.data ?? []),
    ],
    [activeTreatmentsData, completedTreatmentsData],
  );

  const events = useMemo(() => eventsData?.data ?? [], [eventsData]);

  const treatment = useMemo(
    () => allTreatments.find((t) => t.id === treatmentId) ?? null,
    [allTreatments, treatmentId],
  );

  const stepCards = useMemo<StepCard[]>(() => {
    if (!treatment) return [];
    return treatment.steps.map((step) => {
      const slots = computeDoseSlots(step, treatment, events);
      const progress = computeProgress(slots);
      return { step, treatment, slots, progress };
    });
  }, [treatment, events]);

  const overallProgress = useMemo(() => {
    const allSlots = stepCards.flatMap((c) => c.slots);
    return computeProgress(allSlots);
  }, [stepCards]);

  return {
    patientId,
    isLoading: activeLoading || eventsLoading,
    treatment,
    stepCards,
    overallProgress,
  };
}
