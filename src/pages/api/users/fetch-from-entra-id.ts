// src/pages/api/users/fetch-from-entra-id.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Client } from "@microsoft/microsoft-graph-client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await getServerSession(req, res, authOptions);
      console.log("Session: ", session);
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const accessToken = session.user.accessToken;

      const client = Client.init({
        authProvider: (done) => {
          done(null, accessToken);
        },
      });

      // Fetch users from Microsoft Entra ID with paging
      let users: any[] = [];
      let nextPageUrl =
        "https://graph.microsoft.com/v1.0/users?$select=id,mail,displayName,givenName,surname,department,jobTitle,accountEnabled";

      while (nextPageUrl) {
        const response = await client.api(nextPageUrl).get();
        users = users.concat(response.value);
        nextPageUrl = response["@odata.nextLink"];
      }
      console.log("Users: ", users);

      // Insert or update users in the database
      for (const user of users) {
        try {
          const userId = user.id;
          const displayName = user.displayName;
          const firstName = user.givenName;
          const lastName = user.surname;
          const email = user.mail;
          const department = user.department;
          const jobTitle = user.jobTitle;
          const isActive = user.accountEnabled;

          if (
            !displayName ||
            !firstName ||
            !lastName ||
            !email ||
            !department ||
            !jobTitle ||
            !isActive
          ) {
            console.log(
              `Skipping user ${user.user_id} due to missing email or displayName`
            );
            continue;
          }

          await prisma.users.upsert({
            where: { user_id: userId },
            update: {
              display_name: displayName,
              email: email,
              first_name: firstName,
              last_name: lastName,
              job_title: jobTitle,
              department: department,
              is_active: isActive,
            },
            create: {
              user_id: userId,
              display_name: displayName,
              email: email,
              first_name: firstName,
              last_name: lastName,
              job_title: jobTitle,
              department: department,
              is_active: isActive,
            },
          });
        } catch (error) {
          console.error(`Error processing user ${user.user_id}:`, error);
        }
      }

      res.json({
        message: "Users fetched from Entra ID and updated in the database.",
      });
    } catch (error) {
      console.error("Error fetching users from Entra ID:", error);
      res.status(500).json({ error: "Failed to fetch users from Entra ID." });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
