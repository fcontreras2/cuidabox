import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import {
  CreateTreatmentDto,
  CreateTreatmentStepDto,
} from './dto/create-treatment.dto';

interface StepMedication {
  id: string;
  medication_name: string;
  dose: number | null;
  unit: string | null;
  frequency: string | null;
  times_of_day: string[] | null;
}

interface TreatmentStep {
  id: string;
  treatment_id: string;
  order: number;
  depends_on_step_id: string | null;
  type: string;
  title: string;
  description: string | null;
  start_offset_days: number;
  duration_days: number | null;
  medication: StepMedication | null;
}

export interface Treatment {
  id: string;
  patient_id: string;
  doctor_id: string | null;
  appointment_id: string | null;
  title: string;
  start_date: string | null;
  end_date: string | null;
  status: string;
  created_by: string;
  created_at: string;
  steps: TreatmentStep[];
}

@Injectable()
export class TreatmentsService {
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
    dto: CreateTreatmentDto,
    userId: string,
  ): Promise<Treatment> {
    await this.assertAccess(patientId, userId);

    const { data: treatment, error } = (await this.supabase
      .from('treatments')
      .insert({
        patient_id: patientId,
        title: dto.title,
        start_date: dto.start_date,
        end_date: dto.end_date,
        appointment_id: dto.appointment_id,
        created_by: userId,
      })
      .select()
      .single()) as {
      data: Treatment | null;
      error: { message: string } | null;
    };

    if (error) throw new Error(error.message);

    const steps: TreatmentStep[] = [];

    if (dto.steps?.length) {
      for (const stepDto of dto.steps) {
        const step = await this.createStep(treatment!.id, stepDto);
        steps.push(step);
      }
    }

    return { ...treatment!, steps };
  }

  private async createStep(
    treatmentId: string,
    dto: CreateTreatmentStepDto,
  ): Promise<TreatmentStep> {
    const { data: step, error } = (await this.supabase
      .from('treatment_steps')
      .insert({
        treatment_id: treatmentId,
        order: dto.order,
        depends_on_step_id: dto.depends_on_step_id,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        start_offset_days: dto.start_offset_days ?? 0,
        duration_days: dto.duration_days,
      })
      .select()
      .single()) as {
      data: TreatmentStep | null;
      error: { message: string } | null;
    };

    if (error) throw new Error(error.message);

    let medication: StepMedication | null = null;

    if (dto.type === 'medication' && dto.medication) {
      const { data: med, error: medError } = (await this.supabase
        .from('treatment_step_medications')
        .insert({
          step_id: step!.id,
          ...dto.medication,
        })
        .select()
        .single()) as {
        data: StepMedication | null;
        error: { message: string } | null;
      };

      if (medError) throw new Error(medError.message);
      medication = med;
    }

    return { ...step!, medication };
  }

  async findAll(patientId: string, userId: string): Promise<Treatment[]> {
    await this.assertAccess(patientId, userId);

    const { data: treatments } = (await this.supabase
      .from('treatments')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })) as {
      data: Treatment[] | null;
    };

    if (!treatments?.length) return [];

    const result: Treatment[] = [];

    for (const treatment of treatments) {
      const steps = await this.getSteps(treatment.id);
      result.push({ ...treatment, steps });
    }

    return result;
  }

  async findOne(
    patientId: string,
    treatmentId: string,
    userId: string,
  ): Promise<Treatment> {
    await this.assertAccess(patientId, userId);

    const { data: treatment } = (await this.supabase
      .from('treatments')
      .select('*')
      .eq('id', treatmentId)
      .eq('patient_id', patientId)
      .single()) as { data: Treatment | null };

    if (!treatment) throw new NotFoundException('Tratamiento no encontrado');

    const steps = await this.getSteps(treatmentId);
    return { ...treatment, steps };
  }

  async updateStatus(
    patientId: string,
    treatmentId: string,
    status: 'active' | 'completed' | 'cancelled',
    userId: string,
  ): Promise<Treatment> {
    await this.assertAccess(patientId, userId);

    const { data: treatment, error } = (await this.supabase
      .from('treatments')
      .update({ status })
      .eq('id', treatmentId)
      .eq('patient_id', patientId)
      .select()
      .single()) as {
      data: Treatment | null;
      error: { message: string } | null;
    };

    if (error || !treatment)
      throw new NotFoundException('Tratamiento no encontrado');

    const steps = await this.getSteps(treatmentId);
    return { ...treatment, steps };
  }

  private async getSteps(treatmentId: string): Promise<TreatmentStep[]> {
    const { data: steps } = (await this.supabase
      .from('treatment_steps')
      .select('*')
      .eq('treatment_id', treatmentId)
      .order('order', { ascending: true })) as {
      data: TreatmentStep[] | null;
    };

    if (!steps?.length) return [];

    const result: TreatmentStep[] = [];

    for (const step of steps) {
      const { data: med } = (await this.supabase
        .from('treatment_step_medications')
        .select('*')
        .eq('step_id', step.id)
        .single()) as { data: StepMedication | null };

      result.push({ ...step, medication: med ?? null });
    }

    return result;
  }
}
