<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getNavigator, destroyNavigator } from './composables/useNavigatorX'
import { createNavigateAction } from 'navigatorx'
import AppHeader from './components/AppHeader.vue'
import SearchModal from './components/SearchModal.vue'
import ShortcutHelp from './components/ShortcutHelp.vue'

const router = useRouter()

onMounted(() => {
  const nav = getNavigator()

  // Register global shortcuts
  nav.registerShortcut('home', ['Shift', 'h'], () => router.push('/'), createNavigateAction('/'))

  nav.registerShortcut(
    'about',
    ['Shift', 'a'],
    () => router.push('/about'),
    createNavigateAction('/about'),
  )

  nav.registerShortcut(
    'dashboard',
    ['Shift', 'd'],
    () => router.push('/dashboard'),
    createNavigateAction('/dashboard'),
  )

  nav.registerShortcut(
    'settings',
    ['Shift', 's'],
    () => router.push('/settings'),
    createNavigateAction('/settings'),
  )

  nav.registerShortcut(
    'help',
    ['Shift', '?'],
    () => {
      window.dispatchEvent(new CustomEvent('open-help'))
    },
    { type: 'custom', message: 'help' },
  )
})

onUnmounted(() => {
  destroyNavigator()
})
</script>

<template>
  <div id="app">
    <AppHeader />
    <main class="main">
      <RouterView />
    </main>
    <SearchModal />
    <ShortcutHelp />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  height: calc(100svh - 5rem);
  display: grid;
}
</style>
