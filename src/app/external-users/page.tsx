// src/app/external-users/page.tsx
"use client";

import { useState } from "react";
import { useApplicationData } from "@/app/providers";
import { DataTable } from "@/components/ExternalUsersTable/data-table";
import { columns as externalUsersColumns } from "@/components/ExternalUsersTable/external-users-columns";
import AddExternalUserDialog from "@/components/ExternalUsersTable/AddExternalUserDialog";
import { TypographyH2 } from "@/components/ui/typography";
import FullScreenLoading from "@/components/FullScreenLoading";

const ExternalUsersPage = () => {
  const { externalUsers, isLoading } = useApplicationData();
  const [openAddDialog, setOpenAddDialog] = useState(false);

  if (isLoading) {
    return <FullScreenLoading />;
  }
  return (
    <div>
      <TypographyH2>External Users List</TypographyH2>

      <AddExternalUserDialog
        addOpen={openAddDialog}
        setAddOpen={setOpenAddDialog}
      />
      <DataTable columns={externalUsersColumns} data={externalUsers} />
    </div>
  );
};

export default ExternalUsersPage;
