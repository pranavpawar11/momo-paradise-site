import { ExternalLink } from 'lucide-react';
import logo from '../assets/logo/logo.webp';
import { BRAND } from '../config/brand.js';
import { CONTACT, telUrl, whatsappUrl } from '../config/contact.js';
import { OPENING_HOURS } from '../config/openingHours.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <img src={logo} alt={`${BRAND.name} logo`} width="70" height="70" />
          <p>{BRAND.footerIntro}</p>
        </div>
        <nav aria-label="Footer navigation">
          <b>Quick links</b>
          <a href="#menu">Menu</a>
          <a href="#bulk">Bulk Orders</a>
          <a href="#contact">Contact</a>
        </nav>
        <div>
          <b>Visit us</b>
          <p>{CONTACT.address.full}<br />Open {OPENING_HOURS.label}</p>
          <a href={telUrl()}>{CONTACT.owner}: {CONTACT.phoneDisplay}</a>
          <a href={whatsappUrl('Hi Momo Paradise!')} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
          {CONTACT.instagram.map((i) => (
            <a key={i.handle} href={i.url} target="_blank" rel="noopener noreferrer">
              @{i.handle} <ExternalLink size={14} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <div className="wrap footer-legal">
        <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
