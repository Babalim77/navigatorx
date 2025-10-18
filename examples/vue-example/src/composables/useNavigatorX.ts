import { onMounted, onUnmounted } from 'vue';
import { NavigatorX, type ShortcutKeys, type ActionData } from 'navigatorx';

// Singleton instance
let navigatorInstance: NavigatorX | null = null;

/**
 * Get or create the NavigatorX singleton instance
 */
export function getNavigator(): NavigatorX {
  if (!navigatorInstance) {
    navigatorInstance = new NavigatorX();
  }
  return navigatorInstance;
}

/**
 * Composable to register a keyboard shortcut
 * Automatically cleans up when component unmounts
 */
export function useNavigatorX(
  id: string,
  keys: ShortcutKeys,
  action: () => void,
  actionData?: ActionData | null
) {
  onMounted(() => {
    const nav = getNavigator();
    nav.registerShortcut(id, keys, action, actionData);
  });

  onUnmounted(() => {
    const nav = getNavigator();
    nav.unregisterShortcut(id);
  });
}

/**
 * Composable to get the navigator instance
 */
export function useNavigator() {
  return getNavigator();
}

/**
 * Clean up the navigator instance
 * Call this when the app is being destroyed
 */
export function destroyNavigator() {
  if (navigatorInstance) {
    navigatorInstance.destroy();
    navigatorInstance = null;
  }
}
