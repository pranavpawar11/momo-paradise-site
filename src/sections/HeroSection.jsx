import { ArrowRight, Clock, Leaf, MapPin, MessageCircle, PartyPopper } from 'lucide-react';
import { BRAND } from '../config/brand.js';
import { whatsappUrl } from '../config/contact.js';
import { OPENING_HOURS } from '../config/openingHours.js';
import HeroStage from '../components/HeroStage.jsx';

const INFO = [
  { Icon: Clock, title: OPENING_HOURS.label, text: 'Opening hours' },
  { Icon: MapPin, title: 'Keshav Nagar, Pune', text: 'Manjari Road' },
  { Icon: Leaf, title: 'Veg & non-veg', text: 'Options for every craving' },
  { Icon: PartyPopper, title: 'Bulk orders', text: 'Parties and gatherings' },
];

export default function HeroSection() {
  return (
    <section id="top" data-guide="hero" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">🥟</span> {BRAND.eyebrow}</p>
          <h1 id="hero-title">Fresh Hot Delicious <em>Momos!</em></h1>
          <p className="lede">{BRAND.heroLede}</p>
          <p className="slogan">{BRAND.supporting}</p>
          <div className="button-row">
            <a className="btn" href="#menu">Explore the menu <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="btn btn-alt" href={whatsappUrl('Hi Momo Paradise! I’d like to order momos.')} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" />
              <span><span className="long-label">Order on </span>WhatsApp</span>
            </a>
          </div>
          <p className="hero-hours"><Clock size={16} aria-hidden="true" /> Open {OPENING_HOURS.label}</p>
        </div>
        <HeroStage />
      </div>

      <div className="wrap hero-info">
        {INFO.map(({ Icon, title, text }) => (
          <div key={text}>
            <Icon className="info-icon" aria-hidden="true" />
            <span><b>{title}</b><small>{text}</small></span>
          </div>
        ))}
      </div>

      <svg className="wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 30C240 70 480 0 720 30s480 40 720 0V60H0z" fill="var(--cream)" />
      </svg>
    </section>
  );
}
