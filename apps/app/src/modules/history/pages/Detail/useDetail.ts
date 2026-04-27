"use client";

import { useMemo } from "react";
import {
  getEvent,
  getEventExtras,
  getDoctor,
  MOCK_EVENTS,
} from "@/shared/data/mock";

export function useDetail(id: string) {
  return useMemo(() => {
    const event = getEvent(id);
    if (!event) return { event: null } as const;

    const extras = getEventExtras(id);
    const doctor = extras?.doctorId ? getDoctor(extras.doctorId) : null;
    const related = (extras?.relatedEventIds ?? [])
      .map((rid) => MOCK_EVENTS.find((e) => e.id === rid))
      .filter(Boolean) as typeof MOCK_EVENTS;

    return { event, extras, doctor, related } as const;
  }, [id]);
}
