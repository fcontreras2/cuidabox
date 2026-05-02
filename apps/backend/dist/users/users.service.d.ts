import { SupabaseClient } from '@supabase/supabase-js';
export type Role = 'holder' | 'doctor' | 'admin';
export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: Role;
}
export declare class UsersService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create(name: string, email: string, password: string, role?: Role): Promise<User>;
    private mapRow;
}
