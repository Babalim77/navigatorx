export function initNavigation(navigateCallback) {
  const nav = window.navigatorInstance;
  const { createNavigateAction } = window;

  // Register navigation shortcuts
  nav.registerShortcut(
    'home',
    ['Shift', 'h'],
    () => navigateCallback('home'),
    createNavigateAction('#home')
  );

  nav.registerShortcut(
    'about',
    ['Shift', 'a'],
    () => navigateCallback('about'),
    createNavigateAction('#about')
  );

  nav.registerShortcut(
    'dashboard',
    ['Shift', 'd'],
    () => navigateCallback('dashboard'),
    createNavigateAction('#dashboard')
  );

  nav.registerShortcut(
    'settings',
    ['Shift', 's'],
    () => navigateCallback('settings'),
    createNavigateAction('#settings')
  );

  // Handle nav link clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      navigateCallback(page);
    });
  });

  console.log('✅ Navigation shortcuts registered');
}