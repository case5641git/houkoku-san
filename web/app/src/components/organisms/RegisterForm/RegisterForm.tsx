import { RadioGroup } from "../../molecules/RadioGroup/RadioGroup";
import { InputField } from "../../molecules/InputField/InputField";
import { Button } from "../../atoms/Button/Button";
import { ROLE_LIST } from "../../../constants/role";
import styles from "./styles.module.css";
import { Label } from "../../atoms/Label/Label";

type Role = (typeof ROLE_LIST)[keyof typeof ROLE_LIST];

type RegisterFormProps = {
  formState: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    department: string;
    role: Role;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formState,
  handleChange,
  handleSubmit,
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
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
    <div className={styles.button_container}>
      <Button type="submit">登録</Button>
    </div>
  </form>
);
