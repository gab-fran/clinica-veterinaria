import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { produtoService } from '../../../services/produtoService';
import { produtoCreateSchema, type ProdutoCreateFormData } from '../../../schemas/produtoSchema';

const createFields: FieldConfig<ProdutoCreateFormData>[] = [
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

export function ProdutoCreatePage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleCreate = async (data: ProdutoCreateFormData) => {
        try {
            const produto = await produtoService.criar(data);
            navigate(`/produtos/${produto.idProduto}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível criar o produto.');
        }
    };

    return (
        <div>
            <NavBar />
            <main>
                <Link to="/produtos">Voltar para produtos</Link>
                <h1>Novo produto</h1>
                {error && <p role="alert">{error}</p>}
                <DynamicForm
                    schema={produtoCreateSchema}
                    fields={createFields}
                    onSubmit={handleCreate}
                    submitText="Criar produto"
                />
            </main>
            <Footer />
        </div>
    );
}
