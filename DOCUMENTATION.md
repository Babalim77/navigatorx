# NavigatorX Documentation

Complete guide to using NavigatorX - a lightweight, type-safe keyboard shortcut manager for web applications.

**Version:** 1.0.0  
**Last Updated:** October 07, 2025

---

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
- [Framework Integration](#framework-integration)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [FAQ](#faq)

---

## Introduction

### What is NavigatorX?

NavigatorX is a lightweight (~2KB gzipped), type-safe keyboard shortcut manager designed for modern web applications. It provides a simple API to register, manage, and persist keyboard shortcuts across your application.

### Why NavigatorX?

- **🎯 Precise** - Only triggers on exact key combinations, no false positives
- **💾 Persistent** - Automatically saves shortcuts to localStorage
- **🧹 Memory Safe** - Proper cleanup prevents memory leaks
- **📦 Zero Dependencies** - No external dependencies
- **🔒 Type Safe** - Full TypeScript support
- **🎨 Framework Agnostic** - Works with any JavaScript framework
- **🌍 Cross-Platform** - Mac, Windows, and Linux support

### Browser Support

NavigatorX works in all modern browsers:

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 60+ |
| Firefox | 55+ |
| Safari  | 11+ |
| Edge    | 79+ |

**Requirements:**
- ES2018+ JavaScript
- localStorage API
- KeyboardEvent API

---

## Installation

### npm

```bash
npm install navigatorx
```

### yarn

```bash
yarn add navigatorx
```

### pnpm

```bash
pnpm add navigatorx
```

### CDN (for Vanilla JS)

```html
<script type="module">
  import { NavigatorX, createNavigateAction } from 'https://cdn.jsdelivr.net/npm/navigatorx@1.0.0/+esm';
</script>
```

---

## Getting Started

### Basic Usage

```javascript
import { NavigatorX, createNavigateAction } from 'navigatorx';

// 1. Create instance
const nav = new NavigatorX();

// 2. Register a shortcut
nav.registerShortcut(
  'home',                        // Unique ID
  ['Control', 'h'],              // [Modifier, Key]
  () => location.assign('/'),    // Action
  createNavigateAction('/')      // Action data (for persistence)
);

// 3. The shortcut is now active!
// Press Ctrl+H to navigate to home
```

### TypeScript

```typescript
import { NavigatorX, createNavigateAction, type ShortcutKeys } from 'navigatorx';

const nav = new NavigatorX();

const keys: ShortcutKeys = ['Control', 'h'];

nav.registerShortcut(
  'home',
  keys,
  () => location.assign('/'),
  createNavigateAction('/')
);
```

### Cleanup

Always clean up when done to prevent memory leaks:

```javascript
// When component unmounts or app closes
nav.destroy();
```

---

## Core Concepts

### Modifier Keys

NavigatorX supports four modifier keys:

| Modifier | Windows/Linux | Mac | Description |
|----------|---------------|-----|-------------|
| `"Control"` | Ctrl | ⌃ Control | Standard control key |
| `"Meta"` | ⊞ Windows Key | ⌘ Command | OS-specific meta key |
| `"Alt"` | Alt | ⌥ Option | Alternative key |
| `"Shift"` | Shift | ⇧ Shift | Shift key |

### Shortcut Keys

A shortcut consists of **one modifier** and **one regular key**:

```typescript
type ShortcutKeys = [ModifierKey, string];

// Examples:
['Control', 'k']    // Ctrl+K (or Cmd+K on Mac with Meta)
['Shift', 'h']      // Shift+H
['Alt', 'n']        // Alt+N
['Meta', 's']       // Cmd+S on Mac, Win+S on Windows
```

**Regular key** can be any keyboard key:
- Letters: `'a'`, `'b'`, `'z'` (case-insensitive)
- Numbers: `'1'`, `'2'`, `'0'`
- Symbols: `','`, `'?'`, `'/'`
- Special: `'Enter'`, `'Escape'`, `'ArrowUp'`, etc.

### Action Data

Action data enables **persistence** across page reloads:

```typescript
type ActionData =
  | { type: "navigate"; url: string }
  | { type: "back"; fallback?: string }
  | { type: "custom"; message: string };
```

**Without action data:** Shortcuts work but disappear after reload  
**With action data:** Shortcuts persist and work after reload

### How It Works

1. **Key Detection**: Listens for `keydown` events
2. **Exact Matching**: Checks if exactly the specified keys are pressed
3. **Action Execution**: Runs the action function and prevents default
4. **Cleanup**: Clears key state on window blur and tab changes

---

## API Reference

### Constructor

Creates a new NavigatorX instance.

```typescript
new NavigatorX(options?: NavigatorXOptions)
```

**Parameters:**
- `options` (optional)
  - `storageKey?: string` - Custom localStorage key (default: `'navigatorx_shortcuts'`)

**Example:**
```javascript
const nav = new NavigatorX({ storageKey: 'my_app_shortcuts' });
```

---

### registerShortcut()

Register a keyboard shortcut.

```typescript
registerShortcut(
  id: string,
  keys: ShortcutKeys,
  action: () => void,
  actionData?: ActionData | null
): void
```

**Parameters:**
- `id` - Unique identifier for the shortcut
- `keys` - Tuple of `[ModifierKey, string]`
- `action` - Function to execute when triggered
- `actionData` - (Optional) Data for persistence

**Example:**
```javascript
nav.registerShortcut(
  'dashboard',
  ['Control', 'd'],
  () => window.location.href = '/dashboard',
  createNavigateAction('/dashboard')
);
```

**Important Notes:**
- `id` must be unique
- Registering with an existing `id` will override the previous shortcut
- `action` must be self-contained if you want persistence
- `actionData` is required for persistence across page reloads

---

### unregisterShortcut()

Remove a registered shortcut.

```typescript
unregisterShortcut(id: string): void
```

**Parameters:**
- `id` - Unique identifier of the shortcut to remove

**Example:**
```javascript
nav.unregisterShortcut('dashboard');
```

---

### getShortcuts()

Get all registered shortcuts (returns a copy).

```typescript
getShortcuts(): Record<string, Shortcut>
```

**Returns:** Object with shortcut IDs as keys

**Example:**
```javascript
const shortcuts = nav.getShortcuts();
console.log(shortcuts);
// {
//   home: { keys: ["Control", "h"], action: [Function], actionData: {...} },
//   search: { keys: ["Control", "k"], action: [Function], actionData: {...} }
// }
```

---

### hasShortcut()

Check if a shortcut exists.

```typescript
hasShortcut(id: string): boolean
```

**Parameters:**
- `id` - Unique identifier to check

**Example:**
```javascript
if (nav.hasShortcut('home')) {
  console.log('Home shortcut exists!');
}
```

---

### clear()

Remove all shortcuts from memory and localStorage.

```typescript
clear(): void
```

**Example:**
```javascript
nav.clear(); // All shortcuts removed
```

**Warning:** This cannot be undone. All shortcuts will be lost.

---

### destroy()

Clean up all event listeners and clear state.

```typescript
destroy(): void
```

**Example:**
```javascript
nav.destroy();
```

**Important:** Always call `destroy()` when:
- Component unmounts (React, Vue)
- Page unloads (vanilla JS)
- Application closes
- Removing the NavigatorX instance

**Memory Leak Prevention:**
```javascript
// React
useEffect(() => {
  const nav = new NavigatorX();
  return () => nav.destroy();
}, []);

// Vue
onUnmounted(() => {
  nav.destroy();
});

// Vanilla JS
window.addEventListener('beforeunload', () => {
  nav.destroy();
});
```

---

### Helper Functions

#### createNavigateAction()

Create action data for navigation.

```typescript
createNavigateAction(url: string): ActionData
```

**Parameters:**
- `url` - URL to navigate to

**Example:**
```javascript
nav.registerShortcut(
  'profile',
  ['Control', 'p'],
  () => location.assign('/profile'),
  createNavigateAction('/profile')
);
```

---

#### createBackAction()

Create action data for going back in history.

```typescript
createBackAction(fallback?: string): ActionData
```

**Parameters:**
- `fallback` - URL to navigate to if no history (default: `"/"`)

**Example:**
```javascript
nav.registerShortcut(
  'back',
  ['Alt', 'Left'],
  () => history.back(),
  createBackAction('/home')
);
```

---

#### createCustomAction()

Create action data for custom logging.

```typescript
createCustomAction(message: string): ActionData
```

**Parameters:**
- `message` - Message to log

**Example:**
```javascript
nav.registerShortcut(
  'debug',
  ['Control', 'Shift'],
  () => console.log('Debug mode'),
  createCustomAction('Debug mode')
);
```

---

## Framework Integration

### React

#### Basic Setup

```javascript
import { useEffect } from 'react';
import { NavigatorX, createNavigateAction } from 'navigatorx';

function App() {
  useEffect(() => {
    const nav = new NavigatorX();
    
    nav.registerShortcut(
      'home',
      ['Control', 'h'],
      () => window.location.href = '/',
      createNavigateAction('/')
    );

    return () => nav.destroy();
  }, []);

  return <div>Your App</div>;
}
```

#### Custom Hook

```javascript
import { useEffect } from 'react';
import { NavigatorX } from 'navigatorx';

let navigatorInstance = null;

function getNavigator() {
  if (!navigatorInstance) {
    navigatorInstance = new NavigatorX();
  }
  return navigatorInstance;
}

export function useNavigatorX(id, keys, action, actionData) {
  useEffect(() => {
    const nav = getNavigator();
    nav.registerShortcut(id, keys, action, actionData);

    return () => {
      nav.unregisterShortcut(id);
    };
  }, [id, keys, action, actionData]);
}

// Usage
function MyComponent() {
  useNavigatorX('save', ['Control', 's'], () => {
    saveDocument();
  });

  return <div>Component</div>;
}
```

#### With React Router

```javascript
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigatorX, createNavigateAction } from 'navigatorx';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const nav = new NavigatorX();
    
    nav.registerShortcut(
      'dashboard',
      ['Control', 'd'],
      () => navigate('/dashboard'),
      createNavigateAction('/dashboard')
    );

    return () => nav.destroy();
  }, [navigate]);

  return <div>Your App</div>;
}
```

---

### Vue 3

#### Basic Setup

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { NavigatorX, createNavigateAction } from 'navigatorx';

let nav;

onMounted(() => {
  nav = new NavigatorX();
  
  nav.registerShortcut(
    'home',
    ['Control', 'h'],
    () => window.location.href = '/',
    createNavigateAction('/')
  );
});

onUnmounted(() => {
  nav?.destroy();
});
</script>
```

#### Custom Composable

```javascript
// composables/useNavigatorX.js
import { onMounted, onUnmounted } from 'vue';

let navigatorInstance = null;

export function getNavigator() {
  if (!navigatorInstance) {
    const { NavigatorX } = await import('navigatorx');
    navigatorInstance = new NavigatorX();
  }
  return navigatorInstance;
}

export function useNavigatorX(id, keys, action, actionData) {
  onMounted(() => {
    const nav = getNavigator();
    nav.registerShortcut(id, keys, action, actionData);
  });

  onUnmounted(() => {
    const nav = getNavigator();
    nav.unregisterShortcut(id);
  });
}

// Usage
import { useNavigatorX } from '@/composables/useNavigatorX';

useNavigatorX('save', ['Control', 's'], () => {
  save();
});
```

#### With Vue Router

```vue
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NavigatorX, createNavigateAction } from 'navigatorx';

