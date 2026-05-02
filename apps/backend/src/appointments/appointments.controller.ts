import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
import { AppointmentResponseDto } from './dto/appointment-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('appointments')
@UseGuards(JwtGuard)
@Controller('appointments')
export class AppointmentsUpcomingController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('upcoming')
  @ApiOperation({
    summary: 'Próximas citas del usuario autenticado',
    description:
      'Retorna las próximas citas (status scheduled, fecha futura) de todos los pacientes del holder. Útil para el home del dashboard.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Máximo de citas a retornar (default 10)',
  })
  @ApiResponse({ status: 200, type: [AppointmentResponseDto] })
  findUpcoming(@Request() req: AuthRequest, @Query('limit') limit?: string) {
    return this.appointmentsService.findUpcoming(
      req.user.id,
      limit ? parseInt(limit, 10) : 10,
    );
  }
}

@ApiBearerAuth()
@ApiTags('appointments')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Agendar una cita',
    description:
      'Puede ser agendada por el holder, doctor o admin. El doctor_id es opcional si el doctor aún no está en el sistema.',
  })
  @ApiResponse({ status: 201, type: AppointmentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateAppointmentDto,
    @Request() req: AuthRequest,
  ) {
    return this.appointmentsService.create(patientId, dto, req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar citas del paciente ordenadas por fecha',
    description:
      'Retorna todas las citas (scheduled, completed y cancelled) en orden descendente.',
  })
  @ApiResponse({ status: 200, type: [AppointmentResponseDto] })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.appointmentsService.findAll(patientId, req.user.id);
  }

  @Get(':appointmentId')
  @ApiOperation({ summary: 'Obtener detalle de una cita' })
  @ApiResponse({ status: 200, type: AppointmentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada' })
  findOne(
    @Param('patientId') patientId: string,
    @Param('appointmentId') appointmentId: string,
    @Request() req: AuthRequest,
  ) {
    return this.appointmentsService.findOne(
      patientId,
      appointmentId,
      req.user.id,
    );
  }

  @Patch(':appointmentId/status')
  @ApiOperation({
    summary: 'Actualizar estado de la cita',
    description:
      'Permite marcar la cita como scheduled, completed o cancelled.',
  })
  @ApiResponse({ status: 200, type: AppointmentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada' })
  updateStatus(
    @Param('patientId') patientId: string,
    @Param('appointmentId') appointmentId: string,
    @Body() dto: UpdateAppointmentStatusDto,
    @Request() req: AuthRequest,
  ) {
    return this.appointmentsService.updateStatus(
      patientId,
      appointmentId,
      dto.status,
      req.user.id,
    );
  }
}
