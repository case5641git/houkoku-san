import styles from "./styles.module.css";
import { Label } from "../../atoms/Label/Label";

type SelectBoxProps = {
  name: string;
  label: string;
  list: { [key: number]: string };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBox: React.FC<SelectBoxProps> = ({
  name,
  label,
  list,
  onChange,
}) => (
  <div className={styles.selectBox}>
    <Label htmlFor={name}>{label}</Label>
    <select className={styles.select} name={name} onChange={onChange}>
      {Object.entries(list).map(([key, value]) => {
        return (
          <option key={key} value={key}>
            {value}
          </option>
        );
      })}
    </select>
  </div>
);
