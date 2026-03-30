type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps) {
  return (
    <div>
      <label>
        {label}
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}