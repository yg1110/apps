import 'react-native-get-random-values'; // uuid 앞 crypto 폴리필
import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib/supabase';
import type { FeedPost } from '@/types';

type FeedRow = {
  id: string;
  owner_id: string;
  habit_name: string;
  streak_count: number;
  caption: string | null;
  image_url: string | null;
  day_key: string;
  created_at: string;
  nickname: string;
  comment_count: number;
};

function mapFeed(r: FeedRow): FeedPost {
  return {
    id: r.id,
    ownerId: r.owner_id,
    nickname: r.nickname,
    habitName: r.habit_name,
    streakCount: r.streak_count,
    caption: r.caption,
    imageUrl: r.image_url,
    dayKey: r.day_key,
    createdAt: r.created_at,
    commentCount: Number(r.comment_count ?? 0),
  };
}

export async function fetchFeed(limit = 50): Promise<FeedPost[]> {
  const { data, error } = await supabase
    .from('feed_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data as FeedRow[]).map(mapFeed);
}

/** base64 이미지를 post-images 버킷에 업로드하고 public URL 반환. */
export async function uploadPostImage(deviceId: string, base64: string): Promise<string> {
  const path = `${deviceId}/${uuidv4()}.jpg`;
  const { error } = await supabase.storage
    .from('post-images')
    .upload(path, decode(base64), { contentType: 'image/jpeg', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from('post-images').getPublicUrl(path);
  return data.publicUrl;
}

export type CreatePostInput = {
  habitName: string;
  streakCount: number;
  caption?: string | null;
  imageUrl?: string | null;
  dayKey: string;
};

export async function createPost(ownerId: string, input: CreatePostInput): Promise<void> {
  const { error } = await supabase.from('posts').insert({
    owner_id: ownerId,
    habit_name: input.habitName,
    streak_count: input.streakCount,
    caption: input.caption ?? null,
    image_url: input.imageUrl ?? null,
    day_key: input.dayKey,
  });
  if (error) throw error;
}
