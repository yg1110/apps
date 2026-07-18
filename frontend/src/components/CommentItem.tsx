import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { StyleSheet, Text, View } from 'react-native';
import type { Comment } from '@/types';

function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ko });
  } catch {
    return '';
  }
}

export function CommentItem({ comment }: { comment: Comment }) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{comment.nickname.slice(0, 1).toUpperCase()}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.nickname}>{comment.nickname}</Text>
          <Text style={styles.time}>{timeAgo(comment.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{comment.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10, paddingVertical: 10 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  body: { flex: 1, gap: 2 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  nickname: { fontSize: 14, fontWeight: '600', color: '#111' },
  time: { fontSize: 12, color: '#9ca3af' },
  text: { fontSize: 15, color: '#374151', lineHeight: 20 },
});
