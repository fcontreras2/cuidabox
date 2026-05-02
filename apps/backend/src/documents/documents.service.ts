import {
  Inject,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { CreateDocumentDto } from './dto/create-document.dto';

export interface Document {
  id: string;
  patient_id: string;
  uploaded_by: string;
  treatment_id: string | null;
  appointment_id: string | null;
  exam_id: string | null;
  name: string;
  file_url: string;
  type: string;
  uploaded_at: string;
}

@Injectable()
export class DocumentsService {
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
    dto: CreateDocumentDto,
    userId: string,
  ): Promise<Document> {
    await this.assertAccess(patientId, userId);

    const { data, error } = (await this.supabase
      .from('documents')
      .insert({
        patient_id: patientId,
        uploaded_by: userId,
        name: dto.name,
        file_url: dto.file_url,
        type: dto.type,
        treatment_id: dto.treatment_id ?? null,
        appointment_id: dto.appointment_id ?? null,
        exam_id: dto.exam_id ?? null,
      })
      .select()
      .single()) as {
      data: Document | null;
      error: { message: string } | null;
    };

    if (error) throw new Error(error.message);
    return data!;
  }

  async findAll(
    patientId: string,
    userId: string,
    filters?: {
      treatment_id?: string;
      appointment_id?: string;
      exam_id?: string;
    },
  ): Promise<Document[]> {
    await this.assertAccess(patientId, userId);

    let query = this.supabase
      .from('documents')
      .select('*')
      .eq('patient_id', patientId);

    if (filters?.treatment_id)
      query = query.eq('treatment_id', filters.treatment_id);
    if (filters?.appointment_id)
      query = query.eq('appointment_id', filters.appointment_id);
    if (filters?.exam_id) query = query.eq('exam_id', filters.exam_id);

    const { data } = (await query.order('uploaded_at', {
      ascending: false,
    })) as { data: Document[] | null };

    return data ?? [];
  }

  async getSignedUrl(
    patientId: string,
    documentId: string,
    userId: string,
  ): Promise<{ signed_url: string; expires_in: number }> {
    await this.assertAccess(patientId, userId);

    const { data: doc } = (await this.supabase
      .from('documents')
      .select('file_url')
      .eq('id', documentId)
      .eq('patient_id', patientId)
      .single()) as { data: { file_url: string } | null };

    if (!doc) throw new NotFoundException('Documento no encontrado');

    // file_url format: "bucket-name/path/to/file.pdf"
    const slashIndex = doc.file_url.indexOf('/');
    const bucket = doc.file_url.substring(0, slashIndex);
    const path = doc.file_url.substring(slashIndex + 1);

    const expiresIn = 3600;
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error || !data) throw new Error('No se pudo generar la URL firmada');

    return { signed_url: data.signedUrl, expires_in: expiresIn };
  }

  async remove(
    patientId: string,
    documentId: string,
    userId: string,
  ): Promise<void> {
    await this.assertAccess(patientId, userId);

    const { error } = await this.supabase
      .from('documents')
      .delete()
      .eq('id', documentId)
      .eq('patient_id', patientId);

    if (error) throw new NotFoundException('Documento no encontrado');
  }
}
