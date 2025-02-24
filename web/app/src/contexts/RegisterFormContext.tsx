import { createContext, useContext, useState } from "react";
import { ROLE_LIST } from "../constants/role";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * フォームの入力値の型定義
 */
type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  role: number;
};

/**
 * フォームのコンテキストの型定義
 */
type RegisterFormContextType = {
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

const RegisterFormContext = createContext<RegisterFormContextType | undefined>(
  undefined
);

/**
 * フォームのコンテキストを提供する
 * @param ReactNode children
 * @return JSX.Element
 */
export const RegisterFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const baseURL = process.env.REACT_APP_API_URL;
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: ROLE_LIST.MANAGER,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const url = `${baseURL}/api/v1/register`;

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
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "role" ? parseInt(value) : value,
    }));
  };

  /**
   * フォームの入力値を検証する
   * @param void
   * @return boolean
   */
  const validateForm = () => {
    if (formState.password !== formState.confirmPassword) {
      setError("パスワードが一致しません");
      return false;
    }
    return true;
  };

  /**
   * フォームの入力値を送信する
   * @param object e
   * @return void
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateForm();
    try {
      await axios.post(url, {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        department: formState.department,
        role: formState.role,
      });
      navigate("/");
    } catch (error) {
      setError("登録に失敗しました");
      return;
    }
  };

  return (
    <RegisterFormContext.Provider
      value={{ formState, handleChange, error, handleSubmit }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

/**
 * フォームのコンテキストを使用する
 * @param void
 * @return RegisterFormContextType
 */
export const useRegisterForm = () => {
  const context = useContext(RegisterFormContext);
  if (context === undefined) {
    throw new Error(
      "useRegisterForm must be used within a RegisterFormProvider"
    );
  }
  return context;
};
