"use client";

import { useState, useCallback } from "react";
import type { Patient } from "@/shared/types";

const MOCK_PATIENTS: Patient[] = [
  {
    id: "emma",
    name: "Emma Rodríguez",
    shortName: "Emma",
    age: "5 añitos",
    gender: "F",
    avatarColor: "coral",
    status: "tiene un poquito de fiebre",
  },
  {
    id: "lucas",
    name: "Lucas Rodríguez",
    shortName: "Lucas",
    age: "8 añitos",
    gender: "M",
    avatarColor: "sky",
    status: "todo tranquilo hoy",
  },
  {
    id: "sofia",
    name: "Sofía Rodríguez",
    shortName: "Sofía",
    age: "11 mesecitos",
    gender: "F",
    avatarColor: "plum",
    status: "vacuna mañana",
  },
];

export function usePatients() {
  const [patients] = useState<Patient[]>(MOCK_PATIENTS);
  const [activeId, setActiveId] = useState<string>("emma");

  const activePatient = patients.find((p) => p.id === activeId) ?? patients[0];

  const selectPatient = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return { patients, activePatient, selectPatient };
}
