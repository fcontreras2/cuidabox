import { apiClient } from '../client';

export interface PatientDTO {
  id: string;
  name: string;
  age: number;
}

export const patientsClient = {
  findAll(): Promise<PatientDTO[]> {
    return apiClient<PatientDTO[]>('/patients');
  },

  findOne(id: string): Promise<PatientDTO> {
    return apiClient<PatientDTO>(`/patients/${id}`);
  },
};
