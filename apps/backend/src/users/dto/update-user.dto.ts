import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Dr. García' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    example: 'pediatrics',
    description: 'Key de especialidad médica, traducida en el frontend',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  specialty_key?: string;
}
