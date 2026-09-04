import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { produtoService } from '../../../services/produtoService';
import type { ProdutoResponseDTO } from '../../../types/produto';
import {
    getUnidadeMedidaOptions,
    produtoUpdateSchema,
    tipoProdutoOptions,
    type ProdutoUpdateFormData,
} from '../../../schemas/produtoSchema';
import { TipoProduto } from '../../../enums/tipoProduto';
import styles from '../Details.module.css';

type ProdutoDetailsPageProps = {
    edit?: boolean;
};

export function ProdutoDetailsPage({ edit = false }: ProdutoDetailsPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState<ProdutoResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tipo, setTipo] = useState('');
    const produtoId = Number(id);
    const invalidId = !Number.isInteger(produtoId) || produtoId <= 0;

    useEffect(() => {
        if (invalidId) return;

        produtoService.buscarPorId(produtoId)
            .then(setProduto)
            .catch((requestError: unknown) => {
                setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar o produto.');
            })
            .finally(() => setLoading(false));
    }, [invalidId, produtoId]);

    useEffect(() => {
        if (produto) setTipo(produto.tipo);
    }, [produto]);

    const updateFields: FieldConfig<ProdutoUpdateFormData>[] = [
        { name: 'nome', label: 'Nome', required: true },
        { name: 'marca', label: 'Marca', required: true },
        { name: 'tipo', label: 'Tipo', required: true, options: tipoProdutoOptions, onChange: (event) => setTipo(event.target.value) },
        { name: 'quantidadeEstoque', label: 'Quantidade em estoque', type: 'number', required: false, min: 0, readOnly: true, disabled: true },
        { name: 'estoqueMinimo', label: 'Estoque mínimo', type: 'number', required: true, min: 0 },
        { name: 'validade', label: 'Validade', type: 'date', required: true },
        { name: 'pesoKg', label: 'Peso (kg)', type: 'number', required: true, hidden: tipo !== TipoProduto.RACAO, min: 0, step: 0.01 },
        { name: 'dosagem', label: 'Dosagem', type: 'number', required: true, hidden: tipo !== TipoProduto.MEDICAMENTO && tipo !== TipoProduto.VACINA, min: 0, step: 0.01 },
        { name: 'unidadeMedida', label: 'Unidade de medida', required: true, options: getUnidadeMedidaOptions(tipo) },
    ];

    const handleUpdate = async (data: ProdutoUpdateFormData) => {
        if (!produto) return;

        try {
            const updated = await produtoService.atualizar(produto.idProduto, data);
            setProduto(updated);
            navigate(`/produtos/${produto.idProduto}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível atualizar o produto.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.pageMain}>
                <div>
                    <Link to="/produtos" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>
                        ← Voltar para produtos
                    </Link>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text)', marginTop: '0.5rem' }}>
                        {edit ? 'Atualizar produto' : 'Detalhes do produto'}
                    </h1>
                </div>

                {invalidId && <p role="alert">Identificador de produto inválido.</p>}
                {!invalidId && loading && <p>Carregando...</p>}
                {error && <p role="alert">{error}</p>}
                {!invalidId && !loading && !error && produto && (
                    edit ? (
                        <DynamicForm
                            schema={produtoUpdateSchema}
                            fields={updateFields}
                            defaultValues={produto}
                            onSubmit={handleUpdate}
                            submitText="Atualizar"
                        />
                    ) : (
                        <div className={styles.cardContainer}>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Nome</span>
                                <span className={styles.infoValue}>{produto.nome}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Marca</span>
                                <span className={styles.infoValue}>{produto.marca}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Tipo</span>
                                <span className={styles.infoValue}>{produto.tipo}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Estoque</span>
                                <span className={styles.infoValue}>{produto.quantidadeEstoque} un.</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Estoque mínimo</span>
                                <span className={styles.infoValue}>{produto.estoqueMinimo} un.</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Validade</span>
                                <span className={styles.infoValue}>{new Date(produto.validade).toLocaleDateString('pt-BR')}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Peso</span>
                                <span className={styles.infoValue}>{produto.pesoKg} kg</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Dosagem</span>
                                <span className={styles.infoValue}>{produto.dosagem} {produto.unidadeMedida}</span>
                            </div>
                        </div>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}

