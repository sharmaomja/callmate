"use client";

/*
 * This page creates a video call room using Agora and also connects to an AI agent that the user can talk to.
 
 * Key Flows:
 * 1. Create a token and join an Agora channel.
 * 2. Enable local capture and publish the media to Agora's SD-RTN.
 * 3. Subscribe to other users(Remote participants).
 * 4. Request an AI agent to get injected in the channel after join.
 * 5. Let user talk to AI using "Push to talk" button.
 */

import { useEffect, useRef, useState } from "react";
import {
  LocalVideoTrack,
  RemoteAudioTrack,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import { useParams, useRouter } from "next/navigation";
import { RemoteUsers } from "@/components/remoteusers";
import AgoraClientProvider from "@/components/AgoraClientProvider";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  // Pass down the Agora client object without prop-drilling.
  return (
    <AgoraClientProvider>
      <RoomContent roomId={roomId} />
    </AgoraClientProvider>
  );
}

function RoomContent({ roomId }: { roomId: string }) {
  const [isTalkingToAI, setIsTalkingToAI] = useState(false); // For push-to-talk
  const [agentStatus, setAgentStatus] = useState("Connecting AI...");
  const hasInitializedMic = useRef(false);
  const hasStartedAgent = useRef(false);
  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID; // Agora appId comes from here
  const joinReady = Boolean(appId && roomId); // Only join when we have all the required variables

  // Fetch a token from the backend and join the channel
  const { data: joinedUid, isConnected } = useJoin(async () => {
    const res = await fetch(`/api/agora/token?channel=${roomId}`);
    const data = await res.json();

    return {
      appid: appId!,
      channel: roomId,
      token: data.token,
      uid: data.uid,
    };
  }, joinReady);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(joinReady); // Gets local mic
  const { localCameraTrack } = useLocalCameraTrack(joinReady); // Gets local camera

  // Publish audio & video to SD-RTN
  usePublish(
    [localMicrophoneTrack, localCameraTrack],
    Boolean(isConnected && localMicrophoneTrack && localCameraTrack),
  );

  const remoteUsers = useRemoteUsers(); // Get other users in the room
  const { audioTracks } = useRemoteAudioTracks(remoteUsers); // Get audio from other users

  useEffect(() => {
    audioTracks.forEach((track) => track.play());
  }, [audioTracks]);

  // Push-to-talk start - turns mic ON to speak with the agent
  const handlePTTStart = async () => {
    if (!localMicrophoneTrack) return;
    await localMicrophoneTrack.setEnabled(true);
    setIsTalkingToAI(true);
    setAgentStatus("Listening...");
  };

  const handlePTTEnd = async () => {
    if (!localMicrophoneTrack) return;
    await localMicrophoneTrack.setEnabled(false);
    setIsTalkingToAI(false);
    setAgentStatus("Processing...");
  };

  // AI agent flow
  useEffect(() => {
    if (!localMicrophoneTrack || hasInitializedMic.current) return;
    hasInitializedMic.current = true;
    localMicrophoneTrack.setEnabled(false); // mic disabled by default, gets enables only by PTT button
  }, [localMicrophoneTrack]);

  // start AI Agent after the user joins the room- backend api to get the ai agent
  useEffect(() => {
    if (!isConnected || !joinedUid || hasStartedAgent.current) return;

    hasStartedAgent.current = true;

    const startAgent = async () => {
      await new Promise((r) => setTimeout(r, 2000));

      const res = await fetch(
        `/api/agora/agentai?channel=${roomId}&uid=${joinedUid}`,
        { method: "POST" },
      );

      if (!res.ok) {
        setAgentStatus("AI unavailable");
        return;
      }

      setAgentStatus("Hold to talk");
    };

    startAgent();
  }, [isConnected, joinedUid, roomId]);

  // UI for call and ai-agent
  return (
    <div className="h-screen bg-white flex flex-col text-black">
      <div className="p-4 border-b flex justify-between">
        <span>Room: {roomId}</span>
        <span>Status: {agentStatus}</span>
      </div>

      <div className="flex flex-1">
        {/* LOCAL VIDEO */}
        <div className="flex-1 bg-black">
          {localCameraTrack && (
            <LocalVideoTrack track={localCameraTrack} play />
          )}
        </div>

        {/* REMOTE USERS */}
        <RemoteUsers remoteUsers={remoteUsers} />

        {/* AI PANEL */}
        <div className="w-80 border-l p-4 flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-3 mt-10">
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white">
              AI
            </div>
            <p>{isTalkingToAI ? "Listening..." : agentStatus}</p>
          </div>

          <button
            onMouseDown={handlePTTStart}
            onMouseUp={handlePTTEnd}
            onTouchStart={handlePTTStart}
            onTouchEnd={handlePTTEnd}
            className={`w-20 h-20 rounded-full text-white ${
              isTalkingToAI ? "bg-black scale-110" : "bg-black/80"
            }`}
          >
            {isTalkingToAI ? "Talking" : "Hold"}
          </button>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-black text-white rounded-full"
          >
            Leave
          </button>
        </div>
        {audioTracks.map((track) => (
          <RemoteAudioTrack key={track.getTrackId()} track={track} play />
        ))}
      </div>
    </div>
  );
}
