import type { ShortcutKeys } from '../types';

/**
 * Generic wrapper class for type-safe shortcuts (demonstration)
 */
export class TypedNavigator<TContext = any> {
  private context: TContext;
  private shortcuts: Map<string, { keys: ShortcutKeys; method: keyof TContext }> = new Map();

  constructor(context: TContext) {
    this.context = context;
  }

  /**
   * Register shortcut with context (type-safe)
   */
  register<T extends keyof TContext>(
    id: string,
    keys: ShortcutKeys,
    method: T
  ): void {
    const action = this.context[method];
    
    if (typeof action !== 'function') {
      throw new Error(`${String(method)} is not a function`);
    }

    this.shortcuts.set(id, { keys, method });
    console.log(`  ✅ Registered: ${id} - ${keys.join('+')} -> ${String(method)}()`);
  }

  /**
   * Execute shortcut by ID
   */
  execute(id: string): void {
    const shortcut = this.shortcuts.get(id);
    if (!shortcut) {
      console.error(`  ❌ Shortcut not found: ${id}`);
      return;
    }

    const action = this.context[shortcut.method];
    if (typeof action === 'function') {
      (action as Function).call(this.context);
    }
  }

  /**
   * List all shortcuts
   */
  list(): void {
    console.log('\n📋 Registered shortcuts:');
    this.shortcuts.forEach(({ keys, method }, id) => {
      console.log(`  - ${id}: ${keys.join('+')} -> ${String(method)}()`);
    });
  }

  /**
   * Get shortcut count
   */
  count(): number {
    return this.shortcuts.size;
  }
}

/**
 * Example usage with typed context
 */
interface EditorContext {
  save: () => void;
  undo: () => void;
  redo: () => void;
  format: () => void;
}

export function genericWrapperExample() {
  console.log('🔧 Generic Wrapper Example - Type-safe method binding\n');

  const editor: EditorContext = {
    save: () => console.log('  💾 Saving...'),
    undo: () => console.log('  ↩️  Undo'),
    redo: () => console.log('  ↪️  Redo'),
    format: () => console.log('  ✨ Formatting...'),
  };

  const nav = new TypedNavigator(editor);

  console.log('Registering shortcuts:');
  // Type-safe method registration
  nav.register('save', ['Control', 's'], 'save');
  nav.register('undo', ['Control', 'z'], 'undo');
  nav.register('redo', ['Control', 'y'], 'redo');
  nav.register('format', ['Shift', 'f'], 'format');

  nav.list();

  console.log(`\n📊 Total shortcuts: ${nav.count()}`);

  // Demonstrate execution
  console.log('\n🚀 Executing shortcuts:');
  nav.execute('save');
  nav.execute('format');

  console.log('\n✨ Generic wrapper example complete!\n');

  return () => {
    console.log('Cleanup: Generic wrapper example');
  };
}