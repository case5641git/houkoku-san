import React, { ReactNode } from "react";
import styles from "./styles.module.css";

type MainContentLayoutProps = {
  children: ReactNode;
};

export const MainContentLayout: React.FC<MainContentLayoutProps> = ({
  children,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainInner}>{children}</div>
    </div>
  );
};
