import { IsIn, IsISO8601, IsObject, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const EVENT_TYPES = [
  'medication_given',
  'symptom',
  'visit',
  'exam',
  'note',
] as const;

export class CreateEventDto {
  @ApiProperty({ enum: EVENT_TYPES })
  @IsIn(EVENT_TYPES)
  type: (typeof EVENT_TYPES)[number];

  @ApiProperty({ example: '2025-01-15T09:00:00.000Z' })
  @IsISO8601()
  occurred_at: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payload?: Record<string, unknown>;
}
