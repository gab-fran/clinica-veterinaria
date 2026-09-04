import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { produtoService } from '../../../services/produtoService';
import {
    getUnidadeMedidaOptions,
    produtoCreateSchema,
    tipoProdutoOptions,
    type ProdutoCreateFormData,
} from '../../../schemas/produtoSchema';
import { TipoProduto } from '../../../enums/tipoProduto';
import styles from '../Create.module.css';

export function ProdutoCreatePage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [tipo, setTipo] = useState('');

    const createFields: FieldConfig<ProdutoCreateFormData>[] = [
        { name: 'nome', label: 'Nome', required: true },
        { name: 'marca', label: 'Marca', required: true },
        { name: 'tipo', label: 'Tipo', required: true, placeholder: 'Selecione o tipo', options: tipoProdutoOptions, onChange: (event) => setTipo(event.target.value) },
        { name: 'quantidadeEstoque', label: 'Quantidade em estoque', type: 'number', required: true, min: 0 },
        { name: 'estoqueMinimo', label: 'Estoque mínimo', type: 'number', required: true, min: 0 },
        { name: 'validade', label: 'Validade', type: 'date', required: true },
        { name: 'pesoKg', label: 'Peso (kg)', type: 'number', required: true, hidden: tipo !== TipoProduto.RACAO, min: 0, step: 0.01 },
        { name: 'dosagem', label: 'Dosagem', type: 'number', required: true, hidden: tipo !== TipoProduto.MEDICAMENTO && tipo !== TipoProduto.VACINA, min: 0, step: 0.01 },
        { name: 'unidadeMedida', label: 'Unidade de medida', required: true, options: getUnidadeMedidaOptions(tipo) },
    ];

    const handleCreate = async (data: ProdutoCreateFormData) => {
        try {
            const produto = await produtoService.criar(data);
            navigate(`/produtos/${produto.idProduto}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível criar o produto.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.pageMain}>
                <div className={styles.headerSection}>
                    <Link to="/produtos" className={styles.backLink}>← Voltar para produtos</Link>
                    <h1 className={styles.headerTitle}>Novo produto</h1>
                </div>
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

