import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Habit } from '@/types';
import { CheckButton } from './CheckButton';
import { StreakBadge } from './StreakBadge';

export function HabitCard({
  habit,
  doneToday,
  current,
  toggling,
  onToggle,
  onPress,
}: {
  habit: Habit;
  doneToday: boolean;
  current: number;
  toggling?: boolean;
  onToggle: () => void;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.emojiWrap, habit.color ? { backgroundColor: habit.color } : null]}>
        <Text style={styles.emoji}>{habit.emoji ?? '⭐'}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {habit.name}
        </Text>
        <StreakBadge current={current} />
      </View>
      <CheckButton done={doneToday} loading={toggling} onPress={onToggle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  emojiWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 22 },
  body: { flex: 1, gap: 6, alignItems: 'flex-start' },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
});
