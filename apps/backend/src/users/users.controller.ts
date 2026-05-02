import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

interface AuthRequest {
  user: { id: string; email: string; role: string };
}

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({
    summary: 'Perfil del usuario autenticado',
    description: 'Retorna id, name, email, role y specialty_key.',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  async getMe(@Request() req: AuthRequest): Promise<UserResponseDto> {
    const user = await this.usersService.findById(req.user.id);
    return this.usersService.toPublic(user!);
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Actualizar perfil del usuario autenticado',
    description:
      'Permite cambiar name y/o specialty_key. Todos los campos son opcionales.',
  })
  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiResponse({ status: 401, description: 'No autenticado' })
  updateMe(@Body() dto: UpdateUserDto, @Request() req: AuthRequest) {
    return this.usersService.updateMe(req.user.id, dto);
  }
}
