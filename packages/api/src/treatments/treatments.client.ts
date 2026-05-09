import { apiClient } from "../client";
import type { Treatment } from "./types";
import type { Paginated } from "../types";

export const treatmentsClient = {
  list(
    patientId: string,
    params?: { status?: "active" | "completed" | "cancelled"; limit?: number },
  ): Promise<Paginated<Treatment>> {
    const query = new URLSearchParams();
    if (params?.status) query.set("status", params.status);
    if (params?.limit !== undefined) query.set("limit", String(params.limit));
    const qs = query.toString();
    return apiClient<Paginated<Treatment>>(
      `/patients/${patientId}/treatments${qs ? `?${qs}` : ""}`,
    );
  },

  findOne(patientId: string, treatmentId: string): Promise<Treatment> {
    return apiClient<Treatment>(
      `/patients/${patientId}/treatments/${treatmentId}`,
    );
  },
};
