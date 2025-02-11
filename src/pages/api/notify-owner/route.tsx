// src/app/api/notify-owner/route.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { Client } from "@microsoft/microsoft-graph-client";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION: ", session);
    const { recipientId } = await req.json();
    console.log("RECIPIENT: ", recipientId);
    if (!session?.user?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use the access token from the NextAuth.js session
    const client = Client.init({
      authProvider: (done) => {
        done(null, session.user.accessToken);
      },
    });
    console.log("CLIENT: ", client);

    // Send the Teams message using Microsoft Graph API
    await client.api(`/users/${recipientId}/teams/sendMessage`).post({
      message: {
        content: "HI, you are notified",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending Teams notification:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
