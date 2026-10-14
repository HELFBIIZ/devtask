import { CheckSquare, CalendarDays, CalendarClock, LayoutDashboard, ListTodo } from 'lucide-react';
import type { ViewKey } from '../../types';

export interface NavItem {
  key: ViewKey;
  label: string;
  icon: typeof LayoutDashboard;
}

export const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'all', label: 'All Tasks', icon: ListTodo },
  { key: 'today', label: 'Today', icon: CalendarDays },
  { key: 'upcoming', label: 'Upcoming', icon: CalendarClock },
  { key: 'completed', label: 'Completed', icon: CheckSquare },
];
