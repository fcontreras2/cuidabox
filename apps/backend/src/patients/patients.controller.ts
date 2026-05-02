import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';
import { PatientSummaryResponseDto } from './dto/patient-summary-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('patients')
@UseGuards(JwtGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar nuevo paciente' })
  @ApiResponse({ status: 201, type: PatientResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  create(@Body() dto: CreatePatientDto, @Request() req: AuthRequest) {
    return this.patientsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar pacientes del holder autenticado' })
  @ApiResponse({ status: 200, type: [PatientResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  findAll(@Request() req: AuthRequest) {
    return this.patientsService.findAllByHolder(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un paciente' })
  @ApiResponse({ status: 200, type: PatientResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.patientsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar datos del paciente',
    description:
      'Solo el holder puede actualizar. Todos los campos son opcionales.',
  })
  @ApiResponse({ status: 200, type: PatientResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePatientDto,
    @Request() req: AuthRequest,
  ) {
    return this.patientsService.update(id, dto, req.user.id);
  }

  @Get(':id/summary')
  @ApiOperation({
    summary: 'Resumen del paciente para el dashboard',
    description:
      'Retorna el paciente + última cita, próxima cita, último vital, conteo de alergias y tratamientos activos.',
  })
  @ApiResponse({ status: 200, type: PatientSummaryResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  getSummary(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.patientsService.getSummary(id, req.user.id);
  }
}
