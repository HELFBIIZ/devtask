import { ArrowUpDown, Filter, RotateCcw } from 'lucide-react';
import type { TaskFilters as Filters, SortKey } from '../../types';
import { ALL_CATEGORIES, CATEGORY_LABELS, PRIORITY_LABELS, STATUS_LABELS } from '../../types';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface TaskFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
}

export function TaskFilters({ filters, onChange, resultCount }: TaskFiltersProps) {
  const hasActiveFilters =
    filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all';

  const reset = () =>
    onChange({ ...filters, status: 'all', priority: 'all', category: 'all' });

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/60 p-4 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={15} className="text-slate-400" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Filters</span>
        <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
          {resultCount} {resultCount === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select
          label="Status"
          name="filter-status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as Filters['status'] })}
          options={[
            { value: 'all', label: 'All statuses' },
            ...(Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>).map((s) => ({
              value: s,
              label: STATUS_LABELS[s],
            })),
          ]}
        />
        <Select
          label="Priority"
          name="filter-priority"
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value as Filters['priority'] })}
          options={[
            { value: 'all', label: 'All priorities' },
            ...(Object.keys(PRIORITY_LABELS) as Array<keyof typeof PRIORITY_LABELS>).map((p) => ({
              value: p,
              label: PRIORITY_LABELS[p],
            })),
          ]}
        />
        <Select
          label="Category"
          name="filter-category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Filters['category'] })}
          options={[
            { value: 'all', label: 'All categories' },
            ...ALL_CATEGORIES.map((c) => ({ value: c, label: CATEGORY_LABELS[c] })),
          ]}
        />
        <div>
          <label
            htmlFor="filter-sort"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowUpDown size={13} className="text-slate-400" />
              Sort by
            </span>
          </label>
          <div className="relative">
            <select
              id="filter-sort"
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as SortKey })}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-900 shadow-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-primary-400"
            >
              <option value="createdAt">Creation date</option>
              <option value="dueDate">Due date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <Button variant="ghost" size="sm" icon={<RotateCcw size={13} />} onClick={reset}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
}
