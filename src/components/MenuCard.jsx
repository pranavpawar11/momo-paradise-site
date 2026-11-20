import { useEffect, useState } from 'react';
import { itemsByCategory, portionPrice, shortName, startingPrice } from '../config/menu.js';
import { REACTIONS } from '../config/characterDialogue.js';
import { sayAsGuide } from '../guide/store.js';
import { uiStore } from '../lib/uiStore.js';
import { useStore } from '../lib/createStore.js';
import FoodMark from './FoodMark.jsx';

const rupee = (n) => `₹${n}`;

// One menu category: header, then every item with Half and Full prices visible at once.
export default function MenuCard({ category }) {
  const items = itemsByCategory(category.id);
  const highlight = useStore(uiStore, (s) => s.highlight);
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (!highlight || highlight.category !== category.id) return undefined;
    const t0 = setTimeout(() => setFlash(highlight), 450);
    const t1 = setTimeout(() => setFlash(null), 2300);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  }, [highlight, category.id]);

  const isFlashing = (m) => flash && (!flash.prepKey || flash.prepKey === m.prepKey);

  return (
    <article className={`mcat c-${category.id}`} id={`menu-${category.id}`}>
      <header>
        <span className="mcat-icon" aria-hidden="true">{category.icon}</span>
        <div>
          <h3>{category.label}</h3>
          <p>{category.blurb}</p>
        </div>
        <span className="mcat-from">from<b>{rupee(startingPrice(category.id))}</b></span>
      </header>
      <ul>
        {items.map((m) => (
          <li key={m.id} className={isFlashing(m) ? 'flash' : ''}>
            <button
              type="button"
              className="mrow"
              onClick={() => {
                const [text, gesture] = m.prepKey === 'peri' ? REACTIONS.peri : REACTIONS.menuTap;
                sayAsGuide(text, gesture);
              }}
            >
              <FoodMark type={m.foodType} />
              <span className="mrow-name">{shortName(m)}{m.prepKey === 'peri' ? ' 🌶️' : ''}</span>
              <span className="price"><em>Half</em>{rupee(portionPrice(m, 'half'))}</span>
              <span className="price full"><em>Full</em>{rupee(portionPrice(m, 'full'))}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
