import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_LINES } from '../config/characterDialogue.js';
import { guideStore } from './store.js';

// Rotating hero lines. Each line also sets the gesture the guide performs in the hero.
export default function HeroBubble() {
  const [i, setI] = useState(0);

  useEffect(() => {
    guideStore.set({ heroGesture: HERO_LINES[i][1] });
  }, [i]);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HERO_LINES.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i}
        className="bubble hero-bubble"
        aria-live="polite"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      >
        {HERO_LINES[i][0]}
      </motion.div>
    </AnimatePresence>
  );
}
