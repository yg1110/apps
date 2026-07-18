import { StyleSheet, Text, View } from 'react-native';

export function EmptyState({
  emoji = '📭',
  title,
  subtitle,
}: {
  emoji?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 64, gap: 6 },
  emoji: { fontSize: 40 },
  title: { fontSize: 16, fontWeight: '600', color: '#374151' },
  subtitle: { fontSize: 14, color: '#9ca3af', textAlign: 'center' },
});
