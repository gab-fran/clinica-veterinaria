import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicList } from '../../../components/DynamicList/DynamicList';
import { ApiError } from '../../../services/apiClient';
import type { Page } from '../../../types/api';
import { movimentacaoService } from '../../../services/movimentacaoService';
import type { MovimentacaoResumoDTO } from '../../../types/movimentacao';
import { movimentacaoListColumns } from '../../../schemas/movimentacaoSchema';

const PAGE_SIZE = 10;

export function MovimentacaoListPage() {
  const [page, setPage] = useState<Page<MovimentacaoResumoDTO> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    movimentacaoService.listar({ page: currentPage, size: PAGE_SIZE, sort: 'dataCriacaoMovimentacao,desc' })
      .then((response) => {
        if (active) setPage(response);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setPage(null);
        setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar as movimentações.');
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
    if (!window.confirm('Deseja realmente deletar esta movimentação?')) return;

    try {
      await movimentacaoService.remover(id);
      setReloadKey((current) => current + 1);
    } catch (requestError: unknown) {
      window.alert(requestError instanceof ApiError ? requestError.message : 'Não foi possível deletar a movimentação.');
    }
  };

  return (
    <div>
      <NavBar />
      <main>
        <div>
          <div>
            <p>Lista</p>
            <h1>Movimentações</h1>
            <p>Consulte as movimentações cadastradas e acompanhe o estoque disponível.</p>
          </div>
          <div>
            <Link to="/movimentacoes/novo">Nova movimentação</Link>
            {page && <span>{page.totalElements} movimentações</span>}
          </div>
        </div>

        {error && (
          <button type="button" onClick={handleRetry}>
            Tentar novamente
          </button>
        )}

        <DynamicList
          items={page?.content ?? []}
          columns={movimentacaoListColumns}
          rowKey="idMovimentacaoEstoque"
          loading={loading}
          error={error}
          emptyMessage="Nenhuma movimentação cadastrada."
          pagination={page ? {
            page: page.number,
            totalPages: page.totalPages,
            onPageChange: handlePageChange,
          } : undefined}
          actions={(movimentacao) => (
            <>
              <Link to={`/movimentacoes/${movimentacao.idMovimentacaoEstoque}`}>Detalhes</Link>
              <Link to={`/movimentacoes/${movimentacao.idMovimentacaoEstoque}/editar`}>Atualizar</Link>
              <button type="button" onClick={() => handleDelete(movimentacao.idMovimentacaoEstoque)}>
                Deletar
              </button>
            </>
          )}
        />
      </main>
      <Footer />
    </div>
  );
}
