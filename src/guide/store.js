import { createStore } from '../lib/createStore.js';

// Shared state between the 3D rig (inside the canvas) and the DOM overlays.
export const guideStore = createStore({
  enabled: true, // visitor toggle in the header
  away: false, // true while a form field is focused, so the guide never covers inputs
  modelReady: false, // 3D model loaded and measured
  failed: false, // WebGL or model failure: the static fallback stays visible
  bubble: null, // { id, text } shown above the guide's head
  heroGesture: 'wave', // gesture used while the hero is on screen
});

// Mutable, per-frame position of the guide in viewport pixels (read by the bubble).
export const guidePos = { x: 0, top: 0, h: 0 };

// Lets any component make the guide speak, e.g. when a menu row is tapped.
export const guideApi = { say: null };
export const sayAsGuide = (text, gesture) => guideApi.say?.(text, gesture);
