import { CATEGORY_LABELS } from '../../types';

interface CategoryChartProps {
  data: Record<string, number>;
}

const palette = [
  'bg-primary-500',
  'bg-violet-500',
  'bg-pink-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-slate-400',
];

export function CategoryChart({ data }: CategoryChartProps) {
  const entries = Object.entries(data)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, count]) => sum + count, 0);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-card">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Tasks by category</h3>
        <p className="mt-4 text-sm text-slate-400 dark:text-slate-500">No tasks yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-card">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Tasks by category</h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Distribution across all tasks</p>

      <div className="mt-4 flex h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        {entries.map(([category, count], index) => (
          <div
            key={category}
            className={`${palette[index % palette.length]} h-full transition-all duration-500`}
            style={{ width: `${(count / total) * 100}%` }}
            title={`${CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}: ${count}`}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {entries.map(([category, count], index) => (
          <li key={category} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className={`h-2.5 w-2.5 rounded-sm ${palette[index % palette.length]}`} />
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category}
            </span>
            <span className="font-medium text-slate-900 dark:text-white">
              {count}
              <span className="ml-1.5 text-xs font-normal text-slate-400">
                ({Math.round((count / total) * 100)}%)
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
