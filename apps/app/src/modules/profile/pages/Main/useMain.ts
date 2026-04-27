"use client";

import { useMemo, useState } from "react";
import { usePatients } from "@/shared/hooks/usePatients";

export interface CaregiverProfile {
  name: string;
  shortName: string;
  email: string;
  avatarColor: "coral" | "sky" | "plum" | "gold" | "sage";
  yearsCaring: number;
  totalRegisters: number;
}

const MOCK_CAREGIVER: CaregiverProfile = {
  name: "María Rodríguez",
  shortName: "María",
  email: "maria@cuidabox.cl",
  avatarColor: "coral",
  yearsCaring: 5,
  totalRegisters: 142,
};

export type ProfileSheet = null | "language";

export function useMain() {
  const { patients } = usePatients();
  const [openSheet, setOpenSheet] = useState<ProfileSheet>(null);

  const stats = useMemo(
    () => ({
      family: patients.length,
      registers: MOCK_CAREGIVER.totalRegisters,
      years: MOCK_CAREGIVER.yearsCaring,
    }),
    [patients.length],
  );

  return {
    caregiver: MOCK_CAREGIVER,
    patients,
    stats,
    openSheet,
    openLanguageSheet: () => setOpenSheet("language"),
    closeSheet: () => setOpenSheet(null),
  };
}
