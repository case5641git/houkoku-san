import { AuthLayout } from "../../components/templates/AuthLayout/AuthLayout";
import { RegisterForm } from "../../components/organisms/RegisterForm/RegisterForm";
import { RegisterFormProvider } from "../../contexts/RegisterFormContext";

export const Register: React.FC = () => {
  return (
    <RegisterFormProvider>
      <AuthLayout authTitle="新規登録" link="/login" linkTitle="ログイン">
        <RegisterForm />
      </AuthLayout>
    </RegisterFormProvider>
  );
};
