import { ClipboardList, Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/30 px-6 py-16 text-center animate-fade-in">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/40 text-primary-500 dark:text-primary-400">
        <ClipboardList size={26} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 h-10 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          <Plus size={16} strokeWidth={2.5} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
