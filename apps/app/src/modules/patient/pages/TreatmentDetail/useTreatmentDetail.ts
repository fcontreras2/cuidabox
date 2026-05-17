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

  // findOne en lugar de list() — una sola petición al endpoint específico
  const { data: treatment, isLoading: treatmentLoading } = useQuery({
    queryKey: ["patient-treatment", patientId, treatmentId],
    queryFn: () => treatmentsClient.findOne(patientId, treatmentId),
    staleTime: 2 * 60 * 1000,
    enabled: !!patientId && !!treatmentId,
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
    isLoading: treatmentLoading || eventsLoading,
    treatment: treatment ?? null,
    stepCards,
    overallProgress,
  };
}
