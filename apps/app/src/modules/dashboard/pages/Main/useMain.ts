"use client";

import { useMemo } from "react";
import { usePatients } from "@/shared/hooks/usePatients";
import type { Medication, UpcomingItem } from "@/shared/types";

const MOCK_MEDICATIONS: Medication[] = [
  {
    id: "para",
    name: "Paracetamol",
    shortDose: "5 ml",
    schedule: "cada 6 h si tiene fiebre",
    reason: "fiebre",
    nextDoseAt: "14:00",
    status: "active",
    doseProgress: { taken: 7, total: 15 },
  },
  {
    id: "amoxi",
    name: "Amoxicilina",
    shortDose: "7 ml",
    schedule: "2 veces al día",
    nextDoseAt: "20:00",
    status: "active",
    doseProgress: { taken: 6, total: 10 },
  },
];

const MOCK_UPCOMING: UpcomingItem[] = [
  {
    id: "appt-mendoza",
    type: "appointment",
    title: "Dra. Mendoza",
    when: "Mañana · 10:30",
    meta: "Control de seguimiento",
  },
  {
    id: "vac-12m",
    type: "vaccine",
    title: "Refuerzo · Triple viral",
    when: "Sábado",
    meta: "Centro Salud Norte",
  },
];

export function useMain() {
  const { activePatient } = usePatients();
  const medications = useMemo(() => MOCK_MEDICATIONS, []);
  const upcoming = useMemo(() => MOCK_UPCOMING, []);
  const nextDose = medications[0];

  return { activePatient, medications, upcoming, nextDose };
}
