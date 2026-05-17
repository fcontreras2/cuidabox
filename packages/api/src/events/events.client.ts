import { apiClient } from "../client";
import type { TimelineEvent } from "./types";
import type { Paginated, PaginationParams } from "../types";

export interface CreateEventInput {
  type: "medication_given" | "symptom" | "visit" | "exam" | "note";
  occurred_at: string;
  payload?: Record<string, unknown>;
}

export type TimelineEventType =
  | "medication_given"
  | "symptom"
  | "visit"
  | "exam"
  | "note"
  | "vaccine"
  | "vital";

export interface EventsParams extends PaginationParams {
  /** Filtra por tipo — cuando es un tipo de la tabla events omite vaccines y vitals en el backend */
  type?: TimelineEventType;
  /** Solo eventos desde esta fecha (YYYY-MM-DD, inclusive) */
  from?: string;
  /** Solo eventos hasta esta fecha (YYYY-MM-DD, inclusive) */
  to?: string;
}

export const eventsClient = {
  getTimeline(
    patientId: string,
    params?: EventsParams,
  ): Promise<Paginated<TimelineEvent>> {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) query.set("limit", String(params.limit));
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.type) query.set("type", params.type);
    if (params?.from) query.set("from", params.from);
    if (params?.to) query.set("to", params.to);
    const qs = query.toString();
    return apiClient<Paginated<TimelineEvent>>(
      `/patients/${patientId}/events${qs ? `?${qs}` : ""}`,
    );
  },

  create(patientId: string, input: CreateEventInput): Promise<TimelineEvent> {
    return apiClient<TimelineEvent>(`/patients/${patientId}/events`, {
      method: "POST",
      body: input,
    });
  },
};
