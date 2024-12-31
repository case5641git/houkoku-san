import React, { useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { useReportContext } from "../../../contexts/ReportContext";
import { DEPARTMENT_LIST } from "../../../constants/department";
import styles from "./styles.module.css";
import { Button } from "../../atoms/Button/Button";
import { ROLE_LIST } from "../../../constants/role";
import { useNavigate, Link } from "react-router-dom";
import { useComponentSwitch } from "../../../contexts/ComponentSwitchContext";
import { COMPONENT_LIST } from "../../../constants/component";

type Crew = {
  id: string;
  name: string;
};

export const Sidebar: React.FC = () => {
  const { users } = useUserContext();
  const { currentPage, fetchReports } = useReportContext();
  const { switchComponent } = useComponentSwitch();
  const [startDate] = useState<string>("");
  const [endDate] = useState<string>("");
  const navigate = useNavigate();

  console.log(users);

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

          {users.user.role === ROLE_LIST.MANAGER && (
            <div className={styles.memberList}>
              <div>メンバー</div>
              <ul>
                {users.crews.map((crew: Crew) => {
                  console.log(typeof crew.id);
                  return (
                    <li
                      key={crew.id}
                      onClick={() =>
                        fetchReports(currentPage, startDate, endDate, crew.id)
                      }
                    >
                      {crew.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {users.user.role === ROLE_LIST.CREW && (
            <div className={styles.sidebarLink}>
              <a onClick={() => switchComponent(COMPONENT_LIST.INDEX)}>
                報告書一覧
              </a>
            </div>
          )}

          {users.user.role === ROLE_LIST.CREW && (
            <div className={styles.toReportForm}>
              <button
                type="button"
                onClick={() => switchComponent(COMPONENT_LIST.REGIST)}
              >
                業務報告
              </button>
            </div>
          )}

          <div className={styles.sidebarLinks}>
            <div className={styles.sidebarLink}>
              <a onClick={() => switchComponent(COMPONENT_LIST.PROFILE)}>
                プロフィール
              </a>
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
