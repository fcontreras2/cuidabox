import { SupabaseClient } from '@supabase/supabase-js';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
export interface Appointment {
    id: string;
    patient_id: string;
    doctor_id: string | null;
    scheduled_at: string;
    status: string;
    notes: string | null;
    created_by: string;
    created_at: string;
}
export declare class AppointmentsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    private assertAccess;
    create(patientId: string, dto: CreateAppointmentDto, userId: string): Promise<Appointment>;
    findAll(patientId: string, userId: string): Promise<Appointment[]>;
    findOne(patientId: string, appointmentId: string, userId: string): Promise<Appointment>;
    findUpcoming(userId: string, limit?: number): Promise<Appointment[]>;
    private getHolderPatientIds;
    updateStatus(patientId: string, appointmentId: string, status: 'scheduled' | 'completed' | 'cancelled', userId: string): Promise<Appointment>;
}