const router = useRouter();

onMounted(() => {
  const nav = new NavigatorX();
  
  nav.registerShortcut(
    'dashboard',
    ['Control', 'd'],
    () => router.push('/dashboard'),
    createNavigateAction('/dashboard')
  );
});
</script>
```

---

### Next.js (App Router)

#### Provider Component

```typescript
// components/NavigatorXProvider.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { NavigatorX, createNavigateAction } from 'navigatorx';

let nav: NavigatorX | null = null;

export function getNavigator() {
  if (!nav) {
    nav = new NavigatorX();
  }
  return nav;
}

export function NavigatorXProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const navigator = getNavigator();

    navigator.registerShortcut(
      'home',
      ['Control', 'h'],
      () => router.push('/'),
      createNavigateAction('/')
    );

    return () => {
      navigator.destroy();
      nav = null;
    };
  }, [router]);

  return <>{children}</>;
}
```

#### Root Layout

```typescript
// app/layout.tsx
import { NavigatorXProvider } from '@/components/NavigatorXProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NavigatorXProvider>
          {children}
        </NavigatorXProvider>
      </body>
    </html>
  );
}
```

---

### Vanilla JavaScript

```javascript
// app.js
import { NavigatorX, createNavigateAction } from 'navigatorx';

const nav = new NavigatorX();

