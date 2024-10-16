import styles from "./styles.module.css";

type InputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
};

export const Input: React.FC<InputProps> = ({
  name,
  value,
  onChange,
  type,
}) => (
  <input
    className={styles.input}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
  />
);
