export type Priority = 'low' | 'medium' | 'high';

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type Category =
  | 'development'
  | 'design'
  | 'marketing'
  | 'personal'
  | 'research'
  | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  category: Category;
  dueDate: string | null;
  createdAt: string;
  completedAt: string | null;
}

export type ViewKey = 'dashboard' | 'all' | 'today' | 'upcoming' | 'completed';

export type SortKey = 'dueDate' | 'priority' | 'createdAt';

export interface TaskFilters {
  status: TaskStatus | 'all';
  priority: Priority | 'all';
  category: Category | 'all';
  search: string;
  sortBy: SortKey;
}

export interface TaskDraft {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  category: Category;
  dueDate: string | null;
}

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  development: 'Development',
  design: 'Design',
  marketing: 'Marketing',
  personal: 'Personal',
  research: 'Research',
  other: 'Other',
};

export const ALL_CATEGORIES: Category[] = [
  'development',
  'design',
  'marketing',
  'personal',
  'research',
  'other',
];
