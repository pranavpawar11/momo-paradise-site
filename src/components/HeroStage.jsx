import mascotFallback from '../assets/mascot-fallback.webp';
import { FOOD_IMAGES } from '../assets/food/index.js';
import { HERO_DISHES } from '../config/specialties.js';
import { BRAND } from '../config/brand.js';
import HeroBubble from '../guide/HeroBubble.jsx';
import { guideStore } from '../guide/store.js';
import { useStore } from '../lib/createStore.js';

// The hero composition: circle backdrop, mascot (3D canvas or static fallback), dishes, note and bubble.
export default function HeroStage() {
  const modelReady = useStore(guideStore, (s) => s.modelReady);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <div className="stage" id="hero-stage" onPointerMove={onMove}>
      <div className="ring" aria-hidden="true" />
      <div className="orb" aria-hidden="true" />
      <div className="stage-shadow" aria-hidden="true" />
      {!modelReady && (
        <img className="mascot-fallback" src={mascotFallback} alt={`${BRAND.name} delivery boy mascot`} width="280" height="420" />
      )}
      <HeroBubble />
      <div className="hero-note">Steamed · Fried<br />Peri-Peri · Cheese</div>
      {HERO_DISHES.map((d, i) => (
        <figure key={d.image} className={`plate p${i + 1}`}>
          <img src={FOOD_IMAGES[d.image]} alt={`${d.label} momos from ${BRAND.name}`} width="220" height="220" />
          <figcaption>{d.label}</figcaption>
        </figure>
      ))}
      <span className="decor d1" aria-hidden="true">🌶️</span>
      <span className="decor d2" aria-hidden="true">✨</span>
      <span className="decor d3" aria-hidden="true">🥟</span>
      <span className="decor d4" aria-hidden="true">✨</span>
    </div>
  );
}
