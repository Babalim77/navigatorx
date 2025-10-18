<script setup lang="ts">
import { ref } from 'vue'
import { useNavigatorX } from '../composables/useNavigatorX'

const count = ref(0)
const isRefreshing = ref(false)

// Page-specific shortcuts
useNavigatorX('refresh', ['Shift', 'r'], () => {
  isRefreshing.value = true
  setTimeout(() => {
    count.value = 0
    isRefreshing.value = false
  }, 1000)
})

useNavigatorX('increment', ['Shift', 'ArrowUp'], () => {
  count.value++
})

useNavigatorX('decrement', ['Shift', 'ArrowDown'], () => {
  if (count.value > 0) count.value--
})

function increment() {
  count.value++
}

function decrement() {
  if (count.value > 0) count.value--
}

function reset() {
  count.value = 0
}
</script>

<template>
  <div class="page">
    <h1>📊 Dashboard</h1>
    <p>Page-specific shortcuts demonstration</p>

    <div class="card">
      <h2>Counter: {{ count }}</h2>
      <p v-if="isRefreshing" class="refreshing">Refreshing...</p>

      <div class="shortcuts-info">
        <p><kbd>Shift+↑</kbd> Increment</p>
        <p><kbd>Shift+↓</kbd> Decrement</p>
        <p><kbd>Shift+R</kbd> Reset</p>
      </div>

      <div class="button-group">
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="reset">Reset</button>
      </div>
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

.refreshing {
  color: #42b883;
  font-style: italic;
}

.shortcuts-info {
  margin: 1rem 0;
}

.shortcuts-info p {
  margin: 0.5rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  background: #42b883;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #33a06f;
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
