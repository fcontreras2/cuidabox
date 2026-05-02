import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAllergyDto {
  @ApiProperty({ example: 'Penicilina' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ enum: ['drug', 'food', 'environmental', 'other'] })
  @IsOptional()
  @IsEnum(['drug', 'food', 'environmental', 'other'])
  type?: string;

  @ApiPropertyOptional({ enum: ['mild', 'moderate', 'severe'] })
  @IsOptional()
  @IsEnum(['mild', 'moderate', 'severe'])
  severity?: string;

  @ApiPropertyOptional({ example: 'Produce urticaria generalizada' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
