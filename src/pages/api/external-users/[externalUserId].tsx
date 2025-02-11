// src/pages/api/external-users/[externalUserId].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const body = req.body;
      const externalUserId = req.query.externalUserId as string;

      // Update the external user
      const updatedExternalUser = await prisma.external_users.update({
        where: { user_id: externalUserId },
        data: {
          full_name: body.full_name,
          email: body.email,
          company: body.company,
        },
      });

      // Respond with the updated external user
      res.status(200).json(updatedExternalUser);
    } catch (error) {
      console.error("Error updating external user:", error);
      res.status(500).json({ message: "Failed to update external user" });
    }
  } else if (req.method === "DELETE") {
    try {
      const externalUserId = req.query.externalUserId as string;

      // Delete the external user
      await prisma.external_users.delete({
        where: { user_id: externalUserId },
      });

      res.status(200).json({ message: "External user deleted successfully" });
    } catch (error) {
      console.error("Error deleting external user:", error);
      res.status(500).json({ message: "Failed to delete external user" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
