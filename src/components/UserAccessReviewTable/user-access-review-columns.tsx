// src/components/UserAccessReviewTable/user-access-review-columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { AccessReview, User } from "@/types";

import { useSession } from "next-auth/react";
import { useApplicationData } from "@/app/providers";
import { Dialog, DialogTrigger } from "../ui/dialog";
import NotifyOwnerButton from "./NotifyOwnerButton";
import Link from "next/link";
import { access } from "fs";

export const columns: ColumnDef<AccessReview>[] = [
  {
    accessorKey: "application_id",
    header: "Application Name",
    cell: ({ row }) => {
      const accessReview = row.original;
      const { applications } = useApplicationData();

      const application = applications.find(
        (application) =>
          application.application_id === accessReview.application_id
      );

      return (
        <Link
          href={`/applications/${application?.application_id}`}
          className="text-blue-500 hover:underline" // Add styling to the link
        >
          {application?.application_name}
        </Link>
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
    accessorKey: "access_review_date",
    header: "Latest Access Review",
    cell: ({ row }) => {
      const accessReview = row.original;
      return new Date(accessReview.access_review_date).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const accessReview = row.original;
      const { users, applications, reviewers } = useApplicationData();

      const application = applications.find(
        (app) => accessReview.application_id === app.application_id
      )!;

      const accessReviewUser = users.find(
        (user) => user.user_id === accessReview.user_id
      )!;

      const { data: session } = useSession();

      const applicationOwner: User = users.find(
        (user) => application?.application_owner === user.user_id
      )!;

      const isReviewer =
        applicationOwner?.email === session?.user.email ||
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
                {applicationOwner && (
                  <NotifyOwnerButton
                    application_owner={applicationOwner}
                    user={accessReviewUser}
                    application={application}
                  />
                )}
              </DialogTrigger>
            </Dialog>
          </div>
        )
      );
    },
  },
];
