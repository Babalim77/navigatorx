<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="nav-link"> Home <kbd>Shift+H</kbd> </RouterLink>
      <RouterLink to="/about" class="nav-link"> About <kbd>Shift+A</kbd> </RouterLink>
      <RouterLink to="/dashboard" class="nav-link"> Dashboard <kbd>Shift+D</kbd> </RouterLink>
      <RouterLink to="/settings" class="nav-link"> Settings <kbd>Shift+S</kbd> </RouterLink>
    </nav>
    <div class="header-actions">
      <button class="btn-secondary">Search <kbd>Shift+K</kbd></button>
      <button class="btn-secondary">Help <kbd>?</kbd></button>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b883;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

kbd {
  background: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.9em;
}
</style>
