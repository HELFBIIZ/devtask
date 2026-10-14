import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconBgClass: string;
  hint?: string;
}

export function StatsCard({ label, value, icon: Icon, iconBgClass, hint }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-5 shadow-card transition-shadow duration-150 hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgClass}`}>
          <Icon size={19} />
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
}
