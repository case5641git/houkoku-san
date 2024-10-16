import styles from "./styles.module.css";

type ButtonProps = {
  type: "submit";
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ type, children }) => (
  <button className={styles.button} type={type}>
    {children}
  </button>
);
