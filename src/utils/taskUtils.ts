import type { Task, TaskFilters, SortKey } from '../types';
import { PRIORITY_ORDER } from '../types';
import { isPast, isToday, isUpcoming } from './dateUtils';

export function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function applyFilters(tasks: Task[], filters: TaskFilters): Task[] {
  const query = filters.search.trim().toLowerCase();

  const filtered = tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    if (query && !task.title.toLowerCase().includes(query)) return false;
    return true;
  });

  return sortTasks(filtered, filters.sortBy);
}

export function sortTasks(tasks: Task[], sortBy: SortKey): Task[] {
  const sorted = [...tasks];
  switch (sortBy) {
    case 'dueDate':
      sorted.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return b.createdAt.localeCompare(a.createdAt);
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
      break;
    case 'priority':
      sorted.sort((a, b) => {
        const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        if (diff !== 0) return diff;
        return b.createdAt.localeCompare(a.createdAt);
      });
      break;
    case 'createdAt':
      sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
  }
  return sorted;
}

export function getTodayTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.dueDate !== null && isToday(task.dueDate) && task.status !== 'completed');
}

export function getUpcomingTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.dueDate !== null && isUpcoming(task.dueDate) && task.status !== 'completed');
}

export function getCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.status === 'completed');
}

export function getOverdueTasks(tasks: Task[]): Task[] {
  return tasks.filter((task) => task.dueDate !== null && isPast(task.dueDate) && task.status !== 'completed');
}

export function getCompletionPercentage(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  return Math.round((completed / tasks.length) * 100);
}

export function getTasksByPriority(tasks: Task[]): Record<string, number> {
  const counts: Record<string, number> = { high: 0, medium: 0, low: 0 };
  tasks.forEach((task) => {
    if (task.status !== 'completed') {
      counts[task.priority] += 1;
    }
  });
  return counts;
}

export function getTasksByCategory(tasks: Task[]): Record<string, number> {
  const counts: Record<string, number> = {};
  tasks.forEach((task) => {
    counts[task.category] = (counts[task.category] || 0) + 1;
  });
  return counts;
}

export function getUpcomingDeadlines(tasks: Task[], limit = 5): Task[] {
  return tasks
    .filter((task) => task.dueDate !== null && task.status !== 'completed')
    .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1))
    .slice(0, limit);
}
