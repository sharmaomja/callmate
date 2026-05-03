import { RtcTokenBuilder, RtcRole } from "agora-token";

export function createToken(channelName: string, uid: number) {

  const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
  if (!appId) {
    throw Error("appId not found");
  }
  const certificate = process.env.AGORA_APP_CERTIFICATE;
  if (!certificate) {
    throw Error("certificate not found");
  }
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const privilageExpireTime = currentTimeStamp + expirationTimeInSeconds;
  const tokenExpireTime = currentTimeStamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithRtm(
  appId,
  certificate,
  channelName,
  String(uid), // required conversion
  RtcRole.PUBLISHER,
  tokenExpireTime,
  privilageExpireTime
);
  return token;
}
