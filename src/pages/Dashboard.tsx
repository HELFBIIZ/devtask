import { CheckCircle2, CircleDashed, ListTodo, TrendingUp } from 'lucide-react';
import type { Task } from '../types';
import { getCompletionPercentage, getTasksByCategory, getTasksByPriority, getUpcomingDeadlines } from '../utils/taskUtils';
import { StatsCard } from '../components/dashboard/StatsCard';
import { ProgressRing } from '../components/dashboard/ProgressRing';
import { PriorityChart } from '../components/dashboard/PriorityChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';

interface DashboardProps {
  tasks: Task[];
  onViewAll: () => void;
}

export function Dashboard({ tasks, onViewAll }: DashboardProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status !== 'completed').length;
  const percentage = getCompletionPercentage(tasks);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          label="Total tasks"
          value={total}
          icon={ListTodo}
          iconBgClass="bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400"
          hint="All time"
        />
        <StatsCard
          label="Completed"
          value={completed}
          icon={CheckCircle2}
          iconBgClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
          hint={`${percentage}% of total`}
        />
        <StatsCard
          label="Pending"
          value={pending}
          icon={CircleDashed}
          iconBgClass="bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
          hint="Awaiting completion"
        />
        <StatsCard
          label="Completion rate"
          value={`${percentage}%`}
          icon={TrendingUp}
          iconBgClass="bg-violet-50 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400"
          hint={total === 0 ? 'No tasks yet' : `${completed} of ${total} done`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-6 shadow-card flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white self-start">
            Overall progress
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 self-start">
            Share of completed tasks
          </p>
          <div className="mt-6">
            <ProgressRing percentage={percentage} />
          </div>
        </div>
        <PriorityChart data={getTasksByPriority(tasks)} />
        <CategoryChart data={getTasksByCategory(tasks)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1">
        <UpcomingDeadlines tasks={getUpcomingDeadlines(tasks)} onViewAll={onViewAll} />
      </div>
    </div>
  );
}
