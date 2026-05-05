import { NextResponse } from "next/server";
import { createToken } from "@/lib/createtoken";
import { createAgoraUid } from "@/lib/agoraUid";

/*
 * Token Generation Endpoint
 * Generates a unique UID + RTC token for a client to join a channel.
 *
 * Flow:
 * 1. Read channel from query
 * 2. Generate unique UID
 * 3. Create Agora token
 * 4. Return token + UID to client
 */

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const channelName = searchParams.get("channel");
  const uid = createAgoraUid();

  console.log("[agora/token] request", {
    channelName,
    uid,
    uidType: typeof uid,
  });

  if (!channelName) {
    return NextResponse.json({ error: "Missing Channel" }, { status: 404 });
  }

  // Generate RTC token
  const token = createToken(channelName, uid);

  console.log("[agora/token] response", {
    channelName,
    uid,
    uidType: typeof uid,
    tokenPreview: typeof token === "string" ? `${token.slice(0, 16)}...` : null,
  });

  // Send credentials to client
  return NextResponse.json({ token, uid });
}
