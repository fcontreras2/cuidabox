import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TimelineEventResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({
    enum: [
      'vaccine',
      'vital',
      'medication_given',
      'symptom',
      'visit',
      'exam',
      'note',
    ],
    example: 'vaccine',
  })
  type: string;

  @ApiProperty({ example: '2026-05-01T10:00:00Z' })
  occurred_at: string;

  @ApiProperty({
    example: { name: 'Hepatitis B', dose_number: 1 },
    description: 'Datos del evento según su tipo',
  })
  payload: Record<string, unknown>;

  @ApiPropertyOptional({ example: 'uuid-456' })
  created_by: string | null;
}
