import { differenceInCalendarDays, format, parseISO, subDays } from 'date-fns';
import { todayKey } from './day';

/**
 * day_key 배열(중복·비정렬 허용)로 현재/최장 streak 계산.
 * - longest: 연속된 날의 최장 길이
 * - current: 오늘(또는 아직 미체크면 어제)에서 뒤로 이어지는 연속 길이.
 */
export function computeStreaks(
  dayKeys: string[],
  today: string = todayKey(),
): { current: number; longest: number } {
  const unique = [...new Set(dayKeys)].sort();
  if (unique.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < unique.length; i++) {
    const diff = differenceInCalendarDays(parseISO(unique[i]), parseISO(unique[i - 1]));
    if (diff === 1) run += 1;
    else if (diff > 1) run = 1;
    if (run > longest) longest = run;
  }

  const done = new Set(unique);
  let cursor = today;
  if (!done.has(cursor)) {
    cursor = format(subDays(parseISO(today), 1), 'yyyy-MM-dd');
    if (!done.has(cursor)) return { current: 0, longest };
  }
  let current = 0;
  while (done.has(cursor)) {
    current += 1;
    cursor = format(subDays(parseISO(cursor), 1), 'yyyy-MM-dd');
  }

  return { current, longest };
}
