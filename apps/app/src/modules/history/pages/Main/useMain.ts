"use client";

import { useMemo } from "react";
import { usePatients } from "@/shared/hooks/usePatients";
import { MOCK_EVENTS } from "@/shared/data/mock";

export function useMain() {
  const { activePatient } = usePatients();
  const events = useMemo(() => MOCK_EVENTS, []);

  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; events: typeof events }>();
    for (const ev of events) {
      const key = ev.dayKey;
      const label =
        key === "today" ? "Hoy" : key === "yesterday" ? "Ayer" : ev.dateLabel;
      const bucket = map.get(key) ?? { label, events: [] };
      bucket.events.push(ev);
      map.set(key, bucket);
    }
    return Array.from(map.values());
  }, [events]);

  return { activePatient, events, grouped };
}
