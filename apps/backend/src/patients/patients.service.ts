import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export interface Patient {
  id: string;
  name: string;
  birthdate?: string;
  gender?: string;
  blood_type?: string;
  notes?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  created_by: string;
  created_at: string;
}

export class CreatePatientDto {
  name: string;
  birthdate?: string;
  gender?: string;
  blood_type?: string;
  notes?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  relationship?: string;
}

@Injectable()
export class PatientsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreatePatientDto, userId: string): Promise<Patient> {
    const { data: patient, error } = (await this.supabase
      .from('patients')
      .insert({
        name: dto.name,
        birthdate: dto.birthdate,
        gender: dto.gender,
        blood_type: dto.blood_type,
        notes: dto.notes,
        insurance_provider: dto.insurance_provider,
        insurance_policy_number: dto.insurance_policy_number,
        created_by: userId,
      })
      .select()
      .single()) as { data: Patient | null; error: { message: string } | null };

    if (error) throw new Error(error.message);

    await this.supabase.from('patient_holders').insert({
      patient_id: patient!.id,
      user_id: userId,
      relationship: dto.relationship ?? 'parent',
      is_primary: true,
    });

    return patient!;
  }

  async findAllByHolder(userId: string): Promise<Patient[]> {
    const { data } = (await this.supabase
      .from('patient_holders')
      .select('patients(*)')
      .eq('user_id', userId)) as {
      data: { patients: Patient }[] | null;
    };

    return (data ?? []).map((row) => row.patients);
  }

  async findOne(id: string, userId: string): Promise<Patient> {
    const { data } = (await this.supabase
      .from('patient_holders')
      .select('patients(*)')
      .eq('user_id', userId)
      .eq('patient_id', id)
      .single()) as { data: { patients: Patient } | null };

    if (!data) throw new NotFoundException('Patient not found');
    return data.patients;
  }
}
