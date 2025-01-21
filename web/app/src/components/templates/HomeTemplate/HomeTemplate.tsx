import React, { useState, useEffect } from "react";
import { BaseLayout } from "../BaseLayout/BaseLayout";
import { MainContentLayout } from "../MainContentLayout/MainContentLayout";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { ReportTable } from "../../organisms/ReportTable/ReportTable";
import { ReportView } from "../../organisms/ReportView/ReportView";
import { ReportRegist } from "../../organisms/ReportRegist/ReportRegist";
import { Profile } from "../../organisms/Profile/Profile";
import { useComponentSwitch } from "../../../contexts/ComponentSwitchContext";
import { COMPONENT_LIST } from "../../../constants/component";

export const HomeTemplate: React.FC = () => {
  const { currentContent } = useComponentSwitch();

  return (
    <BaseLayout>
      <Sidebar />
      <MainContentLayout>
        <div key={currentContent}>
          {currentContent === COMPONENT_LIST.INDEX && <ReportTable />}
          {currentContent === COMPONENT_LIST.DETAIL && <ReportView />}
          {currentContent === COMPONENT_LIST.REGIST && <ReportRegist />}
          {/* {currentContent === COMPONENT_LIST.PASSWORD && <PasswordChange />} */}
          {currentContent === COMPONENT_LIST.PROFILE && <Profile />}
        </div>
      </MainContentLayout>
    </BaseLayout>
  );
};
