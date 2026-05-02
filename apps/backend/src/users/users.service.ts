import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export type Role = 'holder' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    const { data } = (await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()) as { data: UserRow | null };

    if (!data) return undefined;
    return this.mapRow(data);
  }

  async findById(id: string): Promise<User | undefined> {
    const { data } = (await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()) as { data: UserRow | null };

    if (!data) return undefined;
    return this.mapRow(data);
  }

  async create(
    name: string,
    email: string,
    password: string,
    role: Role = 'holder',
  ): Promise<User> {
    const password_hash = await bcrypt.hash(password, 10);
    const { data, error } = (await this.supabase
      .from('users')
      .insert({ name, email, password_hash, role })
      .select()
      .single()) as { data: UserRow | null; error: { message: string } | null };

    if (error) throw new Error(error.message);
    return this.mapRow(data!);
  }

  private mapRow(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
    };
  }
}
