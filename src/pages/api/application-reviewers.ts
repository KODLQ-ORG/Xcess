// pages/api/application-reviewers.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const applicationReviewers = await prisma.application_reviewers.findMany({
        include: {
          users: true,
        },
      });
      res.status(200).json(applicationReviewers);
    } catch (error) {
      console.error("Error fetching application reviewers:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch application reviewers" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
