import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VitalResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-456' })
  patient_id: string;

  @ApiProperty({ example: 'uuid-789' })
  recorded_by: string;

  @ApiPropertyOptional({ example: 14.5 })
  weight_kg: number | null;

  @ApiPropertyOptional({ example: 92.0 })
  height_cm: number | null;

  @ApiPropertyOptional({ example: 37.2 })
  temperature_c: number | null;

  @ApiPropertyOptional({ example: 98 })
  heart_rate: number | null;

  @ApiPropertyOptional({ example: 'Tomado en consulta con Dr. García' })
  notes: string | null;

  @ApiProperty({ example: '2026-05-01T10:00:00Z' })
  recorded_at: string;
}
