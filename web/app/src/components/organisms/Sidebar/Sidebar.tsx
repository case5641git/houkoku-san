import React from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { DEPARTMENT_LIST } from "../../../constants/department";
import styles from "./styles.module.css";

type Crew = {
  id: string;
  name: string;
};

export const Sidebar: React.FC = () => {
  const { users } = useUserContext();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <div className={styles.sidebarMenu}>
          <div className={styles.appName}>報告さん</div>

          <div className={styles.departmentInfo}>
            <div>所属</div>
            <p key={users.user.id}>
              {DEPARTMENT_LIST[users.user.department] || "部署情報がありません"}
            </p>
          </div>

          <div className={styles.departmentInfo}>
            <div>管理者</div>
            <p key={users.manager.id}>
              {users.manager.name || "部署情報がありません"}
            </p>
          </div>

          <div className={styles.memberList}>
            <div>メンバー</div>
            <ul>
              {users.crews.map((crew: Crew) => {
                return <li key={crew.id}>{crew.name}</li>;
              })}
            </ul>
          </div>

          <div className={styles.sidebarLinks}>
            <div className={styles.sidebarLink}>
              <a>プロフィール</a>
            </div>
            <div className={styles.sidebarLink}>
              <a href="/login">ログアウト</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
