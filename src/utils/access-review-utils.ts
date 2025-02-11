// src/utils/access-review-utils.ts

import { AccessReview, NewAccessReview } from "@/types";

export const createAccessReview = async (accessReview: NewAccessReview) => {
  try {
    const applicationId = accessReview.application_id;
    const response = await fetch(
      `/api/applications/${applicationId}/access-reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accessReview),
      }
    );

    if (!response.ok) {
      const message = `Error creating access review: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in createAccessReview:", error);
    throw error;
  }
};

export const editAccessReview = async (
  accessReview: AccessReview,
  updatedData: NewAccessReview
) => {
  try {
    const applicationId = accessReview.application_id;
    const reviewId = accessReview.review_id;
    const response = await fetch(
      `/api/applications/${applicationId}}/access-reviews/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      const message = `Error updating access review: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("Error in editAccessReview:", error);
    throw error;
  }
};

export const deleteAccessReview = async (accessReview: AccessReview) => {
  try {
    const applicationId = accessReview.application_id;
    const reviewId = accessReview.review_id;

    const response = await fetch(
      `/api/applications/${applicationId}}/access-reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const message = `Error deleting access review: ${response.status} ${response.statusText}`;
      console.error(message);
      throw new Error(message);
    }
  } catch (error) {
    console.error("Error in deleteAccessReview:", error);
    throw error;
  }
};
