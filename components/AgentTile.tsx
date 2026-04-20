"use client";

import { useEffect, useRef } from "react";
import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

export default function AgentTile({ user }: { user: IAgoraRTCRemoteUser | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.videoTrack && ref.current) {
      user.videoTrack.play(ref.current);
    }
  }, [user]);

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col items-center justify-center">
      <div ref={ref} className="w-full h-48 bg-black" />
      <div className="p-2 text-sm">🤖 AI Agent</div>
    </div>
  );
}