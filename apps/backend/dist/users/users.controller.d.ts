import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
interface AuthRequest {
    user: {
        id: string;
        email: string;
        role: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(req: AuthRequest): Promise<UserResponseDto>;
    updateMe(dto: UpdateUserDto, req: AuthRequest): Promise<import("./users.service").PublicUser>;
}
export {};
