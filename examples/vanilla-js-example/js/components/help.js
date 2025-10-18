export function initHelp() {
  const nav = window.navigatorInstance;
  const modal = document.getElementById('help-modal');
  const closeBtn = document.getElementById('close-help');
  const helpBtn = document.getElementById('help-btn');

  // Open help
  function openHelp() {
    modal.style.display = 'flex';
    registerCloseShortcut();
  }

  // Close help
  function closeHelp() {
    modal.style.display = 'none';
    nav.unregisterShortcut('closeHelp');
  }

  // Register close shortcut
  function registerCloseShortcut() {
    nav.registerShortcut('closeHelp', ['Shift', 'Escape'], closeHelp);
  }

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeHelp();
    }
  });

  // Close button
  closeBtn.addEventListener('click', closeHelp);

  // Register help shortcut
  nav.registerShortcut('help', ['Shift', '?'], openHelp);

  // Help button
  helpBtn.addEventListener('click', openHelp);

  console.log('✅ Help initialized');
}