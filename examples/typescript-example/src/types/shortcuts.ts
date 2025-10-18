import type { ModifierKey, ShortcutKeys, ActionData, Shortcut } from 'navigatorx';

/**
 * Extended shortcut configuration with metadata
 */
export interface ShortcutConfig {
  id: string;
  keys: ShortcutKeys;
  description: string;
  category: ShortcutCategory;
  enabled?: boolean;
}

/**
 * Shortcut categories for organization
 */
export type ShortcutCategory = 
  | 'navigation'
  | 'editing'
  | 'view'
  | 'system'
  | 'custom';

/**
 * Typed action with specific return type
 */
export interface TypedAction<T = void> {
  execute: () => T | Promise<T>;
  undo?: () => void;
  canExecute?: () => boolean;
}

/**
 * Shortcut with typed action
 */
export interface TypedShortcut<T = void> extends Omit<Shortcut, 'action'> {
  action: TypedAction<T>;
  config: ShortcutConfig;
}

/**
 * Navigation target with type safety
 */
export interface NavigationTarget {
  path: string;
  title: string;
  requiresAuth?: boolean;
}

/**
 * Shortcut registration options
 */
export interface RegisterOptions {
  override?: boolean;
  persist?: boolean;
  global?: boolean;
}

/**
 * Shortcut event payload
 */
export interface ShortcutEvent {
  id: string;
  keys: ShortcutKeys;
  timestamp: number;
  success: boolean;
  error?: Error;
}

/**
 * Shortcut statistics
 */
export interface ShortcutStats {
  totalRegistered: number;
  totalExecuted: number;
  mostUsed: Array<{ id: string; count: number }>;
  lastExecuted?: ShortcutEvent;
}

// Re-export NavigatorX types
export type { ModifierKey, ShortcutKeys, ActionData, Shortcut };