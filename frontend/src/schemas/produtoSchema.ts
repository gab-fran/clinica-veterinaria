import type { ListColumn } from '../components/DynamicList/DynamicList';
import type { ProdutoResumoDTO } from '../types/produto';
import { z } from 'zod';

export const produtoListColumns: ListColumn<ProdutoResumoDTO>[] = [
  { key: 'nome', header: 'Nome' },
  { key: 'marca', header: 'Marca' },
  { key: 'tipo', header: 'Tipo' },
  {
    key: 'quantidadeEstoque',
    header: 'Estoque',
    render: (produto) => `${produto.quantidadeEstoque} un.`,
  },
];

export const produtoUpdateSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  marca: z.string().min(1, 'A marca é obrigatória.'),
  tipo: z.string().min(1, 'O tipo é obrigatório.'),
  quantidadeEstoque: z.coerce.number().int().min(0, 'O estoque não pode ser negativo.'),
  estoqueMinimo: z.coerce.number().int().min(0, 'O estoque mínimo não pode ser negativo.'),
  validade: z.string().min(1, 'A validade é obrigatória.'),
  pesoKg: z.coerce.number().positive('O peso deve ser maior que zero.'),
  dosagem: z.coerce.number().positive('A dosagem deve ser maior que zero.'),
  unidadeMedida: z.string().min(1, 'A unidade de medida é obrigatória.'),
});

export const produtoCreateSchema = produtoUpdateSchema;

export type ProdutoUpdateFormData = z.infer<typeof produtoUpdateSchema>;
export type ProdutoCreateFormData = z.infer<typeof produtoCreateSchema>;