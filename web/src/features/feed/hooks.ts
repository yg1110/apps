import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/store/session';
import { createPost, fetchFeed, fetchPost, uploadPostImage, type CreatePostInput } from './api';

export function useFeed() {
  return useQuery({ queryKey: ['feed'], queryFn: () => fetchFeed(50) });
}

export function usePost(id: string) {
  return useQuery({ queryKey: ['post', id], queryFn: () => fetchPost(id), enabled: !!id });
}

export function useCreatePost() {
  const deviceId = useSession((s) => s.deviceId);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { post: CreatePostInput; imageFile?: File | null }) => {
      let imageUrl = input.post.imageUrl ?? null;
      if (input.imageFile) {
        imageUrl = await uploadPostImage(deviceId, input.imageFile);
      }
      await createPost(deviceId, { ...input.post, imageUrl });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feed'] }),
  });
}
