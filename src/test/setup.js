import { vi } from 'vitest';

// jsdom lacks these browser APIs. (Node-environment tests skip this.)
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
  class IO { observe() {} unobserve() {} disconnect() {} }
  window.IntersectionObserver = window.IntersectionObserver || IO;
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || vi.fn();
}
