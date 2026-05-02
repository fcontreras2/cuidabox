import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

interface UserRow {
  id: string;
  name: string;
  email: string;
  specialty_key: string | null;
  role: string;
}

interface PatientDoctorRow {
  id: string;
  patient_id: string;
  user_id: string;
  status: string;
  invited_by: string;
  access_from: string;
  created_at: string;
}

export interface PatientDoctor {
  id: string;
  patient_id: string;
  status: string;
  invited_by: string;
  access_from: string;
  created_at: string;
  doctor: {
    id: string;
    name: string;
    email: string;
    specialty_key: string | null;
  };
}

@Injectable()
export class PatientDoctorsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  private async assertHolderAccess(
    patientId: string,
    userId: string,
  ): Promise<void> {
    const { data } = await this.supabase
      .from('patient_holders')
      .select('patient_id')
      .eq('patient_id', patientId)
      .eq('user_id', userId)
      .single();

    if (!data) throw new ForbiddenException('No tienes acceso a este paciente');
  }

  async linkDoctor(
    patientId: string,
    email: string,
    userId: string,
  ): Promise<PatientDoctor> {
    await this.assertHolderAccess(patientId, userId);

    // Buscar doctor por email
    const { data: doctor } = (await this.supabase
      .from('users')
      .select('id, name, email, specialty_key, role')
      .eq('email', email)
      .eq('role', 'doctor')
      .single()) as { data: UserRow | null };

    if (!doctor)
      throw new NotFoundException(
        'No se encontró un doctor con ese email en Cuidabox',
      );

    // Verificar que no esté ya enlazado
    const { data: existing } = await this.supabase
      .from('patient_doctors')
      .select('id, status')
      .eq('patient_id', patientId)
      .eq('user_id', doctor.id)
      .single();

    if (existing) {
      throw new ConflictException(
        `Este doctor ya está enlazado con estado: ${(existing as { status: string }).status}`,
      );
    }

    const { data: link, error } = (await this.supabase
      .from('patient_doctors')
      .insert({
        patient_id: patientId,
        user_id: doctor.id,
        status: 'pending',
        invited_by: userId,
      })
      .select()
      .single()) as {
      data: PatientDoctorRow | null;
      error: { message: string } | null;
    };

    if (error) throw new Error(error.message);

    return this.mapRow(link!, doctor);
  }

  async findAll(patientId: string, userId: string): Promise<PatientDoctor[]> {
    await this.assertHolderAccess(patientId, userId);

    const { data: links } = (await this.supabase
      .from('patient_doctors')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })) as {
      data: PatientDoctorRow[] | null;
    };

    if (!links?.length) return [];

    const result: PatientDoctor[] = [];

    for (const link of links) {
      const { data: doctor } = (await this.supabase
        .from('users')
        .select('id, name, email, specialty_key')
        .eq('id', link.user_id)
        .single()) as { data: UserRow | null };

      if (doctor) result.push(this.mapRow(link, doctor));
    }

    return result;
  }

  async updateStatus(
    patientId: string,
    linkId: string,
    status: 'active' | 'rejected',
    userId: string,
  ): Promise<PatientDoctor> {
    // Solo el doctor puede aceptar o rechazar el enlace
    const { data: link } = (await this.supabase
      .from('patient_doctors')
      .select('*')
      .eq('id', linkId)
      .eq('patient_id', patientId)
      .single()) as { data: PatientDoctorRow | null };

    if (!link) throw new NotFoundException('Enlace no encontrado');

    if (link.user_id !== userId)
      throw new ForbiddenException(
        'Solo el doctor puede aceptar o rechazar el enlace',
      );

    if (link.status !== 'pending')
      throw new BadRequestException('El enlace ya fue procesado');

    const { data: updated, error } = (await this.supabase
      .from('patient_doctors')
      .update({ status })
      .eq('id', linkId)
      .select()
      .single()) as {
      data: PatientDoctorRow | null;
      error: { message: string } | null;
    };

    if (error || !updated) throw new Error('Error al actualizar el enlace');

    const { data: doctor } = (await this.supabase
      .from('users')
      .select('id, name, email, specialty_key')
      .eq('id', link.user_id)
      .single()) as { data: UserRow | null };

    return this.mapRow(updated, doctor!);
  }

  async remove(
    patientId: string,
    linkId: string,
    userId: string,
  ): Promise<void> {
    await this.assertHolderAccess(patientId, userId);

    const { error } = await this.supabase
      .from('patient_doctors')
      .delete()
      .eq('id', linkId)
      .eq('patient_id', patientId);

    if (error) throw new NotFoundException('Enlace no encontrado');
  }

  private mapRow(row: PatientDoctorRow, doctor: UserRow): PatientDoctor {
    return {
      id: row.id,
      patient_id: row.patient_id,
      status: row.status,
      invited_by: row.invited_by,
      access_from: row.access_from,
      created_at: row.created_at,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialty_key: doctor.specialty_key,
      },
    };
  }
}
