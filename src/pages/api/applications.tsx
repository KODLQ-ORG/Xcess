// src/pages/api/applications.ts
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

      // Create the new application
      const newApplication = await prisma.applications.create({
        data: {
          application_name: body.application_name,
          application_owner: body.application_owner,
          application_purpose: body.application_purpose,
          auth_method: body.auth_method,
          pii: body.pii,
          financial_data: body.financial_data,
          intellectual_property: body.intellectual_property,
          application_status: body.application_status,
        },
      });

      // Respond with the new application
      res.status(200).json(newApplication);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ message: "Failed to create application" });
    }
  } else if (req.method === "GET") {
    try {
      const applications = await prisma.applications.findMany();

      res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
