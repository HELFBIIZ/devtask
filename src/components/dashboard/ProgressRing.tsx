interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ percentage, size = 148, strokeWidth = 12 }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label="Completion percentage">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-100 dark:stroke-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-primary-500 transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{clamped}%</span>
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">completed</span>
      </div>
    </div>
  );
}
