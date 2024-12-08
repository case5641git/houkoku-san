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
  fetchReports: (
    page: number,
    startDate?: string,
    endDate?: string,
    userId?: string
  ) => void;
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
  const [userId, setUserId] = useState<string>("");
  const [cookies] = useCookies(["app_access_token"]);
  const token = cookies.app_access_token;

  const [error, setError] = useState<string | null>(null);

  const handelError = (message: string) => {
    setError(message);
  };

  const fetchReports = useCallback(
    async (page: number, startDate = "", endDate = "", userId = "") => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/auth/reports?page=${page}`,
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
        handelError("レポートデータの取得に失敗しました");
      }
    },
    [token, startDate, endDate]
  );

  useEffect(() => {
    fetchReports(currentPage);
  }, [currentPage]);

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
