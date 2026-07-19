import { supabase } from '@/lib/supabase';
import type { Comment } from '@/types';

type CommentRow = {
  id: string;
  body: string;
  created_at: string;
  post_id: string;
  profiles: { nickname: string } | null;
};

export async function fetchComments(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('id, body, created_at, post_id, profiles(nickname)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data as unknown as CommentRow[]).map((r) => ({
    id: r.id,
    postId: r.post_id,
    nickname: r.profiles?.nickname ?? '알 수 없음',
    body: r.body,
    createdAt: r.created_at,
  }));
}

export async function createComment(
  postId: string,
  authorId: string,
  body: string,
): Promise<void> {
  const { error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: authorId, body });
  if (error) throw error;
}
