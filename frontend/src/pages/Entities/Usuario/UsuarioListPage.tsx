import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicList } from '../../../components/DynamicList/DynamicList';
import { ApiError } from '../../../services/apiClient';
import type { Page } from '../../../types/api';
import type { UsuarioResponseDTO } from '../../../types/usuario';
import { usuarioService } from '../../../services/usuarioService';
import { usuarioListColumns } from '../../../schemas/usuarioSchema';
import styles from '../List.module.css';

const PAGE_SIZE = 10;

export function UsuarioListPage() {
  const [page, setPage] = useState<Page<UsuarioResponseDTO> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    usuarioService.listar({ page: currentPage, size: PAGE_SIZE, sort: 'nome,asc' })
      .then((response) => {
        if (active) setPage(response);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setPage(null);
        setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar os usuários.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [currentPage, reloadKey]);

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  const handleRetry = () => {
    setReloadKey((current) => current + 1);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja realmente deletar este usuário?')) return;

    try {
      await usuarioService.remover(id);
      setReloadKey((current) => current + 1);
    } catch (requestError: unknown) {
      window.alert(requestError instanceof ApiError ? requestError.message : 'Não foi possível deletar o usuário.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar />
      <main className={styles.pageMain}>
        <div className={styles.headerSection}>
          <div className={styles.headerTitleWrapper}>
            <span className={styles.headerCategory}>Gestão</span>
            <h1 className={styles.headerTitle}>Usuários</h1>
            <p className={styles.headerSubtitle}>Consulte os usuários cadastrados e gerencie seus acessos.</p>
          </div>
          <div className={styles.headerActions}>
            <Link to="/usuarios/novo" className={styles.primaryLinkButton}>Novo usuário</Link>
            {page && <span className={styles.badgeCount}>{page.totalElements} usuários</span>}
          </div>
        </div>

        {error && (
          <button type="button" onClick={handleRetry} className={styles.retryButton}>
            Tentar novamente
          </button>
        )}

        <DynamicList
          items={page?.content ?? []}
          columns={usuarioListColumns}
          rowKey="idUsuario"
          loading={loading}
          error={error}
          emptyMessage="Nenhum usuário cadastrado."
          pagination={page ? {
            page: page.number,
            totalPages: page.totalPages,
            onPageChange: handlePageChange,
          } : undefined}
          actions={(usuario) => (
            <div className={styles.actionGroup}>
              <Link to={`/usuarios/${usuario.idUsuario}`} className={styles.actionLink}>Detalhes</Link>
              <Link to={`/usuarios/${usuario.idUsuario}/editar`} className={styles.actionLink}>Atualizar</Link>
              <button type="button" onClick={() => handleDelete(usuario.idUsuario)} className={styles.deleteButton}>
                Deletar
              </button>
            </div>
          )}
        />
      </main>
      <Footer />
    </div>
  );
}

