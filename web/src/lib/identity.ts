const DEVICE_ID_KEY = 'loopin.device_id';
const NICKNAME_KEY = 'loopin.nickname';

/** 기기 UUID를 조회하거나 최초 1회 생성해 영속 (auth 대체 신원). */
export function getOrCreateDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export function getStoredNickname(): string | null {
  return localStorage.getItem(NICKNAME_KEY);
}

export function saveNickname(nickname: string): void {
  localStorage.setItem(NICKNAME_KEY, nickname);
}
