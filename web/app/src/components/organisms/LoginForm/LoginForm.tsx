import { InputField } from "../../molecules/InputField/InputField";
import { Button } from "../../atoms/Button/Button";
import { ROLE_LIST } from "../../../constants/role";
import styles from "./styles.module.css";
import { useLoginForm } from "../../../contexts/LoginFormContext";
import { useNavigate } from "react-router-dom";
import { SelectBox } from "../../molecules/SelectBox/SelectBox";
import { DEPARTMENT_LIST } from "../../../constants/department";

export const LoginForm: React.FC = () => {
  const { formState, handleChange, handleSubmit, error } = useLoginForm();
  const navigate = useNavigate();
  const url = "http://localhost:8000/api/v1/login";

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
      <SelectBox
        name="department"
        label="所属部署"
        list={DEPARTMENT_LIST}
        onChange={handleChange}
      />
      <div>
        <a href="/">パスワードをお忘れですか？</a>
      </div>
      {error && <p>{error}</p>}
      <div className={styles.button_container}>
        <Button type="submit">ログイン</Button>
      </div>
    </form>
  );
};
