import { apiClient } from "../client";
import type { TimelineEvent } from "./types";
import type { Paginated, PaginationParams } from "../types";

export interface CreateEventInput {
  type: "medication_given" | "symptom" | "visit" | "exam" | "note";
  occurred_at: string;
  payload?: Record<string, unknown>;
}

export const eventsClient = {
  getTimeline(
    patientId: string,
    params?: PaginationParams,
  ): Promise<Paginated<TimelineEvent>> {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) query.set("limit", String(params.limit));
    if (params?.cursor) query.set("cursor", params.cursor);
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
