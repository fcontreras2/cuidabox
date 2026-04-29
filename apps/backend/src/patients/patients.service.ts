import { Injectable } from '@nestjs/common';

export interface Patient {
  id: string;
  name: string;
  age: number;
}

const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Abuela Rosa', age: 78 },
  { id: '2', name: 'Abuelo Luis', age: 81 },
];

@Injectable()
export class PatientsService {
  findAll(): Patient[] {
    return MOCK_PATIENTS;
  }

  findOne(id: string): Patient | undefined {
    return MOCK_PATIENTS.find((p) => p.id === id);
  }
}
