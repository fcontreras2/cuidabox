import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({ example: 'Receta amoxicilina.pdf' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'https://storage.supabase.co/...',
    description: 'URL del archivo subido a Supabase Storage',
  })
  @IsString()
  @IsNotEmpty()
  file_url: string;

  @ApiProperty({ enum: ['lab', 'imaging', 'prescription', 'other'] })
  @IsEnum(['lab', 'imaging', 'prescription', 'other'])
  type: string;

  @ApiPropertyOptional({
    example: 'uuid-treatment',
    description: 'ID del tratamiento al que pertenece (opcional)',
  })
  @IsOptional()
  @IsUUID()
  treatment_id?: string;

  @ApiPropertyOptional({
    example: 'uuid-appointment',
    description: 'ID de la cita a la que pertenece (opcional)',
  })
  @IsOptional()
  @IsUUID()
  appointment_id?: string;

  @ApiPropertyOptional({
    example: 'uuid-exam',
    description: 'ID del examen al que pertenece (opcional)',
  })
  @IsOptional()
  @IsUUID()
  exam_id?: string;
}
