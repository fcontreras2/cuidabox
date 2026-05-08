import { apiClient } from '../client';
import type {
  Patient,
  PatientSummary,
  CreatePatientInput,
  UpdatePatientInput,
} from './types';
import type { Paginated, PaginationParams } from '../types';

export const patientsClient = {
  findAll(params?: PaginationParams): Promise<Paginated<Patient>> {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) query.set('limit', String(params.limit));
    if (params?.offset !== undefined) query.set('offset', String(params.offset));
    const qs = query.toString();
    return apiClient<Paginated<Patient>>(`/patients${qs ? `?${qs}` : ''}`);
  },

  findOne(id: string): Promise<Patient> {
    return apiClient<Patient>(`/patients/${id}`);
  },

  create(input: CreatePatientInput): Promise<Patient> {
    return apiClient<Patient>('/patients', { method: 'POST', body: input });
  },

  update(id: string, input: UpdatePatientInput): Promise<Patient> {
    return apiClient<Patient>(`/patients/${id}`, { method: 'PATCH', body: input });
  },

  getSummary(id: string): Promise<PatientSummary> {
    return apiClient<PatientSummary>(`/patients/${id}/summary`);
  },
};
