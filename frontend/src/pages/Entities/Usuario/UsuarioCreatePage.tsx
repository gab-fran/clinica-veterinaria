import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { usuarioService } from '../../../services/usuarioService';
import { usuarioCreateSchema, type UsuarioCreateFormData } from '../../../schemas/usuarioSchema';
import { RoleUsuario } from '../../../enums/roleUsuario';
import styles from '../Create.module.css';

const createFields: FieldConfig<UsuarioCreateFormData>[] = [
    { name: 'nome', label: 'Nome', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'senha', label: 'Senha', type: 'password', required: true, minLength: 8 },
    {
        name: 'role',
        label: 'Cargo',
        required: true,
        placeholder: 'Selecione um cargo',
        options: Object.values(RoleUsuario).map((role) => ({ label: role, value: role })),
    },
];

export function UsuarioCreatePage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleCreate = async (data: UsuarioCreateFormData) => {
        try {
            const usuario = await usuarioService.criar(data);
            navigate(`/usuarios/${usuario.idUsuario}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível criar o usuário.');
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.pageMain}>
                <div className={styles.headerSection}>
                    <Link to="/usuarios" className={styles.backLink}>← Voltar para usuários</Link>
                    <h1 className={styles.headerTitle}>Novo usuário</h1>
                </div>
                {error && <p role="alert">{error}</p>}
                <DynamicForm
                    schema={usuarioCreateSchema}
                    fields={createFields}
                    onSubmit={handleCreate}
                    submitText="Criar usuário"
                />
            </main>
            <Footer />
        </div>
    );
}