// Register shortcuts
nav.registerShortcut(
  'home',
  ['Control', 'h'],
  () => location.assign('/'),
  createNavigateAction('/')
);

nav.registerShortcut(
  'search',
  ['Control', 'k'],
  () => openSearchModal(),
  { type: 'custom', message: 'search' }
);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  nav.destroy();
});
```

---

## Advanced Usage

### Multiple Instances

You can create multiple NavigatorX instances with different storage keys:

```javascript
const globalNav = new NavigatorX({ storageKey: 'global_shortcuts' });
const editorNav = new NavigatorX({ storageKey: 'editor_shortcuts' });

globalNav.registerShortcut('home', ['Control', 'h'], navigateHome);
editorNav.registerShortcut('save', ['Control', 's'], saveDocument);
```

### Conditional Shortcuts

Register shortcuts based on conditions:

```javascript
const nav = new NavigatorX();

if (user.isAdmin) {
  nav.registerShortcut('admin', ['Control', 'Shift'], openAdminPanel);
}

if (feature.enabled) {
  nav.registerShortcut('feature', ['Alt', 'f'], openFeature);
}
```

### Dynamic Shortcuts

Change shortcuts at runtime:

```javascript
function updateShortcut(id, newKeys) {
  nav.unregisterShortcut(id);
  nav.registerShortcut(id, newKeys, action, actionData);
}

