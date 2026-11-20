import { useSyncExternalStore } from 'react';

// Tiny external store (no extra dependency).
export function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set: (patch) => {
      state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
      listeners.forEach((l) => l());
    },
    subscribe: (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

export const useStore = (store, selector = (s) => s) =>
  useSyncExternalStore(store.subscribe, () => selector(store.get()), () => selector(store.get()));
