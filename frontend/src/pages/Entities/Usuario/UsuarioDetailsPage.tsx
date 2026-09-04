import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { usuarioService } from '../../../services/usuarioService';
import type { UsuarioResponseDTO } from '../../../types/usuario';
import { usuarioUpdateSchema, type UsuarioUpdateFormData } from '../../../schemas/usuarioSchema';

type UsuarioDetailsPageProps = {
    edit?: boolean;
};

const updateFields: FieldConfig<UsuarioUpdateFormData>[] = [
    { name: 'nome', label: 'Nome', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
];

export function UsuarioDetailsPage({ edit = false }: UsuarioDetailsPageProps) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<UsuarioResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const usuarioId = Number(id);
    const invalidId = !Number.isInteger(usuarioId) || usuarioId <= 0;

    useEffect(() => {
        if (invalidId) return;

        usuarioService.buscarPorId(usuarioId)
            .then(setUsuario)
            .catch((requestError: unknown) => {
                setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar o usuário.');
            })
            .finally(() => setLoading(false));
    }, [invalidId, usuarioId]);

    const handleUpdate = async (data: UsuarioUpdateFormData) => {
        if (!usuario) return;

        try {
            const updated = await usuarioService.atualizar(usuario.idUsuario, data);
            setUsuario(updated);
            navigate(`/usuarios/${usuario.idUsuario}`);
        } catch (requestError: unknown) {
            setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível atualizar o usuário.');
        }
    };

    return (
        <div>
            <NavBar />
            <main>
                <Link to="/usuarios">Voltar para usuários</Link>
                <h1>{edit ? 'Atualizar usuário' : 'Detalhes do usuário'}</h1>
                {invalidId && <p role="alert">Identificador de usuário inválido.</p>}
                {!invalidId && loading && <p>Carregando...</p>}
                {error && <p role="alert">{error}</p>}
                {!invalidId && !loading && !error && usuario && (
                    edit ? (
                        <DynamicForm
                            schema={usuarioUpdateSchema}
                            fields={updateFields}
                            defaultValues={{ nome: usuario.nome, email: usuario.email }}
                            onSubmit={handleUpdate}
                            submitText="Atualizar"
                        />
                    ) : (
                        <dl>
                            <dt>Nome</dt><dd>{usuario.nome}</dd>
                            <dt>E-mail</dt><dd>{usuario.email}</dd>
                            <dt>Cargo</dt><dd>{usuario.role}</dd>
                            <dt>Status</dt><dd>{usuario.statusUsuario ? 'Ativo' : 'Inativo'}</dd>
                        </dl>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}
