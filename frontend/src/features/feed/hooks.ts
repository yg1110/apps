import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/store/session';
import { createPost, fetchFeed, uploadPostImage, type CreatePostInput } from './api';

export function useFeed() {
  return useQuery({
    queryKey: ['feed'],
    queryFn: () => fetchFeed(50),
  });
}

export function useCreatePost() {
  const deviceId = useSession((s) => s.deviceId);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: { post: CreatePostInput; imageBase64?: string | null }) => {
      let imageUrl = input.post.imageUrl ?? null;
      if (input.imageBase64) {
        imageUrl = await uploadPostImage(deviceId!, input.imageBase64);
      }
      await createPost(deviceId!, { ...input.post, imageUrl });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['feed'] }),
  });
}
