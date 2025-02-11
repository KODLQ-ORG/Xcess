// pages/api/access-reviews/[reviewId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const reviewId = Number(req.query.reviewId);
      const { access_level, access_justification, access_approver } = req.body;

      // Validate input
      if (!access_level || !access_justification || !access_approver) {
        return res.status(400).json({
          error:
            "accessLevel, accessJustification, and accessApprover are required",
        });
      }

      // Update the access review
      const updatedReview = await prisma.access_reviews.update({
        where: { review_id: reviewId },
        data: {
          access_level,
          access_justification,
          access_approver,
          access_review_date: new Date(),
        },
      });

      res.status(200).json(updatedReview);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const reviewId = Number(req.query.reviewId);

      // Delete the access review
      await prisma.access_reviews.delete({
        where: { review_id: reviewId },
      });

      res.status(200).json({ message: "Access review deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
