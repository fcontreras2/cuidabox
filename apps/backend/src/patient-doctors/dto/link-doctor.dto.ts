import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LinkDoctorDto {
  @ApiProperty({
    example: 'doctor@example.com',
    description: 'Email del doctor registrado en Cuidabox',
  })
  @IsEmail()
  email: string;
}
