import React from "react";
import { BaseLayout } from "../BaseLayout/BaseLayout";
import { MainContentLayout } from "../MainContentLayout/MainContentLayout";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { ReportTable } from "../../organisms/ReportTable/ReportTable";

export const HomeTemplate: React.FC = () => {
  return (
    <BaseLayout>
      <Sidebar />
      <MainContentLayout>
        <ReportTable />
      </MainContentLayout>
    </BaseLayout>
  );
};
