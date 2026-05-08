import { SupabaseClient } from '@supabase/supabase-js';
export type Role = 'holder' | 'doctor' | 'admin';
export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
    specialty_key: string | null;
}
export interface PublicUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    specialty_key: string | null;
}
export interface UpdateUserDto {
    name?: string;
    specialty_key?: string;
}
export declare class UsersService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(name: string, email: string, password: string, role?: Role): Promise<User>;
    updateMe(id: string, dto: UpdateUserDto): Promise<PublicUser>;
    toPublic(user: User): PublicUser;
    private mapRow;
}
