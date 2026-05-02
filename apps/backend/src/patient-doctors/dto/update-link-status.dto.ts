import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateLinkStatusDto {
  @ApiProperty({
    enum: ['active', 'rejected'],
    description: 'El doctor acepta o rechaza el enlace',
  })
  @IsEnum(['active', 'rejected'])
  status: 'active' | 'rejected';
}
