import { createContext, useContext, useState } from "react";
import { ROLE_LIST } from "../constants/role";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * フォームの入力値の型定義
 */
type FormState = {
  email: string;
  password: string;
  department: string;
};

/**
 * フォームのコンテキストの型定義
 */
type LoginFormContextType = {
  formState: FormState;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  error: string | null;
  handleSubmit: (
    e: React.FormEvent,
    url: string,
    navigate: (path: string) => void
  ) => Promise<void>;
};

const LoginFormContext = createContext<LoginFormContextType | undefined>(
  undefined
);

/**
 * フォームのコンテキストを提供する
 * @param ReactNode children
 * @return JSX.Element
 */
export const LoginFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    department: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const url = "http://localhost:8000/api/v1/auth/login";

  /**
   * フォームの入力値を更新する
   * @param object  e
   * @return void
   */
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormState((prevState) => ({
      ...prevState,
    }));
  };

  /**
   * フォームの入力値を送信する
   * @param object e
   * @return void
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoaded(true);
    setError(null);
    try {
      await axios.post(url, {
        email: formState.email,
        password: formState.password,
        department: formState.department,
      });
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "ログインに失敗しました。");
      } else {
        setError("ログインに失敗しました。");
      }
      return;
    } finally {
      setIsLoaded(false);
    }
  };

  return (
    <LoginFormContext.Provider
      value={{ formState, handleChange, error, handleSubmit, isLoaded }}
    >
      {children}
    </LoginFormContext.Provider>
  );
};

/**
 * フォームのコンテキストを使用する
 * @param void
 * @return LoginFormContextType
 */
export const useLoginForm = () => {
  const context = useContext(LoginFormContext);
  if (context === undefined) {
    throw new Error("useLoginForm must be used within a LoginFormProvider");
  }
  return context;
};
