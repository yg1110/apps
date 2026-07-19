import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured =
  !!url && !!anonKey && !url.includes('YOUR-PROJECT') && !anonKey.includes('YOUR-ANON-KEY');

if (!isSupabaseConfigured) {
  console.warn('[Loopin] Supabase 미설정: web/.env 의 VITE_SUPABASE_URL / _ANON_KEY 를 확인하세요.');
}

// auth 미사용 (device_id 신뢰 모델)
export const supabase = createClient(url ?? 'http://localhost', anonKey ?? 'anon', {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});
