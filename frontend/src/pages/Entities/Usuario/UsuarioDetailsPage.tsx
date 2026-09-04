import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicForm, type FieldConfig } from '../../../components/DynamicForm/DynamicForm';
import { ApiError } from '../../../services/apiClient';
import { usuarioService } from '../../../services/usuarioService';
import type { UsuarioResponseDTO } from '../../../types/usuario';
import { usuarioUpdateSchema, type UsuarioUpdateFormData } from '../../../schemas/usuarioSchema';
import styles from '../Details.module.css';
import { RoleUsuario } from '../../../enums/roleUsuario';

type UsuarioDetailsPageProps = {
    edit?: boolean;
};

const updateFields: FieldConfig<UsuarioUpdateFormData>[] = [
    { name: 'nome', label: 'Nome', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    {
           name: 'role',
           label: 'Cargo',
           required: true,
           options: Object.values(RoleUsuario).map((role) => ({ label: role, value: role })),
       },
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
        <div className={styles.pageContainer}>
            <NavBar />
            <main className={styles.pageMain}>
                <div>
                    <Link to="/usuarios" style={{ color: 'var(--color-secondary)', fontWeight: 600, textDecoration: 'none' }}>
                        ← Voltar para usuários
                    </Link>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text)', marginTop: '0.5rem' }}>
                        {edit ? 'Atualizar usuário' : 'Detalhes do usuário'}
                    </h1>
                </div>

                {invalidId && <p role="alert">Identificador de usuário inválido.</p>}
                {!invalidId && loading && <p>Carregando...</p>}
                {error && <p role="alert">{error}</p>}
                {!invalidId && !loading && !error && usuario && (
                    edit ? (
                        <DynamicForm
                            schema={usuarioUpdateSchema}
                            fields={updateFields}
                            defaultValues={{ nome: usuario.nome, email: usuario.email, role: usuario.role as UsuarioUpdateFormData['role'] }}
                            onSubmit={handleUpdate}
                            submitText="Atualizar"
                        />
                    ) : (
                        <div className={styles.cardContainer}>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Nome</span>
                                <span className={styles.infoValue}>{usuario.nome}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>E-mail</span>
                                <span className={styles.infoValue}>{usuario.email}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Cargo</span>
                                <span className={styles.infoValue}>{usuario.role}</span>
                            </div>
                            <div className={styles.infoGroup}>
                                <span className={styles.infoLabel}>Status</span>
                                <span className={styles.infoValue}>{usuario.statusUsuario ? 'Ativo' : 'Inativo'}</span>
                            </div>
                        </div>
                    )
                )}
            </main>
            <Footer />
        </div>
    );
}

