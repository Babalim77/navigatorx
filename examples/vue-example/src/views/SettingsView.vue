<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import { getNavigator } from '../composables/useNavigatorX';

const shortcuts = ref<Array<{ id: string; keys: string }>>([]);

function loadShortcuts() {
  const nav = getNavigator();
  const allShortcuts = nav.getShortcuts();
  shortcuts.value = Object.entries(allShortcuts).map(([id, data]: [string, any]) => ({
    id,
    keys: data.keys.join('+'),
  }));
}

function clearAll() {
  const nav = getNavigator();
  nav.clear();
  shortcuts.value = [];
}
</script>

<template>
  <div class="page">
    <h1>⚙️ Settings</h1>
    <p>Manage your keyboard shortcuts</p>

    <div class="card">
      <h2>Registered Shortcuts</h2>
      <div class="button-group">
        <button @click="loadShortcuts" class="btn-primary">
          Load Shortcuts
        </button>
        <button @click="clearAll" class="btn-secondary">
          Clear All
        </button>
      </div>

      <div v-if="shortcuts.length > 0" class="shortcuts-table">
        <div
          v-for="shortcut in shortcuts"
          :key="shortcut.id"
          class="shortcut-row"
        >
          <span class="shortcut-id">{{ shortcut.id }}</span>
          <kbd>{{ shortcut.keys }}</kbd>
        </div>
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

.button-group {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #33a06f;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.shortcuts-table {
  margin-top: 1rem;
}

.shortcut-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.shortcut-id {
  font-weight: 600;
}

kbd {
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: monospace;
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
