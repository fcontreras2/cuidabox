import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AllergyResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'uuid-456' })
  patient_id: string;

  @ApiProperty({ example: 'Penicilina' })
  name: string;

  @ApiPropertyOptional({ enum: ['drug', 'food', 'environmental', 'other'] })
  type: string | null;

  @ApiPropertyOptional({ enum: ['mild', 'moderate', 'severe'] })
  severity: string | null;

  @ApiPropertyOptional({ example: 'Produce urticaria generalizada' })
  notes: string | null;

  @ApiProperty({ example: '2026-05-01T00:00:00Z' })
  created_at: string;
}
