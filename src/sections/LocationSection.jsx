import { ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { CONTACT, telUrl, whatsappUrl } from '../config/contact.js';
import { OPENING_HOURS } from '../config/openingHours.js';
import MapEmbed from '../components/MapEmbed.jsx';
import Reveal from '../components/Reveal.jsx';

export default function LocationSection() {
  return (
    <section id="contact" data-guide="location" className="section location">
      <div className="wrap">
        <Reveal as="h2">Find Your Momo Paradise</Reveal>
        <div className="location-grid">
          <div className="card location-card">
            <h3>Momo Paradise</h3>
            <address>{CONTACT.address.full}</address>
            <p><b>Opening hours:</b> {OPENING_HOURS.label}</p>
            <p>{CONTACT.owner}: <a href={telUrl()}>{CONTACT.phoneDisplay}</a></p>
            <div className="button-row">
              <a className="btn" href={telUrl()}><Phone size={18} aria-hidden="true" /> Call now</a>
              <a className="btn btn-alt" href={whatsappUrl('Hi Momo Paradise!')} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp
              </a>
            </div>
            <p className="socials">
              {CONTACT.instagram.map((i) => (
                <a key={i.handle} href={i.url} target="_blank" rel="noopener noreferrer">@{i.handle} <ExternalLink size={14} aria-hidden="true" /></a>
              ))}
            </p>
          </div>
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
