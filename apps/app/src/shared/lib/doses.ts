import type { Treatment, TreatmentStep, TimelineEvent } from "@cuidabox/api";

export type DoseStatus = "taken" | "skipped" | "pending" | "scheduled";

export interface DoseSlot {
  key: string;
  stepId: string;
  date: string;
  time: string | null;
  scheduledAt: Date;
  status: DoseStatus;
  markedAt?: string;
}

export interface StepProgress {
  taken: number;
  skipped: number;
  pending: number;
  scheduled: number;
  total: number;
  oldestPending: DoseSlot | null;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function computeDoseSlots(
  step: TreatmentStep,
  treatment: Treatment,
  events: TimelineEvent[],
): DoseSlot[] {
  const now = new Date();

  if (step.type === "medication") {
    const medName = step.medication?.medication_name;
    if (!treatment.start_date || !step.medication?.times_of_day?.length)
      return [];

    const slotStart = addDays(treatment.start_date, step.start_offset_days);
    const slotEnd = step.duration_days
      ? addDays(slotStart, step.duration_days)
      : (treatment.end_date ?? addDays(slotStart, 1));

    const slots: DoseSlot[] = [];
    let current = slotStart;

    while (current < slotEnd) {
      for (const time of step.medication.times_of_day) {
        const scheduledAt = new Date(`${current}T${time}:00`);

        const match = events.find((e) => {
          if (e.type !== "medication_given") return false;
          const p = e.payload as Record<string, unknown>;
          if (p.medication_name !== medName) return false;
          return e.occurred_at.split("T")[0] === current && p.time === time;
        });

        let status: DoseStatus;
        let markedAt: string | undefined;

        if (match) {
          const p = match.payload as Record<string, unknown>;
          status = p.status === "skipped" ? "skipped" : "taken";
          markedAt = match.occurred_at;
        } else {
          status = scheduledAt < now ? "pending" : "scheduled";
        }

        slots.push({
          key: `${step.id}_${current}_${time}`,
          stepId: step.id,
          date: current,
          time,
          scheduledAt,
          status,
          markedAt,
        });
      }
      current = addDays(current, 1);
    }

    return slots;
  }

  // exam / action — single slot
  if (!treatment.start_date) return [];
  const date = addDays(treatment.start_date, step.start_offset_days);
  const scheduledAt = new Date(`${date}T09:00:00`);

  const done = events.find((e) => {
    const p = e.payload as Record<string, unknown>;
    return p.step_id === step.id;
  });

  return [
    {
      key: `${step.id}_${date}`,
      stepId: step.id,
      date,
      time: null,
      scheduledAt,
      status: done ? "taken" : scheduledAt < now ? "pending" : "scheduled",
      markedAt: done?.occurred_at,
    },
  ];
}

export function computeProgress(slots: DoseSlot[]): StepProgress {
  const taken = slots.filter((s) => s.status === "taken").length;
  const skipped = slots.filter((s) => s.status === "skipped").length;
  const pending = slots.filter((s) => s.status === "pending").length;
  const scheduled = slots.filter((s) => s.status === "scheduled").length;

  const oldestPending =
    slots
      .filter((s) => s.status === "pending")
      .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime())[0] ??
    null;

  return {
    taken,
    skipped,
    pending,
    scheduled,
    total: slots.length,
    oldestPending,
  };
}

const DAYS_ES = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const MONTHS_ES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export function formatSlotShort(date: string, time: string | null): string {
  const d = new Date(`${date}T00:00:00`);
  const day = d.getDate();
  const month = MONTHS_ES[d.getMonth()];
  return time ? `${day} ${month} · ${time}` : `${day} ${month}`;
}

export function formatSlotFull(date: string, time: string | null): string {
  const d = new Date(`${date}T00:00:00`);
  const dayName = DAYS_ES[d.getDay()];
  const day = d.getDate();
  const month = MONTHS_ES[d.getMonth()];
  return time
    ? `${dayName} ${day} ${month} · ${time}`
    : `${dayName} ${day} ${month}`;
}

export function formatMarkedAt(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate();
  const month = MONTHS_ES[d.getMonth()];
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${month} · ${h}:${m}`;
}
