import type { ListColumn } from "../components/DynamicList/DynamicList";
import type { MovimentacaoResumoDTO } from "../types/movimentacao";
import { z } from 'zod';

export const movimentacaoListColumns: ListColumn<MovimentacaoResumoDTO>[] = [
    { key: 'nomeProduto', header: 'Nome do Produto' },
    { key: 'tipoMovimentacao', header: 'Tipo' },
    { key: 'quantidade', header: 'Quantidade', render: (movimentacao) => `${movimentacao.quantidade} un.`, },
    { key: 'dataMovimentacao', header: 'Data', render: (movimentacao) => `${new Date(movimentacao.dataMovimentacao).toLocaleDateString('pt-BR')}` },
];

export const movimentacaoUpdateSchema = z.object({
    idProduto: z.coerce.number().int().positive('Informe um produto válido.'),
    idUsuario: z.coerce.number().int().positive('Informe um usuário válido.'),
    tipoMovimentacao: z.string().min(1, 'O tipo de movimentação é obrigatório.'),
    quantidade: z.coerce.number().int().positive('A quantidade deve ser maior que zero.'),
});

export const movimentacaoCreateSchema = movimentacaoUpdateSchema;

export type MovimentacaoUpdateFormData = z.infer<typeof movimentacaoUpdateSchema>;
export type MovimentacaoCreateFormData = z.infer<typeof movimentacaoCreateSchema>;