import { RtcTokenBuilder, RtcRole } from "agora-token";

/*
 * Generate Agora RTC Token
 *
 * Creates a time-bound token for a user to join a channel.
 */

export function createToken(channelName: string, uid: number) {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;

  // Validate required credentials
  if (!appId) throw Error("appId not found");
  if (!appCertificate) throw Error("certificate not found");

  const role = RtcRole.PUBLISHER; // allows sending audio/video

  // Token validity (1 hour)
  const expirationTimeInSeconds = 3600;
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const privilegeExpire = currentTimeStamp + expirationTimeInSeconds;
  const tokenExpire = currentTimeStamp + expirationTimeInSeconds;

  // Build token for given channel + uid
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    uid,
    role,
    privilegeExpire,
    tokenExpire,
  );

  return token;
}
