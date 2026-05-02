import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DoctorsService } from './doctors.service';
import { DoctorPatientResponseDto } from './dto/doctor-patient-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('doctors')
@UseGuards(JwtGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get('me/patients')
  @ApiOperation({
    summary: 'Pacientes activos del doctor autenticado',
    description:
      'Retorna los pacientes con enlace activo (aceptado) hacia el doctor. Solo disponible para usuarios con role doctor.',
  })
  @ApiResponse({ status: 200, type: [DoctorPatientResponseDto] })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  getMyPatients(@Request() req: AuthRequest) {
    return this.doctorsService.getMyPatients(req.user.id);
  }
}