// Change from Ctrl+S to Ctrl+Shift+S
updateShortcut('save', ['Control', 'Shift']);
```

### Page-Specific Shortcuts

Register shortcuts only when needed:

```javascript
// When entering editor page
function enterEditorPage() {
  nav.registerShortcut('bold', ['Control', 'b'], makeBold);
  nav.registerShortcut('italic', ['Control', 'i'], makeItalic);
}

// When leaving editor page
function leaveEditorPage() {
  nav.unregisterShortcut('bold');
  nav.unregisterShortcut('italic');
}
```

### Shortcut Groups

Organize shortcuts into groups:

```javascript
const shortcuts = {
  navigation: [
    { id: 'home', keys: ['Control', 'h'], action: goHome },
    { id: 'about', keys: ['Control', 'a'], action: goAbout },
  ],
  editing: [
    { id: 'save', keys: ['Control', 's'], action: save },
    { id: 'undo', keys: ['Control', 'z'], action: undo },
  ],
};

// Register a group
function registerGroup(group) {
  group.forEach(({ id, keys, action }) => {
    nav.registerShortcut(id, keys, action);
  });
}

registerGroup(shortcuts.navigation);
registerGroup(shortcuts.editing);
```

### Custom Action Data

Create custom action types:

```javascript
// Define your own action data structure
const customAction = {
  type: 'custom',
  message: 'My custom action',
  metadata: {
    timestamp: Date.now(),
    userId: user.id,
  },
};

nav.registerShortcut('myAction', ['Control', 'x'], myFunction, customAction);
```

### Error Handling

Handle errors gracefully:

```javascript
try {
  nav.registerShortcut('test', ['Control', 't'], () => {
    throw new Error('Something went wrong');
  });
} catch (error) {
  console.error('Failed to register shortcut:', error);
}

// Wrap actions in try-catch
nav.registerShortcut('safe', ['Control', 's'], () => {
  try {
    riskyOperation();
  } catch (error) {
    console.error('Action failed:', error);
    showErrorNotification();
  }
});
```

---

## Best Practices

### 1. Always Clean Up

```javascript
// ✅ Good
useEffect(() => {
  const nav = new NavigatorX();
  return () => nav.destroy();
}, []);

// ❌ Bad - Memory leak
useEffect(() => {
  const nav = new NavigatorX();
}, []);
```

### 2. Use Unique IDs

```javascript
// ✅ Good - Descriptive, unique IDs
nav.registerShortcut('openUserProfile', ['Control', 'p'], ...);
nav.registerShortcut('openProjectSettings', ['Control', ','], ...);

// ❌ Bad - Generic IDs might conflict
nav.registerShortcut('open', ['Control', 'p'], ...);
nav.registerShortcut('open', ['Control', ','], ...); // Overwrites!
```

### 3. Provide Action Data for Persistence

```javascript
// ✅ Good - Works after page reload
nav.registerShortcut(
  'home',
  ['Control', 'h'],
  () => location.assign('/'),
  createNavigateAction('/')
);

// ⚠️ Works but won't persist
nav.registerShortcut('temp', ['Control', 't'], doSomething);
```

### 4. Avoid External Dependencies in Actions

```javascript
let count = 0;

// ❌ Bad - Won't work after reload (closure lost)
nav.registerShortcut(
  'increment',
  ['Control', 'i'],
  () => count++,
  createCustomAction('increment')
);

// ✅ Good - Self-contained
nav.registerShortcut(
  'navigate',
  ['Control', 'n'],
  () => location.assign('/page'),
  createNavigateAction('/page')
);
```

### 5. Use Standard Key Combinations

```javascript
// ✅ Good - Common, intuitive
nav.registerShortcut('search', ['Control', 'k'], ...);
nav.registerShortcut('save', ['Control', 's'], ...);
nav.registerShortcut('help', ['Shift', '?'], ...);

// ⚠️ Avoid - Conflicts with browser
nav.registerShortcut('refresh', ['Control', 'r'], ...); // Browser refresh
nav.registerShortcut('print', ['Control', 'p'], ...);   // Browser print
```

### 6. Document Your Shortcuts

```javascript
/**
 * Keyboard Shortcuts:
 * - Ctrl+H: Navigate to home
 * - Ctrl+K: Open search
 * - Ctrl+S: Save document
 * - Shift+?: Show help
 */
function initializeShortcuts() {
  nav.registerShortcut('home', ['Control', 'h'], ...);
  nav.registerShortcut('search', ['Control', 'k'], ...);
  // ...
}
```

### 7. Test Shortcuts

```javascript
// Test that shortcuts are registered
console.assert(nav.hasShortcut('home'), 'Home shortcut not registered');

