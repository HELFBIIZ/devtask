import { useCallback, useMemo, useState } from 'react';
import type { Task, TaskDraft, TaskFilters, ViewKey } from './types';
import { useTasks } from './hooks/useTasks';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ViewPage } from './pages/views';
import { TaskForm } from './components/tasks/TaskForm';
import { DeleteConfirm } from './components/tasks/DeleteConfirm';

const DEFAULT_FILTERS: TaskFilters = {
  status: 'all',
  priority: 'all',
  category: 'all',
  search: '',
  sortBy: 'createdAt',
};

const VIEW_META: Record<ViewKey, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your productivity' },
  all: { title: 'All Tasks', subtitle: 'Every task in one place' },
  today: { title: 'Today', subtitle: 'Tasks due today' },
  upcoming: { title: 'Upcoming', subtitle: 'Future scheduled tasks' },
  completed: { title: 'Completed', subtitle: 'Tasks you have finished' },
};

export default function App() {
  const [currentView, setCurrentView] = useLocalStorage<ViewKey>('devtask-view', 'dashboard');
  const [filters, setFilters] = useLocalStorage<TaskFilters>('devtask-filters', DEFAULT_FILTERS);
  const { theme, toggleTheme } = useTheme();
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const counts = useMemo<Record<ViewKey, number>>(
    () => ({
      dashboard: 0,
      all: tasks.length,
      today: tasks.filter((t) => t.dueDate !== null && t.status !== 'completed' && t.dueDate === new Date().toISOString().slice(0, 10)).length,
      upcoming: tasks.filter((t) => t.dueDate !== null && t.status !== 'completed' && t.dueDate > new Date().toISOString().slice(0, 10)).length,
      completed: tasks.filter((t) => t.status === 'completed').length,
    }),
    [tasks]
  );

  const handleNewTask = useCallback(() => {
    setEditingTask(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const handleSave = useCallback(
    (draft: TaskDraft) => {
      if (editingTask) {
        updateTask(editingTask.id, draft);
      } else {
        addTask(draft);
      }
      setIsFormOpen(false);
      setEditingTask(null);
    },
    [editingTask, addTask, updateTask]
  );

  const handleDeleteConfirm = useCallback(
    (id: string) => {
      deleteTask(id);
      setDeletingTask(null);
    },
    [deleteTask]
  );

  const handleNavigate = useCallback(
    (view: ViewKey) => {
      setCurrentView(view);
    },
    [setCurrentView]
  );

  const searchValue = currentView === 'dashboard' ? '' : filters.search;
  const onSearchChange = useCallback(
    (value: string) => setFilters((prev) => ({ ...prev, search: value })),
    [setFilters]
  );

  const meta = VIEW_META[currentView];

  return (
    <>
      <Layout
        currentView={currentView}
        onNavigate={handleNavigate}
        counts={counts}
        title={meta.title}
        subtitle={meta.subtitle}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNewTask={handleNewTask}
      >
        {currentView === 'dashboard' ? (
          <Dashboard tasks={tasks} onViewAll={() => handleNavigate('all')} />
        ) : (
          <ViewPage
            view={currentView}
            tasks={tasks}
            filters={filters}
            onFiltersChange={setFilters}
            onToggleComplete={toggleComplete}
            onEdit={handleEdit}
            onDelete={setDeletingTask}
            onNewTask={handleNewTask}
          />
        )}
      </Layout>

      <TaskForm
        isOpen={isFormOpen}
        task={editingTask}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
      />
      <DeleteConfirm
        task={deletingTask}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingTask(null)}
      />
    </>
  );
}
