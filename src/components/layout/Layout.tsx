import { useState, type ReactNode } from 'react';
import type { ViewKey } from '../../types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { Theme } from '../../hooks/useTheme';

interface LayoutProps {
  currentView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  counts: Record<ViewKey, number>;
  title: string;
  subtitle?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onNewTask: () => void;
  children: ReactNode;
}

export function Layout({
  currentView,
  onNavigate,
  counts,
  title,
  subtitle,
  searchValue,
  onSearchChange,
  theme,
  onToggleTheme,
  onNewTask,
  children,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <Sidebar
        currentView={currentView}
        onNavigate={onNavigate}
        counts={counts}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={title}
          subtitle={subtitle}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onNewTask={onNewTask}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
