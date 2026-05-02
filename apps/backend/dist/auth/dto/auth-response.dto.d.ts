declare class UserDto {
    id: string;
    email: string;
    role: string;
}
export declare class AuthResponseDto {
    access_token: string;
    user: UserDto;
}
export declare class MeResponseDto {
    id: string;
    email: string;
    role: string;
}
export {};
