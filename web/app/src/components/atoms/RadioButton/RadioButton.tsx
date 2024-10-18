type RadioButtonProps = {
  id: string;
  name: string;
  checked: boolean;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  checked,
  value,
  onChange,
}) => (
  <input
    type="radio"
    id={id}
    name={name}
    checked={checked}
    value={value}
    onChange={onChange}
  />
);
