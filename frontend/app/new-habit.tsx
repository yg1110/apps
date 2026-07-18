import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCreateHabit } from '@/features/habits/hooks';

const EMOJIS = ['⭐', '💪', '📚', '🏃', '💧', '🧘', '🥗', '😴', '✍️', '🎯'];
const COLORS = ['#eff6ff', '#fef2f2', '#f0fdf4', '#fffbeb', '#faf5ff', '#f0fdfa'];

export default function NewHabitScreen() {
  const router = useRouter();
  const createHabit = useCreateHabit();

  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState<string | null>(null);

  const trimmed = name.trim();
  const valid = trimmed.length >= 1 && trimmed.length <= 30;

  async function onSubmit() {
    setError(null);
    if (!valid) {
      setError('습관 이름을 입력해주세요 (1~30자).');
      return;
    }
    try {
      await createHabit.mutateAsync({ name: trimmed, emoji, color });
      router.back();
    } catch (e) {
      setError('저장 중 오류가 발생했어요. 네트워크를 확인해주세요.');
      console.error(e);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="예: 물 2L 마시기"
        value={name}
        onChangeText={setName}
        maxLength={30}
        editable={!createHabit.isPending}
      />

      <Text style={styles.label}>이모지</Text>
      <View style={styles.row}>
        {EMOJIS.map((e) => (
          <Pressable
            key={e}
            style={[styles.emojiChip, emoji === e && styles.emojiChipActive]}
            onPress={() => setEmoji(e)}
          >
            <Text style={styles.emojiText}>{e}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>색상</Text>
      <View style={styles.row}>
        {COLORS.map((c) => (
          <Pressable
            key={c}
            style={[styles.colorChip, { backgroundColor: c }, color === c && styles.colorChipActive]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.button, (!valid || createHabit.isPending) && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!valid || createHabit.isPending}
      >
        {createHabit.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>습관 추가</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, gap: 10 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  emojiChip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  emojiChipActive: { borderColor: '#3b82f6' },
  emojiText: { fontSize: 22 },
  colorChip: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  colorChipActive: { borderColor: '#3b82f6' },
  error: { color: '#ef4444', fontSize: 13 },
  button: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
