import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'Dr. García' })
  name: string;

  @ApiProperty({ example: 'doctor@example.com' })
  email: string;

  @ApiProperty({ enum: ['holder', 'doctor', 'admin'] })
  role: string;

  @ApiPropertyOptional({
    example: 'pediatrics',
    nullable: true,
    description: 'Solo aplica para doctores',
  })
  specialty_key: string | null;
}
