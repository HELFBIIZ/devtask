import { useEffect, useState, type FormEvent } from 'react';
import type { Category, Priority, Task, TaskDraft, TaskStatus } from '../../types';
import { ALL_CATEGORIES, CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';

interface TaskFormProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (draft: TaskDraft) => void;
}

interface FormErrors {
  title?: string;
  dueDate?: string;
}

export function TaskForm({ isOpen, task, onClose, onSave }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<TaskStatus>('pending');
  const [category, setCategory] = useState<Category>('development');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen) {
      setTitle(task?.title ?? '');
      setDescription(task?.description ?? '');
      setPriority(task?.priority ?? 'medium');
      setStatus(task?.status ?? 'pending');
      setCategory(task?.category ?? 'development');
      setDueDate(task?.dueDate ?? '');
      setErrors({});
    }
  }, [isOpen, task]);

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!title.trim()) {
      next.title = 'Title is required.';
    } else if (title.trim().length < 3) {
      next.title = 'Title must be at least 3 characters.';
    } else if (title.trim().length > 120) {
      next.title = 'Title must be 120 characters or fewer.';
    }
    if (dueDate) {
      const parsed = new Date(dueDate);
      if (Number.isNaN(parsed.getTime())) {
        next.dueDate = 'Please enter a valid date.';
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
      category,
      dueDate: dueDate || null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit task' : 'Create new task'}
      size="lg"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Input
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Implement user authentication"
          error={errors.title}
          maxLength={120}
          required
        />

        <Textarea
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details, acceptance criteria, or notes..."
          rows={3}
          maxLength={500}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            options={(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => ({
              value: p,
              label: PRIORITY_LABELS[p],
            }))}
          />
          <Select
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            options={(Object.keys(STATUS_LABELS) as TaskStatus[]).map((s) => ({
              value: s,
              label: STATUS_LABELS[s],
            }))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            options={ALL_CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] }))}
          />
          <Input
            label="Due date"
            name="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            error={errors.dueDate}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{task ? 'Save changes' : 'Create task'}</Button>
        </div>
      </form>
    </Modal>
  );
}
