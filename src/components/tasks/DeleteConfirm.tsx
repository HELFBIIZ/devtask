import type { Task } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmProps {
  task: Task | null;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}

export function DeleteConfirm({ task, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <Modal isOpen={task !== null} onClose={onCancel} title="Delete task">
      {task && (
        <div>
          <div className="flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
              <AlertTriangle size={18} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Are you sure you want to delete this task?
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  "{task.title}"
                </span>{' '}
                will be permanently removed. This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => onConfirm(task.id)}>
              Delete task
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
