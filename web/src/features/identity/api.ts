import { supabase } from '@/lib/supabase';

export type EnsureProfileResult = { ok: true } | { ok: false; reason: 'NICKNAME_TAKEN' };

export async function isNicknameTaken(nickname: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('profiles')
    .select('device_id')
    .eq('nickname', nickname)
    .maybeSingle();
  if (error) throw error;
  return !!data;
}

export async function ensureProfile(
  deviceId: string,
  nickname: string,
): Promise<EnsureProfileResult> {
  const { error } = await supabase.from('profiles').insert({ device_id: deviceId, nickname });
  if (error) {
    if (error.code === '23505') {
      const { data } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('device_id', deviceId)
        .maybeSingle();
      if (data?.nickname === nickname) return { ok: true };
      return { ok: false, reason: 'NICKNAME_TAKEN' };
    }
    throw error;
  }
  return { ok: true };
}