// Test shortcut retrieval
const shortcuts = nav.getShortcuts();
console.assert(Object.keys(shortcuts).length > 0, 'No shortcuts registered');
```

### 8. Handle Browser Limitations

Some shortcuts cannot be overridden:
- `Control+T` (new tab)
- `Control+W` (close tab)
- `Control+N` (new window)
- `F11` (fullscreen)

Choose alternative combinations or inform users.

### 9. Provide Visual Feedback

```javascript
// Show which shortcuts are available
function showShortcuts() {
  const shortcuts = nav.getShortcuts();
  Object.entries(shortcuts).forEach(([id, data]) => {
    console.log(`${id}: ${data.keys.join('+')}`);
  });
}

// Add kbd elements to UI
<button>
  Save <kbd>Ctrl+S</kbd>
</button>
```

### 10. Consider Accessibility

- Provide alternative ways to trigger actions
- Don't rely solely on keyboard shortcuts
- Make shortcuts discoverable
- Support screen readers

---

## Examples

See the [`examples/`](../examples) directory for complete working examples:

- [Vanilla JavaScript](../examples/vanilla-js)
- [React + Vite](../examples/react-vite)
- [Vue 3](../examples/vue3)
- [Next.js](../examples/nextjs)
- [TypeScript](../examples/typescript)

---

## Troubleshooting

### Shortcut Not Triggering

**Problem:** Pressing the key combination does nothing.

**Solutions:**

1. Check if the shortcut is registered:
```javascript
console.log(nav.hasShortcut('myShortcut'));
console.log(nav.getShortcuts());
```

2. Verify exact key combination (no extra modifiers):
```javascript
// This won't work if you press Ctrl+Shift+K
nav.registerShortcut('search', ['Control', 'k'], ...);
```

3. Check browser console for errors

4. Ensure `destroy()` wasn't called

5. Verify the key name is correct:
```javascript
// ✅ Correct
['Control', 'ArrowUp']
['Shift', 'Enter']

// ❌ Incorrect
['Control', 'UpArrow']  // Should be 'ArrowUp'
['Shift', 'Return']     // Should be 'Enter'
```

---

### Shortcuts Not Persisting

**Problem:** Shortcuts work but disappear after page reload.

**Solutions:**

1. Provide `actionData`:
```javascript
// ❌ Won't persist
nav.registerShortcut('home', ['Control', 'h'], () => goHome());

// ✅ Will persist
nav.registerShortcut(
  'home',
  ['Control', 'h'],
  () => location.assign('/'),
  createNavigateAction('/')
);
```

2. Check localStorage is enabled:
```javascript
console.log(localStorage.getItem('navigatorx_shortcuts'));
```

3. Verify browser allows localStorage (not in private/incognito mode)

---

### Memory Leaks

**Problem:** Performance degrades over time.

**Solution:** Always call `destroy()`:

```javascript
// React
useEffect(() => {
  const nav = new NavigatorX();
  return () => nav.destroy();
}, []);

// Vue
onUnmounted(() => nav?.destroy());

// Vanilla JS
window.addEventListener('beforeunload', () => nav.destroy());
```

---

### Conflicts with Browser Shortcuts

**Problem:** Browser handles the shortcut instead of NavigatorX.

**Solution:** NavigatorX calls `e.preventDefault()`, but some browser shortcuts cannot be overridden:

**Cannot override:**
- `Control+T` (new tab)
- `Control+W` (close tab)
- `Control+N` (new window)
- `F11` (fullscreen)
- `Control+Q` (quit)

**Can override:**
- `Control+K`
- `Control+/`
- `Control+,`
- Most custom combinations

Choose alternative combinations or inform users of limitations.

---

### TypeScript Errors

**Problem:** Type errors when registering shortcuts.

**Solution:** Ensure correct types:

```typescript
import type { ModifierKey, ShortcutKeys } from 'navigatorx';

const modifier: ModifierKey = 'Control'; // ✅
const keys: ShortcutKeys = [modifier, 'k']; // ✅

nav.registerShortcut('search', keys, () => {}, null);
```

---

### Keys Not Detected

**Problem:** Certain keys aren't being detected.

**Solution:** Use correct key names:

```javascript
// Special keys
'Enter', 'Escape', 'Tab', 'Backspace', 'Delete'
'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
'Home', 'End', 'PageUp', 'PageDown'
'F1' through 'F12'

// Check key name
document.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
});
```

---

### localStorage Quota Exceeded

**Problem:** Too many shortcuts stored.

**Solution:**

1. Use a custom storage key:
```javascript
const nav = new NavigatorX({ storageKey: 'app_shortcuts_minimal' });
```

2. Clear old shortcuts:
```javascript
nav.clear();
```

3. Limit the number of shortcuts

---

## Migration Guide

### From Other Libraries

#### From Mousetrap

```javascript
// Mousetrap
Mousetrap.bind('ctrl+k', () => openSearch());

// NavigatorX
nav.registerShortcut('search', ['Control', 'k'], () => openSearch());
```

#### From Hotkeys-js

```javascript
// Hotkeys-js
hotkeys('ctrl+k', () => openSearch());

