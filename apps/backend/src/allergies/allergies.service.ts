import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { CreateAllergyDto } from './dto/create-allergy.dto';

export interface Allergy {
  id: string;
  patient_id: string;
  name: string;
  type: string | null;
  severity: string | null;
  notes: string | null;
  created_at: string;
}

@Injectable()
export class AllergiesService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  private async assertAccess(patientId: string, userId: string): Promise<void> {
    const { data } = await this.supabase
      .from('patient_holders')
      .select('patient_id')
      .eq('patient_id', patientId)
      .eq('user_id', userId)
      .single();

    if (!data) throw new ForbiddenException('No tienes acceso a este paciente');
  }

  async create(
    patientId: string,
    dto: CreateAllergyDto,
    userId: string,
  ): Promise<Allergy> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('allergies')
      .insert({ patient_id: patientId, ...dto })
      .select()
      .single()) as { data: Allergy | null; error: { message: string } | null };

    if (error) throw new Error(error.message);
    return data!;
  }

  async findAll(patientId: string, userId: string): Promise<Allergy[]> {
    await this.assertAccess(patientId, userId);

    const { data } = (await this.supabase
      .from('allergies')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })) as { data: Allergy[] | null };

    return data ?? [];
  }

  async remove(
    patientId: string,
    allergyId: string,
    userId: string,
  ): Promise<void> {
    await this.assertAccess(patientId, userId);

    const { error } = await this.supabase
      .from('allergies')
      .delete()
      .eq('id', allergyId)
      .eq('patient_id', patientId);

    if (error) throw new NotFoundException('Alergia no encontrada');
  }
}
