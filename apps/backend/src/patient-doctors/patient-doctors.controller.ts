import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
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
import { PatientDoctorsService } from './patient-doctors.service';
import { LinkDoctorDto } from './dto/link-doctor.dto';
import { UpdateLinkStatusDto } from './dto/update-link-status.dto';
import { PatientDoctorResponseDto } from './dto/patient-doctor-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('patient-doctors')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/doctors')
export class PatientDoctorsController {
  constructor(private readonly patientDoctorsService: PatientDoctorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Enlazar doctor al paciente',
    description:
      'El holder ingresa el email del doctor. Si existe en Cuidabox se crea el enlace en estado pending. El doctor deberá aceptarlo.',
  })
  @ApiResponse({ status: 201, type: PatientDoctorResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Doctor no encontrado en Cuidabox' })
  @ApiResponse({ status: 409, description: 'Doctor ya enlazado' })
  linkDoctor(
    @Param('patientId') patientId: string,
    @Body() dto: LinkDoctorDto,
    @Request() req: AuthRequest,
  ) {
    return this.patientDoctorsService.linkDoctor(
      patientId,
      dto.email,
      req.user.id,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Listar doctores enlazados al paciente',
    description:
      'Retorna todos los enlaces (pending, active, rejected) con info del doctor.',
  })
  @ApiResponse({ status: 200, type: [PatientDoctorResponseDto] })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.patientDoctorsService.findAll(patientId, req.user.id);
  }

  @Patch(':linkId/status')
  @ApiOperation({
    summary: 'Aceptar o rechazar enlace (solo el doctor)',
    description:
      'El doctor autenticado puede aceptar (active) o rechazar (rejected) el enlace solicitado por el holder.',
  })
  @ApiResponse({ status: 200, type: PatientDoctorResponseDto })
  @ApiResponse({ status: 400, description: 'El enlace ya fue procesado' })
  @ApiResponse({
    status: 403,
    description: 'Solo el doctor puede responder el enlace',
  })
  @ApiResponse({ status: 404, description: 'Enlace no encontrado' })
  updateStatus(
    @Param('patientId') patientId: string,
    @Param('linkId') linkId: string,
    @Body() dto: UpdateLinkStatusDto,
    @Request() req: AuthRequest,
  ) {
    return this.patientDoctorsService.updateStatus(
      patientId,
      linkId,
      dto.status,
      req.user.id,
    );
  }

  @Delete(':linkId')
  @ApiOperation({
    summary: 'Eliminar enlace con el doctor',
    description:
      'El holder puede revocar el acceso de un doctor en cualquier momento.',
  })
  @ApiResponse({ status: 200, description: 'Enlace eliminado' })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Enlace no encontrado' })
  remove(
    @Param('patientId') patientId: string,
    @Param('linkId') linkId: string,
    @Request() req: AuthRequest,
  ) {
    return this.patientDoctorsService.remove(patientId, linkId, req.user.id);
  }
}
