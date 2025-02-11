// pages/api/applications/[applicationId]/access-reviews.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateEarliestAccessReview = async (applicationId: number) => {
  const accessReviews = await prisma.access_reviews.findMany({
    where: { application_id: applicationId },
  });

  accessReviews.sort((a, b) => {
    return b.review_id - a.review_id;
  });

  const latestAccessReviews = [];
  const userIds = new Set();

  for (const review of accessReviews) {
    if (!userIds.has(review.user_id)) {
      latestAccessReviews.push(review);
      userIds.add(review.user_id);
    }
  }

  await prisma.applications.update({
    where: { application_id: applicationId },
    data: {
      latest_access_review: latestAccessReviews.pop()?.access_review_date,
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const applicationId = Number(req.query.applicationId);

  if (req.method === "GET") {
    try {
      const accessReviews = await prisma.access_reviews.findMany({
        where: { application_id: applicationId },
      });

      const reviewers = await prisma.application_reviewers.findMany({
        where: { application_id: applicationId },
        select: {
          users: true,
        },
      });

      res.status(200).json({ accessReviews, reviewers });
    } catch (error) {
      console.error("Error fetching access reviews:", error);
      res.status(500).json({ message: "Failed to fetch access reviews" });
    }
  } else if (req.method === "POST") {
    try {
      const { user_id, access_level, access_justification, access_approver } =
        req.body;

      // Validate input
      if (
        !user_id ||
        !access_level ||
        !access_justification ||
        !access_approver
      ) {
        return res.status(400).json({
          error:
            "applicationId, userId, accessLevel, accessJustification, and accessApprover are required",
        });
      }

      // Check if the user is a reviewer OR the application owner (combined query)
      const isAuthorized = await prisma.applications.findFirst({
        where: {
          application_id: applicationId,
          OR: [
            { application_reviewers: { some: { user_id: access_approver } } },
            { application_owner: access_approver },
          ],
        },
      });

      if (!isAuthorized) {
        return res.status(403).json({
          error:
            "User is not authorized to perform reviews for this application",
        });
      }

      // Insert the new access review
      const newReview = await prisma.access_reviews.create({
        data: {
          application_id: applicationId,
          user_id,
          access_level,
          access_justification,
          access_approver,
        },
      });
      await updateEarliestAccessReview(applicationId); // Call the function after creating the review

      res.status(200).json(newReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
