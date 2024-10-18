import { Label } from "../../atoms/Label/Label";
import { Input } from "../../atoms/Input/Input";
import styles from "./styles.module.css";

type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  type,
  onChange,
}) => (
  <div className={styles.inputBox}>
    <Label htmlFor={name}>{label}</Label>
    <Input name={name} value={value} onChange={onChange} type={type} />
  </div>
);
