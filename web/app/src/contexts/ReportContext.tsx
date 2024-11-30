import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useContext,
} from "react";
import axios from "axios";

type Report = {
  id: string;
  created_at: string;
  user: {
    id: string;
    department: number;
    name: string;
  };
};

type ReportContextProps = {
  reports: Report[];
  currentPage: number;
  lastPage: number;
  fetchReports: (page: number, startDate?: string, endDate?: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

type ReportProviderProps = {
  children: ReactNode;
};

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const token = localStorage.getItem("app_access_token");

  const [error, setError] = useState<string | null>(null);

  const handelError = (message: string) => {
    setError(message);
  };

  const fetchReports = useCallback(
    async (page: number, startDate = "", endDate = "") => {
      try {
        const { data } = await axios.get(`/api/v1/auth/reports?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        });
        setReports(data.reports.data);
        setCurrentPage(data.reports.current_page);
        setLastPage(data.reports.last_page);
      } catch {
        handelError("レポートデータの取得に失敗しました");
      }
    },
    [token, startDate, endDate]
  );

  return (
    <ReportContext.Provider
      value={{
        reports,
        currentPage,
        lastPage,
        fetchReports,
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
