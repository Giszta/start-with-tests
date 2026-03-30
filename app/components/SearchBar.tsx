type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            aria-label="Szukaj"
            value={value}
            placeholder="Wyszukaj..."
            onChange={(e) => onChange(e.target.value)}
        />
    );
}