"use client";

/*
 * Remote Users Panel
 *
 * This component renders all remote participants which are connected to the Agora channel.
 *
 * Key Responsibilities:
 * 1. Render individual remote users (video + identity).
 * 2. Handle empty state when no one has joined yet.
 * 3. Provide a scrollable participant panel UI.
 * 4. Keep UI decoupled from Agora logic (data comes from hooks).
 */

import {
  RemoteUser as AgoraRemoteUser,
  type IAgoraRTCRemoteUser,
} from "agora-rtc-react";
import { UserRound } from "lucide-react";

// Single Remote User Tile - Renders: Video Stream & UID
export function RemoteUser({ user }: { user: IAgoraRTCRemoteUser }) {
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-white p-2.5">
      <AgoraRemoteUser
        user={user}
        playVideo
        playAudio={false}
        className="h-40 w-full min-w-0 rounded-[1rem] bg-black/80 sm:h-44"
      />
      <div className="flex items-center gap-2 px-1 pb-1 pt-3 text-sm text-white/62">
        <UserRound className="size-4" />
        Participant {String(user.uid)}
      </div>
    </div>
  );
}

// (Sidebar Panel) Remote Users List - Handles: Mapping users - user tiles
export function RemoteUsers({
  remoteUsers,
}: {
  remoteUsers: IAgoraRTCRemoteUser[];
}) {
  return (
    <aside className="w-full max-w-sm border-l border-white/8 bg-[#0c0c0d]">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/8 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">
            Participants
          </p>

          {/* Dynamic participant count */}
          <p className="mt-2 text-sm text-white/56">
            {remoteUsers.length === 0
              ? "Waiting for someone to join"
              : `${remoteUsers.length} participant${remoteUsers.length > 1 ? "s" : ""} connected`}
          </p>
        </div>

        {/* Participant List */}
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {remoteUsers.length === 0 ? (
            // Empty state
            <div className="rounded-[1.2rem] border border-dashed border-white/10 bg-white px-4 py-6 text-sm text-white/45">
              Remote video will appear here when someone joins the room.
            </div>
          ) : (
            // Render all remote users
            remoteUsers.map((user) => <RemoteUser key={user.uid} user={user} />)
          )}
        </div>
      </div>
    </aside>
  );
}
