import React from "react";
import { ReportProvider } from "../../contexts/ReportContext";
import { HomeTemplate } from "../../components/templates/HomeTemplate/HomeTemplate";
import { UserProvider } from "../../contexts/UserContext";
import { ComponentSwitchProvider } from "../../contexts/ComponentSwitchContext";
import { MessageProvider } from "../../contexts/MessageContext";

export const Home: React.FC = () => {
  return (
    <UserProvider>
      <ComponentSwitchProvider>
        <ReportProvider>
          <MessageProvider>
            <HomeTemplate />
          </MessageProvider>
        </ReportProvider>
      </ComponentSwitchProvider>
    </UserProvider>
  );
};
