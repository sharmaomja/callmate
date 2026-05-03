import { createToken } from "@/lib/createtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const agentUid = Math.floor(Math.random() * 1000);
  const userUid = searchParams.get("uid");
  const channelName = searchParams.get("channel");

  if (!userUid) {
    return NextResponse.json({ error: "Missing user UID" }, { status: 400 });
  } else {
    console.log("Remote user uid", userUid)
  }

  if (!channelName) {
    return NextResponse.json({ error: "Missing Channel" }, { status: 404 });
  }

  const appId = process.env.AGORA_APP_ID;
  if (!appId) {
    throw Error("appId not found");
  }
  const certificate = process.env.AGORA_APP_CERTIFICATE;
  if (!certificate) {
    throw Error("certificate not found");
  }
  const expirationTimeInSeconds = 3600;
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const tokenExpireTime = currentTimeStamp + expirationTimeInSeconds;

  const token = createToken(channelName, Number(agentUid));
  console.log("MY TOKEN", token);

  const agentPayload = {
    name: "my-agent",
    preset: "openai_tts_1,openai_gpt_4o_mini",
    properties: {
      channel: channelName,
      token: token,
      agent_rtc_uid: String(agentUid),
      remote_rtc_uids: [String(userUid)],
      llm: {
        system_messages: [
          {
            role: "system",
            content: "You are a helpful chatbot.",
          },
        ],
        greeting_message: "Hello, how can I help you?",
        failure_message: "Sorry, I don't know how to answer this question.",
        max_history: 10,
      },
      asr: { language: "en-US" },
    },
  };

  const basicAuth = Buffer.from(
    `${process.env.AGORA_CUSTOMER_ID}:${process.env.AGORA_CUSTOMER_SECRET}`,
  ).toString("base64");

  try {
    const res = await fetch(
      `https://api.agora.io/api/conversational-ai-agent/v2/projects/${appId}/join`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentPayload),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 409) {
        console.log("Agent already running, continuing...");

        return NextResponse.json({
          agent: data,
          agentUid,
          alreadyRunning: true,
        });
      }

      throw new Error(
        `Request failed: ${res.status} - ${JSON.stringify(data)}`,
      );
    }
    console.log("Agent started:", data);
    return NextResponse.json({ agent: data, agentUid });
  } catch (err) {
    console.error("Error starting agent:", err);
    throw err;
  }
}
