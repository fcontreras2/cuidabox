import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVaccineDto {
  @ApiProperty({ example: 'Hepatitis B' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número de dosis (1, 2, 3...)',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  dose_number?: number;

  @ApiPropertyOptional({
    example: '2024-06-15T10:00:00Z',
    description: 'Fecha de administración',
  })
  @IsOptional()
  @IsDateString()
  administered_at?: string;

  @ApiPropertyOptional({ example: 'Dr. García / Centro de Salud Norte' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  administered_by?: string;

  @ApiPropertyOptional({ example: 'Sin reacciones adversas' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
