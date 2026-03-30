type Option = {
    value: string;
    label: string;
};

type DropdownProps = {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
};

export function Dropdown({ label, value, options, onChange }: DropdownProps) {
    return (
        <label>
        {label}
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </label>
    );
}