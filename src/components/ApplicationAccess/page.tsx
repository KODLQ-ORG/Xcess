// src/components/ApplicationAccessTable/page.tsx
"use client";

import { useState, useEffect } from "react";
import { AccessReview, NewAccessReview, User } from "@/types";
import { useApplicationData } from "@/app/providers";

import AddAccessReviewDialog from "@/components/ApplicationAccess/AddAccessReviewDialog";
import { columns } from "@/components/ApplicationAccess/application-access-columns";
import { DataTable } from "@/components/ApplicationAccess/data-table";
import { useSession } from "next-auth/react";
import { createAccessReview } from "@/utils/access-review-utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

interface ApplicationAccessTableProps {
  applicationId: number;
}

const ApplicationAccessTable = ({
  applicationId,
}: ApplicationAccessTableProps) => {
  const { data: session } = useSession();

  const { users, applications } = useApplicationData();
  const [isReviewer, setIsReviewer] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Add a state variable to trigger the useEffect hook
  const [resetSelection, setResetSelection] = useState(false); // Add resetSelection state

  const [accessReviews, setAccessReviews] = useState<AccessReview[]>([]);
  const [reviewers, setReviewers] = useState<User[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const application = applications.find(
    (app) => app.application_id === applicationId // No need for type annotation here
  );

  useEffect(() => {
    const fetchApplicationAccess = async () => {
      if (!applicationId) {
        return;
      }

      try {
        const accessReviewsResponse = await fetch(
          `/api/applications/${applicationId}/access-reviews`
        );

        const { accessReviews: accessReviewsData, reviewers: reviewersData } =
          await accessReviewsResponse.json();

        accessReviewsData.sort(
          (a: AccessReview, b: AccessReview) => b.review_id - a.review_id
        );

        const latestAccessReviews: AccessReview[] = [];
        const userIds = new Set();

        for (const review of accessReviewsData) {
          if (!userIds.has(review.user_id)) {
            latestAccessReviews.push(review);
            userIds.add(review.user_id);
          }
        }
        setAccessReviews(latestAccessReviews);

        const fetchedReviewers = reviewersData.map((reviewer: User) =>
          users.find((user) => user.user_id === reviewer.user_id)
        );

        setReviewers(fetchedReviewers as User[]); // Assuming you have a setReviewers state updater
      } catch (error) {
        console.error("Error fetching application access:", error);
      }
    };

    fetchApplicationAccess();
  }, [applicationId, users, refreshTrigger]);

  useEffect(() => {
    if (application && session) {
      const applicationOwnerEmail = users.find(
        (user) => application.application_owner === user.user_id
      )?.email;
      const isReviewer =
        applicationOwnerEmail === session?.user.email ||
        reviewers.some((reviewer) => reviewer.email === session?.user.email);
      setIsReviewer(isReviewer);
    }
  }, [application, session, reviewers, users]);
  const [selectedRows, setSelectedRows] = useState<AccessReview[]>([]);
  const handleRowSelectionChange = (selectedRows: AccessReview[]) => {
    setSelectedRows(selectedRows);
  };

  const handleCreateAccessReviews = async () => {
    try {
      // Iterate over selected rows and create access reviews
      for (const review of selectedRows) {
        const newAccessReview: NewAccessReview = {
          application_id: applicationId,
          user_id: review.user_id,
          access_level: review.access_level,
          access_justification: review.access_justification,
          access_approver: users.find(
            (user) => session?.user.email === user.email
          )?.user_id as string,
        };
        await createAccessReview(newAccessReview);
      }

      // Show success toast notification
      toast({
        title: "Success",
        description: "Access reviews created successfully.",
      });

      // Refresh the access reviews data
      setRefreshTrigger((prev) => !prev); // Update the refreshTrigger state variable
      setResetSelection(true);
    } catch (error) {
      console.error("Error creating access reviews:", error);

      // Show error toast notification
      toast({
        title: "Error",
        description: "Failed to create access reviews.",
        variant: "destructive",
      });
    }
  };

  if (!application) {
    return <div>Application not found.</div>;
  }
  return (
    <div>
      {isReviewer && (
        <div className="flex items-center py-4">
          <AddAccessReviewDialog
            open={openAddDialog}
            setOpen={setOpenAddDialog}
            applicationId={applicationId}
            setRefreshTrigger={setRefreshTrigger}
          />

          <Button
            onClick={handleCreateAccessReviews}
            disabled={selectedRows.length === 0}
          >
            Create Access Reviews
          </Button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={accessReviews}
        onRowSelectionChange={handleRowSelectionChange}
        resetSelection={resetSelection}
      />
    </div>
  );
};

export default ApplicationAccessTable;
