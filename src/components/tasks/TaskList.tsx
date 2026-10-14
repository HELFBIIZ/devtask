import type { Task } from '../../types';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  emptyTitle?: string;
  emptyMessage?: string;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  emptyTitle = 'No tasks found',
  emptyMessage = 'Get started by creating your first task.',
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <ul className="space-y-3" aria-label="Task list">
      {tasks.map((task) => (
        <li key={task.id} className="animate-slide-up">
          <TaskItem task={task} onToggleComplete={onToggleComplete} onEdit={onEdit} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
