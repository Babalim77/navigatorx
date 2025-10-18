// Type definitions
export type ModifierKey = "Shift" | "Control" | "Alt" | "Meta";

export type ShortcutKeys = [ModifierKey, string];

export type ActionData =
  | { type: "navigate"; url: string }
  | { type: "back"; fallback?: string }
  | { type: "custom"; message: string };

export interface Shortcut {
  keys: ShortcutKeys;
  action: () => void;
  actionData?: ActionData | null;
}

export interface NavigatorXOptions {
  storageKey?: string;
}

interface SerializableShortcut {
  keys: ShortcutKeys;
  actionData: ActionData | null;
}

export class NavigatorX {
  private shortcuts: Record<string, Shortcut> = {};
  private options: NavigatorXOptions;
  private pressedKeys: Set<string> = new Set();
  private storageKey: string;
  private _handleKey: (e: KeyboardEvent) => void;
  private _handleKeyUp: (e: KeyboardEvent) => void;
  private _handleBlur: () => void;
  private _handleVisibilityChange: () => void;

  constructor(options: NavigatorXOptions = {}) {
    this.options = options;
    this.storageKey = options.storageKey || "navigatorx_shortcuts";
    
    // Bind methods
    this._handleKey = this.handleKey.bind(this);
    this._handleKeyUp = this.handleKeyUp.bind(this);
    this._handleBlur = this.handleBlur.bind(this);
    this._handleVisibilityChange = this.handleVisibilityChange.bind(this);

    // Add event listeners
    window.addEventListener("keydown", this._handleKey);
    window.addEventListener("keyup", this._handleKeyUp);
    window.addEventListener("blur", this._handleBlur);
    document.addEventListener("visibilitychange", this._handleVisibilityChange);

    // Load saved shortcuts
    this.load();
  }

  /**
   * Register a new keyboard shortcut
   * @param id - Unique identifier for the shortcut
   * @param keys - Tuple of [modifier, key]
   * @param action - Function to execute when shortcut is triggered
   * @param actionData - Serializable data for persistence (optional)
   */
  public registerShortcut(
    id: string,
    keys: ShortcutKeys,
    action: () => void,
    actionData: ActionData | null = null
  ): void {
    this.shortcuts[id] = { keys, action, actionData };
    this.save();
  }

  /**
   * Remove a registered shortcut
   * @param id - Unique identifier of the shortcut to remove
   */
  public unregisterShortcut(id: string): void {
    delete this.shortcuts[id];
    this.save();
  }

  /**
   * Get all registered shortcuts
   * @returns Record of all shortcuts
   */
  public getShortcuts(): Record<string, Shortcut> {
    return { ...this.shortcuts };
  }

  /**
   * Check if a shortcut exists
   * @param id - Unique identifier to check
   */
  public hasShortcut(id: string): boolean {
    return id in this.shortcuts;
  }

  private handleKey(e: KeyboardEvent): void {
    // Prevent adding keys if disabled or document not visible
    if (document.hidden) return;

    this.pressedKeys.add(e.key.toLowerCase());

    // Safety limit to prevent Set from growing unbounded
    if (this.pressedKeys.size > 10) {
      console.warn("NavigatorX: Too many keys pressed, clearing state");
      this.pressedKeys.clear();
      return;
    }

    Object.values(this.shortcuts).forEach(({ keys, action }) => {
      const [modifier, key] = keys;
      const modifierPressed =
        modifier === "Shift"
          ? e.shiftKey
          : modifier === "Control"
          ? e.ctrlKey
          : modifier === "Alt"
          ? e.altKey
          : modifier === "Meta"
          ? e.metaKey
          : false;

      const onlyThisModifier =
        (modifier === "Shift" && !e.ctrlKey && !e.altKey && !e.metaKey) ||
        (modifier === "Control" && !e.shiftKey && !e.altKey && !e.metaKey) ||
        (modifier === "Alt" && !e.shiftKey && !e.ctrlKey && !e.metaKey) ||
        (modifier === "Meta" && !e.shiftKey && !e.ctrlKey && !e.altKey);

      const exactMatch =
        this.pressedKeys.size === 2 &&
        this.pressedKeys.has(modifier.toLowerCase()) &&
        this.pressedKeys.has(key.toLowerCase());

      if (modifierPressed && onlyThisModifier && exactMatch) {
        e.preventDefault();
        action();
      }
    });
  }

  private handleKeyUp(e: KeyboardEvent): void {
    this.pressedKeys.delete(e.key.toLowerCase());
  }

  private handleBlur(): void {
    // Clear pressed keys when window loses focus
    // This prevents stuck keys when user switches windows/tabs while holding keys
    this.pressedKeys.clear();
  }

  private handleVisibilityChange(): void {
    // Clear pressed keys when tab becomes hidden
    if (document.hidden) {
      this.pressedKeys.clear();
    }
  }

  /**
   * Save shortcuts to localStorage
   */
  private save(): void {
    try {
      const serializable: Record<string, SerializableShortcut> = {};
      Object.entries(this.shortcuts).forEach(([id, { keys, actionData }]) => {
        serializable[id] = {
          keys,
          actionData: actionData ?? null,
        };
      });
      localStorage.setItem(this.storageKey, JSON.stringify(serializable));
    } catch (error) {
      console.error("NavigatorX: Failed to save shortcuts:", error);
    }
  }

  /**
   * Load shortcuts from localStorage
   */
  private load(): void {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed: Record<string, SerializableShortcut> = JSON.parse(saved);
        Object.entries(parsed).forEach(([id, { keys, actionData }]) => {
          // Reconstruct action based on actionData
          const action = this.createAction(actionData);
          this.shortcuts[id] = { keys, action, actionData };
        });
      }
    } catch (error) {
      console.error("NavigatorX: Failed to load shortcuts:", error);
    }
  }

  /**
   * Create action function from saved data
   */
  private createAction(actionData: ActionData | null): () => void {
    if (!actionData) return () => {};

    switch (actionData.type) {
      case "navigate":
        return () => {
          location.assign(actionData.url);
        };
      case "back":
        return () => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.href = actionData.fallback || "/";
          }
        };
      case "custom":
        return () => console.log(actionData.message);
      default:
        return () => {};
    }
  }

  /**
   * Clear all saved shortcuts from memory and localStorage
   */
  public clear(): void {
    this.shortcuts = {};
    this.pressedKeys.clear();
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error("NavigatorX: Failed to clear shortcuts:", error);
    }
  }

  /**
   * Clean up event listeners and clear state
   * Call this when you're done using NavigatorX to prevent memory leaks
   */
  public destroy(): void {
    // Remove all event listeners
    window.removeEventListener("keydown", this._handleKey);
    window.removeEventListener("keyup", this._handleKeyUp);
    window.removeEventListener("blur", this._handleBlur);
    document.removeEventListener("visibilitychange", this._handleVisibilityChange);

    // Clear all data
    this.shortcuts = {};
    this.pressedKeys.clear();
  }
}

// Export helper functions for creating action data
export const createNavigateAction = (url: string): ActionData => ({
  type: "navigate",
  url,
});

export const createBackAction = (fallback: string = "/"): ActionData => ({
  type: "back",
  fallback,
});

export const createCustomAction = (message: string): ActionData => ({
  type: "custom",
  message,
});