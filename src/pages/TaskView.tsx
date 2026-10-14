import { useMemo } from 'react';
import type { Task, TaskFilters } from '../types';
import { applyFilters, sortTasks } from '../utils/taskUtils';
import { TaskFilters as TaskFiltersPanel } from '../components/tasks/TaskFilters';
import { TaskList } from '../components/tasks/TaskList';

interface TaskViewProps {
  tasks: Task[];
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onNewTask: () => void;
  showFilters?: boolean;
  emptyTitle: string;
  emptyMessage: string;
}

export function TaskView({
  tasks,
  filters,
  onFiltersChange,
  onToggleComplete,
  onEdit,
  onDelete,
  onNewTask,
  showFilters = false,
  emptyTitle,
  emptyMessage,
}: TaskViewProps) {
  const visibleTasks = useMemo(() => {
    if (showFilters) return applyFilters(tasks, filters);
    return sortTasks(tasks, filters.sortBy);
  }, [tasks, filters, showFilters]);

  return (
    <div className="space-y-4">
      {showFilters && (
        <TaskFiltersPanel filters={filters} onChange={onFiltersChange} resultCount={visibleTasks.length} />
      )}
      <TaskList
        tasks={visibleTasks}
        onToggleComplete={onToggleComplete}
        onEdit={onEdit}
        onDelete={onDelete}
        emptyTitle={emptyTitle}
        emptyMessage={emptyMessage}
      />
      {visibleTasks.length === 0 && (
        <div className="text-center">
          <button
            onClick={onNewTask}
            className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          >
            Create a new task
          </button>
        </div>
      )}
    </div>
  );
}
