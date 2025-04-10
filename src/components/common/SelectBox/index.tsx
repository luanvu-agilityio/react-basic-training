import { ChangeEvent } from 'react';

interface SelectOption {
  value: number | string;
  label?: string;
}

interface SelectBoxProps {
  id: string;
  className?: string;
  value: number | string;
  options: SelectOption[];
  onChange: (value: number) => void;
  disabled?: boolean;
}

const SelectBox = ({
  id,
  className,
  value,
  options,
  onChange,
  disabled = false,
}: SelectBoxProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <select id={id} className={className} value={value} onChange={handleChange} disabled={disabled}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
