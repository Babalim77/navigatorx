<template>
  <div class="page">
    <h1>ℹ️ About</h1>
    <p>This is a demonstration of NavigatorX with Vue 3.</p>

    <div class="card">
      <h2>Features</h2>
      <ul>
        <li>✅ Global keyboard shortcuts</li>
        <li>✅ Vue Router integration</li>
        <li>✅ Composition API</li>
        <li>✅ Search modal with Shift+K</li>
        <li>✅ Help dialog</li>
        <li>✅ TypeScript support</li>
        <li>✅ Custom composables</li>
      </ul>
    </div>
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
