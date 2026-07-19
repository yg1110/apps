import { Check } from 'lucide-react';
import type { Habit } from '@/types';
import { StreakBadge } from './StreakBadge';

export function HabitCard({
  habit,
  doneToday,
  current,
  toggling,
  onToggle,
  onOpen,
}: {
  habit: Habit;
  doneToday: boolean;
  current: number;
  toggling?: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3.5">
      <button
        onClick={onOpen}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl"
        style={{ backgroundColor: habit.color ?? '#eff6ff' }}
      >
        {habit.emoji ?? '⭐'}
      </button>
      <button onClick={onOpen} className="flex flex-1 flex-col items-start gap-1.5 text-left">
        <span className="line-clamp-1 text-base font-semibold text-gray-900">{habit.name}</span>
        <StreakBadge current={current} />
      </button>
      <button
        onClick={onToggle}
        disabled={toggling}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
          doneToday ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
        }`}
        aria-label="오늘 완료 토글"
      >
        <Check size={22} className={doneToday ? 'text-white' : 'text-transparent'} strokeWidth={3} />
      </button>
    </div>
  );
}
