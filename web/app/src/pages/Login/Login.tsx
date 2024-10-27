import { AuthLayout } from "../../components/templates/AuthLayout/AuthLayout";
import { LoginForm } from "../../components/organisms/LoginForm/LoginForm";
import { LoginFormProvider } from "../../contexts/LoginFormContext";

export const Login: React.FC = () => {
  return (
    <LoginFormProvider>
      <AuthLayout authTitle="ログイン" link="/" linkTitle="新規登録">
        <LoginForm />
      </AuthLayout>
    </LoginFormProvider>
  );
};
