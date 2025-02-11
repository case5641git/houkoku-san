import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useComponentSwitch } from "./ComponentSwitchContext";
import { COMPONENT_LIST } from "../constants/component";

type FormState = {
  reserver_num: number;
  visitor_num: number;
  reserver_contractor_num: number;
  visitor_contractor_num: number;
  sales: number;
  customer_feedback: string;
  crew_feedback: string;
};

type Report = {
  id: number;
  user_id?: string;
  created_at: string;
  reserver_num?: number;
  reserver_contractor_num?: number;
  visitor_num?: number;
  visitor_contractor_num?: number;
  sales?: number;
  customer_feedback?: string;
  crew_feedback?: string;
  user: {
    id: string;
    department: number;
    name: string;
  };
};

type ReportContextProps = {
  reports: Report[];
  report?: Report;
  currentPage: number;
  lastPage: number;
  formState: FormState;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  createReport: (userId: string, managerId: string) => void;
  fetchReports: (
    page: number,
    startDate?: string,
    endDate?: string,
    userId?: string
  ) => void;
  fetchReportByReportId: (reportId: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

type ReportProviderProps = {
  children: ReactNode;
};

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [report, setReport] = useState<Report>();
  const [reportId, setReportId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [cookies] = useCookies(["app_access_token"]);
  const token = cookies.app_access_token;
  const { switchComponent } = useComponentSwitch();

  const [formState, setFormState] = useState<FormState>({
    reserver_num: 0,
    visitor_num: 0,
    reserver_contractor_num: 0,
    visitor_contractor_num: 0,
    sales: 0,
    customer_feedback: "",
    crew_feedback: "",
  });
  const [error, setError] = useState<string | null>(null);

  /**
   * フォームの入力値を更新する
   * @param object  e
   * @return void
   */
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (message: string) => {
    setError(message);
  };

  const fetchReports = useCallback(
    async (page: number, startDate = "", endDate = "", userId = "") => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/reports?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              start_date: startDate,
              end_date: endDate,
              user_id: userId,
            },
          }
        );
        setReports(data.reports.data);
        setCurrentPage(data.reports.current_page);
        setLastPage(data.reports.last_page);
      } catch {
        handleError("レポートデータが取得できません。");
      }
    },
    [token, startDate, endDate]
  );

  const fetchReportByReportId = useCallback(async (reportId: number) => {
    try {
      if (reportId === 0) {
        handleError("レポートを選択してください。");
        return;
      }
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/reports/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReport(data.report);
      switchComponent(COMPONENT_LIST.DETAIL);
    } catch {
      handleError("レポートの詳細が取得できません。");
    }
  }, []);

  const createReport = useCallback(
    async (userId: string, managerId: string) => {
      let reportInfo = formState;

      try {
        const newReport = await axios.post(
          `http://localhost:8000/api/v1/reports`,
          {
            user_id: userId,
            manager_id: managerId,
            reserver_num: reportInfo.reserver_num,
            visitor_num: reportInfo.visitor_num,
            reserver_contractor_num: reportInfo.reserver_contractor_num,
            visitor_contractor_num: reportInfo.visitor_contractor_num,
            sales: reportInfo.sales,
            customer_feedback: reportInfo.customer_feedback,
            crew_feedback: reportInfo.crew_feedback,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        fetchReportByReportId(newReport.data.reportId);
      } catch {
        handleError("レポートの作成に失敗しました。");
      }
    },
    []
  );

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchReportByReportId(reportId);
  }, [reportId]);

  return (
    <ReportContext.Provider
      value={{
        reports,
        report,
        currentPage,
        lastPage,
        formState,
        handleChange,
        createReport,
        fetchReports,
        fetchReportByReportId,
        setCurrentPage,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("ReportContextProviderが見つかりません");
  }
  return context;
};
