import { apiClient } from '../client';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'caregiver';
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}

const COOKIE_NAME = 'access_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

function saveToken(token: string) {
  localStorage.setItem(COOKIE_NAME, token);
  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict`;
}

function clearToken() {
  localStorage.removeItem(COOKIE_NAME);
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
}

export const authClient = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await apiClient<AuthResponse>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    saveToken(res.access_token);
    return res;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await apiClient<AuthResponse>('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    saveToken(res.access_token);
    return res;
  },

  async me(): Promise<AuthUser> {
    return apiClient<AuthUser>('/auth/me');
  },

  logout() {
    clearToken();
    window.location.href = '/sign-in';
  },

  getToken() {
    return typeof window !== 'undefined' ? localStorage.getItem(COOKIE_NAME) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
