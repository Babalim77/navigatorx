import { basicExample } from './examples/basic';
import { advancedExample } from './examples/advanced';
import { typedActionsExample } from './examples/typed-actions';
import { genericWrapperExample } from './examples/generic-wrapper';

console.log('\n╔════════════════════════════════════════╗');
console.log('║  NavigatorX TypeScript Examples       ║');
console.log('║  Demonstrating Type Safety & Patterns ║');
console.log('╚════════════════════════════════════════╝\n');

// Run examples
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
basicExample();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
const cleanup1 = advancedExample();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
const cleanup2 = typedActionsExample();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
const cleanup3 = genericWrapperExample();

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✨ All examples completed successfully!\n');
console.log('💡 Note: These examples demonstrate TypeScript patterns.');
console.log('   For browser functionality, see the React/Vue examples.\n');

// Cleanup
cleanup1();
cleanup2();
cleanup3();