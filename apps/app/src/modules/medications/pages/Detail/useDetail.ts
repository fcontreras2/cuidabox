"use client";

import { useMemo } from "react";
import {
  getMedication,
  getMedicationDetail,
  getDoctor,
} from "@/shared/data/mock";

export function useDetail(id: string) {
  return useMemo(() => {
    const med = getMedication(id);
    if (!med) return { med: null } as const;

    const detail = getMedicationDetail(id);
    const doctor = detail?.prescribedBy ? getDoctor(detail.prescribedBy) : null;

    return { med, detail, doctor } as const;
  }, [id]);
}
