import {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

type User = {
  id: string;
  department: number;
  name?: string;
  role?: number;
};

type Manager = {
  id: string;
  name: string;
};

type Crew = {
  id: string;
  name: string;
};

type Users = {
  user: User;
  manager: Manager;
  crews: Crew[];
};

type UserContextProps = {
  users: Users;
  fetchUsers: () => void;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [cookies] = useCookies(["app_access_token"]);
  const [users, setUsers] = useState<Users>({
    user: { id: "", department: 0 },
    manager: { id: "", name: "" },
    crews: [],
  });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    department: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const token = cookies.app_access_token;

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
    } catch {
      setError("ユーザーデータの取得に失敗しました");
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserProviderが見つけられません");
  }
  return context;
};
