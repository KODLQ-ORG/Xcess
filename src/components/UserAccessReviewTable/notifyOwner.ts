"use server";

import { Application, User } from "@/types";

export async function notifyOwner(
  application_owner: User,
  user: User,
  application: Application
) {
  try {
    const webhookUrl = process.env.MS_TEAMS_WEBHOOK_URL; // Make sure to set this environment variable

    if (!webhookUrl) {
      console.error("Teams webhook URL not found.");
      throw new Error("Teams webhook URL not found.");
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dueDate = tomorrow.toLocaleDateString();

    // Send the notification to the Teams webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "@type": "MessageCard",
        "@context": "http://schema.org/extensions",
        themeColor: "0076D7",
        summary: "Access Review Required",
        sections: [
          {
            activityTitle: "Access Review Required",
            activitySubtitle: `${user.display_name} access need to be reviewed.`,
            activityImage: "https://adaptivecards.io/content/items/review.png",
            markdown: true,
            facts: [
              {
                name: "Assigned to",
                value: application_owner.display_name,
              },
              {
                name: "Application",
                value: application.application_name,
              },
              {
                name: "Due Date",
                value: dueDate,
              },
            ],
          },
        ],
        potentialAction: [
          {
            "@type": "ActionCard",
            name: "Change status",
            inputs: [
              {
                "@type": "MultichoiceInput",
                id: "list",
                title: "Select a status",
                isMultiSelect: "false",
                value: "1",
                choices: [
                  {
                    display: "Pending",
                    value: "1",
                  },
                  {
                    display: "Closed",
                    value: "2",
                  },
                ],
              },
            ],
            actions: [
              {
                "@type": "OpenUri",
                name: "View Application",
                targets: [
                  {
                    os: "default",
                    uri: `http://localhost:3000/applications/${application.application_id}`,
                  },
                ],
              },
              {
                "@type": "OpenUri",
                name: "View User Reviews",
                targets: [
                  {
                    os: "default",
                    uri: `http://localhost:3000/user-review/${user.user_id}`,
                  },
                ],
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("Failed to send notification to Teams webhook");
      throw new Error("Failed to send notification to Teams webhook");
    }
  } catch (error) {
    console.error("Error in notifyOwner server action:", error);
    throw error;
  }
}
