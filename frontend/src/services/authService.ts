import type { LoginRequest, LoginResponse } from '../types/auth';
import type { UsuarioCreateDTO, UsuarioResponseDTO } from '../types/usuario';
import { endpoints } from '../utils/endpoints';
import { apiRequest } from './apiClient';
import { clearAccessToken, setAccessToken } from './apiConfig';

export const authService = {
  async login(dados: LoginRequest): Promise<LoginResponse> {
    const resposta = await apiRequest<LoginResponse>(endpoints.auth.login, {
      method: 'POST', body: dados, authenticated: false,
    });
    setAccessToken(resposta.token);
    return resposta;
  },

  registrar: (dados: UsuarioCreateDTO) =>
    apiRequest<UsuarioResponseDTO>(endpoints.auth.register, {
      method: 'POST', body: dados, authenticated: false,
    }),

  logout: clearAccessToken,
};
