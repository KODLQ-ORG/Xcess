// src/app/applications/page.tsx
"use client";

import ApplicationTable from "@/components/ApplicationTable/page";

import { useApplicationData } from "../providers";
import FullScreenLoading from "@/components/FullScreenLoading";

import CreateApplicationDialog from "@/components/ApplicationTable/CreateApplicationDialog";
import { TypographyH2 } from "@/components/ui/typography";

const ApplicationPage = () => {
  const { applications, isLoading } = useApplicationData();

  if (isLoading) {
    return <FullScreenLoading />;
  }
  return (
    <div>
      <TypographyH2>Application List</TypographyH2>
      <CreateApplicationDialog />
      <ApplicationTable applications={applications} />
    </div>
  );
};

export default ApplicationPage;
