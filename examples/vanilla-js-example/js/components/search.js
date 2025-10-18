export function initSearch(navigateCallback) {
  const nav = window.navigatorInstance;
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  const searchBtn = document.getElementById('search-btn');

  const pages = [
    { name: 'Home', value: 'home' },
    { name: 'About', value: 'about' },
    { name: 'Dashboard', value: 'dashboard' },
    { name: 'Settings', value: 'settings' },
  ];

  // Open search
  function openSearch() {
    modal.style.display = 'flex';
    input.value = '';
    input.focus();
    renderResults(pages);
    registerCloseShortcut();
  }

  // Close search
  function closeSearch() {
    modal.style.display = 'none';
    input.value = '';
    nav.unregisterShortcut('closeSearch');
  }

  // Register close shortcut
  function registerCloseShortcut() {
    nav.registerShortcut('closeSearch', ['Shift', 'Escape'], closeSearch);
  }

  // Render results
  function renderResults(items) {
    results.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-result';
      div.textContent = item.name;
      div.addEventListener('click', () => {
        navigateCallback(item.value);
        closeSearch();
      });
      results.appendChild(div);
    });
  }

  // Filter on input
  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = pages.filter(p => 
      p.name.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeSearch();
    }
  });

  // Register search shortcut
  nav.registerShortcut('search', ['Shift', 'k'], openSearch);

  // Search button
  searchBtn.addEventListener('click', openSearch);

  console.log('✅ Search initialized');
}