import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function timeAgo(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true, locale: ko });
  } catch {
    return '';
  }
}
