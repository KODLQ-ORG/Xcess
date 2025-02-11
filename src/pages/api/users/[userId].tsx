// src/pages/api/users/[userId].ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const userId = req.query.userId as string;

      // Delete the user
      await prisma.users.delete({
        where: { user_id: userId },
      });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
