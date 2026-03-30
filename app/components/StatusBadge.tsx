type Status = 'active' | 'inactive' | 'pending';

type StatusBadgeProps = {
    status: Status;
};

export function StatusBadge({ status }: StatusBadgeProps) {
    const labelMap ={
        active: 'Aktywny',
        inactive: 'Nieaktywny',
        pending: 'Oczekujący',
    };

    return <span>{labelMap[status]}</span>;
}