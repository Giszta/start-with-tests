type ConfirmDialogProps = {
    open: boolean;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export function ConfirmDialog({
    open,
    title,
    onConfirm,
    onCancel,
    }: ConfirmDialogProps) {
    if (!open) return null;

    return (
        <div role="dialog" aria-label={title}>
        <p>{title}</p>
        <button onClick={onCancel}>Anuluj</button>
        <button onClick={onConfirm}>Potwierdź</button>
        </div>
    );
}