// NavigatorX
nav.registerShortcut('search', ['Control', 'k'], () => openSearch());
```

#### From React Hotkeys Hook

```javascript
// React Hotkeys Hook
useHotkeys('ctrl+k', () => openSearch());

// NavigatorX
useNavigatorX('search', ['Control', 'k'], () => openSearch());
```

---

## FAQ

### Q: Can I use multiple modifiers?

**A:** Currently, NavigatorX supports one modifier per shortcut. Support for multiple modifiers (e.g., `Ctrl+Shift+K`) is planned for v1.1.0.

### Q: Can I capture key sequences like Vim?

**A:** Key sequences (e.g., `g` then `h`) are not currently supported but are planned for future releases.

### Q: Does it work with non-English keyboards?

**A:** Yes, NavigatorX uses `e.key` which is layout-independent for most keys. However, symbol keys may vary across layouts.

### Q: Can I disable all shortcuts temporarily?

**A:** Yes, call `clear()` to remove all shortcuts, or `destroy()` and create a new instance later.

### Q: How do I handle Mac vs Windows differences?

**A:** Use `"Control"` for cross-platform shortcuts, or `"Meta"` for Mac-specific (Cmd) shortcuts.

```javascript
// Cross-platform
nav.registerShortcut('save', ['Control', 's'], save);

// Mac-specific
nav.registerShortcut('save', ['Meta', 's'], save);
```

### Q: Can I export/import shortcuts?

**A:** Yes, use `getShortcuts()` to export and manually re-register to import.

```javascript
// Export
const exported = nav.getShortcuts();
const json = JSON.stringify(exported);

// Import (requires manual registration)
const imported = JSON.parse(json);
Object.entries(imported).forEach(([id, data]) => {
  // Re-register each shortcut
});
```

### Q: Does it work in iframes?

**A:** NavigatorX works in the window where it's initialized. Each iframe would need its own instance.

### Q: Can I use it with Electron?

**A:** Yes! NavigatorX works great with Electron. You can combine it with Electron's global shortcuts for system-wide shortcuts.

### Q: How do I test shortcuts in Jest/Vitest?

**A:** Mock the KeyboardEvent:

```javascript
test('shortcut triggers action', () => {
  const nav = new NavigatorX();
  const action = jest.fn();
  
  nav.registerShortcut('test', ['Control', 't'], action);
  
  // Simulate key press
  const event = new KeyboardEvent('keydown', {
    key: 't',
    ctrlKey: true
  });
  
  window.dispatchEvent(event);
  
  expect(action).toHaveBeenCalled();
});
```

### Q: What's the performance impact?

**A:** Minimal. NavigatorX adds ~2KB gzipped and only processes keydown events. No impact on rendering or other operations.

### Q: Can I use it with TypeScript strict mode?

**A:** Yes! NavigatorX is built with strict TypeScript and works perfectly with `strict: true`.

---

## Additional Resources

- [GitHub Repository](https://github.com/claudezion/navigatorx)
- [npm Package](https://www.npmjs.com/package/navigatorx)
- [Examples](../examples)
- [Issue Tracker](https://github.com/claudezion/navigatorx/issues)
- [Discussions](https://github.com/claudezion/navigatorx/discussions)

---

## Support

- **Questions:** [GitHub Discussions](https://github.com/claudezion/navigatorx/discussions)
- **Bug Reports:** [GitHub Issues](https://github.com/claudezion/navigatorx/issues)
- **Feature Requests:** [GitHub Issues](https://github.com/claudezion/navigatorx/issues/new?template=feature_request.md)
- **Email:** claudezion@icloud.com

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Ways to Help

- Report bugs and issues
- Suggest new features
- Improve documentation
- Submit pull requests
- Add framework examples
- Write tutorials and blog posts
- Share NavigatorX with others

---

## Changelog

See [CHANGELOG.md](../CHANGELOG.md) for version history and release notes.

---

## License

MIT License - see [LICENSE](../LICENSE) for details.

---

## Appendix

### A. Key Reference

Common key names for use with NavigatorX:

#### Letters
`'a'` through `'z'` (case-insensitive)

#### Numbers
`'0'` through `'9'`

#### Function Keys
`'F1'` through `'F12'`

#### Navigation Keys
- `'ArrowUp'`, `'ArrowDown'`, `'ArrowLeft'`, `'ArrowRight'`
- `'Home'`, `'End'`
- `'PageUp'`, `'PageDown'`

#### Editing Keys
- `'Enter'`
- `'Tab'`
- `'Backspace'`
- `'Delete'`
- `'Insert'`

#### Special Keys
- `'Escape'`
- `' '` (space)

#### Symbols
- `','`, `'.'`, `'/'`, `';'`, `"'"`
- `'['`, `']'`, `'\\'`
- `'-'`, `'='`
- `` ` `` (backtick)

