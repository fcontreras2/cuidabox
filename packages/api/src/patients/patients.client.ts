import { apiClient } from '../client';

export interface Patient {
  id: string;
  name: string;
  age: number;
}

export const patientsClient = {
  findAll(): Promise<Patient[]> {
    return apiClient<Patient[]>('/patients');
  },

  findOne(id: string): Promise<Patient> {
    return apiClient<Patient>(`/patients/${id}`);
  },
};
