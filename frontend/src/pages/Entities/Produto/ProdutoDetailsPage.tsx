import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { produtoService } from '../../../services/produtoService';
import type { ProdutoResponseDTO } from '../../../types/produto';
import { produtoUpdateSchema, type ProdutoUpdateFormData } from '../../../schemas/produtoSchema';

type ProdutoDetailsPageProps = {
    edit?: boolean;
};

const updateFields: FieldConfig<ProdutoUpdateFormData>[] = [
    { name: 'nome', label: 'Nome', required: true },
    { name: 'marca', label: 'Marca', required: true },
    { name: 'tipo', label: 'Tipo', required: true },
    { name: 'quantidadeEstoque', label: 'Quantidade em estoque', type: 'number', required: true, min: 0 },
    { name: 'estoqueMinimo', label: 'Estoque mínimo', type: 'number', required: true, min: 0 },
    { name: 'validade', label: 'Validade', type: 'date', required: true },
    { name: 'pesoKg', label: 'Peso (kg)', type: 'number', required: true, min: 0, step: 0.01 },
    { name: 'dosagem', label: 'Dosagem', type: 'number', required: true, min: 0, step: 0.01 },
    { name: 'unidadeMedida', label: 'Unidade de medida', required: true },
];

export function ProdutoDetailsPage({ edit = false }: ProdutoDetailsPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState<ProdutoResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
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
        <div>
            <NavBar />
            <main>
                <Link to="/produtos">Voltar para produtos</Link>
                <h1>{edit ? 'Atualizar produto' : 'Detalhes do produto'}</h1>
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
                        <dl>
                            <dt>Nome</dt><dd>{produto.nome}</dd>
                            <dt>Marca</dt><dd>{produto.marca}</dd>
                            <dt>Tipo</dt><dd>{produto.tipo}</dd>
                            <dt>Estoque</dt><dd>{produto.quantidadeEstoque} un.</dd>
                            <dt>Estoque mínimo</dt><dd>{produto.estoqueMinimo} un.</dd>
                            <dt>Validade</dt><dd>{new Date(produto.validade).toLocaleDateString('pt-BR')}</dd>
                            <dt>Peso</dt><dd>{produto.pesoKg} kg</dd>
                            <dt>Dosagem</dt><dd>{produto.dosagem} {produto.unidadeMedida}</dd>
                        </dl>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}
