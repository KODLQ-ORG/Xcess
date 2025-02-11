"use client";

import { useEffect, useState } from "react";
import { AccessReview } from "@/types";
import { DataTable } from "@/components/UserAccessReviewTable/data-table";
import { columns } from "@/components/UserAccessReviewTable/user-access-review-columns";

interface UserAccessReviewsTableProps {
  userId: string;
}

const UserAccessReviewsTable = ({ userId }: UserAccessReviewsTableProps) => {
  const [accessReviews, setAccessReviews] = useState<AccessReview[]>([]);

  useEffect(() => {
    const fetchAccessReviews = async () => {
      if (userId === "") {
        setAccessReviews([]);
        return;
      }

      try {
        const response = await fetch(`/api/access-reviews?user_id=${userId}`);
        const data = await response.json();
        setAccessReviews(data);
      } catch (error) {
        console.error("Error fetching access reviews:", error);
      }
    };

    fetchAccessReviews();
  }, [userId]);

  return (
    <div>
      <DataTable columns={columns} data={accessReviews} />
    </div>
  );
};

export default UserAccessReviewsTable;
