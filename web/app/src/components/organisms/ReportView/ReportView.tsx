import React from "react";
import styles from "./styles.module.css";
import { Chat } from "../../organisms/Chat/Chat";
import { useReportContext } from "../../../contexts/ReportContext";

export const ReportView: React.FC = () => {
  const { report } = useReportContext();

  if (!report) {
    return <div>Loading....</div>;
  }

  const sales = report.sales ? report.sales : 0;

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
                <p>{report.reserver_num}</p>
              </div>
              <div>
                <span>飛込</span>
                <p>{report.visitor_num}</p>
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">成約数(人)</label>
            <div className={styles.customerNums}>
              <div>
                <span>予約</span>
                <p>{report.reserver_contractor_num}</p>
              </div>
              <div>
                <span>飛込</span>
                <p>{report.visitor_contractor_num}</p>
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">売上(粗利)</label>
            <div className={styles.salesInputBox}>
              <p>{sales.toLocaleString()}</p>
              <span>円</span>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">お客様ご意見</label>
            <div className={styles.feedbackInputBox}>
              <p>{report.customer_feedback}</p>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="">その他報告・相談</label>
            <div className={styles.feedbackInputBox}>
              <p>{report.crew_feedback}</p>
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
