"use client";

import { useMemo } from "react";
import { MOCK_DOCTORS } from "@/shared/data/mock";

export function useMain() {
  const doctors = useMemo(() => MOCK_DOCTORS, []);
  const primary = doctors.find((d) => d.isPrimary);
  const others = doctors.filter((d) => !d.isPrimary);
  return { doctors, primary, others };
}
