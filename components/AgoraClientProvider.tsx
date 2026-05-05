"use client";

/*
 * Agora Client Provider
 *
 * Initializes a single Agora RTC client instance and exposes it across the app via context.
 *
 * Usage:
 * - Avoids recreating client on re-renders
 * - Prevents prop drilling
 * - Centralizes RTC lifecycle
 */

import { useState, ReactNode } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider } from "agora-rtc-react";
import type { IAgoraRTCClient } from "agora-rtc-react";

type Props = {
  children: ReactNode;
};

export default function AgoraClientProvider({ children }: Props) {
  // Create client once (stable instance across renders)
  const [client] = useState(
    () =>
      AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      }) as unknown as IAgoraRTCClient,
  );

  // Provide client to all Agora hooks/components
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
}
