import React from "react";
import styles from "./styles.module.css";
import { Chat } from "../../organisms/Chat/Chat";
import { useComponentSwitch } from "../../../contexts/ComponentSwitchContext";
import { COMPONENT_LIST } from "../../../constants/component";

export const ReportView: React.FC = () => {
  const { switchComponent } = useComponentSwitch();
  return (
    <div className={styles.reportViewWrapper}>
      <div className={styles.viewArea}>
        <div className={styles.viewAreaInner}>
          <h3>業務報告詳細</h3>

          <div className={styles.inputContainer}>
            <label htmlFor="">来店数(人)</label>
            <div className={styles.customerNums}>
              <div>
                <span>予約</span>
                <p>1</p>
              </div>
              <div>
                <span>飛込</span>
                <p>1</p>
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">成約数(人)</label>
            <div className={styles.customerNums}>
              <div>
                <span>予約</span>
                <p>1</p>
              </div>
              <div>
                <span>飛込</span>
                <p>1</p>
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">売上(粗利)</label>
            <div className={styles.salesInputBox}>
              <p>100,0000</p>
              <span>円</span>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">お客様ご意見</label>
            <div className={styles.feedbackInputBox}>
              <p>
                サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
              </p>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">その他報告・相談</label>
            <div className={styles.feedbackInputBox}>
              <p>
                サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chatArea}>
        <Chat />
      </div>
    </div>
  );
};
