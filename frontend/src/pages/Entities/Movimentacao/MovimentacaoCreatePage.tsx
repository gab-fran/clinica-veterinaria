import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { movimentacaoService } from '../../../services/movimentacaoService';
import { movimentacaoCreateSchema, type MovimentacaoCreateFormData } from '../../../schemas/movimentacaoSchema';

const createFields: FieldConfig<MovimentacaoCreateFormData>[] = [
    { name: 'idProduto', label: 'ID do produto', type: 'number', required: true, min: 1 },
    { name: 'idUsuario', label: 'ID do usuário', type: 'number', required: true, min: 1 },
    { name: 'tipoMovimentacao', label: 'Tipo de movimentação', required: true },
    { name: 'quantidade', label: 'Quantidade', type: 'number', required: true, min: 1 },
];

export function MovimentacaoCreatePage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleCreate = async (data: MovimentacaoCreateFormData) => {
        try {
            const movimentacao = await movimentacaoService.criar(data);
            navigate(`/movimentacoes/${movimentacao.idMovimentacaoEstoque}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível criar a movimentação.');
        }
    };

    return (
        <div>
            <NavBar />
            <main>
                <Link to="/movimentacoes">Voltar para movimentações</Link>
                <h1>Nova movimentação</h1>
                {error && <p role="alert">{error}</p>}
                <DynamicForm
                    schema={movimentacaoCreateSchema}
                    fields={createFields}
                    onSubmit={handleCreate}
                    submitText="Criar movimentação"
                />
            </main>
            <Footer />
        </div>
    );
}
