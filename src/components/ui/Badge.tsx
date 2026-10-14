import type { ReactNode } from 'react';

type Tone = 'slate' | 'indigo' | 'amber' | 'red' | 'emerald' | 'sky' | 'violet' | 'pink';

const toneClasses: Record<Tone, string> = {
  slate: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  indigo: 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300',
  amber: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  red: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  sky: 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  violet: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  pink: 'bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
};

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'slate', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
