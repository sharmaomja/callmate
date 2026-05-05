const MAX_CONVO_UID = 65535;

export function createAgoraUid() {
  return Math.floor(Math.random() * MAX_CONVO_UID) + 1;
}
