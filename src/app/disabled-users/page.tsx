// src/app/disabled-users/page.tsx
"use client";

import { useApplicationData } from "../providers";
import FullScreenLoading from "@/components/FullScreenLoading";
import { DataTable as UsersTable } from "@/components/UserTable/data-table";
import { columns as userColumns } from "@/components/UserTable/users-columns";
import { TypographyH2 } from "@/components/ui/typography";

const DisabledUsersPage = () => {
  const { disabledUsers, isLoading } = useApplicationData();

  if (isLoading) {
    return <FullScreenLoading />;
  }
  return (
    <div>
      <TypographyH2>Disabled Users List</TypographyH2>
      {disabledUsers.length > 0 ? (
        <UsersTable columns={userColumns} data={disabledUsers} />
      ) : (
        <p>Loading internal users...</p>
      )}
    </div>
  );
};

export default DisabledUsersPage;
