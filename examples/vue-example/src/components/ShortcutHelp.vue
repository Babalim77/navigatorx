<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { getNavigator } from '../composables/useNavigatorX'

const isOpen = ref(false)

const shortcuts = [
  { keys: 'Shift+H', action: 'Go to Home' },
  { keys: 'Shift+A', action: 'Go to About' },
  { keys: 'Shift+D', action: 'Go to Dashboard' },
  { keys: 'Shift+S', action: 'Go to Settings' },
  { keys: 'Shift+K', action: 'Open Search' },
  { keys: 'Shift+?', action: 'Show this help' },
  { keys: 'Esc', action: 'Close modal' },
]

onMounted(() => {
  window.addEventListener('open-help', () => {
    isOpen.value = true
  })
})

watch(isOpen, (newVal) => {
  const nav = getNavigator()

  if (newVal) {
    nav.registerShortcut('closeHelp', ['Shift', 'Escape'], () => {
      isOpen.value = false
    })
  } else {
    nav.unregisterShortcut('closeHelp')
  }
})

onUnmounted(() => {
  const nav = getNavigator()
  nav.unregisterShortcut('closeHelp')
})

function closeModal() {
  isOpen.value = false
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content help-modal" @click.stop>
        <h2>Keyboard Shortcuts</h2>
        <div class="shortcuts-list">
          <div v-for="shortcut in shortcuts" :key="shortcut.keys" class="shortcut-item">
            <kbd>{{ shortcut.keys }}</kbd>
            <span>{{ shortcut.action }}</span>
          </div>
        </div>
        <button @click="closeModal" class="btn-primary">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.help-modal h2 {
  margin-bottom: 2rem;
}

.shortcuts-list {
  margin: 2rem 0;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

kbd {
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-family: monospace;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.btn-primary:hover {
  background: #33a06f;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
