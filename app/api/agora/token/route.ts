import { NextResponse } from "next/server";
import { createToken } from "@/lib/createtoken";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const channelName = searchParams.get("channel");
  const uid = crypto.getRandomValues(new Uint32Array(1))[0];

  if (!channelName) {
    return NextResponse.json({ error: "Missing Channel" }, { status: 404 });
  }

  const token = createToken(channelName, uid);

  return NextResponse.json({ token, uid });
}
