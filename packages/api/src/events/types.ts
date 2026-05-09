export interface TimelineEvent {
  id: string;
  type:
    | "vaccine"
    | "vital"
    | "medication_given"
    | "symptom"
    | "visit"
    | "exam"
    | "note";
  occurred_at: string;
  payload: Record<string, unknown>;
  created_by: string | null;
}
