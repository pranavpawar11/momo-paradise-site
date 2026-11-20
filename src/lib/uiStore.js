import { createStore } from './createStore.js';

// Cross-component UI events (no prop drilling).
export const uiStore = createStore({
  highlight: null, // { category, prepKey, nonce }
});
