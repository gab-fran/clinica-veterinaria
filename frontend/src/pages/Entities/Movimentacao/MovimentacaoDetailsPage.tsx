import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { movimentacaoService } from '../../../services/movimentacaoService';
import { produtoService } from '../../../services/produtoService';
import type { MovimentacaoResponseDTO, MovimentacaoUpdateDTO } from '../../../types/movimentacao';
import { movimentacaoUpdateSchema, type MovimentacaoUpdateFormData } from '../../../schemas/movimentacaoSchema';
import styles from '../Details.module.css';
import { TipoMovimentacao } from '../../../enums/tipoMovimentacao';

type MovimentacaoDetailsPageProps = {
    edit?: boolean;
};

export function MovimentacaoDetailsPage({ edit = false }: MovimentacaoDetailsPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movimentacao, setMovimentacao] = useState<MovimentacaoResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [produtoOptions, setProdutoOptions] = useState<readonly { label: string; value: string }[]>([]);
    const [optionsLoading, setOptionsLoading] = useState(edit);
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

    useEffect(() => {
        if (!edit || invalidId) return;

        let active = true;

        produtoService.listar({ size: 1000, sort: 'nome,asc' })
            .then((produtos) => {
                if (!active) return;

                setProdutoOptions(produtos.content.map((produto) => ({
                    label: produto.nome,
                    value: String(produto.idProduto),
                })));
            })
            .catch((requestError: unknown) => {
                if (active) {
                    setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar os produtos.');
                }
            })
            .finally(() => {
                if (active) setOptionsLoading(false);
            });

        return () => {
            active = false;
        };
    }, [edit, invalidId]);

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

    const updateFields: FieldConfig<MovimentacaoUpdateFormData>[] = [
        {
            name: 'idProduto',
            label: 'Produto',
            required: true,
            disabled: optionsLoading,
            options: produtoOptions,
            searchable: true,
            placeholder: optionsLoading ? 'Carregando produtos...' : 'Selecione um produto',
        },
        { name: 'idUsuario', label: 'Usuário', hidden: true },
        {
            name: 'tipoMovimentacao',
            label: 'Tipo de movimentação',
            required: true,
            options: Object.values(TipoMovimentacao).map((tipoMovimentacao) => ({ label: tipoMovimentacao, value: tipoMovimentacao })),
        },
        { name: 'quantidade', label: 'Quantidade', type: 'number', required: true, min: 1 },
    ];

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.pageMain}>
                <div>
                    <Link to="/movimentacoes" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>
                        ← Voltar para movimentações
                    </Link>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text)', marginTop: '0.5rem' }}>
                        {edit ? 'Atualizar movimentação' : 'Detalhes da movimentação'}
                    </h1>
                </div>

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
                        <div className={styles.cardContainer}>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Produto</span>
                                <span className={styles.infoValue}>{movimentacao.nomeProduto}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Usuário</span>
                                <span className={styles.infoValue}>{movimentacao.nomeUsuario}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Tipo</span>
                                <span className={styles.infoValue}>{movimentacao.tipoMovimentacao}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Quantidade</span>
                                <span className={styles.infoValue}>{movimentacao.quantidade} un.</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Data de Criação</span>
                                <span className={styles.infoValue}>{new Date(movimentacao.dataCriacaoMovimentacao).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Última Atualização</span>
                                <span className={styles.infoValue}>{new Date(movimentacao.dataAtualizacaoMovimentacao).toLocaleString('pt-BR')}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Status</span>
                                <span className={styles.infoValue}>{movimentacao.statusMovimentacao ? 'Ativa' : 'Inativa'}</span>
                            </div>
                        </div>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}

