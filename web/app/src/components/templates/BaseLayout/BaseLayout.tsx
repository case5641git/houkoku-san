import React, { ReactNode } from "react";
import styles from "./styles.module.css";

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <div className={styles.base}>{children}</div>;
};
