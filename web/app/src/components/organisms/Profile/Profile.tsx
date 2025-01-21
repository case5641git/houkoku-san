import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../../molecules/InputField/InputField";
import { SelectBox } from "../../molecules/SelectBox/SelectBox";
import { DEPARTMENT_LIST } from "../../../constants/department";

export const Profile: React.FC = () => {
  return (
    <form className={styles.form} onSubmit={() => console.log("test")}>
      <div className={styles.profileContainer}>
        <InputField
          label="名前"
          name="name"
          value={"test"}
          onChange={() => console.log("test")}
          type="text"
        />
        <InputField
          label="メールアドレス"
          name="email"
          value="test"
          onChange={() => console.log("test")}
          type="email"
        />
        <SelectBox
          name="department"
          label="所属部署"
          list={DEPARTMENT_LIST}
          onChange={() => console.log("test")}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.reloadButton}>
            更新
          </button>
          <button type="submit" className={styles.leaveButton}>
            退会
          </button>
        </div>
        {/* TODO 退会確認機能実装 */}
        {/* <div className={styles.modalWrapper}>
          <div className={styles.modalInner}>
            <p>本当に退会しますか？</p>
            <div className={styles.buttonContainer}>
              <button className={styles.reloadButton}>戻る</button>
              <button className={styles.leaveButton}>退会</button>
            </div>
          </div>
        </div> */}
      </div>
    </form>
  );
};
