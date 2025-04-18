type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  label?: string;
  value: string;
  onChange: (value: string) => void;
  selectText: string
};

export const Select = ({ options, label, value, onChange, selectText }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-4 px-2 border rounded-md"
      >
        <option value=''>{selectText}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

    </div>
  );
};