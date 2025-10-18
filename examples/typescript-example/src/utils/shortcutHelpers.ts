import type { ShortcutConfig, ShortcutCategory, ModifierKey } from '../types';

/**
 * Create a shortcut configuration
 */
export function createShortcutConfig(
  id: string,
  modifier: ModifierKey,
  key: string,
  description: string,
  category: ShortcutCategory = 'custom'
): ShortcutConfig {
  return {
    id,
    keys: [modifier, key],
    description,
    category,
    enabled: true,
  };
}

/**
 * Filter shortcuts by category
 */
export function filterByCategory(
  shortcuts: ShortcutConfig[],
  category: ShortcutCategory
): ShortcutConfig[] {
  return shortcuts.filter(s => s.category === category);
}

/**
 * Group shortcuts by category
 */
export function groupByCategory(
  shortcuts: ShortcutConfig[]
): Record<ShortcutCategory, ShortcutConfig[]> {
  const groups: Partial<Record<ShortcutCategory, ShortcutConfig[]>> = {};

  shortcuts.forEach(shortcut => {
    if (!groups[shortcut.category]) {
      groups[shortcut.category] = [];
    }
    groups[shortcut.category]!.push(shortcut);
  });

  return groups as Record<ShortcutCategory, ShortcutConfig[]>;
}

/**
 * Validate shortcut configuration
 */
export function validateShortcut(config: ShortcutConfig): boolean {
  if (!config.id || typeof config.id !== 'string') {
    console.error('Invalid shortcut ID');
    return false;
  }

  if (!Array.isArray(config.keys) || config.keys.length !== 2) {
    console.error('Invalid shortcut keys');
    return false;
  }

  const [modifier, key] = config.keys;
  const validModifiers: ModifierKey[] = ['Shift', 'Control', 'Alt', 'Meta'];
  
  if (!validModifiers.includes(modifier)) {
    console.error('Invalid modifier key');
    return false;
  }

  if (!key || typeof key !== 'string') {
    console.error('Invalid key');
    return false;
  }

  return true;
}

/**
 * Format shortcut for display
 */
export function formatShortcut(config: ShortcutConfig): string {
  const [modifier, key] = config.keys;
  const modSymbol = getModifierSymbol(modifier);
  return `${modSymbol}${key.toUpperCase()}`;
}

/**
 * Get modifier symbol for display
 */
export function getModifierSymbol(modifier: ModifierKey): string {
  const symbols: Record<ModifierKey, string> = {
    Control: 'Ctrl+',
    Shift: '⇧',
    Alt: 'Alt+',
    Meta: '⌘',
  };
  return symbols[modifier] || modifier;
}

/**
 * Check for shortcut conflicts
 */
export function findConflicts(shortcuts: ShortcutConfig[]): Array<[ShortcutConfig, ShortcutConfig]> {
  const conflicts: Array<[ShortcutConfig, ShortcutConfig]> = [];
  
  for (let i = 0; i < shortcuts.length; i++) {
    for (let j = i + 1; j < shortcuts.length; j++) {
      const a = shortcuts[i];
      const b = shortcuts[j];
      
      if (a && b && a.keys[0] === b.keys[0] && a.keys[1] === b.keys[1]) {
        conflicts.push([a, b]);
      }
    }
  }
  
  return conflicts;
}

/**
 * Merge shortcut configurations
 */
export function mergeConfigs(
  base: ShortcutConfig[],
  overrides: Partial<ShortcutConfig>[]
): ShortcutConfig[] {
  const result = [...base];
  
  overrides.forEach(override => {
    if (!override.id) return;
    
    const index = result.findIndex(s => s.id === override.id);
    if (index !== -1) {
      const existing = result[index];
      if (existing) {
        result[index] = { ...existing, ...override } as ShortcutConfig;
      }
    }
  });
  
  return result;
}