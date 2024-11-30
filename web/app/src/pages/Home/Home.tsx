import React from "react";
import { ReportProvider } from "../../contexts/ReportContext";
import { HomeTemplate } from "../../components/templates/HomeTemplate/HomeTemplate";
import { UserProvider } from "../../contexts/UserContext";

export const Home: React.FC = () => {
  return (
    <ReportProvider>
      <UserProvider>
        <HomeTemplate />
      </UserProvider>
    </ReportProvider>
  );
};
