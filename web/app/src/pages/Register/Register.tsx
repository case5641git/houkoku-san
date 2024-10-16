import React, { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROLE_LIST } from "../../constants/role.js";
import { AuthLayout } from "../../components/templates/AuthLayout/AuthLayout";
import { RegisterForm } from "../../components/organisms/RegisterForm/RegisterForm";

type FormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  role: number;
};

export const Register: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: ROLE_LIST.MANAGER,
  });
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const url = "http://localhost:8000/api/v1/register";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      await axios.post(url, {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        department: formState.department,
        role: formState.role,
      });
      navigate("/login");
    } catch (error) {
      setError("登録に失敗しました");
      return;
    }
  };

  return (
    <AuthLayout authTitle="新規登録" link="/login" linkTitle="ログイン">
      <RegisterForm
        formState={formState}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </AuthLayout>
  );
};
