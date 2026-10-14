import { useMemo } from 'react';
import type { Task, TaskFilters, ViewKey } from '../types';
import { getCompletedTasks, getTodayTasks, getUpcomingTasks } from '../utils/taskUtils';
import { TaskView } from './TaskView';

interface ViewPageProps {
  view: ViewKey;
  tasks: Task[];
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onNewTask: () => void;
}

export function ViewPage({
  view,
  tasks,
  filters,
  onFiltersChange,
  onToggleComplete,
  onEdit,
  onDelete,
  onNewTask,
}: ViewPageProps) {
  const viewTasks = useMemo(() => {
    switch (view) {
      case 'all':
        return tasks;
      case 'today':
        return getTodayTasks(tasks);
      case 'upcoming':
        return getUpcomingTasks(tasks);
      case 'completed':
        return getCompletedTasks(tasks);
      default:
        return tasks;
    }
  }, [view, tasks]);

  const emptyCopy: Record<string, { title: string; message: string }> = {
    all: { title: 'No tasks found', message: 'Create your first task to get started.' },
    today: { title: 'Nothing due today', message: 'No tasks are scheduled for today. Enjoy the calm.' },
    upcoming: { title: 'No upcoming tasks', message: 'Plan ahead by adding tasks with future due dates.' },
    completed: { title: 'No completed tasks yet', message: 'Completed tasks will appear here.' },
  };

  const copy = emptyCopy[view] ?? emptyCopy.all;

  return (
    <TaskView
      tasks={viewTasks}
      filters={filters}
      onFiltersChange={onFiltersChange}
      onToggleComplete={onToggleComplete}
      onEdit={onEdit}
      onDelete={onDelete}
      onNewTask={onNewTask}
      showFilters={view === 'all'}
      emptyTitle={copy.title}
      emptyMessage={copy.message}
    />
  );
}
