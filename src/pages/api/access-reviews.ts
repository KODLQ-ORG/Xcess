// pages/api/access-reviews.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { user_id } = req.query;

      const accessReviews = await prisma.access_reviews.findMany({
        where: { user_id: String(user_id) }, // Filter by user_id
      });
      res.status(200).json(accessReviews);
    } catch (error) {
      console.error("Error fetching access reviews:", error);
      res.status(500).json({ message: "Failed to fetch access reviews" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
