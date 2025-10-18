import type { ShortcutKeys, ShortcutConfig } from '../types';
import { createShortcutConfig, formatShortcut, validateShortcut } from '../utils/shortcutHelpers';

/**
 * Basic TypeScript usage (Node-safe - type demonstrations)
 */
export function basicExample() {
  console.log('📘 Basic Example - Type-safe shortcut definitions\n');

  // Type-safe shortcut registration
  const homeKeys: ShortcutKeys = ['Control', 'h'];
  console.log('✅ Type-safe keys:', homeKeys);

  // Multiple shortcuts with type safety
  const shortcuts: Array<{ id: string; keys: ShortcutKeys; description: string }> = [
    {
      id: 'about',
      keys: ['Control', 'a'],
      description: 'Navigate to about',
    },
    {
      id: 'settings',
      keys: ['Control', ','],
      description: 'Open settings',
    },
    {
      id: 'help',
      keys: ['Shift', '?'],
      description: 'Show help',
    },
  ];

  console.log('\n📋 Defined shortcuts:');
  shortcuts.forEach(({ id, keys, description }) => {
    console.log(`  - ${id}: ${keys.join('+')} - ${description}`);
  });

  // Create and validate shortcut configs
  console.log('\n🔧 Creating shortcut configs:');
  const configs: ShortcutConfig[] = [
    createShortcutConfig('save', 'Control', 's', 'Save document', 'editing'),
    createShortcutConfig('undo', 'Control', 'z', 'Undo action', 'editing'),
    createShortcutConfig('search', 'Control', 'k', 'Search', 'system'),
  ];

  configs.forEach(config => {
    const isValid = validateShortcut(config);
    const formatted = formatShortcut(config);
    console.log(`  ${isValid ? '✅' : '❌'} ${formatted} - ${config.description}`);
  });

  console.log('\n✨ Basic example complete!\n');
}