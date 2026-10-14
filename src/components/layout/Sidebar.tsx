import { CheckSquare, X } from 'lucide-react';
import type { ViewKey } from '../../types';
import { NAV_ITEMS } from './navigation';

interface SidebarProps {
  currentView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  counts: Record<ViewKey, number>;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentView, onNavigate, counts, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
              <CheckSquare size={18} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                DevTask
              </span>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 -mt-0.5 font-medium">
                Task Management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Views
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.key;
              return (
                <li key={item.key}>
                  <button
                    onClick={() => {
                      onNavigate(item.key);
                      onClose();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {counts[item.key] > 0 && (
                      <span
                        className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                          isActive
                            ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {counts[item.key]}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-4 py-4 border-t border-slate-100 dark:border-slate-800">
          <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white">
            <p className="text-sm font-semibold">Stay productive</p>
            <p className="mt-1 text-xs text-primary-100 leading-relaxed">
              Break big goals into small tasks and track your progress daily.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
