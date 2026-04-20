import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";

export function RemoteUser({ user }: { user: IAgoraRTCRemoteUser }) {
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!remoteVideoRef.current || !user.videoTrack) {
      return;
    }

    user.videoTrack.play(remoteVideoRef.current);

    return () => {
      user.videoTrack?.stop();
    };
  }, [user.uid, user.videoTrack]);

  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-black/8 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
      <div
        ref={remoteVideoRef}
        className="h-40 w-full min-w-0 rounded-[0.9rem] bg-black sm:h-44"
      />
      <div className="px-1 pb-1 pt-3 text-sm text-black/58">
        Participant {String(user.uid)}
      </div>
    </div>
  );
}

export function RemoteUsers({ remoteUsers }: { remoteUsers: IAgoraRTCRemoteUser[] }) {
  return (
    <aside className="w-full max-w-sm border-l border-black/8 bg-[#fafaf8]">
      <div className="flex h-full flex-col">
        <div className="border-b border-black/8 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black/38">Participants</p>
          <p className="mt-2 text-sm text-black/56">
            {remoteUsers.length === 0 ? "Waiting for someone to join" : `${remoteUsers.length} participant${remoteUsers.length > 1 ? "s" : ""} connected`}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {remoteUsers.length === 0 ? (
            <div className="rounded-[1.2rem] border border-dashed border-black/10 bg-white px-4 py-6 text-sm text-black/45">
              Remote video will appear here when someone joins the room.
            </div>
          ) : (
            remoteUsers.map((user) => <RemoteUser key={user.uid} user={user} />)
          )}
        </div>
      </div>
    </aside>
  );
}
