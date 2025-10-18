# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-06

🎉 **Initial Release** - NavigatorX v1.0.0

### Added

#### Core Features
- ✨ Type-safe keyboard shortcut manager with full TypeScript support
- 🎯 Exact key combination matching (no false positives)
- 💾 Persistent shortcuts with localStorage
- 🧹 Memory-safe event handling with automatic cleanup
- 🌍 Cross-platform support (Mac, Windows, Linux)
- 📦 Zero dependencies, ~2KB gzipped
- 🎨 Framework-agnostic (works with any JavaScript framework)

#### Keyboard Support
- Support for `Control`, `Shift`, `Alt`, and `Meta` modifier keys
- Case-insensitive key detection
- Precise modifier-only checking (prevents false triggers)
- Safety limit to prevent memory leaks (max 10 simultaneous keys)

#### API Methods
- `registerShortcut()` - Register keyboard shortcuts with persistence
- `unregisterShortcut()` - Remove shortcuts by ID
- `getShortcuts()` - Get all registered shortcuts
- `hasShortcut()` - Check if shortcut exists
- `clear()` - Remove all shortcuts
- `destroy()` - Clean up event listeners

#### Helper Functions
- `createNavigateAction()` - Create navigation action data
- `createBackAction()` - Create back navigation action data
- `createCustomAction()` - Create custom action data

#### Memory Management
- Automatic key state cleanup on window blur
- Automatic key state cleanup on tab visibility change
- Safety limits to prevent unbounded Set growth
- Proper event listener cleanup

#### TypeScript Support
- Full type definitions included
- Discriminated union types for `ActionData`
- Strict typing for `ModifierKey` and `ShortcutKeys`
- Generic type support for custom implementations

#### Examples
- **Vanilla JavaScript** - Pure JS with no build tools
  - Hash-based routing
  - ES6 modules
  - CDN or local hosting
  - Search modal and help dialog
  
- **React + Vite** - Modern React setup
  - Custom `useNavigatorX` hook
  - React Router integration
  - TypeScript support
  - Context pattern
  
- **Vue 3** - Composition API
  - Custom `useNavigatorX` composable
  - Vue Router integration
  - Teleport for modals
  - TypeScript support
  
- **Next.js** - App Router (13+)
  - SSR-safe implementation
  - Provider pattern
  - Client components
  - Production-ready patterns
  
- **TypeScript** - Advanced patterns
  - Service pattern
  - Generic wrappers
  - Typed actions
  - Configuration management

#### Documentation
- Comprehensive README with quick start guide
- Full API documentation
- TypeScript usage examples
- Framework integration guides
- Best practices and troubleshooting
- Examples README with learning path

#### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

### Technical Details

#### Architecture
- Singleton pattern for global instance management
- Event-driven architecture
- Modular and extensible design
- Clean separation of concerns

#### Build System
- TypeScript compiler
- Dual package support (CommonJS + ES Modules)
- Source maps for debugging
- Declaration files for TypeScript

#### Code Quality
- Strict TypeScript configuration
- No unused variables or parameters
- Implicit return checking
- Exact optional property types

### Notes

This is the first stable release of NavigatorX. The API is considered stable and ready for production use.

All examples are fully functional and tested. The package follows semantic versioning, so breaking changes will only occur in major version updates.

### Migration Guide

This is the initial release, so no migration is needed. For new users, check out the [Getting Started Guide](./README.md#quick-start) and explore the [Examples](./examples).

---

## Future Releases

### Planned for v1.1.0
- Additional framework examples (Svelte, Angular)
- Enhanced statistics tracking
- Shortcut conflict detection API
- Custom storage adapter support

### Under Consideration
- Key sequence support (e.g., `g` then `h`)
- Multiple modifier keys (e.g., `Ctrl+Shift+K`)
- Shortcut recording/capture API
- Visual shortcut editor component
- Internationalization support

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute to NavigatorX.

## Links

- [npm Package](https://www.npmjs.com/package/navigatorx)
- [GitHub Repository](https://github.com/claudezion/navigatorx)
- [Documentation](./DOCUMENTATION.md)
- [Examples](./examples)

---

[1.0.0]: https://github.com/claudezion/navigatorx/releases/tag/v1.0.0