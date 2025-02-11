// src/components/ApplicationAccessTable/application-access-columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { AccessReview } from "@/types";

import { useSession } from "next-auth/react";
import { useApplicationData } from "@/app/providers";
import EditAccessReviewDialog from "./EditAccessReviewDialog";
import { Dialog, DialogTrigger } from "../ui/dialog";
import DeleteAccessReviewDialog from "./DeleteAccessReviewDialog";
import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<AccessReview>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_id",
    header: "User",
    cell: ({ row }) => {
      const accessReview = row.original;

      const { users, disabledUsers, externalUsers } = useApplicationData();

      const user = [...users, ...disabledUsers].find(
        (user) => user.user_id === accessReview.user_id
      );
      const externalUser = externalUsers.find(
        (externalUser) => externalUser.user_id === accessReview.user_id
      );

      return user ? (
        <Link
          href={`/user-review/${user?.user_id}`}
          className="text-blue-500 hover:underline"
        >
          {user.display_name}
        </Link>
      ) : externalUser ? (
        <Link
          href={`/external-user-review/${externalUser?.user_id}`}
          className="text-blue-500 hover:underline"
        >
          {externalUser.full_name}
        </Link>
      ) : (
        <div>User not found</div>
      );
    },
  },
  {
    accessorKey: "access_level",
    header: "Access Level",
  },
  {
    accessorKey: "access_justification",
    header: "Access Justification",
  },
  {
    accessorKey: "access_review_date",
    header: "Access Review Date",
    cell: ({ row }) => {
      const accessReview = row.original;

      return new Date(accessReview.access_review_date).toLocaleDateString();
    },
  },
  {
    accessorKey: "access_approver",
    header: "Access Approver",
    cell: ({ row }) => {
      const accessReview = row.original;

      const { users } = useApplicationData();

      const approver = users.find(
        (user) => user.user_id === accessReview.access_approver
      );

      return approver?.email || "Unknown Approver";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const accessReview = row.original;
      const { users, applications, reviewers } = useApplicationData();
      const { data: session } = useSession();

      const [openEditDialog, setOpenEditDialog] = useState(false);
      const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

      const application = applications.find(
        (app) => app.application_id === accessReview.application_id // No need for type annotation here
      );

      const applicationOwnerEmail = users.find(
        (user) => application?.application_owner === user.user_id
      )?.email;

      const isReviewer =
        applicationOwnerEmail === session?.user.email ||
        reviewers.some(
          (reviewer) =>
            reviewer.application_id === application?.application_id &&
            users.find((user) => user.email === session?.user.email)
              ?.user_id === reviewer.user_id
        );

      return (
        isReviewer && (
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <EditAccessReviewDialog
                  open={openEditDialog}
                  setOpen={setOpenEditDialog}
                  accessReview={accessReview}
                />
              </DialogTrigger>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <DeleteAccessReviewDialog
                  open={openDeleteDialog}
                  setOpen={setOpenDeleteDialog}
                  accessReview={accessReview}
                />
              </DialogTrigger>
            </Dialog>
          </div>
        )
      );
    },
  },
];
