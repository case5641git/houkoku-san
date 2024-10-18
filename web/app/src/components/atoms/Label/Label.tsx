import React from "react";
import styles from "./styles.module.css";

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => (
  <label className={styles.label} htmlFor={htmlFor}>
    {children}
  </label>
);
