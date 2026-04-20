"use client";
export {};

import { useEffect, useRef, useState } from "react";
import { client, createTracks } from "@/lib/agora";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useParams } from "next/navigation";
import { RemoteUsers } from "@/components/remoteusers";
import type {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;
  const localVideoRef = useRef<HTMLDivElement>(null);
  const hasUserJoined = useRef<boolean>(false);
  const audioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const videoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const [isTalkingToAI, setIsTalkingToAI] = useState(false);
  const [agentStatus, setAgentStatus] = useState("Connecting AI...");

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const handlePTTStart = async () => {
    if (!audioTrackRef.current) {
      return;
    }

    await audioTrackRef.current.setEnabled(true);
    setIsTalkingToAI(true);
    setAgentStatus("Listening...");
  };

  const handlePTTEnd = async () => {
    if (!audioTrackRef.current) {
      return;
    }

    await audioTrackRef.current.setEnabled(false);
    setIsTalkingToAI(false);
    setAgentStatus("Processing...");
  };

  useEffect(() => {
    const init = async () => {
      hasUserJoined.current = true;
      const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
      const channel = roomId;

      const res = await fetch(`/api/agora/token?channel=${roomId}`);
      const data = await res.json();

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          setRemoteUsers((users) => {
            return [...users, user];
          });
        }

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", async (user, mediaType) => {
        await client.unsubscribe(user, mediaType);

        if (mediaType === "video") {
          user.videoTrack?.stop();
          setRemoteUsers((users) => {
            return users.filter(function (remoteUser) {
              return remoteUser.uid !== user.uid;
            });
          });
        }

        if (mediaType === "audio") {
          user.audioTrack?.stop();
        }
      });

      await client.join(appId, channel, data.token, data.uid);

      const { audioTrack, videoTrack } = await createTracks();
      audioTrackRef.current = audioTrack;
      videoTrackRef.current = videoTrack;

      videoTrack.play(localVideoRef.current!);
      await client.publish([audioTrack, videoTrack]);
      await audioTrack.setEnabled(false);

      await new Promise((res) => setTimeout(res, 2000));

      const response = await fetch(
        `/api/agora/agentai?channel=${roomId}&uid=${data.uid}`,
        {
          method: "POST",
        },
      );

      if (!response.ok) {
        setAgentStatus("AI unavailable");
        return;
      }

      setAgentStatus("Hold to talk");
    };
    if (!hasUserJoined.current) {
      init();
    }

    return () => {
      audioTrackRef.current?.stop();
      audioTrackRef.current?.close();
      videoTrackRef.current?.stop();
      videoTrackRef.current?.close();
      client.leave();
    };
  }, [params.roomId]);

  return (
    <div className="h-screen bg-white flex flex-col text-black">
      <div className="p-4 border-b border-black/8 flex justify-between bg-white">
        <span>Room: {params.roomId}</span>
        <span>Status: {agentStatus}</span>
      </div>

      <div className="flex flex-1">
        <div
          ref={localVideoRef}
          className="flex-1 bg-black flex items-center justify-center text-white"
        ></div>
        <RemoteUsers remoteUsers={remoteUsers} />

        <div className="w-80 border-l border-black/8 p-4 flex flex-col items-center justify-between bg-[#fafaf8]">
          {/* AI Agent Avatar */}
  <div className="flex flex-col items-center gap-3 mt-10">
    <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold">
      AI
    </div>
    <p className="text-sm text-black/56">
      {isTalkingToAI ? "Listening..." : agentStatus}
    </p>
  </div>

          {/* Push to Talk Button */}
          <button
            onMouseDown={handlePTTStart}
            onMouseUp={handlePTTEnd}
            onTouchStart={handlePTTStart}
            onTouchEnd={handlePTTEnd}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-sm font-semibold transition 
    ${isTalkingToAI ? "bg-black scale-110" : "bg-black/80"}`}
          >
            {isTalkingToAI ? "Talking" : "Hold to Talk"}
          </button>

          <p className="text-xs text-black/38 mb-4 text-center">
            Hold to speak with AI
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-black/8 flex justify-center gap-4 bg-white">
        <button className="px-4 py-2 bg-black text-white rounded-full">
          Leave
        </button>
      </div>
    </div>
  );
}
