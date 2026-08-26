import type { Page, PageRequest } from '../types/api';
import type { MovimentacaoCreateDTO, MovimentacaoResponseDTO, MovimentacaoResumoDTO, MovimentacaoUpdateDTO } from '../types/movimentacao';
import { endpoints } from '../utils/endpoints';
import { apiRequest } from './apiClient';

export const movimentacaoService = {
  listar: (pageable: PageRequest = {}) =>
    apiRequest<Page<MovimentacaoResumoDTO>>(endpoints.movimentacoes.base, { query: pageable }),

  buscarPorId: (id: number) =>
    apiRequest<MovimentacaoResponseDTO>(endpoints.movimentacoes.byId(id)),

  criar: (dados: MovimentacaoCreateDTO) =>
    apiRequest<MovimentacaoResponseDTO>(endpoints.movimentacoes.base, { method: 'POST', body: dados }),

  atualizar: (id: number, dados: MovimentacaoUpdateDTO) =>
    apiRequest<MovimentacaoResponseDTO>(endpoints.movimentacoes.byId(id), { method: 'PUT', body: dados }),

  remover: (id: number) =>
    apiRequest<void>(endpoints.movimentacoes.byId(id), { method: 'DELETE' }),
};
