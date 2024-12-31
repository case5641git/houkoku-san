import React from "react";
import styles from "./styles.module.css";
import { InputField } from "../../molecules/InputField/InputField";

export const Chat: React.FC = () => {
  return (
    <div className={styles.chatArea}>
      <div className={styles.chatAreaInner}>
        <div className={styles.messageArea}>
          <div className={styles.ownMessageArea}>
            <div className={styles.ownMessageAreaInner}>
              <div className={styles.senderName}>
                <p>xxxx店長</p>
              </div>
              <div className={styles.ownMessage}>
                <p>こんにちは</p>
              </div>
              <div className={styles.senderOptions}>
                <span>既読</span>
                <span>削除</span>
              </div>
            </div>
          </div>

          <div className={styles.otherMessageArea}>
            <div className={styles.otherMessageAreaInner}>
              <div className={styles.senderName}>
                <p>xxxx店長</p>
              </div>
              <div className={styles.otherMessage}>
                <p>こんにちは</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputBox}>
            <input type="text" placeholder="メッセージを入力" />
            <button>送信</button>
          </div>
        </div>
      </div>
    </div>
  );
};
