import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'juan@example.com' })
  email: string;

  @ApiProperty({ enum: ['holder', 'doctor', 'admin'] })
  role: string;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9...' })
  access_token: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class MeResponseDto {
  @ApiProperty({ example: 'uuid-123' })
  id: string;

  @ApiProperty({ example: 'juan@example.com' })
  email: string;

  @ApiProperty({ enum: ['holder', 'doctor', 'admin'] })
  role: string;
}
