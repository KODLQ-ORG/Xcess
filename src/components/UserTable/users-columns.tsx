// src/components/UserTable/users-columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";

import { useState } from "react";
import DeleteUserDialog from "./DeleteUserDialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import Link from "next/link";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    accessorKey: "display_name",
    header: "Display Name",
    cell({ row }) {
      const user = row.original;
      return (
        <Link
          href={`/user-review/${user.user_id}`}
          className="text-blue-500 hover:underline" // Add styling to the link
        >
          {user.display_name}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "job_title",
    header: "Job Title",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "is_active",
    header: "Is Active",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

      return (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <DeleteUserDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                user={user}
              />
            </DialogTrigger>
          </Dialog>
        </div>
      );
    },
  },
];
