import type { ShortcutConfig, NavigationTarget } from '../types';

/**
 * Navigation shortcuts configuration
 */
export const NAVIGATION_SHORTCUTS: ShortcutConfig[] = [
  {
    id: 'home',
    keys: ['Control', 'h'],
    description: 'Navigate to home page',
    category: 'navigation',
    enabled: true,
  },
  {
    id: 'dashboard',
    keys: ['Control', 'd'],
    description: 'Navigate to dashboard',
    category: 'navigation',
    enabled: true,
  },
  {
    id: 'settings',
    keys: ['Control', ','],
    description: 'Open settings',
    category: 'navigation',
    enabled: true,
  },
];

/**
 * Editing shortcuts configuration
 */
export const EDITING_SHORTCUTS: ShortcutConfig[] = [
  {
    id: 'save',
    keys: ['Control', 's'],
    description: 'Save current document',
    category: 'editing',
    enabled: true,
  },
  {
    id: 'undo',
    keys: ['Control', 'z'],
    description: 'Undo last action',
    category: 'editing',
    enabled: true,
  },
  {
    id: 'redo',
    keys: ['Control', 'y'],
    description: 'Redo last action',
    category: 'editing',
    enabled: true,
  },
];

/**
 * View shortcuts configuration
 */
export const VIEW_SHORTCUTS: ShortcutConfig[] = [
  {
    id: 'toggleSidebar',
    keys: ['Control', 'b'],
    description: 'Toggle sidebar',
    category: 'view',
    enabled: true,
  },
  {
    id: 'fullscreen',
    keys: ['Shift', 'f'],
    description: 'Toggle fullscreen',
    category: 'view',
    enabled: true,
  },
  {
    id: 'zoom-in',
    keys: ['Control', '+'],
    description: 'Zoom in',
    category: 'view',
    enabled: true,
  },
];

/**
 * System shortcuts configuration
 */
export const SYSTEM_SHORTCUTS: ShortcutConfig[] = [
  {
    id: 'search',
    keys: ['Control', 'k'],
    description: 'Open command palette',
    category: 'system',
    enabled: true,
  },
  {
    id: 'help',
    keys: ['Shift', '?'],
    description: 'Show keyboard shortcuts',
    category: 'system',
    enabled: true,
  },
];

/**
 * All shortcuts combined
 */
export const ALL_SHORTCUTS: ShortcutConfig[] = [
  ...NAVIGATION_SHORTCUTS,
  ...EDITING_SHORTCUTS,
  ...VIEW_SHORTCUTS,
  ...SYSTEM_SHORTCUTS,
];

/**
 * Navigation targets
 */
export const NAVIGATION_TARGETS: Record<string, NavigationTarget> = {
  home: { path: '/', title: 'Home' },
  dashboard: { path: '/dashboard', title: 'Dashboard', requiresAuth: true },
  settings: { path: '/settings', title: 'Settings', requiresAuth: true },
  profile: { path: '/profile', title: 'Profile', requiresAuth: true },
} as const;