#### Shifted Symbols
- `'!'`, `'@'`, `'#'`, `'`, `'%'`, `'^'`, `'&'`, `'*'`
- `'('`, `')'`
- `'_'`, `'+'`
- `'{'`, `'}'`, `'|'`
- `':'`, `'"'`
- `'<'`, `'>'`, `'?'`
- `'~'`

### B. Type Definitions

Complete TypeScript type definitions:

```typescript
// Modifier keys
type ModifierKey = "Shift" | "Control" | "Alt" | "Meta";

// Shortcut key combination
type ShortcutKeys = [ModifierKey, string];

// Action data types
type ActionData =
  | { type: "navigate"; url: string }
  | { type: "back"; fallback?: string }
  | { type: "custom"; message: string };

// Shortcut interface
interface Shortcut {
  keys: ShortcutKeys;
  action: () => void;
  actionData?: ActionData | null;
}

// NavigatorX options
interface NavigatorXOptions {
  storageKey?: string;
}

// NavigatorX class
class NavigatorX {
  constructor(options?: NavigatorXOptions);
  
  registerShortcut(
    id: string,
    keys: ShortcutKeys,
    action: () => void,
    actionData?: ActionData | null
  ): void;
  
  unregisterShortcut(id: string): void;
  getShortcuts(): Record<string, Shortcut>;
  hasShortcut(id: string): boolean;
  clear(): void;
  destroy(): void;
}

// Helper functions
function createNavigateAction(url: string): ActionData;
function createBackAction(fallback?: string): ActionData;
function createCustomAction(message: string): ActionData;
```

### C. Browser Compatibility Details

#### Supported Features

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| KeyboardEvent | ✅ 60+ | ✅ 55+ | ✅ 11+ | ✅ 79+ |
| localStorage | ✅ 4+ | ✅ 3.5+ | ✅ 4+ | ✅ 12+ |
| ES2018 | ✅ 60+ | ✅ 55+ | ✅ 11+ | ✅ 79+ |

#### Polyfills Not Required

NavigatorX doesn't require polyfills for modern browsers. For older browsers, you may need:
- Promise polyfill (ES6)
- Object.entries polyfill (ES2017)
- Array.prototype.includes polyfill (ES2016)

### D. Performance Benchmarks

Approximate performance metrics:

| Operation | Time | Notes |
|-----------|------|-------|
| Register shortcut | <1ms | One-time operation |
| Key event processing | <0.1ms | Per keydown event |
| Get shortcuts | <0.1ms | Returns copy |
| Clear all | <1ms | Removes all shortcuts |
| Destroy | <1ms | Cleanup operation |

**Memory Usage:**
- Base instance: ~2KB
- Per shortcut: ~100 bytes
- 100 shortcuts: ~12KB total

### E. Security Considerations

#### localStorage Security

NavigatorX stores shortcuts in localStorage, which:
- ✅ Is isolated per origin (same-origin policy)
- ✅ Cannot be accessed by other websites
- ❌ Is accessible by any script on your domain (XSS risk)
- ❌ Is not encrypted

**Best Practices:**
- Don't store sensitive data in action data
- Validate user input before registering shortcuts
- Sanitize any data displayed from shortcuts
- Use Content Security Policy (CSP)

#### XSS Protection

```javascript
// ❌ Dangerous - Don't do this
nav.registerShortcut('user', ['Control', 'u'], () => {
  eval(userInput); // Never use eval with user input!
});

// ✅ Safe
nav.registerShortcut('user', ['Control', 'u'], () => {
  navigateToUserProfile();
});
```

#### Key Logging Concerns

NavigatorX doesn't log keystrokes. It only:
- Listens for specific key combinations
- Executes registered actions
- Doesn't transmit data anywhere

### F. Debugging Tips

#### Enable Debug Mode

```javascript
// Log all registered shortcuts
console.table(nav.getShortcuts());

// Log when shortcuts are triggered
nav.registerShortcut('debug', ['Control', 'd'], () => {
  console.log('Debug shortcut triggered at', new Date());
});

// Monitor localStorage
window.addEventListener('storage', (e) => {
  if (e.key === 'navigatorx_shortcuts') {
    console.log('Shortcuts changed:', e.newValue);
  }
});
```

#### Test Key Detection

```javascript
// Log all key events
document.addEventListener('keydown', (e) => {
  console.log('Key:', e.key, 'Ctrl:', e.ctrlKey, 'Shift:', e.shiftKey);
});
```

#### Verify Shortcuts

```javascript
// Check if shortcuts are working
function verifyShortcuts() {
  const shortcuts = nav.getShortcuts();
  const ids = Object.keys(shortcuts);
  
  console.log(`Total shortcuts: ${ids.length}`);
  
  ids.forEach(id => {
    const shortcut = shortcuts[id];
    console.log(`${id}: ${shortcut.keys.join('+')}`);
  });
}
```

