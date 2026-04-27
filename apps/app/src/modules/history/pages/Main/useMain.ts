"use client";

import { useMemo } from "react";
import { usePatients } from "@/shared/hooks/usePatients";
import type { TimelineEvent } from "@/shared/types";

const MOCK_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    type: "medication",
    title: "Paracetamol 5 ml",
    description: "Dosis de la tarde, justo a tiempo.",
    dateLabel: "Hoy",
    timeLabel: "14:00",
    dayKey: "today",
  },
  {
    id: "2",
    type: "fever",
    title: "Fiebre 38.2 °C",
    description: "Le tomaste la temperatura tras la siesta.",
    dateLabel: "Hoy",
    timeLabel: "13:40",
    dayKey: "today",
    meta: "Subió 0.4°",
  },
  {
    id: "3",
    type: "note",
    title: "Comió la mitad del almuerzo",
    description: "Le dolía la garganta para tragar.",
    dateLabel: "Hoy",
    timeLabel: "12:30",
    dayKey: "today",
  },
  {
    id: "4",
    type: "sleep",
    title: "Durmió 9 h 20 min",
    description: "Despertó dos veces por la tos.",
    dateLabel: "Anoche",
    timeLabel: "22:00 → 07:20",
    dayKey: "yesterday",
  },
  {
    id: "5",
    type: "medication",
    title: "Amoxicilina 7 ml",
    description: "Antibiótico, día 3 de 5.",
    dateLabel: "Ayer",
    timeLabel: "20:00",
    dayKey: "yesterday",
  },
  {
    id: "6",
    type: "appointment",
    title: "Pediatra · Dra. Mendoza",
    description: "Diagnóstico de faringitis bacteriana.",
    dateLabel: "Ayer",
    timeLabel: "11:00",
    dayKey: "yesterday",
    meta: "Receta nueva",
  },
];

export function useMain() {
  const { activePatient } = usePatients();
  const events = useMemo(() => MOCK_EVENTS, []);

  const grouped = useMemo(() => {
    const map = new Map<string, { label: string; events: TimelineEvent[] }>();
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
