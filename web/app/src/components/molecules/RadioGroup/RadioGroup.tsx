import { RadioButton } from "../../atoms/RadioButton/RadioButton";
import { Label } from "../../atoms/Label/Label";
import styles from "./styles.module.css";

type RadioGroupProps = {
  label: string;
  options: { id: string; label: string; value: number }[];
  name: string;
  selectedValue: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options,
  name,
  selectedValue,
  onChange,
}) => (
  <div className={styles.radio_container}>
    <Label htmlFor={name}>{label}</Label>
    <div className={styles.radio_inner}>
      {options.map((option) => (
        <div key={option.id} className={styles.radio_option}>
          <RadioButton
            id={option.id}
            name={name}
            checked={option.value === selectedValue}
            value={option.value}
            onChange={onChange}
          />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </div>
  </div>
);
