# NavigatorX Examples

Complete working examples demonstrating NavigatorX integration with popular frameworks and vanilla JavaScript.

## 📂 Available Examples

### 🟨 [Vanilla JavaScript](./vanilla-js)
**Pure JavaScript, no build tools required**

- ✅ No npm, no build process
- ✅ ES6 modules
- ✅ Hash-based routing
- ✅ CDN or local hosting
- ✅ Perfect for learning the basics

**Run:**
```bash
cd vanilla-js
python -m http.server 8000
# Open http://localhost:8000
```

**Best for:** Beginners, simple projects, no-build setups

---

### ⚛️ [React + Vite](./react-vite)
**Modern React with TypeScript**

- ✅ Custom hooks (`useNavigatorX`)
- ✅ React Router integration
- ✅ TypeScript support
- ✅ Context pattern
- ✅ Component-based architecture

**Run:**
```bash
cd react-vite
npm install
npm run dev
```

**Best for:** React projects, SPA applications

---

### 💚 [Vue 3](./vue3)
**Vue 3 with Composition API**

- ✅ Custom composables
- ✅ Vue Router integration
- ✅ TypeScript support
- ✅ Teleport for modals
- ✅ Reactive state management

**Run:**
```bash
cd vue3
npm install
npm run dev
```

**Best for:** Vue projects, modern Vue applications

---

### ▲ [Next.js](./nextjs)
**Next.js App Router (13+)**

- ✅ SSR-safe implementation
- ✅ Provider pattern
- ✅ Client components
- ✅ TypeScript support
- ✅ Production-ready patterns

**Run:**
```bash
cd nextjs
npm install
npm run dev
```

**Best for:** Next.js projects, SSR applications

---

### 📘 [TypeScript](./typescript)
**Advanced TypeScript patterns**

- ✅ Full type safety
- ✅ Service pattern
- ✅ Generic wrappers
- ✅ Typed actions
- ✅ Configuration management
- ✅ Node.js compatible (demonstrations only)

**Run:**
```bash
cd typescript
npm install
npm start
```

**Best for:** Understanding TypeScript integration, type-safe patterns

---

## 🎯 What Each Example Demonstrates

### Common Features (All Examples)

- Global keyboard shortcuts
- Navigation shortcuts (Ctrl+H, Ctrl+A, etc.)
- Search modal (Ctrl+K)
- Help dialog (Shift+?)
- Proper cleanup and memory management
- Best practices for the framework

### Example-Specific Features

| Feature | Vanilla | React | Vue | Next.js | TypeScript |
|---------|---------|-------|-----|---------|------------|
| No build tools | ✅ | ❌ | ❌ | ❌ | ❌ |
| Custom hooks/composables | ❌ | ✅ | ✅ | ✅ | ❌ |
| TypeScript | ❌ | ✅ | ✅ | ✅ | ✅ |
| SSR support | ❌ | ❌ | ❌ | ✅ | ❌ |
| Router integration | Hash | React Router | Vue Router | Next Router | N/A |
| State management | Variables | useState | ref/reactive | useState | Demos only |

---

## 🚀 Quick Start Guide

### 1. Choose Your Example

Pick the example that matches your tech stack:
- **Just learning?** → Start with Vanilla JS
- **Using React?** → React + Vite example
- **Using Vue?** → Vue 3 example
- **Using Next.js?** → Next.js example
- **Want type safety?** → TypeScript example

### 2. Install Dependencies

```bash
cd examples/[example-name]
npm install  # Skip for vanilla-js
```

### 3. Run the Example

```bash
npm run dev  # Or npm start
```

### 4. Explore the Code

Each example has detailed comments explaining:
- How to initialize NavigatorX
- How to register shortcuts
- How to handle cleanup
- Framework-specific patterns

---

## 📖 Example Structure

Each example follows a consistent structure:

```
example-name/
├── README.md           # Specific setup instructions
├── package.json        # Dependencies (if applicable)
├── src/               # Source code
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   └── ...
└── ...
```

---

## 🎓 Learning Path

### Beginner
1. Start with **Vanilla JS** example
2. Understand basic concepts
3. Learn shortcut registration and cleanup

### Intermediate
4. Try **React** or **Vue** example
5. Learn framework-specific patterns
6. Understand hooks/composables

### Advanced
7. Explore **Next.js** example for SSR
8. Study **TypeScript** example for type safety
9. Implement in your own project

---

## 💡 Common Patterns

### Registering Shortcuts

**Vanilla JS:**
```javascript
nav.registerShortcut('home', ['Control', 'h'], () => {
  navigateToHome();
});
```

**React:**
```javascript
useNavigatorX('home', ['Control', 'h'], () => {
  navigate('/');
});
```

**Vue:**
```javascript
useNavigatorX('home', ['Control', 'h'], () => {
  router.push('/');
});
```

### Cleanup

**Vanilla JS:**
```javascript
nav.unregisterShortcut('home');
```

**React:**
```javascript
useEffect(() => {
  // Register shortcut
  return () => nav.unregisterShortcut('home');
}, []);
```

**Vue:**
```javascript
onUnmounted(() => {
  nav.unregisterShortcut('home');
});
```

---

## 🛠️ Customization

All examples can be customized:

1. **Add new shortcuts** - Register additional key combinations
2. **Change key bindings** - Modify existing shortcuts
3. **Add new pages** - Extend navigation
4. **Customize UI** - Update styles and components
5. **Add features** - Implement your own functionality

---

## 🐛 Troubleshooting

### Shortcuts not working?

1. Check browser console for errors
2. Verify NavigatorX is initialized
3. Ensure shortcuts are registered
4. Check for key conflicts

### Example won't run?

1. Ensure Node.js is installed (except vanilla-js)
2. Run `npm install` in the example directory
3. Check Node.js version (v14+ recommended)
4. Clear `node_modules` and reinstall if needed

### TypeScript errors?

1. Run `npm run type-check`
2. Ensure TypeScript version is compatible
3. Check `tsconfig.json` settings

---

## 📚 Additional Resources

- [Main Documentation](../DOCUMENTATION.md)
- [API Reference](../README.md#api-reference)
- [GitHub Issues](https://github.com/claudezion/navigatorx/issues)
- [GitHub Discussions](https://github.com/claudezion/navigatorx/discussions)

---

## 🤝 Contributing Examples

Want to add an example for another framework?

1. Fork the repository
2. Create your example in `examples/[framework-name]`
3. Follow the existing structure
4. Add a README.md with setup instructions
5. Submit a pull request

**Example ideas:**
- Svelte/SvelteKit
- Angular
- Solid.js
- Remix
- Astro
- Electron
- React Native (if applicable)

---

## 📄 License

All examples are MIT licensed, same as NavigatorX.

---

<div align="center">

**Ready to get started?**

Pick an example above and start building! 🚀

</div>