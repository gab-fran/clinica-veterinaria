import type { UsuarioResponseDTO } from "../types/usuario";

const DEFAULT_API_URL = 'http://localhost:8080';

export const API_BASE_URL = (import.meta.env.VITE_API_URL ?? DEFAULT_API_URL).replace(/\/$/, '');

export const AUTH_TOKEN_KEY = 'saep.auth.token';

export const USER_NAME = 'saep.user.name';
export const USER_EMAIL = 'saep.user.email';
export const USER_ROLE = 'saep.user.role';

export function getAccessToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function setUserData(user: UsuarioResponseDTO): void {
  localStorage.setItem(USER_NAME, user.nome);
  localStorage.setItem(USER_EMAIL, user.email);
  localStorage.setItem(USER_ROLE, user.role);
}

export function getUserData(): UsuarioResponseDTO {
  return { 
    idUsuario: 0,
    nome: localStorage.getItem(USER_NAME) || '',
    email: localStorage.getItem(USER_EMAIL) || '',
    role: localStorage.getItem(USER_ROLE) || '',
    statusUsuario: true 
  };
}
