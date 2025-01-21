import React from "react";
import styles from "./styles.module.css";
import { Chat } from "../../organisms/Chat/Chat";
import { useReportContext } from "../../../contexts/ReportContext";

export const ReportRegist: React.FC = () => {
  const { formState, createReport, handleChange } = useReportContext();
  return (
    <form className={styles.reportRegistWrapper} onSubmit={createReport}>
      <div className={styles.editArea}>
        <div className={styles.editAreaInner}>
          <h3>業務報告詳細</h3>

          <div className={styles.inputContainer}>
            <label htmlFor="">来店数(人)</label>
            <div className={styles.customerNums}>
              <div>
                <span>予約</span>
                <input
                  type="text"
                  name="reserver_num"
                  value={formState.reserver_num}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>飛込</span>
                <input
                  type="text"
                  name="visitor_num"
                  value={formState.visitor_num}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">成約数(人)</label>
            <div className={styles.customerNums}>
              <div>
                <span>予約</span>
                <input
                  type="text"
                  name="reserver_contractor_num"
                  value={formState.reserver_contractor_num}
                  onChange={handleChange}
                />
              </div>
              <div>
                <span>飛込</span>
                <input
                  type="text"
                  name="visitor_contractor_num"
                  value={formState.visitor_contractor_num}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">売上(粗利)</label>
            <div className={styles.salesInputBox}>
              <input
                type="text"
                name="sales"
                value={formState.sales}
                onChange={handleChange}
              />
              <span>円</span>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">お客様ご意見</label>
            <div className={styles.feedbackInputBox}>
              <textarea
                name="customer_feedback"
                wrap="soft"
                value={formState.customer_feedback}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">その他報告・相談</label>
            <div className={styles.feedbackInputBox}>
              <textarea
                name="crew_feedback"
                wrap="soft"
                value={formState.crew_feedback}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.buttonBox}>
            <button className={styles.registButton}>登録</button>
          </div>
        </div>
      </div>
      <div className={styles.chatArea}>
        <div className={styles.chatAreaInner}>
          <p className={styles.chatNotice}>
            業務報告を登録するとチャットができます
          </p>
        </div>
      </div>
    </form>
  );
};
