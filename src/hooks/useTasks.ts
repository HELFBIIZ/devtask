import { useCallback, useMemo } from 'react';
import type { Task, TaskDraft } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/taskUtils';

const STORAGE_KEY = 'devtask-tasks';

function createSampleTasks(): Task[] {
  const now = new Date();
  const iso = (offsetDays: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().slice(0, 10);
  };
  const ts = (offsetDays: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - offsetDays);
    return d.toISOString();
  };

  return [
    {
      id: generateId(),
      title: 'Design system audit',
      description: 'Review component library for consistency in spacing, typography, and color usage.',
      priority: 'high',
      status: 'in-progress',
      category: 'design',
      dueDate: iso(0),
      createdAt: ts(3),
      completedAt: null,
    },
    {
      id: generateId(),
      title: 'Implement OAuth login flow',
      description: 'Add Google and GitHub OAuth providers with proper token refresh handling.',
      priority: 'high',
      status: 'pending',
      category: 'development',
      dueDate: iso(1),
      createdAt: ts(2),
      completedAt: null,
    },
    {
      id: generateId(),
      title: 'Write API integration tests',
      description: 'Cover critical endpoints: auth, tasks, and user profile with at least 90% coverage.',
      priority: 'medium',
      status: 'pending',
      category: 'development',
      dueDate: iso(4),
      createdAt: ts(1),
      completedAt: null,
    },
    {
      id: generateId(),
      title: 'Update onboarding emails',
      description: 'Refresh copy and design for the three-step onboarding drip campaign.',
      priority: 'low',
      status: 'pending',
      category: 'marketing',
      dueDate: iso(7),
      createdAt: ts(1),
      completedAt: null,
    },
    {
      id: generateId(),
      title: 'Research competitor pricing',
      description: 'Compile pricing tiers from top 5 competitors and summarize positioning opportunities.',
      priority: 'medium',
      status: 'completed',
      category: 'research',
      dueDate: iso(-1),
      createdAt: ts(5),
      completedAt: ts(1),
    },
    {
      id: generateId(),
      title: 'Fix mobile navigation bug',
      description: 'Hamburger menu does not close after navigation on iOS Safari.',
      priority: 'high',
      status: 'completed',
      category: 'development',
      dueDate: iso(-2),
      createdAt: ts(6),
      completedAt: ts(2),
    },
  ];
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);

  const initialized = useMemo(() => {
    if (tasks.length === 0) {
      setTasks(createSampleTasks());
      return createSampleTasks();
    }
    return tasks;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = useCallback(
    (draft: TaskDraft): Task => {
      const task: Task = {
        ...draft,
        id: generateId(),
        createdAt: new Date().toISOString(),
        completedAt: draft.status === 'completed' ? new Date().toISOString() : null,
      };
      setTasks((prev) => [task, ...prev]);
      return task;
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, draft: TaskDraft) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          const wasCompleted = task.status === 'completed';
          const isCompleted = draft.status === 'completed';
          return {
            ...task,
            ...draft,
            completedAt: isCompleted && !wasCompleted ? new Date().toISOString() : !isCompleted ? null : task.completedAt,
          };
        })
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== id) return task;
          const isCompleted = task.status !== 'completed';
          return {
            ...task,
            status: isCompleted ? 'completed' : 'pending',
            completedAt: isCompleted ? new Date().toISOString() : null,
          };
        })
      );
    },
    [setTasks]
  );

  const getTaskById = useCallback(
    (id: string): Task | undefined => {
      return initialized.find((task) => task.id === id);
    },
    [initialized]
  );

  return { tasks: initialized, addTask, updateTask, deleteTask, toggleComplete, getTaskById };
}
