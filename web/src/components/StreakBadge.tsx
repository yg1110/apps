import { Flame } from 'lucide-react';

export function StreakBadge({ current }: { current: number }) {
  if (current <= 0) {
    return (
      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-400">
        시작 전
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
      <Flame size={13} className="fill-orange-500 stroke-orange-500" />
      {current}일
    </span>
  );
}
