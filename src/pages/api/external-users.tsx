// src/pages/api/external-users.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      // Create the new external user
      const newExternalUser = await prisma.external_users.create({
        data: {
          full_name: body.full_name,
          email: body.email,
          company: body.company,
        },
      });

      // Respond with the new external user
      res.status(200).json(newExternalUser);
    } catch (error) {
      console.error("Error creating external user:", error);
      res.status(500).json({ message: "Failed to create external user" });
    }
  } else if (req.method === "GET") {
    try {
      const externalUsers = await prisma.external_users.findMany();
      res.status(200).json(externalUsers);
    } catch (error) {
      console.error("Error fetching external users:", error);
      res.status(500).json({ message: "Failed to fetch external users" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
