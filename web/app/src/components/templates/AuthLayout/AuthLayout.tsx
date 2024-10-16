import styles from "./style.module.css";

type AuthLayoutProps = {
  authTitle: string;
  link: string;
  linkTitle: string;
  children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  authTitle,
  link,
  linkTitle,
  children,
}) => (
  <div className={styles.authBaseLayout}>
    <div className={styles.authContainer}>
      <div className={styles.title}>
        <div className={styles.innerTitle}>報告さん</div>
      </div>
      <div className={styles.authTitle}>{authTitle}</div>
      <a href={link} className={styles.link}>
        {linkTitle}
      </a>
      {children}
    </div>
  </div>
);
