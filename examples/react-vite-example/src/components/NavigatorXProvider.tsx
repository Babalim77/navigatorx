import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigatorX, createNavigateAction } from 'navigatorx';

// Singleton instance
let nav: NavigatorX | null = null;

export function getNavigatorInstance(): NavigatorX {
  if (!nav) {
    nav = new NavigatorX();
  }
  return nav;
}

interface NavigatorXProviderProps {
  children: ReactNode;
}

export function NavigatorXProvider({ children }: NavigatorXProviderProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const navigator = getNavigatorInstance();

    // Register global shortcuts
    navigator.registerShortcut(
      'home',
      ['Shift', 'h'],
      () => navigate('/'),
      createNavigateAction('/')
    );

    navigator.registerShortcut(
      'about',
      ['Shift', 'a'],
      () => navigate('/about'),
      createNavigateAction('/about')
    );

    navigator.registerShortcut(
      'dashboard',
      ['Shift', 'd'],
      () => navigate('/dashboard'),
      createNavigateAction('/dashboard')
    );

    navigator.registerShortcut(
      'settings',
      ['Shift', 's'],
      () => navigate('/settings'),
      createNavigateAction('/settings')
    );

    navigator.registerShortcut(
      'help',
      ['Shift', '?'],
      () => {
        const event = new CustomEvent('open-help');
        window.dispatchEvent(event);
      },
      { type: 'custom', message: 'help' }
    );

    // Cleanup
    return () => {
      navigator.destroy();
      nav = null;
    };
  }, [navigate]);

  return <>{children}</>;
}