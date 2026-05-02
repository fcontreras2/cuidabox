import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class AppointmentsUpcomingController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    findUpcoming(req: AuthRequest, limit?: string): Promise<import("./appointments.service").Appointment[]>;
}
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(patientId: string, dto: CreateAppointmentDto, req: AuthRequest): Promise<import("./appointments.service").Appointment>;
    findAll(patientId: string, req: AuthRequest): Promise<import("./appointments.service").Appointment[]>;
    findOne(patientId: string, appointmentId: string, req: AuthRequest): Promise<import("./appointments.service").Appointment>;
    updateStatus(patientId: string, appointmentId: string, dto: UpdateAppointmentStatusDto, req: AuthRequest): Promise<import("./appointments.service").Appointment>;
}
export {};
