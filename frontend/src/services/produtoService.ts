import type { Page, PageRequest } from '../types/api';
import type { ProdutoCreateDTO, ProdutoResponseDTO, ProdutoResumoDTO, ProdutoUpdateDTO } from '../types/produto';
import { endpoints } from '../utils/endpoints';
import { apiRequest } from './apiClient';

export const produtoService = {
  listar: (pageable: PageRequest = {}) =>
    apiRequest<Page<ProdutoResumoDTO>>(endpoints.produtos.base, { query: pageable }),

  buscarPorId: (id: number) =>
    apiRequest<ProdutoResponseDTO>(endpoints.produtos.byId(id)),

  criar: (dados: ProdutoCreateDTO) =>
    apiRequest<ProdutoResponseDTO>(endpoints.produtos.base, { method: 'POST', body: dados }),

  atualizar: (id: number, dados: ProdutoUpdateDTO) =>
    apiRequest<ProdutoResponseDTO>(endpoints.produtos.byId(id), { method: 'PUT', body: dados }),

  remover: (id: number) =>
    apiRequest<void>(endpoints.produtos.byId(id), { method: 'DELETE' }),
};
