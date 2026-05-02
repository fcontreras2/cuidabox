import { ofetch } from 'ofetch';

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

export const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3003',
  onRequest({ options }) {
    const token = getToken();
    if (token) {
      options.headers = new Headers(options.headers);
      options.headers.set('Authorization', `Bearer ${token}`);
    }
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        document.cookie = 'access_token=; path=/; max-age=0';
        window.location.href = '/sign-in';
      }
    }
  },
});
