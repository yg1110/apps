import { User } from 'lucide-react';
import { useSession } from '@/store/session';

export function ProfileScreen() {
  const nickname = useSession((s) => s.nickname);
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-500">
        <User size={44} className="text-white" />
      </div>
      <p className="text-xl font-bold text-gray-900">{nickname ?? '프로필'}</p>
      <p className="text-sm text-gray-500">내 게시물 (곧 제공)</p>
    </div>
  );
}
