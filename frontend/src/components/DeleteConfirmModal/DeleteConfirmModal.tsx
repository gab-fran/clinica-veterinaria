import { useEffect } from 'react';
import styles from './DeleteConfirmModal.module.css';

type DeleteConfirmModalProps = {
    entityName: string;
    onCancel: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
};

export function DeleteConfirmModal({
    entityName,
    onCancel,
    onConfirm,
    isDeleting = false,
}: DeleteConfirmModalProps) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !isDeleting) onCancel();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isDeleting, onCancel]);

    return (
        <div className={styles.backdrop} role="presentation" onMouseDown={() => !isDeleting && onCancel()}>
            <section
                className={styles.modal}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className={styles.icon} aria-hidden="true">!</div>
                <div className={styles.content}>
                    <p className={styles.eyebrow}>Ação permanente</p>
                    <h2 id="delete-modal-title">Excluir {entityName}?</h2>
                    <p id="delete-modal-description">
                        Esse registro será removido definitivamente e não poderá ser recuperado.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button type="button" className={styles.cancelButton} onClick={onCancel} disabled={isDeleting}>
                        Cancelar
                    </button>
                    <button type="button" className={styles.confirmButton} onClick={onConfirm} disabled={isDeleting}>
                        {isDeleting ? 'Excluindo...' : 'Sim, excluir'}
                    </button>
                </div>
            </section>
        </div>
    );
}
