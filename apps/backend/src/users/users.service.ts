import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: Role;
  specialty_key: string | null;
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

  async updateMe(id: string, dto: UpdateUserDto): Promise<PublicUser> {
    const fields: Partial<UpdateUserDto> = {};
    if (dto.name !== undefined) fields.name = dto.name;
    if (dto.specialty_key !== undefined)
      fields.specialty_key = dto.specialty_key;

    const { data, error } = (await this.supabase
      .from('users')
      .update(fields)
      .eq('id', id)
      .select('id, name, email, role, specialty_key')
      .single()) as {
      data: PublicUser | null;
      error: { message: string } | null;
    };

    if (error || !data) throw new NotFoundException('Usuario no encontrado');
    return data;
  }

  toPublic(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      specialty_key: user.specialty_key,
    };
  }

  private mapRow(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      specialty_key: row.specialty_key ?? null,
    };
  }
}
