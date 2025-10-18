import { useEffect } from 'react';
import type { ShortcutKeys, ActionData } from 'navigatorx';

// Get the singleton navigator instance
let navigatorInstance: any = null;

export function getNavigator() {
  if (typeof window !== 'undefined' && !navigatorInstance) {
    // Dynamic import to avoid SSR issues
    import('navigatorx').then(({ NavigatorX }) => {
      navigatorInstance = new NavigatorX();
    });
  }
  return navigatorInstance;
}

/**
 * Hook to register a keyboard shortcut
 * Automatically cleans up when component unmounts
 */
export function useNavigatorX(
  id: string,
  keys: ShortcutKeys,
  action: () => void,
  actionData?: ActionData | null
) {
  useEffect(() => {
    const nav = getNavigator();
    if (!nav) return;

    nav.registerShortcut(id, keys, action, actionData);

    return () => {
      nav.unregisterShortcut(id);
    };
  }, [id, keys, action, actionData]);
}

/**
 * Hook to get the navigator instance
 */
export function useNavigator() {
  return getNavigator();
}