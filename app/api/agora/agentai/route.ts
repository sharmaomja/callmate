import { createToken } from "@/lib/createtoken";
import { createAgoraUid } from "@/lib/agoraUid";
import { NextResponse } from "next/server";

/*
 * AI Agent Join Endpoint
 *
 * Spins up an Agora Conversational AI agent and injects it into a channel.
 *
 * Flow:
 * 1. Validate incoming request (channel + user UID)
 * 2. Generate a unique UID for the agent (avoid collision with user)
 * 3. Create Agora RTC token for agent
 * 4. Build agent config (LLM + TTS + ASR)
 * 5. Call Agora API to join agent into channel
 * 6. Return agent metadata + UID
 */

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const userUid = searchParams.get("uid");
  const channelName = searchParams.get("channel");

  // Validate required inputs
  if (!userUid) {
    return NextResponse.json({ error: "Missing user UID" }, { status: 400 });
  }

  const parsedUserUid = Number(userUid);

  // Generate unique agent UID (must not collide with user)
  const agentUid = (() => {
    let nextUid = createAgoraUid();

    while (nextUid === parsedUserUid) {
      nextUid = createAgoraUid();
    }

    return nextUid;
  })();

  if (!channelName) {
    return NextResponse.json({ error: "Missing Channel" }, { status: 404 });
  }

  // Validate credentials
  const appId = process.env.AGORA_APP_ID;
  if (!appId) {
    throw Error("appId not found");
  }
  const certificate = process.env.AGORA_APP_CERTIFICATE;
  if (!certificate) {
    throw Error("certificate not found");
  }
  const token = createToken(channelName, Number(agentUid));

  // Agent Configuration - Defines Behaviour(LLM, TTS, ASR)
  const agentPayload = {
    name: `my-agent-${channelName}-${agentUid}`,
    preset: "openai_tts_1,openai_gpt_4o_mini",
    properties: {
      channel: channelName,
      token: token,
      agent_rtc_uid: String(agentUid),
      remote_rtc_uids: [String(userUid)], // target user
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

  // Auth for Agora REST API
  const basicAuth = Buffer.from(
    `${process.env.AGORA_CUSTOMER_ID}:${process.env.AGORA_CUSTOMER_SECRET}`,
  ).toString("base64");

  try {
    // Request Agora to inject agent into channel
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

    const rawText = await res.text();

    console.log("[agora/agentai] raw Agora response", {
      status: res.status,
      ok: res.ok,
      body: rawText,
    });

    const data = rawText ? JSON.parse(rawText) : null;

    // Handle already-running agent (idempotency)
    if (!res.ok) {
      if (res.status === 409) {
        console.log("[agora/agentai] agent already running, continuing");

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
    console.log("[agora/agentai] agent started", data);

    // Success → return agent info to client
    return NextResponse.json({ agent: data, agentUid });
  } catch (err) {
    console.error("[agora/agentai] error starting agent", err);
    throw err;
  }
}
