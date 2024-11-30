import {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";

type User = {
  id: string;
  department: number;
  name?: string;
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
  const token = localStorage.getItem("app_access_token");
  const [users, setUsers] = useState<Users>({
    user: { id: "", department: 0 },
    manager: { id: "", name: "" },
    crews: [],
  });
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      setError("ユーザーデータの取得に失敗しました");
    }
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
