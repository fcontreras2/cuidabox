"use client";

import { useState, useMemo } from "react";
import { usePatients } from "@/shared/hooks/usePatients";
import type { Medication } from "@/shared/types";

const MOCK_ACTIVE: Medication[] = [
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
    schedule: "2 veces al día · día 3 de 5",
    reason: "antibiótico",
    nextDoseAt: "20:00",
    status: "active",
    doseProgress: { taken: 6, total: 10 },
  },
];

const MOCK_PAST: Medication[] = [
  {
    id: "ibu",
    name: "Ibuprofeno",
    shortDose: "4 ml",
    schedule: "Tratamiento finalizado · 18 abr",
    nextDoseAt: "—",
    status: "past",
  },
  {
    id: "vit",
    name: "Vitamina D",
    shortDose: "3 gotas",
    schedule: "Tratamiento finalizado · 02 mar",
    nextDoseAt: "—",
    status: "past",
  },
];

export function useMain() {
  const { activePatient } = usePatients();
  const [tab, setTab] = useState<"active" | "past">("active");
  const active = useMemo(() => MOCK_ACTIVE, []);
  const past = useMemo(() => MOCK_PAST, []);
  return { activePatient, tab, setTab, active, past };
}
