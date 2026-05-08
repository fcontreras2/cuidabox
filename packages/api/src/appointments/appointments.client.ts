import { apiClient } from '../client';
import type { Appointment, CreateAppointmentInput } from './types';
import type { Paginated, PaginationParams } from '../types';

export const appointmentsClient = {
  findAll(patientId: string, params?: PaginationParams): Promise<Paginated<Appointment>> {
    const query = new URLSearchParams();
    if (params?.limit !== undefined) query.set('limit', String(params.limit));
    if (params?.cursor) query.set('cursor', params.cursor);
    const qs = query.toString();
    return apiClient<Paginated<Appointment>>(
      `/patients/${patientId}/appointments${qs ? `?${qs}` : ''}`,
    );
  },

  findOne(patientId: string, appointmentId: string): Promise<Appointment> {
    return apiClient<Appointment>(`/patients/${patientId}/appointments/${appointmentId}`);
  },

  create(patientId: string, input: CreateAppointmentInput): Promise<Appointment> {
    return apiClient<Appointment>(`/patients/${patientId}/appointments`, {
      method: 'POST',
      body: input,
    });
  },

  updateStatus(
    patientId: string,
    appointmentId: string,
    status: 'scheduled' | 'completed' | 'cancelled',
  ): Promise<Appointment> {
    return apiClient<Appointment>(`/patients/${patientId}/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      body: { status },
    });
  },

  findUpcoming(): Promise<Appointment[]> {
    return apiClient<Appointment[]>('/appointments/upcoming');
  },
};
