"use client";

import { useState, useMemo } from "react";
import { usePatients } from "@/shared/hooks/usePatients";
import { MOCK_ACTIVE_MEDS, MOCK_PAST_MEDS } from "@/shared/data/mock";

export function useMain() {
  const { activePatient } = usePatients();
  const [tab, setTab] = useState<"active" | "past">("active");
  const active = useMemo(() => MOCK_ACTIVE_MEDS, []);
  const past = useMemo(() => MOCK_PAST_MEDS, []);
  return { activePatient, tab, setTab, active, past };
}
