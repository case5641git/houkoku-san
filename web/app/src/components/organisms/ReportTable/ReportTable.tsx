import React, { useState } from "react";
import { useReportContext } from "../../../contexts/ReportContext";
import { DEPARTMENT_LIST } from "../../../constants/department";
import styles from "./styles.module.css";

type Report = {
  id: string;
  created_at: string;
  user: {
    id: string;
    department: number;
    name: string;
  };
};

export const ReportTable: React.FC = () => {
  const { reports, currentPage, lastPage, fetchReports, setCurrentPage } =
    useReportContext();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  return (
    <div>
      <div className={styles.dateSearch}>
        <div className={styles.dateSearchLavel}>日付検索</div>
        <div className={styles.inputDateSearch}>
          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span>〜</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button onClick={() => fetchReports(currentPage)}>検索</button>
        </div>
      </div>
      <div className={styles.listTable}>
        <table>
          <thead>
            <tr>
              <th>報告日</th>
              <th>報告者</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report: Report) => {
              return (
                <tr key={report.id}>
                  <td>{report.created_at}</td>
                  <td>
                    {DEPARTMENT_LIST[report.user.department] +
                      " " +
                      report.user.name}
                  </td>
                  <td>
                    <button
                      key={report.id}
                      onClick={() => {
                        console.log(report.id);
                      }}
                    >
                      詳細
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.paginate}>
        <button
          className={styles.prev}
          onClick={() =>
            setCurrentPage((prev: number) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <button className={styles.currentPageNum}>
          {currentPage} / {lastPage}
        </button>
        <button
          className={styles.next}
          onClick={() =>
            setCurrentPage((prev: number) => Math.min(prev + 1, lastPage))
          }
          disabled={currentPage === lastPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
