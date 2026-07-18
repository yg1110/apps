import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export function CheckButton({
  done,
  loading,
  onPress,
}: {
  done: boolean;
  loading?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.button, done ? styles.done : styles.todo]}
      hitSlop={8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={done ? '#fff' : '#3b82f6'} />
      ) : (
        <Text style={[styles.mark, done ? styles.markDone : styles.markTodo]}>
          {done ? '✓' : ''}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  todo: { borderColor: '#d1d5db', backgroundColor: '#fff' },
  done: { borderColor: '#3b82f6', backgroundColor: '#3b82f6' },
  mark: { fontSize: 20, fontWeight: '800' },
  markDone: { color: '#fff' },
  markTodo: { color: 'transparent' },
});
