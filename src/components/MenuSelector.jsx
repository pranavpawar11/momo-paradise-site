import { MENU_CATEGORIES } from '../config/menu.js';
import { scrollToId } from '../lib/scroll.js';

// Static jump links to each menu category (no sticky or animated state).
export default function MenuSelector() {
  return (
    <nav className="jump" aria-label="Jump to menu category">
      {MENU_CATEGORIES.map((c) => (
        <a key={c.id} href={`#menu-${c.id}`} onClick={(e) => { e.preventDefault(); scrollToId(`menu-${c.id}`); }}>
          <span aria-hidden="true">{c.icon}</span> {c.label}
        </a>
      ))}
    </nav>
  );
}
