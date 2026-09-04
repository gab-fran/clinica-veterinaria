import { createElement } from 'react';
import type { ListColumn } from '../components/DynamicList/DynamicList';
import type { ProdutoResumoDTO } from '../types/produto';
import { z } from 'zod';
import { TipoProduto } from '../enums/tipoProduto';
import { UnidadeMedida } from '../enums/unidadeMedida';

const tipoProdutoEntries = [
  [TipoProduto.RACAO, 'Ração'],
  [TipoProduto.MEDICAMENTO, 'Medicamento'],
  [TipoProduto.VACINA, 'Vacina'],
  [TipoProduto.INSUMO, 'Insumo'],
] as const;

const unidadeMedidaEntries = [
  [UnidadeMedida.KG, 'Quilograma (kg)'],
  [UnidadeMedida.MG, 'Miligrama (mg)'],
  [UnidadeMedida.ML, 'Mililitro (ml)'],
  [UnidadeMedida.UNIDADE, 'Unidade'],
] as const;

export const tipoProdutoOptions = tipoProdutoEntries.map(([value, label]) => ({ value, label }));

const unidadesPorTipo: Record<string, readonly string[]> = {
  [TipoProduto.RACAO]: [UnidadeMedida.KG, UnidadeMedida.UNIDADE],
  [TipoProduto.MEDICAMENTO]: [UnidadeMedida.MG, UnidadeMedida.ML, UnidadeMedida.UNIDADE],
  [TipoProduto.VACINA]: [UnidadeMedida.ML, UnidadeMedida.UNIDADE],
  [TipoProduto.INSUMO]: [UnidadeMedida.UNIDADE],
};

export function getUnidadeMedidaOptions(tipo: string) {
  const unidadesPermitidas = unidadesPorTipo[tipo] ?? [];

  return unidadeMedidaEntries
    .filter(([value]) => unidadesPermitidas.includes(value))
    .map(([value, label]) => ({ value, label }));
}

export const produtoListColumns: ListColumn<ProdutoResumoDTO>[] = [
  { key: 'nome', header: 'Nome' },
  { key: 'marca', header: 'Marca' },
  { key: 'tipo', header: 'Tipo' },
  {
    key: 'quantidadeEstoque',
    header: 'Estoque',
    render: (produto) => produto.quantidadeEstoque < produto.estoqueMinimo
      ? createElement(
        'span',
        { style: { color: 'var(--color-danger)', fontWeight: 700 } },
        `${produto.quantidadeEstoque} un. - Estoque baixo`,
      )
      : `${produto.quantidadeEstoque} un.`,
  },
];

export const produtoUpdateSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  marca: z.string().min(1, 'A marca é obrigatória.'),
  tipo: z.string().min(1, 'O tipo é obrigatório.')
    .refine((value) => Object.values(TipoProduto).includes(value as typeof TipoProduto[keyof typeof TipoProduto]), 'O tipo selecionado é inválido.'),
  quantidadeEstoque: z.coerce.number().int().min(0, 'O estoque não pode ser negativo.'),
  estoqueMinimo: z.coerce.number().int().min(0, 'O estoque mínimo não pode ser negativo.'),
  validade: z.string().min(1, 'A validade é obrigatória.'),
  pesoKg: z.coerce.number().positive('O peso deve ser maior que zero.').optional(),
  dosagem: z.coerce.number().positive('A dosagem deve ser maior que zero.').optional(),
  unidadeMedida: z.string().min(1, 'A unidade de medida é obrigatória.')
    .refine((value) => Object.values(UnidadeMedida).includes(value as typeof UnidadeMedida[keyof typeof UnidadeMedida]), 'A unidade selecionada é inválida.'),
}).superRefine((produto, context) => {
  const unidadesPermitidas = unidadesPorTipo[produto.tipo] ?? [];

  if (!unidadesPermitidas.includes(produto.unidadeMedida)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['unidadeMedida'],
      message: 'A unidade de medida não é válida para o tipo selecionado.',
    });
  }

  if (produto.tipo === TipoProduto.RACAO && produto.pesoKg === undefined) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['pesoKg'], message: 'O peso é obrigatório para ração.' });
  }

  if ((produto.tipo === TipoProduto.MEDICAMENTO || produto.tipo === TipoProduto.VACINA) && produto.dosagem === undefined) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['dosagem'], message: 'A dosagem é obrigatória para este tipo.' });
  }
});

export const produtoCreateSchema = produtoUpdateSchema;

export type ProdutoUpdateFormData = z.infer<typeof produtoUpdateSchema>;
export type ProdutoCreateFormData = z.infer<typeof produtoCreateSchema>;