import { ALL_SHORTCUTS, NAVIGATION_TARGETS } from '../config/shortcuts.config';
import { findConflicts, groupByCategory } from '../utils/shortcutHelpers';

/**
 * Advanced TypeScript patterns (Node-safe)
 */
export function advancedExample() {
  console.log('📊 Advanced Example - Demonstrating type safety and patterns\n');

  // Check for conflicts
  const conflicts = findConflicts(ALL_SHORTCUTS);
  if (conflicts.length > 0) {
    console.warn('⚠️  Shortcut conflicts detected:', conflicts);
  } else {
    console.log('✅ No conflicts found');
  }

  // Group shortcuts by category
  const grouped = groupByCategory(ALL_SHORTCUTS);
  console.log('\n📁 Grouped shortcuts by category:');
  Object.entries(grouped).forEach(([category, shortcuts]) => {
    console.log(`  ${category}: ${shortcuts.length} shortcuts`);
  });

  // Demonstrate configuration validation
  console.log('\n🔍 Shortcut configurations:');
  ALL_SHORTCUTS.slice(0, 3).forEach(config => {
    console.log(`  - ${config.id}: ${config.keys.join('+')} (${config.category})`);
  });

  // Demonstrate navigation targets
  console.log('\n🎯 Navigation targets:');
  Object.entries(NAVIGATION_TARGETS).forEach(([key, target]) => {
    if (target) {
      console.log(`  - ${key}: ${target.path} ${target.requiresAuth ? '🔒' : ''}`);
    }
  });

  console.log('\n✨ Advanced example complete!\n');

  // Return no-op cleanup for consistency
  return () => {
    console.log('Cleanup: Advanced example');
  };
}