import { Calendar, Check, Circle, Pencil, Trash2 } from 'lucide-react';
import type { Task } from '../../types';
import { CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '../../types';
import { formatDueDate, isPast } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';

const priorityTone = {
  high: 'red',
  medium: 'amber',
  low: 'sky',
} as const;

const categoryTone: Record<string, 'indigo' | 'violet' | 'pink' | 'emerald' | 'amber' | 'slate'> = {
  development: 'indigo',
  design: 'violet',
  marketing: 'pink',
  personal: 'emerald',
  research: 'amber',
  other: 'slate',
};

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'completed';
  const isOverdue =
    !isCompleted && task.dueDate !== null && isPast(task.dueDate);

  return (
    <div
      className={`group relative flex items-start gap-3 rounded-xl border bg-white dark:bg-slate-800/60 p-4 shadow-card transition-all duration-150 hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-600 ${
        isCompleted ? 'opacity-70' : ''
      } border-slate-200 dark:border-slate-700/60`}
    >
      <button
        onClick={() => onToggleComplete(task.id)}
        aria-label={isCompleted ? `Mark "${task.title}" as not completed` : `Mark "${task.title}" as completed`}
        aria-pressed={isCompleted}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
          isCompleted
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 dark:border-slate-600 hover:border-primary-500 text-transparent hover:text-primary-200'
        }`}
      >
        <Check size={12} strokeWidth={3.5} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`text-sm font-semibold leading-snug ${
              isCompleted
                ? 'text-slate-400 dark:text-slate-500 line-through'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(task)}
              aria-label={`Edit "${task.title}"`}
              className="p-1.5 rounded-md text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-slate-700 dark:hover:text-primary-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(task)}
              aria-label={`Delete "${task.title}"`}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-700 dark:hover:text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {task.description && (
          <p
            className={`mt-1 text-sm leading-relaxed line-clamp-2 ${
              isCompleted
                ? 'text-slate-400 dark:text-slate-500'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {task.description}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <Badge tone={priorityTone[task.priority]}>{PRIORITY_LABELS[task.priority]}</Badge>
          <Badge tone={categoryTone[task.category]}>{CATEGORY_LABELS[task.category]}</Badge>
          {!isCompleted && task.status === 'in-progress' && (
            <Badge tone="indigo">
              <Circle size={10} className="fill-current" />
              {STATUS_LABELS[task.status]}
            </Badge>
          )}
          {task.dueDate && (
            <span
              className={`inline-flex items-center gap-1 text-xs font-medium ${
                isOverdue
                  ? 'text-red-600 dark:text-red-400'
                  : isCompleted
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Calendar size={12} />
              {formatDueDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
