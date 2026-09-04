import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { DynamicList } from '../../../components/DynamicList/DynamicList';
import { ApiError } from '../../../services/apiClient';
import { produtoService } from '../../../services/produtoService';
import type { Page } from '../../../types/api';
import type { ProdutoResumoDTO } from '../../../types/produto';
import { produtoListColumns } from '../../../schemas/produtoSchema';

const PAGE_SIZE = 10;

export function ProdutoListPage() {
  const [page, setPage] = useState<Page<ProdutoResumoDTO> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    produtoService.listar({ page: currentPage, size: PAGE_SIZE, sort: 'nome,asc' })
      .then((response) => {
        if (active) setPage(response);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setPage(null);
        setError(requestError instanceof ApiError ? requestError.message : 'Não foi possível carregar os produtos.');
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
    if (!window.confirm('Deseja realmente deletar este produto?')) return;

    try {
      await produtoService.remover(id);
      setReloadKey((current) => current + 1);
    } catch (requestError: unknown) {
      window.alert(requestError instanceof ApiError ? requestError.message : 'Não foi possível deletar o produto.');
    }
  };

  return (
    <div>
      <NavBar />
      <main>
        <div>
          <div>
            <p>Estoque</p>
            <h1>Produtos</h1>
            <p>Consulte os produtos cadastrados e acompanhe o estoque disponível.</p>
          </div>
          <div>
            <Link to="/produtos/novo">Novo produto</Link>
            {page && <span>{page.totalElements} produtos</span>}
          </div>
        </div>

        {error && (
          <button type="button" onClick={handleRetry}>
            Tentar novamente
          </button>
        )}

        <DynamicList
          items={page?.content ?? []}
          columns={produtoListColumns}
          rowKey="idProduto"
          loading={loading}
          error={error}
          emptyMessage="Nenhum produto cadastrado."
          pagination={page ? {
            page: page.number,
            totalPages: page.totalPages,
            onPageChange: handlePageChange,
          } : undefined}
          actions={(produto) => (
            <>
              <Link to={`/produtos/${produto.idProduto}`}>Detalhes</Link>
              <Link to={`/produtos/${produto.idProduto}/editar`}>Atualizar</Link>
              <button type="button" onClick={() => handleDelete(produto.idProduto)}>
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
