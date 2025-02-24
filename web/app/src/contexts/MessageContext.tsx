import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import { useReportContext } from "./ReportContext";

window.Pusher = Pusher;

type User = {
  name: string;
};

type Message = {
  id: number;
  message: string;
  user_id: string;
  user: User;
  report_id: number;
  created_at: string;
};

type MessageContextProps = {
  messages: Message[];
  newMessage: string;
  fetchMessages: (reportId: number) => void;
  setNewMessage: (message: string) => void;
  sendMessage: (reportId: number) => void;
};

type MessageProviderProps = {
  children: React.ReactNode;
};

const MessageContext = createContext<MessageContextProps>({
  messages: [],
  newMessage: "",
  fetchMessages: () => {
    console.log("fetchMessages");
  },
  setNewMessage: () => {
    console.log("setNewMessage");
  },
  sendMessage: () => {
    console.log("sendMessage");
  },
});

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(["app_access_token"]);
  const token = cookies.app_access_token;
  const { report } = useReportContext();

  const fetchMessages = useCallback(async (reportId: number) => {
    try {
      const { data } = await axios.get(`/api/v1/messages/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(data.messages);
    } catch (error) {
      handleError("メッセージの取得に失敗しました");
    }
  }, []);

  const handleError = (message: string) => {
    setError(message);
  };

  const sendMessage = async (reportId: number) => {
    const response = await axios.post(
      `${baseURL}/api/v1/send-message`,
      {
        message: newMessage,
        report_id: report?.id,
        user_id: report?.user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setNewMessage("");
      fetchMessages(reportId);
    }
  };

  useEffect(() => {
    if (report) {
      const reportId = report.id;
      fetchMessages(reportId);
    }
  }, [report, fetchMessages]);

  return (
    <MessageContext.Provider
      value={{
        messages,
        newMessage,
        fetchMessages,
        setNewMessage,
        sendMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
