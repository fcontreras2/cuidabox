import {
  Controller,
  Get,
  Post,
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
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { VaccineResponseDto } from './dto/vaccine-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('vaccines')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar vacuna del paciente' })
  @ApiResponse({ status: 201, type: VaccineResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateVaccineDto,
    @Request() req: AuthRequest,
  ) {
    return this.vaccinesService.create(patientId, dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar vacunas del paciente ordenadas por fecha' })
  @ApiResponse({ status: 200, type: [VaccineResponseDto] })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.vaccinesService.findAll(patientId, req.user.id);
  }

  @Delete(':vaccineId')
  @ApiOperation({ summary: 'Eliminar vacuna del paciente' })
  @ApiResponse({ status: 200, description: 'Vacuna eliminada' })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Vacuna no encontrada' })
  remove(
    @Param('patientId') patientId: string,
    @Param('vaccineId') vaccineId: string,
    @Request() req: AuthRequest,
  ) {
    return this.vaccinesService.remove(patientId, vaccineId, req.user.id);
  }
}
