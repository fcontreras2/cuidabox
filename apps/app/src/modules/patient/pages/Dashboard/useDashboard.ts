"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { patientsClient, eventsClient, treatmentsClient } from "@cuidabox/api";
import type { PatientWithUI } from "@/shared/types";

const AVATAR_COLORS: PatientWithUI["avatarColor"][] = [
  "coral",
  "sky",
  "plum",
  "gold",
  "sage",
];

function getAvatarColor(id: string): PatientWithUI["avatarColor"] {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getAge(birthdate: string | null): string {
  if (!birthdate) return "";
  const years = new Date().getFullYear() - new Date(birthdate).getFullYear();
  return `${years} años`;
}

export function useDashboard(id: string) {
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["patient-summary", id],
    queryFn: () => patientsClient.getSummary(id),
    staleTime: 2 * 60 * 1000,
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["patient-events-recent", id],
    queryFn: () => eventsClient.getTimeline(id, { limit: 3 }),
    staleTime: 2 * 60 * 1000,
  });

  // Solo medication_given — para que TreatmentCard sepa qué dosis ya fueron marcadas hoy
  const { data: allEventsData } = useQuery({
    queryKey: ["patient-events-medication", id],
    queryFn: () =>
      eventsClient.getTimeline(id, { type: "medication_given", limit: 100 }),
    staleTime: 60 * 1000,
  });

  const { data: treatmentsData, isLoading: treatmentsLoading } = useQuery({
    queryKey: ["patient-treatments-active", id],
    queryFn: () => treatmentsClient.list(id, { status: "active", limit: 5 }),
    staleTime: 2 * 60 * 1000,
  });

  const patient = useMemo(() => {
    const p = summary?.patient;
    if (!p) return null;
    return {
      ...p,
      shortName: p.name.split(" ")[0],
      age: getAge(p.birthdate),
      avatarColor: getAvatarColor(p.id),
    };
  }, [summary]);

  return {
    isLoading: summaryLoading || eventsLoading || treatmentsLoading,
    patient,
    summary,
    recentEvents: eventsData?.data ?? [],
    allEvents: allEventsData?.data ?? [],
    activeTreatments: treatmentsData?.data ?? [],
  };
}
