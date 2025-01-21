import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { InputField } from "../../molecules/InputField/InputField";
import { useChatContext } from "../../../contexts/MessageContext";
import { useUserContext } from "../../../contexts/UserContext";
import { useReportContext } from "../../../contexts/ReportContext";

export const Chat: React.FC = () => {
  const { users } = useUserContext();
  const { messages, newMessage, setNewMessage, sendMessage } = useChatContext();
  const { report } = useReportContext();
  const reportId = report ? report.id : 0;
  const userId = users.user.id;
  useEffect(() => {
    let target = document.getElementById("messageScroll");
    if (target) {
      target.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <div className={styles.chatArea}>
      <div className={styles.chatAreaInner}>
        <div className={styles.messageArea}>
          <div id="messageScroll">
            {Object.entries(messages).map(([key, value], index) => {
              if (value.user_id === userId) {
                return (
                  <div className={styles.ownMessageArea} key={value.id}>
                    <div className={styles.ownMessageAreaInner}>
                      <div className={styles.senderName}>
                        <p>{value.user.name}</p>
                      </div>
                      <div className={styles.ownMessage}>
                        <p>{value.message}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={styles.otherMessageArea} key={value.id}>
                    <div className={styles.otherMessageAreaInner}>
                      <div className={styles.senderName}>
                        <p>{value.user.name}</p>
                      </div>
                      <div className={styles.otherMessage}>
                        <p>{value.message}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={styles.inputField}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="メッセージを入力"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={() => sendMessage(reportId)}>更新</button>
          </div>
        </div>
      </div>
    </div>
  );
};
