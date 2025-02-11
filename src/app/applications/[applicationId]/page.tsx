// src/app/applications/[applicationId]/page.tsx
"use client";

import { useApplicationData } from "@/app/providers";
import FullScreenLoading from "@/components/FullScreenLoading";

import { useParams } from "next/navigation";
import ApplicationAccessTable from "@/components/ApplicationAccess/page";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";

const ApplicationAccessPage = () => {
  const params = useParams();
  const applicationId = parseInt(params?.applicationId as string);
  const { isLoading, applications, users } = useApplicationData();

  const application = applications.find(
    (app) => app.application_id === applicationId
  );
  const owner = users.find(
    (user) => user.user_id === application?.application_owner
  );

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <div>
      <TypographyH1>{application?.application_name}</TypographyH1>
      <TypographyH2>Owner: {owner?.display_name}</TypographyH2>
      <TypographyP>{application?.application_purpose}</TypographyP>

      <ApplicationAccessTable applicationId={applicationId} />
    </div>
  );
};

export default ApplicationAccessPage;
