import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VaccineResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-456' })
  patient_id: string;

  @ApiProperty({ example: 'Hepatitis B' })
  name: string;

  @ApiPropertyOptional({ example: 1 })
  dose_number: number | null;

  @ApiPropertyOptional({ example: '2024-06-15T10:00:00Z' })
  administered_at: string | null;

  @ApiPropertyOptional({ example: 'Dr. García / Centro de Salud Norte' })
  administered_by: string | null;

  @ApiPropertyOptional({ example: 'Sin reacciones adversas' })
  notes: string | null;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;
}
