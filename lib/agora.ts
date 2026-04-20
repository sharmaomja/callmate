
import AgoraRTC from "agora-rtc-sdk-ng";

export const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export async function createTracks() {
  const [audioTrack, videoTrack] =
    await AgoraRTC.createMicrophoneAndCameraTracks();

  return { audioTrack, videoTrack };
}