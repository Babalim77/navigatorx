import type { TypedAction, ShortcutConfig } from '../types';
import { createShortcutConfig } from '../utils/shortcutHelpers';

/**
 * Example with typed actions (Node-safe demonstrations)
 */
export function typedActionsExample() {
  console.log('🎯 Typed Actions Example - Demonstrating type-safe action patterns\n');

  // Typed action with return value
  const saveAction: TypedAction<Promise<boolean>> = {
    execute: async () => {
      console.log('  💾 Saving...');
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log('  ✅ Saved!');
      return true;
    },
    canExecute: () => {
      console.log('  🔍 Checking if can save...');
      return true; // Check if there's unsaved content
    },
    undo: () => {
      console.log('  ↩️  Undo save');
    },
  };

  const saveConfig: ShortcutConfig = createShortcutConfig(
    'save',
    'Control',
    's',
    'Save document',
    'editing'
  );

  console.log(`Shortcut Config: ${saveConfig.id}`);
  console.log(`  Keys: ${saveConfig.keys.join('+')}`);
  console.log(`  Description: ${saveConfig.description}`);
  console.log(`  Category: ${saveConfig.category}`);

  // Demonstrate action execution
  console.log('\n🚀 Executing typed action:');
  if (saveAction.canExecute?.()) {
    saveAction.execute().then(result => {
      console.log(`  Result: ${result}`);
    });
  }

  // Action with validation
  const deleteAction: TypedAction<void> = {
    execute: () => {
      console.log('  🗑️  Item deleted');
    },
    canExecute: () => {
      console.log('  🔍 Checking permissions...');
      return true; // Check if user has permission
    },
  };

  const deleteConfig: ShortcutConfig = createShortcutConfig(
    'delete',
    'Shift',
    'Delete',
    'Delete item',
    'editing'
  );

  console.log(`\nShortcut Config: ${deleteConfig.id}`);
  console.log(`  Keys: ${deleteConfig.keys.join('+')}`);

  if (deleteAction.canExecute?.()) {
    console.log('\n🚀 Executing delete action:');
    deleteAction.execute();
  }

  console.log('\n✨ Typed actions example complete!\n');

  return () => {
    console.log('Cleanup: Typed actions example');
  };
}