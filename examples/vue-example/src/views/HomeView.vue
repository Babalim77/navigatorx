<template>
  <div class="page">
    <h1>🏠 Home</h1>
    <p>Welcome to NavigatorX Vue 3 Example!</p>

    <div class="card">
      <h2>Quick Navigation</h2>
      <ul>
        <li><kbd>Shift+H</kbd> - Home</li>
        <li><kbd>Shift+A</kbd> - About</li>
        <li><kbd>Shift+D</kbd> - Dashboard</li>
        <li><kbd>Shift+S</kbd> - Settings</li>
        <li><kbd>Shift+K</kbd> - Search</li>
        <li><kbd>Shift+?</kbd> - Help</li>
      </ul>
    </div>

    <p class="hint">💡 Try pressing <kbd>Shift+K</kbd> to open the search modal!</p>
  </div>
</template>

<style scoped>
.page {
  animation: fadeIn 0.3s;
   margin-block: auto;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card ul {
  list-style: none;
  padding: 0;
}

.card li {
  margin: 0.75rem 0;
}

.hint {
  margin-top: 2rem;
  padding: 1rem;
  background: #e3f2fd;
  border-left: 4px solid #42b883;
  border-radius: 4px;
}

kbd {
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.9em;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
