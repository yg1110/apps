import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/store/session';
import { createComment, fetchComments } from './api';

export function useComments(postId: string) {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
}

export function useCreateComment(postId: string) {
  const deviceId = useSession((s) => s.deviceId);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => createComment(postId, deviceId!, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', postId] });
      qc.invalidateQueries({ queryKey: ['post', postId] });
      qc.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}
