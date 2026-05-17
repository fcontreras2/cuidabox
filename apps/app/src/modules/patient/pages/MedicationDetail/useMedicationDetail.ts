"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { treatmentsClient, eventsClient } from "@cuidabox/api";
import { computeDoseSlots, computeProgress } from "@/shared/lib/doses";

export function useMedicationDetail(stepId: string) {
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
    queryKey: ["patient-events-medication", patientId],
    queryFn: () =>
      eventsClient.getTimeline(patientId, {
        type: "medication_given",
        limit: 100,
      }),
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

  const result = useMemo(() => {
    for (const treatment of allTreatments) {
      const step = treatment.steps.find((s) => s.id === stepId);
      if (step) {
        const slots = computeDoseSlots(step, treatment, events);
        const progress = computeProgress(slots);
        return { treatment, step, slots, progress };
      }
    }
    return null;
  }, [allTreatments, stepId, events]);

  return {
    patientId,
    isLoading: activeLoading || eventsLoading,
    ...result,
  };
}
