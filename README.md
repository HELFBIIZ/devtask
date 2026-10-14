# DevTask

A modern, production-quality task management web application built with React, TypeScript, Vite, and Tailwind CSS. DevTask helps you organize work with priorities, categories, due dates, and a polished dashboard — all persisted locally in your browser.

## Features

- **Dashboard** — total, completed, and pending task counts, completion percentage, an animated progress ring, priority/category distribution charts, and upcoming deadlines.
- **Full task management** — create, edit, delete, and complete tasks with title, description, priority (Low / Medium / High), status (Pending / In Progress / Completed), due date, and category.
- **Dedicated views** — All Tasks, Today, Upcoming, and Completed, each with contextual empty states.
- **Filtering, search, and sorting** — filter by status, priority, and category; search by title; sort by due date, priority, or creation date.
- **Dark & light mode** — toggle with system-preference detection, persisted across sessions.
- **LocalStorage persistence** — tasks, filters, active view, and theme preference survive reloads.
- **Polished UX** — confirmation dialog before deleting, form validation, keyboard navigation (Escape closes modals, focus rings, ARIA labels), responsive layout for mobile / tablet / desktop.

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | React 18 + TypeScript               |
| Build     | Vite 5                              |
| Styling   | Tailwind CSS 3 (class-based dark mode) |
| Icons     | Lucide React                        |
| Storage   | LocalStorage (via custom hooks)     |

## Project Structure

```
devtask/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx                  # App entry point
    ├── App.tsx                   # Root component, view routing, modal state
    ├── index.css                 # Tailwind directives + base styles
    ├── types/
    │   └── index.ts              # Shared TypeScript types & constants
    ├── hooks/
    │   ├── useLocalStorage.ts    # Generic persistent state hook
    │   ├── useTasks.ts           # Task CRUD operations
    │   └── useTheme.ts           # Dark/light mode management
    ├── utils/
    │   ├── dateUtils.ts          # Date helpers (today, overdue, formatting)
    │   └── taskUtils.ts          # Filtering, sorting, statistics
    ├── components/
    │   ├── ui/                   # Button, Modal, Badge, Input, Textarea, Select
    │   ├── layout/               # Sidebar, Header, Layout, navigation config
    │   ├── tasks/                # TaskItem, TaskList, TaskForm, TaskFilters,
    │   │                         #   DeleteConfirm, EmptyState
    │   └── dashboard/            # StatsCard, ProgressRing, PriorityChart,
    │                             #   CategoryChart, UpcomingDeadlines
    └── pages/
        ├── Dashboard.tsx         # Stats overview page
        ├── TaskView.tsx          # Shared task list page (filters + list)
        └── views.tsx             # View-specific page wrapper
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other commands

```bash
npm run build      # Type-check and produce a production build in dist/
npm run preview    # Preview the production build locally
npm run lint       # Type-check without emitting files
```

## Usage Notes

- On first launch, DevTask seeds a few sample tasks so the dashboard is meaningful. Delete them anytime — everything is stored in your browser's LocalStorage under the keys `devtask-tasks`, `devtask-filters`, `devtask-view`, and `devtask-theme`.
- To reset all data, clear your browser's site data or run `localStorage.clear()` in the dev console.
- The sidebar collapses into an overlay drawer on screens smaller than `lg` (1024px).

## Technical Details

- **State management** — custom React hooks (`useTasks`, `useLocalStorage`, `useTheme`) keep business logic separate from UI components; no external state library required.
- **Accessibility** — semantic landmarks, ARIA labels/pressed states on icon buttons, focus-visible rings, Escape-to-close modals, and auto-focus on form open.
- **Performance** — memoized filtering/sorting with `useMemo`, CSS-only animations, and a single-bundle production build (~58 kB gzipped JS).
