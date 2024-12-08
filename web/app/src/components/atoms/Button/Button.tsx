import styles from "./styles.module.css";

type ButtonProps = {
  type: "submit" | "button";
  children: React.ReactNode;
  onChange?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  type,
  children,
  onChange,
  disabled,
}) => (
  <button
    className={styles.button}
    type={type}
    onChange={onChange}
    disabled={disabled}
  >
    {children}
  </button>
);