### G. Common Patterns

#### Lazy Registration

Register shortcuts only when needed:

```javascript
let editorShortcutsRegistered = false;

function enterEditor() {
  if (!editorShortcutsRegistered) {
    nav.registerShortcut('bold', ['Control', 'b'], makeBold);
    nav.registerShortcut('italic', ['Control', 'i'], makeItalic);
    editorShortcutsRegistered = true;
  }
}
```

#### Shortcut Conflicts

Detect and handle conflicts:

```javascript
function registerSafe(id, keys, action, actionData) {
  if (nav.hasShortcut(id)) {
    console.warn(`Shortcut ${id} already exists`);
    return false;
  }
  
  nav.registerShortcut(id, keys, action, actionData);
  return true;
}
```

#### User Preferences

Allow users to customize shortcuts:

```javascript
function saveUserShortcuts(preferences) {
  nav.clear();
  
  preferences.forEach(({ id, keys, action }) => {
    nav.registerShortcut(id, keys, action);
  });
}

function loadUserPreferences() {
  const prefs = JSON.parse(localStorage.getItem('user_shortcuts'));
  if (prefs) {
    saveUserShortcuts(prefs);
  }
}
```

#### Namespacing

Organize shortcuts with prefixes:

```javascript
// Navigation shortcuts
nav.registerShortcut('nav:home', ['Control', 'h'], goHome);
nav.registerShortcut('nav:back', ['Alt', 'Left'], goBack);

// Editor shortcuts
nav.registerShortcut('edit:save', ['Control', 's'], save);
nav.registerShortcut('edit:undo', ['Control', 'z'], undo);

// Filter by namespace
function getShortcutsByNamespace(namespace) {
  const all = nav.getShortcuts();
  return Object.keys(all)
    .filter(id => id.startsWith(namespace + ':'))
    .reduce((obj, id) => {
      obj[id] = all[id];
      return obj;
    }, {});
}
```

### H. Related Projects

Projects that work well with NavigatorX:

- **React Router** - Client-side routing
- **Vue Router** - Vue navigation
- **Next.js** - React framework with SSR
- **Command Palette libraries** - Visual shortcut interfaces
- **Modal libraries** - Dialog management
- **State management** - Redux, Zustand, Pinia

### I. Glossary

**Action** - Function executed when a shortcut is triggered

**Action Data** - Serializable data that enables persistence

**Modifier Key** - Special key held down (Ctrl, Shift, Alt, Meta)

**Regular Key** - Any non-modifier key (letters, numbers, symbols)

**Shortcut** - Combination of one modifier and one regular key

**Persistence** - Saving shortcuts to survive page reloads

**Cleanup** - Removing event listeners to prevent memory leaks

**Instance** - A NavigatorX object managing shortcuts

---

## Quick Reference Card

```
╔══════════════════════════════════════════════════════════╗
║                  NavigatorX Quick Reference              ║
╠══════════════════════════════════════════════════════════╣
║ INSTALLATION                                             ║
║   npm install navigatorx                                 ║
║                                                          ║
║ IMPORT                                                   ║
║   import { NavigatorX, createNavigateAction }            ║
║     from 'navigatorx';                                   ║
║                                                          ║
║ CREATE INSTANCE                                          ║
║   const nav = new NavigatorX();                          ║
║                                                          ║
║ REGISTER SHORTCUT                                        ║
║   nav.registerShortcut(                                  ║
║     'id',                    // Unique ID                ║
║     ['Control', 'k'],        // Keys                     ║
║     () => action(),          // Function                 ║
║     createNavigateAction('/') // Optional data           ║
║   );                                                     ║
║                                                          ║
║ UNREGISTER                                               ║
║   nav.unregisterShortcut('id');                          ║
║                                                          ║
║ GET ALL                                                  ║
║   const shortcuts = nav.getShortcuts();                  ║
║                                                          ║
║ CHECK EXISTS                                             ║
║   nav.hasShortcut('id')                                  ║
║                                                          ║
║ CLEAR ALL                                                ║
║   nav.clear();                                           ║
║                                                          ║
║ CLEANUP                                                  ║
║   nav.destroy();  // Always call when done!              ║
║                                                          ║
║ MODIFIERS                                                ║
║   "Control" | "Shift" | "Alt" | "Meta"                   ║
║                                                          ║
║ HELPERS                                                  ║
║   createNavigateAction(url)                              ║
║   createBackAction(fallback?)                            ║
║   createCustomAction(message)                            ║
╚══════════════════════════════════════════════════════════╝
```

---

<div align="center">

**NavigatorX v1.0.0 Documentation**

[GitHub](https://github.com/claudezion/navigatorx) • [npm](https://www.npmjs.com/package/navigatorx) • [Examples](../examples)

Made with TypeScript and ☕

**[⬆ Back to Top](#navigatorx-documentation)**

</div>