type Option = {
    value: string;
    label: string;
};

type CheckboxGroupProps = {
    options: Option[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
};

export function CheckboxGroup({
    options,
    selectedValues,
    onChange,
    }: CheckboxGroupProps) {
    const toggleValue = (value: string) => {
        if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((item) => item !== value));
        } else {
        onChange([...selectedValues, value]);
        }
    };

    return (
        <div>
        {options.map((option) => (
            <label key={option.value}>
            <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => toggleValue(option.value)}
            />
            {option.label}
            </label>
        ))}
        </div>
    );
}