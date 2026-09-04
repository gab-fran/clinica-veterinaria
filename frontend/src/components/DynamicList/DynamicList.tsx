import type { Key, ReactNode } from 'react';
import styles from './DynamicList.module.css';

export type ListColumn<T> = {
    key: keyof T | string;
    header: string;
    render?: (item: T) => ReactNode;
    className?: string;
};

export type ListPagination = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export type DynamicListProps<T> = {
    items: T[];
    columns: ListColumn<T>[];
    rowKey: keyof T | ((item: T, index: number) => Key);
    loading?: boolean;
    error?: string;
    emptyMessage?: string;
    pagination?: ListPagination;
    actions?: (item: T) => ReactNode;
    onRowClick?: (item: T) => void;
};

function getCellValue<T>(item: T, key: keyof T | string): ReactNode {
    return item[key as keyof T] as ReactNode;
}

function getRowKey<T>(item: T, rowKey: DynamicListProps<T>['rowKey'], index: number): Key {
    return typeof rowKey === 'function' ? rowKey(item, index) : String(item[rowKey]);
}

export function DynamicList<T>({
    items,
    columns,
    rowKey,
    loading = false,
    error,
    emptyMessage = 'Nenhum registro encontrado.',
    pagination,
    actions,
    onRowClick,
}: DynamicListProps<T>) {
    const hasContent = !loading && !error && items.length > 0;
    const canGoBack = pagination !== undefined && pagination.page > 0;
    const canGoForward = pagination !== undefined && pagination.page < pagination.totalPages - 1;

    return (
        <section className={styles.listSection} aria-busy={loading}>
            <div className={styles.tableWrapper}>
                <table className={styles.dataTable}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={String(column.key)} scope="col" className={styles.tableHeaderCell}>
                                    {column.header}
                                </th>
                            ))}
                            {actions && <th scope="col" className={styles.tableHeaderCell}>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className={styles.statusMessageCell}>
                                    Carregando...
                                </td>
                            </tr>
                        )}
                        {!loading && error && (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className={styles.statusMessageCell}>
                                    {error}
                                </td>
                            </tr>
                        )}
                        {!loading && !error && items.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className={styles.statusMessageCell}>
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                        {hasContent && items.map((item, index) => (
                            <tr
                                key={getRowKey(item, rowKey, index)}
                                onClick={() => onRowClick?.(item)}
                                className={`${styles.tableRow} ${onRowClick ? styles.tableRowInteractive : ''}`}
                            >
                                {columns.map((column) => (
                                    <td key={String(column.key)} className={column.className || styles.tableDataCell}>
                                        {column.render ? column.render(item) : getCellValue(item, column.key)}
                                    </td>
                                ))}
                                {actions && (
                                    <td className={styles.tableDataCell} onClick={(event) => event.stopPropagation()}>
                                        {actions(item)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && pagination.totalPages > 1 && (
                <nav className={styles.paginationContainer} aria-label="Paginação da lista">
                    <button
                        type="button"
                        className={styles.paginationButton}
                        onClick={() => pagination.onPageChange(pagination.page - 1)}
                        disabled={!canGoBack || loading}
                    >
                        Anterior
                    </button>
                    <span className={styles.paginationInfo}>
                        Página {pagination.page + 1} de {pagination.totalPages}
                    </span>
                    <button
                        type="button"
                        className={styles.paginationButton}
                        onClick={() => pagination.onPageChange(pagination.page + 1)}
                        disabled={!canGoForward || loading}
                    >
                        Próxima
                    </button>
                </nav>
            )}
        </section>
    );
}

