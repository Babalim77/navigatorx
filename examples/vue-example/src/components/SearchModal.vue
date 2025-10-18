<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getNavigator } from '../composables/useNavigatorX'

const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Settings', path: '/settings' },
]

const filteredPages = computed(() =>
  pages.filter((page) => page.name.toLowerCase().includes(query.value.toLowerCase())),
)

onMounted(() => {
  const nav = getNavigator()

  // Register search shortcut
  nav.registerShortcut('search', ['Shift', 'k'], () => {
    isOpen.value = true
  })
})

watch(isOpen, (newVal) => {
  const nav = getNavigator()

  if (newVal) {
    // Register escape to close
    nav.registerShortcut('closeSearch', ['Shift', 'Escape'], () => {
      isOpen.value = false
      query.value = ''
    })

    // Focus input
    setTimeout(() => inputRef.value?.focus(), 100)
  } else {
    nav.unregisterShortcut('closeSearch')
  }
})

onUnmounted(() => {
  const nav = getNavigator()
  nav.unregisterShortcut('search')
  nav.unregisterShortcut('closeSearch')
})

function handleSelect(path: string) {
  router.push(path)
  isOpen.value = false
  query.value = ''
}

function closeModal() {
  isOpen.value = false
  query.value = ''
}
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <input
          ref="inputRef"
          v-model="query"
          type="search"
          placeholder="Search pages... (Esc to close)"
          class="search-input"
        />
        <div class="search-results">
          <div
            v-for="page in filteredPages"
            :key="page.path"
            class="search-result"
            @click="handleSelect(page.path)"
          >
            {{ page.name }}
          </div>
        </div>
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
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.search-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
}

.search-result {
  padding: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.search-result:hover {
  background: #f5f5f5;
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
