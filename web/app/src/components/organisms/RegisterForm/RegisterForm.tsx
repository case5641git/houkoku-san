import { RadioGroup } from "../../molecules/RadioGroup/RadioGroup";
import { InputField } from "../../molecules/InputField/InputField";
import { Button } from "../../atoms/Button/Button";
import { ROLE_LIST } from "../../../constants/role";
import styles from "./styles.module.css";
import { useRegisterForm } from "../../../contexts/RegisterFormContext";
import { useNavigate } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const { formState, handleChange, handleSubmit, error } = useRegisterForm();
  const navigate = useNavigate();
  const url = "http://localhost:8000/api/v1/register";

  /**
   * handleSubmitにフォームの入力値をURLを渡してラップする
   * @param object e
   * @return JSX.Element
   */
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e, url, navigate);
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <InputField
        label="名前"
        name="name"
        value={formState.name}
        onChange={handleChange}
        type="text"
      />
      <InputField
        label="メールアドレス"
        name="email"
        value={formState.email}
        onChange={handleChange}
        type="email"
      />
      <InputField
        label="パスワード"
        name="password"
        value={formState.password}
        onChange={handleChange}
        type="password"
      />
      <InputField
        label="パスワード再入力"
        name="confirmPassword"
        value={formState.confirmPassword}
        onChange={handleChange}
        type="password"
      />
      <InputField
        label="所属部署"
        name="department"
        value={formState.department}
        onChange={handleChange}
        type="text"
      />
      <RadioGroup
        label="役職"
        name="role"
        selectedValue={formState.role}
        onChange={handleChange}
        options={[
          { id: "role_manager", label: "部長", value: ROLE_LIST.MANAGER },
          { id: "role_crew", label: "店長", value: ROLE_LIST.CREW },
        ]}
      />
      {error && <p>{error}</p>}
      <div className={styles.button_container}>
        <Button type="submit">登録</Button>
      </div>
    </form>
  );
};
