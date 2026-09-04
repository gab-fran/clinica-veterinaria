import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { USER_ID } from '../../../services/apiConfig';
import { movimentacaoService } from '../../../services/movimentacaoService';
import { produtoService } from '../../../services/produtoService';
import { movimentacaoCreateSchema, type MovimentacaoCreateFormData } from '../../../schemas/movimentacaoSchema';
import styles from '../Create.module.css';
import { TipoMovimentacao } from '../../../enums/tipoMovimentacao';

export function MovimentacaoCreatePage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [produtoOptions, setProdutoOptions] = useState<readonly { label: string; value: string }[]>([]);
    const [optionsLoading, setOptionsLoading] = useState(true);
    const usuarioId = Number(localStorage.getItem(USER_ID)) || 0;

    useEffect(() => {
        let active = true;

        produtoService.listar({ size: 1000, sort: 'nome,asc' })
            .then((produtos) => {
                if (!active) return;

                setProdutoOptions(produtos.content.map((produto) => ({
                    label: `${produto.nome} `,
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
    }, []);

    const createFields: FieldConfig<MovimentacaoCreateFormData>[] = [
        {
            name: 'idProduto',
            label: 'Produto',
            required: true,
            disabled: optionsLoading,
            options: produtoOptions,
            searchable: true,
            placeholder: optionsLoading ? 'Carregando produtos...' : 'Selecione um produto',
        },
        {
            name: 'idUsuario',
            label: 'Usuário',
            type: 'number',
            hidden: true,
        },
        { name: 'tipoMovimentacao', label: 'Tipo de movimentação', required: true, options: Object.values(TipoMovimentacao).map((tipoMovimentacao) => ({ label: tipoMovimentacao, value: tipoMovimentacao })), },
        { name: 'quantidade', label: 'Quantidade', type: 'number', required: true, min: 1 },
    ];

    const handleCreate = async (data: MovimentacaoCreateFormData) => {
        try {
            const movimentacao = await movimentacaoService.criar(data);
            navigate(`/movimentacoes/${movimentacao.idMovimentacaoEstoque}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível criar a movimentação.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.pageMain}>
                <div className={styles.headerSection}>
                    <Link to="/movimentacoes" className={styles.backLink}>← Voltar para movimentações</Link>
                    <h1 className={styles.headerTitle}>Nova movimentação</h1>
                </div>
                {error && <p role="alert">{error}</p>}
                <DynamicForm
                    schema={movimentacaoCreateSchema}
                    fields={createFields}
                    defaultValues={{ idUsuario: usuarioId }}
                    onSubmit={handleCreate}
                    submitText="Criar movimentação"
                />
            </main>
            <Footer />
        </div>
    );
}

