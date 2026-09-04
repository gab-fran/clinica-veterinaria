import type { LoginRequest, LoginResponse } from '../types/auth';
import type { UsuarioCreateDTO, UsuarioResponseDTO } from '../types/usuario';
import { endpoints } from '../utils/endpoints';
import { apiRequest } from './apiClient';
import { clearAccessToken, getAccessToken, setAccessToken, setUserData } from './apiConfig';

export const authService = {
  async login(dados: LoginRequest): Promise<LoginResponse> {
    const resposta = await apiRequest<LoginResponse>(endpoints.auth.login, {
      method: 'POST', body: dados, authenticated: false,
    });
    setAccessToken(resposta.token);

    if (resposta != null) {
      const usuario = await apiRequest<UsuarioResponseDTO>(endpoints.usuarios.byEmail(dados.email), {
        method: 'GET',
        authenticated: true,
      });
      setUserData(usuario);
    }

    return resposta;
  },

  registrar: (dados: UsuarioCreateDTO) =>
    apiRequest<UsuarioResponseDTO>(endpoints.auth.register, {
      method: 'POST', body: dados, authenticated: false,
    }),

  logout: clearAccessToken,

  checkTokenExpiry() {
    const token = getAccessToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now() / 1000);

      if (expiry < now) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }
};
