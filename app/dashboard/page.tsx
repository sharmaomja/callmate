"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    if (!roomId.trim()) return;
    router.push(`/room/${roomId}`);
  };

  const handleCreate = () => {
    const newRoom = crypto.randomUUID();
    router.push(`/room/${newRoom}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Hero section — no border, just text */}
        <div className="mb-12 text-center md:text-left md:flex md:justify-between md:items-end gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Callmate
            </span>
            <h1 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">
              Start a room or jump into one
            </h1>
            <p className="mt-3 text-gray-500 max-w-xl text-base">
              No accounts, no downloads. Just a link and you're in.
            </p>
          </div>
          <div className="mt-6 md:mt-0 grid grid-cols-2 gap-4 text-sm text-gray-500 bg-white/50 rounded-2xl p-4">
            <div>
              <p className="font-medium text-gray-800">Join</p>
              <p>Paste an ID and go</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Create</p>
              <p>Generate a fresh link</p>
            </div>
          </div>
        </div>

        {/* Two column action area — no borders, soft cards */}
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          {/* Join panel */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">Join a call</h2>
            <p className="text-gray-500 text-sm mt-1 mb-6">
              Enter an existing room ID to connect instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                className="flex-1 px-5 py-3 bg-gray-100 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <button
                onClick={handleJoin}
                disabled={!roomId.trim()}
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Join
              </button>
            </div>
          </div>

          {/* Create panel */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">New session</h2>
              <p className="text-gray-500 text-sm mt-1">
                Create a fresh room and invite others.
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="mt-6 w-full py-3 bg-gray-100 text-gray-800 font-medium rounded-full hover:bg-gray-200 transition"
            >
              Create room
            </button>
          </div>
        </div>

        {/* Optional subtle hint */}
        <p className="text-center text-gray-400 text-xs mt-10">
          Rooms are deleted when empty — share the ID with anyone
        </p>
      </div>
    </main>
  );
}