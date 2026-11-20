import { scrollToId } from './scroll.js';
import { uiStore } from './uiStore.js';

// Jump to a menu category and flash the matching rows.
export function goToMenu({ category, prepKey }) {
  scrollToId(`menu-${category}`);
  uiStore.set({ highlight: { category, prepKey, nonce: Date.now() } });
}
