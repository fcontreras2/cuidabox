import { IsIn, IsISO8601, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

// Tipos que vienen de la tabla events (no vaccines ni vitals)
const EVENT_ONLY_TYPES = [
  'medication_given',
  'symptom',
  'visit',
  'exam',
  'note',
] as const;

// Todos los tipos del timeline incluyendo fuentes externas
const ALL_TYPES = [...EVENT_ONLY_TYPES, 'vaccine', 'vital'] as const;

export type TimelineEventType = (typeof ALL_TYPES)[number];

export class EventsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: ALL_TYPES,
    description:
      'Filtrar por tipo de evento. Cuando se especifica un tipo que solo existe en la tabla events (medication_given, symptom, visit, exam, note), se omiten las consultas a vaccines y vitals.',
  })
  @IsOptional()
  @IsString()
  @IsIn(ALL_TYPES)
  type?: TimelineEventType;

  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Solo eventos ocurridos desde esta fecha (ISO 8601, inclusive)',
  })
  @IsOptional()
  @IsISO8601()
  from?: string;

  @ApiPropertyOptional({
    example: '2026-03-31',
    description: 'Solo eventos ocurridos hasta esta fecha (ISO 8601, inclusive)',
  })
  @IsOptional()
  @IsISO8601()
  to?: string;
}
