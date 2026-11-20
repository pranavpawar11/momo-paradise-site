import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo/logo.webp';
import { BRAND } from '../config/brand.js';
import { guideStore } from '../guide/store.js';
import { useStore } from '../lib/createStore.js';

const NAV = [
  { href: '#menu', label: 'Menu' },
  { href: '#contact', label: 'Find us' },
  { href: '#bulk', label: 'Bulk orders' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const enabled = useStore(guideStore, (s) => s.enabled);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <a href="#top" className="brand" aria-label={`${BRAND.name} home`}>
          <img src={logo} alt="" width="46" height="46" />
          <span className="brand-name">{BRAND.name}</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="mobile-nav">
          <button
            type="button"
            className="icon-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          {open && (
            <nav id="mobile-menu" aria-label="Mobile navigation">
              {[{ href: '#top', label: 'Home' }, ...NAV].map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
              ))}
            </nav>
          )}
        </div>

        <button
          type="button"
          className="guide-toggle"
          aria-pressed={enabled}
          onClick={() => guideStore.set({ enabled: !enabled })}
        >
          Guide {enabled ? 'on' : 'off'}
        </button>
      </div>
    </header>
  );
}
