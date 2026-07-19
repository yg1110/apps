export type Profile = {
  deviceId: string;
  nickname: string;
  createdAt: string;
};

export type Habit = {
  id: string;
  name: string;
  emoji?: string | null;
  color?: string | null;
  createdAt: string;
  archivedAt?: string | null;
};

export type Completion = {
  id: string;
  habitId: string;
  dayKey: string;
  createdAt: string;
};

export type FeedPost = {
  id: string;
  ownerId: string;
  nickname: string;
  habitName: string;
  streakCount: number;
  caption?: string | null;
  imageUrl?: string | null;
  dayKey: string;
  createdAt: string;
  commentCount: number;
};

export type Comment = {
  id: string;
  postId: string;
  nickname: string;
  body: string;
  createdAt: string;
};
