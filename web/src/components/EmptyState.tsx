import type { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <Icon size={44} className="text-gray-300" strokeWidth={1.5} />
      <p className="text-base font-semibold text-gray-700">{title}</p>
      {subtitle ? <p className="text-sm text-gray-400">{subtitle}</p> : null}
    </div>
  );
}
