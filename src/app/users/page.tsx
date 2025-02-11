// src/app/users/page.tsx
"use client";

import { useApplicationData } from "../providers";
import FullScreenLoading from "@/components/FullScreenLoading";
import { DataTable as ExternalUsersTable } from "@/components/ExternalUsersTable/data-table";
import { DataTable as UsersTable } from "@/components/UserTable/data-table";
import { columns as userColumns } from "@/components/UserTable/users-columns";
import { columns as externalUserColumns } from "@/components/ExternalUsersTable/external-users-columns";
import { TypographyH2 } from "@/components/ui/typography";

const UsersPage = () => {
  const { users, externalUsers, isLoading } = useApplicationData();

  if (isLoading) {
    return <FullScreenLoading />;
  }
  return (
    <div>
      <TypographyH2>External Users List</TypographyH2>
      {externalUsers.length > 0 ? (
        <ExternalUsersTable
          columns={externalUserColumns}
          data={externalUsers}
        />
      ) : (
        <p>Loading external users...</p>
      )}

      <TypographyH2>Internal Users List</TypographyH2>
      {users.length > 0 ? (
        <UsersTable columns={userColumns} data={users} />
      ) : (
        <p>Loading internal users...</p>
      )}
    </div>
  );
};

export default UsersPage;
