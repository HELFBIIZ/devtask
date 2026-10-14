export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isToday(iso: string | null): boolean {
  if (!iso) return false;
  return iso === todayISO();
}

export function isPast(iso: string | null): boolean {
  if (!iso) return false;
  return iso < todayISO();
}

export function isUpcoming(iso: string | null): boolean {
  if (!iso) return false;
  return iso > todayISO();
}

export function daysUntil(iso: string): number {
  const today = parseISODate(todayISO());
  const target = parseISODate(iso);
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDueDate(iso: string | null): string {
  if (!iso) return 'No due date';
  const days = daysUntil(iso);
  const date = parseISODate(iso);
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  if (days === 0) return `Today · ${formatted}`;
  if (days === 1) return `Tomorrow · ${formatted}`;
  if (days === -1) return `Yesterday · ${formatted}`;
  if (days < 0) return `${Math.abs(days)} days overdue · ${formatted}`;
  return `In ${days} days · ${formatted}`;
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
