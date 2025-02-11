// src/pages/api/applications/[applicationId].ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const applicationId = parseInt(req.query.applicationId as string, 10);
  if (req.method === "PUT") {
    // Edit application logic
    try {
      const {
        application_name,
        application_owner,
        auth_method,
        pii,
        financial_data,
        intellectual_property,
        application_status,
        application_purpose,
      } = req.body;

      const updatedApplication = await prisma.applications.update({
        where: { application_id: applicationId },
        data: {
          application_name,
          application_owner,
          auth_method,
          pii,
          financial_data,
          intellectual_property,
          application_status,
          application_purpose,
        },
      });
      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ message: "Failed to update application" });
    }
  } else if (req.method === "DELETE") {
    // Delete application logic
    try {
      await prisma.applications.delete({
        where: { application_id: applicationId },
      });
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ message: "Failed to delete application" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
