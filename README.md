# NavigatorX ⌨️

<div align="center">

**A lightweight, type-safe keyboard shortcut manager for web applications.**

[![npm version](https://img.shields.io/npm/v/navigatorx.svg)](https://www.npmjs.com/package/navigatorx)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/navigatorx)](https://bundlephobia.com/package/navigatorx)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Examples](#-examples)

</div>

---

## ✨ Features

- 🎯 **Precise Detection** - Only triggers on exact key combinations (no false positives)
- 💾 **Persistent** - Automatically saves shortcuts to localStorage
- 🧹 **Memory Safe** - Zero memory leaks with proper cleanup
- 📦 **Zero Dependencies** - Lightweight (~2KB gzipped)
- 🔒 **Type Safe** - Full TypeScript support with strict typing
- 🎨 **Framework Agnostic** - Works with React, Vue, Svelte, or vanilla JS
- 🌍 **Cross-Platform** - Mac (⌘), Windows, and Linux support
- 🔧 **Flexible API** - Low-level core for building custom UIs

## 📦 Installation

```bash
npm install navigatorx
```

```bash
yarn add navigatorx
```

```bash
pnpm add navigatorx
```

## 🚀 Quick Start

```typescript
import { NavigatorX, createNavigateAction } from 'navigatorx';

// Initialize
const nav = new NavigatorX();

// Register shortcuts
nav.registerShortcut(
  "home",
  ["Shift", "h"],
  () => window.location.href = "/home",
  createNavigateAction("/home")
);

nav.registerShortcut(
  "search",
  ["Shift", "k"],
  () => openSearchModal(),
  { type: "custom", message: "search" }
);

// Press Control+H or Control+K - that's it! 🎉
```

## 📖 Documentation

### Constructor

```typescript
const nav = new NavigatorX(options?: {
  storageKey?: string; // Default: 'navigatorx_shortcuts'
});
```

### Core Methods

#### `registerShortcut(id, keys, action, actionData?)`

Register a keyboard shortcut that persists across page reloads.

```typescript
nav.registerShortcut(
  id: string,                    // Unique identifier
  keys: [ModifierKey, string],   // ["Control" | "Shift" | "Alt" | "Meta", "key"]
  action: () => void,            // Function to execute
  actionData?: ActionData        // Optional: For persistence
);
```

**Supported Modifiers:**
- `"Control"` - Ctrl key (⌃ on Mac)
- `"Meta"` - ⌘ Cmd on Mac, ⊞ Win on Windows
- `"Alt"` - Alt key (⌥ Option on Mac)
- `"Shift"` - Shift key (⇧)

**Example:**
```typescript
nav.registerShortcut(
  "dashboard",
  ["Alt", "d"],
  () => navigateTo("/dashboard"),
  createNavigateAction("/dashboard")
);
```

#### `unregisterShortcut(id)`

Remove a shortcut by its ID.

```typescript
nav.unregisterShortcut("dashboard");
```

#### `getShortcuts()`

Get all registered shortcuts.

```typescript
const allShortcuts = nav.getShortcuts();
```

#### `hasShortcut(id)`

Check if a shortcut exists.

```typescript
if (nav.hasShortcut("home")) {
  console.log("Home shortcut is registered!");
}
```

#### `clear()`

Remove all shortcuts from memory and localStorage.

```typescript
nav.clear();
```

#### `destroy()`

Clean up all event listeners. **Always call this** before removing the NavigatorX instance.

```typescript
nav.destroy();
```

### Persistence Helpers

For shortcuts to work across page reloads, provide `actionData`:

#### `createNavigateAction(url)`

Navigate to a URL.

```typescript
nav.registerShortcut(
  "home",
  ["Control", "h"],
  () => location.assign("/"),
  createNavigateAction("/")
);
```

#### `createBackAction(fallback?)`

Go back in history with optional fallback.

```typescript
nav.registerShortcut(
  "back",
  ["Alt", "Left"],
  () => history.back(),
  createBackAction("/") // Fallback to home if no history
);
```

#### `createCustomAction(message)`

Custom action with a message (useful for logging).

```typescript
nav.registerShortcut(
  "debug",
  ["Control", "d"],
  () => console.log("Debug mode"),
  createCustomAction("Debug mode")
);
```

### TypeScript Types

```typescript
type ModifierKey = "Shift" | "Control" | "Alt" | "Meta";
type ShortcutKeys = [ModifierKey, string];

type ActionData =
  | { type: "navigate"; url: string }
  | { type: "back"; fallback?: string }
  | { type: "custom"; message: string };
```

## 💡 Examples

Explore complete working examples in the [`examples/`](./examples) directory:

### 📂 Available Examples

| Example | Description | Key Features |
|---------|-------------|--------------|
| [**Vanilla JS**](./examples/vanilla-js) | Pure JavaScript, no build tools | Hash routing, ES6 modules, CDN usage |
| [**React + Vite**](./examples/react-vite) | Modern React with Vite | Custom hooks, React Router, TypeScript |
| [**Vue 3**](./examples/vue3) | Vue 3 with Composition API | Composables, Vue Router, Teleport |
| [**Next.js**](./examples/nextjs) | Next.js App Router | SSR-safe, Provider pattern, Client components |
| [**TypeScript**](./examples/typescript) | Type-safe patterns | Advanced types, Service pattern, Node.js compatible |

### 🚀 Quick Start with Examples

```bash
# Clone the repository
git clone https://github.com/claudezion/navigatorx.git
cd navigatorx

# Try Vanilla JS example (no build needed!)
cd examples/vanilla-js
python -m http.server 8000
# Open http://localhost:8000

# Try React example
cd examples/react-vite
npm install
npm run dev

# Try Vue example
cd examples/vue3
npm install
npm run dev

# Try Next.js example
cd examples/nextjs
npm install
npm run dev

# Try TypeScript patterns
cd examples/typescript
npm install
npm start
```

### 📖 Example Features

Each example demonstrates:
- ✅ Global keyboard shortcuts
- ✅ Page/component-specific shortcuts
- ✅ Search modal (Ctrl+K)
- ✅ Help dialog (Shift+?)
- ✅ Navigation shortcuts
- ✅ Proper cleanup patterns
- ✅ Best practices for each framework



### Navigation Shortcuts

```typescript
import { NavigatorX, createNavigateAction } from 'navigatorx';

const nav = new NavigatorX();

// Home page
nav.registerShortcut("home", ["Shift", "h"], 
  () => location.assign("/"),
  createNavigateAction("/")
);

// About page
nav.registerShortcut("about", ["Shift", "a"],
  () => location.assign("/about"),
  createNavigateAction("/about")
);

// Settings
nav.registerShortcut("settings", ["Shift", "s"],
  () => location.assign("/settings"),
  createNavigateAction("/settings")
);
```

### Modal & UI Controls

```typescript
// Open search modal (no persistence needed)
nav.registerShortcut("search", ["Shift", "k"], () => {
  const modal = document.getElementById("search-modal");
  modal?.classList.add("open");
});

// Close with Escape
nav.registerShortcut("close", ["Shift", "Escape"], () => {
  document.querySelector(".modal.open")?.classList.remove("open");
});
```

### React Integration

```typescript
import { useEffect } from 'react';
import { NavigatorX } from 'navigatorx';

function App() {
  useEffect(() => {
    const nav = new NavigatorX();
    
    nav.registerShortcut("newPost", ["Control", "n"], () => {
      setShowNewPost(true);
    });

    nav.registerShortcut("search", ["Control", "k"], () => {
      setShowSearch(true);
    });

    return () => nav.destroy(); // Cleanup
  }, []);

  return <div>Your App</div>;
}
```

### Vue Integration

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { NavigatorX, createNavigateAction } from 'navigatorx';

let nav;

onMounted(() => {
  nav = new NavigatorX();
  
  nav.registerShortcut("dashboard", ["Control", "d"],
    () => router.push("/dashboard"),
    createNavigateAction("/dashboard")
  );
});

onUnmounted(() => {
  nav?.destroy();
});
</script>
```

### Cross-Platform (Mac/Windows)

```typescript
// Use Meta for Mac-style shortcuts
nav.registerShortcut("save", ["Meta", "s"],
  () => saveDocument(),
  createCustomAction("save")
);
// Mac: ⌘ Cmd+S, Windows: ⊞ Win+S

// Use Control for traditional shortcuts
nav.registerShortcut("copy", ["Control", "c"],
  () => copyToClipboard(),
  createCustomAction("copy")
);
// Works consistently across platforms
```

### User-Configurable Shortcuts

```typescript
function saveUserShortcuts(shortcuts: Array<{
  id: string;
  modifier: ModifierKey;
  key: string;
  url: string;
}>) {
  const nav = new NavigatorX();
  
  shortcuts.forEach(({ id, modifier, key, url }) => {
    nav.registerShortcut(
      id,
      [modifier, key],
      () => location.assign(url),
      createNavigateAction(url)
    );
  });
}

// Usage
saveUserShortcuts([
  { id: "home", modifier: "Control", key: "h", url: "/" },
  { id: "profile", modifier: "Control", key: "p", url: "/profile" }
]);
```

## 🎯 How It Works

NavigatorX uses a sophisticated key detection system:

1. **Exact Matching** - Only triggers when exactly the specified keys are pressed
2. **No False Positives** - Won't trigger if extra modifiers are held (e.g., `Control+Shift+K` won't trigger `Control+K`)
3. **Memory Safety** - Automatically clears key state on:
   - Window blur (switching windows)
   - Tab visibility change (switching tabs)
   - Safety limit (max 10 simultaneous keys)
4. **Cross-Platform** - Supports `Meta` key for Mac ⌘ Cmd and Windows ⊞ Win key

## ⚙️ Advanced Usage

### Custom Storage Key

Use different storage keys for multi-user apps:

```typescript
const nav = new NavigatorX({ 
  storageKey: `shortcuts_user_${userId}` 
});
```

### Without Persistence

For shortcuts that shouldn't persist (like temporary modals):

```typescript
nav.registerShortcut("temp", ["Shift", "t"], () => {
  // This won't be saved to localStorage
  showTemporaryDialog();
});
```

### Multiple Instances

```typescript
const globalNav = new NavigatorX({ storageKey: 'global_shortcuts' });
const editorNav = new NavigatorX({ storageKey: 'editor_shortcuts' });
```

## 🔒 Best Practices

### 1. Always Clean Up

```typescript
// ✅ Good - Prevents memory leaks
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

```typescript
// ✅ Good
nav.registerShortcut("openUserProfile", ["Control", "p"], ...);
nav.registerShortcut("openProjectSettings", ["Control", "s"], ...);

// ❌ Bad - Second overwrites first
nav.registerShortcut("open", ["Control", "p"], ...);
nav.registerShortcut("open", ["Control", "s"], ...);
```

### 3. Avoid Browser Conflicts

Some shortcuts are reserved by browsers and cannot be overridden:
- `Control+T` (new tab)
- `Control+W` (close tab)
- `Control+N` (new window)
- `F11` (fullscreen)

Choose alternative key combinations or inform users of limitations.

### 4. Provide Action Data for Persistence

```typescript
// ✅ Works after page reload
nav.registerShortcut("home", ["Control", "h"],
  () => location.assign("/"),
  createNavigateAction("/")
);

// ⚠️ Works but won't persist
nav.registerShortcut("temp", ["Control", "t"],
  () => doSomething()
);
```

## 🌐 Browser Support

Works in all modern browsers:
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

**Requirements:**
- ES2015+ JavaScript
- localStorage API
- KeyboardEvent API

## 🐛 Troubleshooting

### Shortcut Not Triggering

1. Check if registered: `console.log(nav.hasShortcut("myShortcut"))`
2. Verify no extra modifiers are pressed
3. Ensure `destroy()` wasn't called
4. Check browser console for errors

### Shortcuts Not Persisting

1. Provide `actionData` parameter
2. Check localStorage: `localStorage.getItem('navigatorx_shortcuts')`
3. Verify localStorage is enabled in browser

### Platform Differences

| Modifier | Mac | Windows/Linux |
|----------|-----|---------------|
| `Control` | ⌃ Control | Ctrl |
| `Meta` | ⌘ Command | ⊞ Windows Key |
| `Alt` | ⌥ Option | Alt |
| `Shift` | ⇧ Shift | Shift |

## 📚 Full Documentation

For complete documentation, advanced examples, and TypeScript types, see [DOCUMENTATION.md](./DOCUMENTATION.md).

### 📑 Documentation Sections

- **Getting Started** - Installation and setup
- **Core Concepts** - Understanding modifiers, keys, and actions
- **API Reference** - Complete method documentation
- **Framework Integration** - React, Vue, Next.js, Svelte guides
- **Best Practices** - Memory management, cleanup, patterns
- **Troubleshooting** - Common issues and solutions
- **TypeScript** - Full type definitions and examples

## 🌟 Showcase

Using NavigatorX in your project? [Add it here!](https://github.com/claudezion/navigatorx/issues/new?template=showcase.md)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** - [Open an issue](https://github.com/claudezion/navigatorx/issues/new?template=bug_report.md)
- 💡 **Suggest features** - [Request a feature](https://github.com/claudezion/navigatorx/issues/new?template=feature_request.md)
- 📝 **Improve documentation** - Fix typos, add examples
- 🔧 **Submit pull requests** - Bug fixes, new features
- ⭐ **Star the project** - Show your support!

### Development Setup

```bash
# Clone the repo
git clone https://github.com/claudezion/navigatorx.git
cd navigatorx

# Install dependencies
npm install

# Build the package
npm run build

# Run tests (if available)
npm test

# Try examples
cd examples/react-vite
npm install && npm run dev
```

### Adding New Examples

We welcome examples for other frameworks! See [`examples/README.md`](./examples/README.md) for guidelines.

Want to contribute? Check out our [Contributing Guide](./CONTRIBUTING.md).

## 📄 License

MIT © Claude Zion

See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Built with ❤️ for developers who need simple, reliable keyboard shortcuts
- Inspired by the need for a lightweight, framework-agnostic shortcut manager
- Thanks to all [contributors](https://github.com/claudezion/navigatorx/graphs/contributors)!

## 📮 Support & Community

- **Issues:** [GitHub Issues](https://github.com/claudezion/navigatorx/issues)
- **Discussions:** [GitHub Discussions](https://github.com/claudezion/navigatorx/discussions)
- **Twitter:** [@claudezion](https://twitter.com/claudzion)
- **Email:** claudezion@icloud.com

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/navigatorx)
- [GitHub Repository](https://github.com/claudezion/navigatorx)
- [Full Documentation](./DOCUMENTATION.md)
- [Changelog](./CHANGELOG.md)
- [Examples](./examples)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/claudezion/navigatorx?style=social)
![GitHub forks](https://img.shields.io/github/forks/claudezion/navigatorx?style=social)
![npm downloads](https://img.shields.io/npm/dm/navigatorx)
![GitHub issues](https://img.shields.io/github/issues/claudezion/navigatorx)
![GitHub pull requests](https://img.shields.io/github/issues-pr/claudezion/navigatorx)

---

<div align="center">

**NavigatorX v1.0.0**

Made with TypeScript and ☕

[⬆ back to top](#navigatorx-️)

</div>