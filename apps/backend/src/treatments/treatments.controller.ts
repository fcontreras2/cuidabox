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
import { TreatmentsService } from './treatments.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentStatusDto } from './dto/update-treatment-status.dto';
import { TreatmentResponseDto } from './dto/treatment-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('treatments')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/treatments')
export class TreatmentsController {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear tratamiento con sus pasos y medicamentos',
    description:
      'Crea el tratamiento y sus pasos en una sola llamada. Los pasos de tipo "medication" deben incluir el campo "medication" con los detalles.',
  })
  @ApiResponse({ status: 201, type: TreatmentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateTreatmentDto,
    @Request() req: AuthRequest,
  ) {
    return this.treatmentsService.create(patientId, dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tratamientos del paciente con sus pasos' })
  @ApiResponse({ status: 200, type: [TreatmentResponseDto] })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(@Param('patientId') patientId: string, @Request() req: AuthRequest) {
    return this.treatmentsService.findAll(patientId, req.user.id);
  }

  @Get(':treatmentId')
  @ApiOperation({ summary: 'Obtener detalle de un tratamiento con sus pasos' })
  @ApiResponse({ status: 200, type: TreatmentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Tratamiento no encontrado' })
  findOne(
    @Param('patientId') patientId: string,
    @Param('treatmentId') treatmentId: string,
    @Request() req: AuthRequest,
  ) {
    return this.treatmentsService.findOne(patientId, treatmentId, req.user.id);
  }

  @Patch(':treatmentId/status')
  @ApiOperation({
    summary: 'Actualizar estado del tratamiento',
    description:
      'Permite marcar un tratamiento como active, completed o cancelled.',
  })
  @ApiResponse({ status: 200, type: TreatmentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Tratamiento no encontrado' })
  updateStatus(
    @Param('patientId') patientId: string,
    @Param('treatmentId') treatmentId: string,
    @Body() dto: UpdateTreatmentStatusDto,
    @Request() req: AuthRequest,
  ) {
    return this.treatmentsService.updateStatus(
      patientId,
      treatmentId,
      dto.status,
      req.user.id,
    );
  }
}
