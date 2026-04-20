"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (!roomId) return;
    router.push(`/room/${roomId}`);
  };

  const handleCreate = () => {
    const newRoom = crypto.randomUUID();
    router.push(`/room/${newRoom}`);
  };

  return (
    <div className="min-h-[calc(100svh-4rem)] bg-white px-4 py-10 text-black sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="animate-enter flex flex-col gap-4 border-b border-black/8 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/40">Callmate dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl">
              Start a room or jump into one.
            </h1>
            <p className="mt-3 text-sm leading-7 text-black/56 sm:text-base">
              Keep the setup minimal. Use a room ID to join an active call or create a fresh room and share it instantly.
            </p>
          </div>

          <div className="grid gap-4 text-sm text-black/54 sm:grid-cols-2 md:min-w-[24rem]">
            <div>
              <p className="text-black">Join existing room</p>
              <p className="mt-2">Paste an ID and move straight into the call.</p>
            </div>
            <div>
              <p className="text-black">Create new room</p>
              <p className="mt-2">Generate a fresh link for a new conversation.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="surface-panel animate-enter-delay rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/40">Room access</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black">
                  Enter a room ID
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-black/56">
                  If someone already shared a room with you, paste the ID here and join the call immediately.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-black/8 bg-[#fafaf8] p-4 text-sm text-black/54">
                <p className="text-black">Current flow</p>
                <p className="mt-2">Nothing changes in the app logic. This screen just gives the room actions a cleaner, calmer surface.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex-1 space-y-2">
                <label htmlFor="room-id" className="text-sm text-black/62">
                  Room ID
                </label>
                <input
                  id="room-id"
                  placeholder="Paste room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="input-shell"
                />
              </div>

              <Button onClick={handleJoin} className="h-11 rounded-full px-6 text-sm font-semibold sm:min-w-40">
                Join room
              </Button>
            </div>
          </div>

          <aside className="surface-panel rounded-[2rem] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/40">New session</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-black">
              Create a fresh room
            </h2>
            <p className="mt-3 text-sm leading-7 text-black/56">
              Generate a new room ID and move straight into the call with your AI agent ready to join.
            </p>

            <Button
              variant="secondary"
              onClick={handleCreate}
              className="mt-8 h-11 w-full rounded-full border border-black/10 bg-[#f5f5f3] text-black hover:bg-[#ededeb]"
            >
              Create new room
            </Button>
          </aside>
        </section>
      </div>
    </div>
  );
}
