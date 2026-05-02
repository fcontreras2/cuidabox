import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DocumentResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-patient' })
  patient_id: string;

  @ApiProperty({ example: 'uuid-holder' })
  uploaded_by: string;

  @ApiPropertyOptional({ example: 'uuid-treatment' })
  treatment_id: string | null;

  @ApiPropertyOptional({ example: 'uuid-appointment' })
  appointment_id: string | null;

  @ApiPropertyOptional({ example: 'uuid-exam' })
  exam_id: string | null;

  @ApiProperty({ example: 'Receta amoxicilina.pdf' })
  name: string;

  @ApiProperty({ example: 'https://storage.supabase.co/...' })
  file_url: string;

  @ApiProperty({ enum: ['lab', 'imaging', 'prescription', 'other'] })
  type: string;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  uploaded_at: string;
}
