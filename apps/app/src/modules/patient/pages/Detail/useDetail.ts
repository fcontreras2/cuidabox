"use client";

import { useMemo } from "react";
import {
  getPatient,
  getPatientProfile,
  getDoctor,
  MOCK_EVENTS,
  MOCK_ACTIVE_MEDS,
} from "@/shared/data/mock";

export function useDetail(id: string) {
  return useMemo(() => {
    const patient = getPatient(id);
    if (!patient) return { patient: null } as const;

    const profile = getPatientProfile(id);
    const primaryDoctor = profile?.primaryDoctorId
      ? getDoctor(profile.primaryDoctorId)
      : null;

    return {
      patient,
      profile,
      primaryDoctor,
      lastEvents: MOCK_EVENTS.slice(0, 3),
      activeMedsCount: MOCK_ACTIVE_MEDS.length,
    } as const;
  }, [id]);
}
