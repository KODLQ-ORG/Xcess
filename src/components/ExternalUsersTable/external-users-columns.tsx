// src/components/ExternalUserTable/external-users-columns.tsx

import { useState } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ExternalUser } from "@/types";

import { Dialog, DialogTrigger } from "../ui/dialog";

import EditExternalUserDialog from "./EditExternalUserDialog";
import DeleteExternalUserDialog from "./DeleteExternalUserDialog";

export const columns: ColumnDef<ExternalUser>[] = [
  {
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const externalUser = row.original;

      const [openEditDialog, setOpenEditDialog] = useState(false);
      const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <EditExternalUserDialog
                editOpen={openEditDialog}
                setEditOpen={setOpenEditDialog}
                externalUser={externalUser}
              />
            </DialogTrigger>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <DeleteExternalUserDialog
                deleteOpen={openDeleteDialog}
                setDeleteOpen={setOpenDeleteDialog}
                externalUser={externalUser}
              />
            </DialogTrigger>
          </Dialog>
        </div>
      );
    },
  },
];
