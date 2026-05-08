"use client";

import { useState, useCallback } from "react";
import { MOCK_PATIENTS } from "@/shared/data/mock";
import type {  PatientWithUI } from "@/shared/types";

export function usePatients() {
  const [patients] = useState<PatientWithUI[]>(MOCK_PATIENTS);
  const [activeId, setActiveId] = useState<string>(MOCK_PATIENTS[0]?.id ?? "");

  const activePatient = patients.find((p) => p.id === activeId) ?? patients[0];

  const selectPatient = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return { patients, activePatient, selectPatient };
}
