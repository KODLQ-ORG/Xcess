// src/app/users/page.tsx
"use client";

import ApplicationTable from "@/components/ApplicationTable/page";
import { useApplicationData } from "../providers";
import { useSession } from "next-auth/react";
import FullScreenLoading from "@/components/FullScreenLoading";

const MyApplicationPage = () => {
  const { users, applications, isLoading } = useApplicationData();
  const session = useSession();

  if (isLoading) {
    return <FullScreenLoading />;
  }
  return (
    <div>
      <ApplicationTable
        applications={applications.filter(
          (app) =>
            users.find((user) => user.user_id === app.application_owner)
              ?.email === session.data?.user.email
        )}
      />
    </div>
  );
};

export default MyApplicationPage;
