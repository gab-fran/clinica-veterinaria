import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { movimentacaoService } from '../../../services/movimentacaoService';
import type { MovimentacaoResponseDTO, MovimentacaoUpdateDTO } from '../../../types/movimentacao';
import { movimentacaoUpdateSchema, type MovimentacaoUpdateFormData } from '../../../schemas/movimentacaoSchema';

type MovimentacaoDetailsPageProps = {
    edit?: boolean;
};

const updateFields: FieldConfig<MovimentacaoUpdateFormData>[] = [
    { name: 'idProduto', label: 'ID do produto', type: 'number', required: true, min: 1 },
    { name: 'idUsuario', label: 'ID do usuário', type: 'number', required: true, min: 1 },
    { name: 'tipoMovimentacao', label: 'Tipo de movimentação', type: 'text', required: true },
    { name: 'quantidade', label: 'Quantidade', type: 'number', required: true, min: 1 },
];

export function MovimentacaoDetailsPage({ edit = false }: MovimentacaoDetailsPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movimentacao, setMovimentacao] = useState<MovimentacaoResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const movimentacaoId = Number(id);
    const invalidId = !Number.isInteger(movimentacaoId) || movimentacaoId <= 0;

    useEffect(() => {
        if (invalidId) return;

        movimentacaoService.buscarPorId(movimentacaoId)
            .then(setMovimentacao)
            .catch((requestError: unknown) => {
                setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar a movimentação.');
            })
            .finally(() => setLoading(false));
    }, [invalidId, movimentacaoId]);

    const handleUpdate = async (data: MovimentacaoUpdateFormData) => {
        if (!movimentacao) return;

        try {
            const updated = await movimentacaoService.atualizar(movimentacao.idMovimentacaoEstoque, data as MovimentacaoUpdateDTO);
            setMovimentacao(updated);
            navigate(`/movimentacoes/${movimentacao.idMovimentacaoEstoque}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível atualizar a movimentação.');
        }
    };

    return (
        <div>
            <NavBar />
            <main>
                <Link to="/movimentacoes">Voltar para movimentações</Link>
                <h1>{edit ? 'Atualizar movimentação' : 'Detalhes da movimentação'}</h1>

                {loading && <p>Carregando...</p>}
                {invalidId && <p role="alert">Identificador de movimentação inválido.</p>}
                {error && <p role="alert">{error}</p>}

                {!invalidId && !loading && !error && movimentacao && (
                    edit ? (
                        <DynamicForm
                            schema={movimentacaoUpdateSchema}
                            fields={updateFields}
                            defaultValues={{
                                idProduto: movimentacao.idProduto,
                                idUsuario: movimentacao.idUsuario,
                                tipoMovimentacao: movimentacao.tipoMovimentacao,
                                quantidade: movimentacao.quantidade,
                            }}
                            onSubmit={handleUpdate}
                            submitText="Atualizar"
                        />
                    ) : (
                        <dl>
                            <dt>Produto</dt>
                            <dd>{movimentacao.nomeProduto} (#{movimentacao.idProduto})</dd>
                            <dt>Usuário</dt>
                            <dd>{movimentacao.nomeUsuario} (#{movimentacao.idUsuario})</dd>
                            <dt>Tipo</dt>
                            <dd>{movimentacao.tipoMovimentacao}</dd>
                            <dt>Quantidade</dt>
                            <dd>{movimentacao.quantidade} un.</dd>
                            <dt>Data de criação</dt>
                            <dd>{new Date(movimentacao.dataCriacaoMovimentacao).toLocaleString('pt-BR')}</dd>
                            <dt>Última atualização</dt>
                            <dd>{new Date(movimentacao.dataAtualizacaoMovimentacao).toLocaleString('pt-BR')}</dd>
                            <dt>Status</dt>
                            <dd>{movimentacao.statusMovimentacao ? 'Ativa' : 'Inativa'}</dd>
                        </dl>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}
