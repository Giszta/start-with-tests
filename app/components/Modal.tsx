type ModalProps = {
    open: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
    if (!open) return null;

    return (
        <div role="dialog" aria-modal="true" aria-label={title}>
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={onClose}>Zamknij</button>
        </div>
    );
}