import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { guideStore, guidePos } from './store.js';
import { useStore } from '../lib/createStore.js';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Speech bubble that pops above the guide's head. Text appears instantly (no typing).
export default function GuideBubble() {
  const bubble = useStore(guideStore, (s) => s.bubble);
  const ref = useRef(null);

  useEffect(() => {
    if (!bubble) return undefined;
    let raf = 0;
    const place = () => {
      const el = ref.current;
      if (el) {
        const w = el.offsetWidth;
        const left = clamp(guidePos.x - w / 2, 8, window.innerWidth - w - 8);
        el.style.left = `${left}px`;
        el.style.bottom = `${window.innerHeight - guidePos.top + 6}px`;
        el.style.setProperty('--tx', `${guidePos.x - left}px`);
      }
      raf = requestAnimationFrame(place);
    };
    place();
    return () => cancelAnimationFrame(raf);
  }, [bubble]);

  return (
    <AnimatePresence>
      {bubble && (
        <motion.div
          key={bubble.id}
          ref={ref}
          role="status"
          className="guide-bubble"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
          transition={{ type: 'spring', stiffness: 420, damping: 22 }}
        >
          {bubble.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
