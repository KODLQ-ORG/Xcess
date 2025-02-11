// src/app/users/page.tsx
"use client";

import FetchEntraIDUsersButton from "@/components/FetchEntraIDUsersButton";
import { useApplicationData } from "../providers";
import FullScreenLoading from "@/components/FullScreenLoading";
import { DataTable as UsersTable } from "@/components/UserTable/data-table";
import { columns as userColumns } from "@/components/UserTable/users-columns";
import { TypographyH2 } from "@/components/ui/typography";

const InternalUsersPage = () => {
  const { users, isLoading } = useApplicationData();

  if (isLoading) {
    return <FullScreenLoading />;
  }
  return (
    <div>
      <TypographyH2>Internal Users List</TypographyH2>
      <FetchEntraIDUsersButton></FetchEntraIDUsersButton>
      {users.length > 0 ? (
        <UsersTable columns={userColumns} data={users} />
      ) : (
        <p>Loading internal users...</p>
      )}
    </div>
  );
};

export default InternalUsersPage;
