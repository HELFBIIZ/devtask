import { Menu, Moon, Plus, Search, Sun } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onNewTask: () => void;
  onOpenSidebar: () => void;
}

export function Header({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  theme,
  onToggleTheme,
  onNewTask,
  onOpenSidebar,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 h-16">
        <button
          onClick={onOpenSidebar}
          aria-label="Open menu"
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative hidden md:block w-64 lg:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title..."
            aria-label="Search tasks"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
          />
        </div>

        <button
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button
          onClick={onNewTask}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 sm:px-4 h-10 text-sm font-medium text-white shadow-sm hover:bg-primary-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>

      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title..."
            aria-label="Search tasks"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 dark:focus:border-primary-400 transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
