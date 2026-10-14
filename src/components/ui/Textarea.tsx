import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id ?? props.name ?? label;
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500'
              : 'border-slate-200 focus:border-primary-500 focus:ring-primary-500/20 dark:border-slate-600 dark:focus:border-primary-400'
          }`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
