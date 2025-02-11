"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

import { Dialog, DialogTrigger } from "../ui/dialog";

import EditApplicationDialog from "./EditApplicationDialog";
import DeleteApplicationDialog from "./DeleteApplicationDialog";

import { Application, User } from "@/types";
import { useApplicationData } from "@/app/providers";
import { useSession } from "next-auth/react";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "application_id",
    header: "Application ID",
  },
  {
    accessorKey: "application_name",
    header: "Name",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Link
          href={`/applications/${application.application_id}`}
          className="text-blue-500 hover:underline" // Add styling to the link
        >
          {application.application_name}
        </Link>
      );
    },
  },
  {
    accessorKey: "application_owner",
    header: "Owner",
    cell: ({ row }) => {
      const application = row.original;

      const { users } = useApplicationData();

      const owner = users.find(
        (user: User) => user.user_id === application.application_owner
      );

      return owner?.email || "Unknown Owner";
    },
    enableSorting: false,
  },
  {
    accessorKey: "application_purpose",
    header: "Purpose",
  },
  {
    accessorKey: "application_status",
    header: "Status",
  },
  {
    accessorKey: "auth_method",
    header: "Auth Method",
  },
  {
    accessorKey: "latest_access_review",
    header: "Latest Access Review",
    cell: ({ row }) => {
      const date = row.getValue("latest_access_review"); // Assuming this is a string
      const formattedDate =
        typeof date === "string" ? new Date(date).toLocaleDateString() : "N/A";

      return <div className="text-right">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "pii",
    header: "PII",
  },
  {
    accessorKey: "financial_data",
    header: "Financial Data",
  },
  {
    accessorKey: "intellectual_property",
    header: "Intellectual Property",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
      const { users, reviewers } = useApplicationData();
      const { data: session } = useSession();

      const [openEditDialog, setOpenEditDialog] = useState(false);
      const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
                <EditApplicationDialog
                  editOpen={openEditDialog}
                  setEditOpen={setOpenEditDialog}
                  application={application}
                />
              </DialogTrigger>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <DeleteApplicationDialog
                  deleteOpen={openDeleteDialog}
                  setDeleteOpen={setOpenDeleteDialog}
                  application={application}
                />
              </DialogTrigger>
            </Dialog>
          </div>
        )
      );
    },
  },
];
