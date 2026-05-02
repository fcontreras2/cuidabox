import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Max,
} from 'class-validator';

export class CreateVitalDto {
  @ApiPropertyOptional({ example: 14.5, description: 'Peso en kg' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  weight_kg?: number;

  @ApiPropertyOptional({ example: 92.0, description: 'Talla en cm' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  height_cm?: number;

  @ApiPropertyOptional({ example: 37.2, description: 'Temperatura en °C' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @IsPositive()
  @Max(45)
  temperature_c?: number;

  @ApiPropertyOptional({
    example: 98,
    description: 'Frecuencia cardíaca (bpm)',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(300)
  heart_rate?: number;

  @ApiPropertyOptional({ example: 'Tomado en consulta con Dr. García' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @ApiPropertyOptional({
    example: '2026-05-01T10:00:00Z',
    description: 'Fecha de registro (por defecto: ahora)',
  })
  @IsOptional()
  @IsDateString()
  recorded_at?: string;
}
