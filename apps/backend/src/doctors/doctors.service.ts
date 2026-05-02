import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export interface DoctorPatient {
  link_id: string;
  status: string;
  access_from: string;
  created_at: string;
  patient: {
    id: string;
    name: string;
    birthdate: string | null;
    gender: string | null;
  };
}

interface PatientRow {
  id: string;
  name: string;
  birthdate: string | null;
  gender: string | null;
}

interface LinkRow {
  id: string;
  status: string;
  access_from: string;
  created_at: string;
  patient_id: string;
}

@Injectable()
export class DoctorsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async getMyPatients(doctorId: string): Promise<DoctorPatient[]> {
    const { data: links } = (await this.supabase
      .from('patient_doctors')
      .select('id, status, access_from, created_at, patient_id')
      .eq('user_id', doctorId)
      .eq('status', 'active')
      .order('created_at', { ascending: false })) as {
      data: LinkRow[] | null;
    };

    if (!links?.length) return [];

    const result: DoctorPatient[] = [];

    for (const link of links) {
      const { data: patient } = (await this.supabase
        .from('patients')
        .select('id, name, birthdate, gender')
        .eq('id', link.patient_id)
        .single()) as { data: PatientRow | null };

      if (patient) {
        result.push({
          link_id: link.id,
          status: link.status,
          access_from: link.access_from,
          created_at: link.created_at,
          patient,
        });
      }
    }

    return result;
  }
}
