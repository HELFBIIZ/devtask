import { ArrowRight, AlarmClock } from 'lucide-react';
import type { Task } from '../../types';
import { CATEGORY_LABELS, PRIORITY_LABELS } from '../../types';
import { formatDueDate } from '../../utils/dateUtils';
import { Badge } from '../ui/Badge';

interface UpcomingDeadlinesProps {
  tasks: Task[];
  onViewAll: () => void;
}

const dotTone = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-sky-500' } as const;

export function UpcomingDeadlines({ tasks, onViewAll }: UpcomingDeadlinesProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Upcoming deadlines</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Next tasks due</p>
        </div>
        <button
          onClick={onViewAll}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
        >
          View all
          <ArrowRight size={13} />
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="mt-5 flex items-center gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3.5">
          <AlarmClock size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            No pending deadlines. You are all caught up.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-slate-100 dark:border-slate-700/60 px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
            >
              <span className={`h-2 w-2 rounded-full shrink-0 ${dotTone[task.priority]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                  {task.title}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {CATEGORY_LABELS[task.category]}
                </p>
              </div>
              <div className="text-right shrink-0">
                <Badge tone={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'amber' : 'sky'}>
                  {PRIORITY_LABELS[task.priority]}
                </Badge>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  {formatDueDate(task.dueDate)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
