type Column<T> = {
    key: keyof T;
    header: string;
};

type DataTableProps<T extends { id: number | string }> = {
    data: T[];
    columns: Column<T>[];
};

export function DataTable<T extends { id: number | string }>({
    data,
    columns,
    }: DataTableProps<T>) {
    return (
        <table>
        <thead>
            <tr>
            {columns.map((column) => (
                <th key={String(column.key)}>{column.header}</th>
            ))}
            </tr>
        </thead>

        <tbody>
            {data.map((row) => (
            <tr key={row.id}>
                {columns.map((column) => (
                <td key={String(column.key)}>{String(row[column.key])}</td>
                ))}
            </tr>
            ))}
        </tbody>
        </table>
    );
}