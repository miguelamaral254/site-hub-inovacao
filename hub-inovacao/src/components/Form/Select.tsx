type Props = {
  options: string[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({ options, label, value, onChange }: Props) => {
  return (
      <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded-md"
      >
          <option value="">{label}</option>
          {options.map((opt) => (
              <option key={opt} value={opt}>
                  {opt}
              </option>
          ))}
      </select>
  );
};
