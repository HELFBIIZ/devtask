import { PRIORITY_LABELS } from '../../types';

interface PriorityChartProps {
  data: Record<string, number>;
}

const bars = [
  { key: 'high', label: PRIORITY_LABELS.high, bar: 'bg-red-500', dot: 'bg-red-500' },
  { key: 'medium', label: PRIORITY_LABELS.medium, bar: 'bg-amber-500', dot: 'bg-amber-500' },
  { key: 'low', label: PRIORITY_LABELS.low, bar: 'bg-sky-500', dot: 'bg-sky-500' },
];

export function PriorityChart({ data }: PriorityChartProps) {
  const max = Math.max(1, ...bars.map((b) => data[b.key] ?? 0));

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-card">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        Active tasks by priority
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Incomplete tasks only</p>
      <div className="mt-5 space-y-4">
        {bars.map((bar) => {
          const value = data[bar.key] ?? 0;
          const width = (value / max) * 100;
          return (
            <div key={bar.key}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-300">
                  <span className={`h-2 w-2 rounded-full ${bar.dot}`} />
                  {bar.label}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full ${bar.bar} transition-all duration-500 ease-out`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
