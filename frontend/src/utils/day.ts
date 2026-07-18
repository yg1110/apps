import { format } from 'date-fns';

/** 기기 로컬 타임존 기준 'yyyy-MM-dd' day_key. UTC 경계 버그 방지. */
export function dayKey(date: Date = new Date()): string {
  return format(date, 'yyyy-MM-dd');
}

export function todayKey(): string {
  return dayKey(new Date());
}
