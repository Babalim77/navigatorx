import './shortcuts.js';
import { initNavigation } from './components/navigation.js';
import { initSearch } from './components/search.js';
import { initHelp } from './components/help.js';

// Page templates
const pages = {
  home: `
    <div class="page">
      <h1>🏠 Home</h1>
      <p>Welcome to NavigatorX Vanilla JS Example!</p>
      
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

      <p class="hint">
        💡 Try pressing <kbd>Shift+K</kbd> to open the search modal!
      </p>
    </div>
  `,
  
  about: `
    <div class="page">
      <h1>ℹ️ About</h1>
      <p>This is a demonstration of NavigatorX with Vanilla JavaScript.</p>
      
      <div class="card">
        <h2>Features</h2>
        <ul>
          <li>✅ Global keyboard shortcuts</li>
          <li>✅ No build tools required</li>
          <li>✅ Pure JavaScript (ES6+)</li>
          <li>✅ Search modal with Shift+K</li>
          <li>✅ Help dialog</li>
          <li>✅ Page-specific shortcuts</li>
          <li>✅ Hash-based routing</li>
        </ul>
      </div>
    </div>
  `,
  
  dashboard: `
    <div class="page">
      <h1>📊 Dashboard</h1>
      <p>Page-specific shortcuts demonstration</p>
      <div id="dashboard-content"></div>
    </div>
  `,
  
  settings: `
    <div class="page">
      <h1>⚙️ Settings</h1>
      <p>Manage your keyboard shortcuts</p>

      <div class="card">
        <h2>Registered Shortcuts</h2>
        <button id="load-shortcuts" class="btn-primary">Load Shortcuts</button>
        <button id="clear-shortcuts" class="btn-secondary">Clear All</button>
        <div id="shortcuts-list" style="margin-top: 1rem;"></div>
      </div>
    </div>
  `
};

// State
let currentPage = 'home';
let counterValue = 0;

// Initialize app
function init() {
  initNavigation(navigateToPage);
  initSearch(navigateToPage);
  initHelp();
  
  // Handle hash navigation
  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
  
  // Update active nav link
  updateActiveNavLink();
}

// Navigate to page
function navigateToPage(page) {
  currentPage = page;
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = pages[page] || pages.home;
  
  // Update URL hash
  window.location.hash = page;
  
  // Update active nav link
  updateActiveNavLink();
  
  // Initialize page-specific features
  if (page === 'dashboard') {
    initDashboard();
  } else if (page === 'settings') {
    initSettings();
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Handle hash change
function handleHashChange() {
  const page = window.location.hash.slice(1) || 'home';
  if (pages[page]) {
    navigateToPage(page);
  }
}

// Update active nav link
function updateActiveNavLink() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });
}

// Initialize dashboard
function initDashboard() {
  const content = document.getElementById('dashboard-content');
  
  // Create dashboard counter HTML
  content.innerHTML = `
    <div class="card">
      <h2>Counter: <span id="counter-value">${counterValue}</span></h2>
      <div class="shortcuts-info">
        <p><kbd>Shift+↑</kbd> Increment</p>
        <p><kbd>Shift+↓</kbd> Decrement</p>
        <p><kbd>Shift+R</kbd> Reset</p>
      </div>
      <div class="button-group">
        <button id="increment-btn">+</button>
        <button id="decrement-btn">-</button>
        <button id="reset-btn">Reset</button>
      </div>
    </div>
  `;
  
  // Button event listeners
  document.getElementById('increment-btn').addEventListener('click', incrementCounter);
  document.getElementById('decrement-btn').addEventListener('click', decrementCounter);
  document.getElementById('reset-btn').addEventListener('click', resetCounter);
  
  // Register page-specific shortcuts
  registerDashboardShortcuts();
}

// Dashboard functions
function incrementCounter() {
  counterValue++;
  updateCounterDisplay();
}

function decrementCounter() {
  if (counterValue > 0) {
    counterValue--;
    updateCounterDisplay();
  }
}

function resetCounter() {
  counterValue = 0;
  updateCounterDisplay();
}

function updateCounterDisplay() {
  const valueEl = document.getElementById('counter-value');
  if (valueEl) {
    valueEl.textContent = counterValue;
  }
}

// Register dashboard shortcuts
function registerDashboardShortcuts() {
  const nav = window.navigatorInstance;
  
  nav.registerShortcut('increment', ['Shift', 'ArrowUp'], incrementCounter);
  nav.registerShortcut('decrement', ['Shift', 'ArrowDown'], decrementCounter);
  nav.registerShortcut('reset', ['Shift', 'r'], resetCounter);
}

// Unregister dashboard shortcuts
function unregisterDashboardShortcuts() {
  const nav = window.navigatorInstance;
  
  nav.unregisterShortcut('increment');
  nav.unregisterShortcut('decrement');
  nav.unregisterShortcut('reset');
}

// Initialize settings
function initSettings() {
  document.getElementById('load-shortcuts').addEventListener('click', loadShortcuts);
  document.getElementById('clear-shortcuts').addEventListener('click', clearShortcuts);
}

// Load shortcuts
function loadShortcuts() {
  const nav = window.navigatorInstance;
  const shortcuts = nav.getShortcuts();
  const list = document.getElementById('shortcuts-list');
  
  list.innerHTML = '';
  
  Object.entries(shortcuts).forEach(([id, data]) => {
    const item = document.createElement('div');
    item.className = 'shortcut-row';
    item.innerHTML = `
      <span style="font-weight: 600;">${id}</span>
      <kbd>${data.keys.join('+')}</kbd>
    `;
    list.appendChild(item);
  });
}

// Clear shortcuts
function clearShortcuts() {
  if (confirm('Are you sure you want to clear all shortcuts?')) {
    const nav = window.navigatorInstance;
    nav.clear();
    document.getElementById('shortcuts-list').innerHTML = '';
    alert('All shortcuts cleared! Refresh the page to restore defaults.');
  }
}

// Watch for page changes to cleanup shortcuts
let previousPage = currentPage;
setInterval(() => {
  if (currentPage !== previousPage) {
    if (previousPage === 'dashboard') {
      unregisterDashboardShortcuts();
    }
    previousPage = currentPage;
  }
}, 100);

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}