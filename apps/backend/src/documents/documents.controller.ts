import {
  Controller,
  Get,
  Post,
  Delete,
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
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentResponseDto } from './dto/document-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('documents')
@UseGuards(JwtGuard)
@Controller('patients/:patientId/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Subir documento al historial del paciente',
    description:
      'Registra la URL de un archivo ya subido a Supabase Storage. Puede estar ligado a un tratamiento, cita o examen.',
  })
  @ApiResponse({ status: 201, type: DocumentResponseDto })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  create(
    @Param('patientId') patientId: string,
    @Body() dto: CreateDocumentDto,
    @Request() req: AuthRequest,
  ) {
    return this.documentsService.create(patientId, dto, req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar documentos del paciente',
    description:
      'Retorna todos los documentos. Filtra opcionalmente por treatment_id, appointment_id o exam_id.',
  })
  @ApiQuery({ name: 'treatment_id', required: false })
  @ApiQuery({ name: 'appointment_id', required: false })
  @ApiQuery({ name: 'exam_id', required: false })
  @ApiResponse({ status: 200, type: [DocumentResponseDto] })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  findAll(
    @Param('patientId') patientId: string,
    @Request() req: AuthRequest,
    @Query('treatment_id') treatment_id?: string,
    @Query('appointment_id') appointment_id?: string,
    @Query('exam_id') exam_id?: string,
  ) {
    return this.documentsService.findAll(patientId, req.user.id, {
      treatment_id,
      appointment_id,
      exam_id,
    });
  }

  @Post(':documentId/signed-url')
  @ApiOperation({
    summary: 'Obtener URL firmada para descargar/previsualizar un documento',
    description:
      'Genera una URL temporal de Supabase Storage (expira en 1 hora). El file_url debe tener formato "bucket/path/file.pdf".',
  })
  @ApiResponse({
    status: 201,
    schema: {
      properties: {
        signed_url: { type: 'string', example: 'https://...' },
        expires_in: { type: 'number', example: 3600 },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Documento no encontrado' })
  getSignedUrl(
    @Param('patientId') patientId: string,
    @Param('documentId') documentId: string,
    @Request() req: AuthRequest,
  ) {
    return this.documentsService.getSignedUrl(
      patientId,
      documentId,
      req.user.id,
    );
  }

  @Delete(':documentId')
  @ApiOperation({ summary: 'Eliminar documento del paciente' })
  @ApiResponse({ status: 200, description: 'Documento eliminado' })
  @ApiResponse({ status: 403, description: 'Sin acceso a este paciente' })
  @ApiResponse({ status: 404, description: 'Documento no encontrado' })
  remove(
    @Param('patientId') patientId: string,
    @Param('documentId') documentId: string,
    @Request() req: AuthRequest,
  ) {
    return this.documentsService.remove(patientId, documentId, req.user.id);
  }
}
