import { NavigatorX, type ActionData } from 'navigatorx';
import type { 
  ShortcutConfig, 
  ShortcutEvent, 
  ShortcutStats,
  RegisterOptions,
  TypedAction, 
  ShortcutKeys
} from '../types';

/**
 * Service class for managing shortcuts with TypeScript
 */
export class ShortcutService {
  private navigator: NavigatorX;
  private stats: Map<string, number> = new Map();
  private events: ShortcutEvent[] = [];
  private listeners: Set<(event: ShortcutEvent) => void> = new Set();

  constructor(options?: { storageKey?: string }) {
    this.navigator = new NavigatorX(options);
  }

  /**
   * Register a shortcut with full type safety
   */
  register<T = void>(
    config: ShortcutConfig,
    action: () => T,
    actionData?: ActionData | null,
    options: RegisterOptions = {}
  ): void {
    const { override = false, persist = true } = options;

    if (!config.enabled) {
      console.warn(`Shortcut "${config.id}" is disabled`);
      return;
    }

    if (this.navigator.hasShortcut(config.id) && !override) {
      throw new Error(`Shortcut "${config.id}" already exists. Use override option.`);
    }

    const wrappedAction = this.wrapAction(config.id, action);

    if (persist && actionData) {
      this.navigator.registerShortcut(config.id, config.keys, wrappedAction, actionData);
    } else {
      this.navigator.registerShortcut(config.id, config.keys, wrappedAction);
    }
  }

  /**
   * Register a typed action with validation
   */
  registerTypedAction<T>(
    config: ShortcutConfig,
    typedAction: TypedAction<T>,
    actionData?: ActionData | null
  ): void {
    const action = () => {
      if (typedAction.canExecute && !typedAction.canExecute()) {
        console.warn(`Cannot execute shortcut "${config.id}"`);
        return;
      }
      return typedAction.execute();
    };

    this.register(config, action, actionData);
  }

  /**
   * Register multiple shortcuts at once
   */
  registerBatch(
    configs: ShortcutConfig[],
    actionMap: Record<string, () => void>,
    actionDataMap?: Record<string, ActionData>
  ): void {
    configs.forEach(config => {
      const action = actionMap[config.id];
      if (!action) {
        console.warn(`No action found for shortcut "${config.id}"`);
        return;
      }

      const actionData = actionDataMap?.[config.id];
      this.register(config, action, actionData);
    });
  }

  /**
   * Unregister a shortcut
   */
  unregister(id: string): void {
    this.navigator.unregisterShortcut(id);
    this.stats.delete(id);
  }

  /**
   * Check if shortcut exists
   */
  has(id: string): boolean {
    return this.navigator.hasShortcut(id);
  }

  /**
   * Get all registered shortcuts
   */
  getAll(): ReturnType<NavigatorX['getShortcuts']> {
    return this.navigator.getShortcuts();
  }

  /**
   * Get shortcut statistics
   */
  getStats(): ShortcutStats {
    const shortcuts = this.navigator.getShortcuts();
    const mostUsed = Array.from(this.stats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => ({ id, count }));

    const lastExecuted = this.events[this.events.length - 1];

    return {
      totalRegistered: Object.keys(shortcuts).length,
      totalExecuted: Array.from(this.stats.values()).reduce((a, b) => a + b, 0),
      mostUsed,
      ...(lastExecuted && { lastExecuted }),
    };
  }

  /**
   * Clear all shortcuts
   */
  clear(): void {
    this.navigator.clear();
    this.stats.clear();
    this.events = [];
  }

  /**
   * Subscribe to shortcut events
   */
  on(listener: (event: ShortcutEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Destroy the service
   */
  destroy(): void {
    this.navigator.destroy();
    this.stats.clear();
    this.events = [];
    this.listeners.clear();
  }

  /**
   * Wrap action with tracking and error handling
   */
  private wrapAction<T>(id: string, action: () => T): () => T {
    return () => {
      const event: ShortcutEvent = {
        id,
        keys: this.getShortcutKeys(id),
        timestamp: Date.now(),
        success: false,
      };

      try {
        const result = action();
        event.success = true;
        this.trackExecution(id, event);
        return result;
      } catch (error) {
        event.error = error as Error;
        this.trackExecution(id, event);
        throw error;
      }
    };
  }

  /**
   * Track shortcut execution
   */
  private trackExecution(id: string, event: ShortcutEvent): void {
    this.stats.set(id, (this.stats.get(id) || 0) + 1);
    this.events.push(event);
    
    // Keep only last 100 events
    if (this.events.length > 100) {
      this.events.shift();
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(event));
  }

  /**
   * Get shortcut keys by ID
   */
  private getShortcutKeys(id: string): ShortcutKeys {
    const shortcuts = this.navigator.getShortcuts();
    const shortcut = shortcuts[id];
    if (!shortcut) {
      return ['Control', ''];
    }
    return shortcut.keys as ShortcutKeys;
  }
}