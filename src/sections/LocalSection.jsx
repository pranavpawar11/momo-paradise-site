import { ArrowRight } from 'lucide-react';
import { WHY_POINTS } from '../config/whyChooseUs.js';
import Reveal from '../components/Reveal.jsx';

// "Good food. Happy moments." with the Keshav Nagar location story.
export default function LocalSection() {
  return (
    <section id="local" data-guide="local" className="local-section">
      <div className="wrap local-story">
        <Reveal className="shop-illustration">
          <div role="img" aria-label="Illustration of a neighbourhood momo shop" className="shop-art">
            <div className="shop-sign"><span aria-hidden="true">♨</span><b>MOMO<br />PARADISE</b></div>
            <div className="shop-awning" aria-hidden="true" />
            <div className="shop-window" aria-hidden="true">
              <i className="steam one" /><i className="steam two" />
              <div className="counter" /><div className="shop-staff">🥟</div>
            </div>
            <div className="shop-base" aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal className="local-copy" delay={0.08}>
          <p className="eyebrow">Good food. Happy moments.</p>
          <h2>A local momo stop in <em>Keshav Nagar.</em></h2>
          <p>Drop by on Manjari Road for steamed, fried, peri-peri and cheese momos. Choose your filling and portion, or get in touch when you’re planning a get-together.</p>
          <ul className="why-points">
            {WHY_POINTS.map((w) => (
              <li key={w.title}><span className="why-icon" aria-hidden="true">{w.icon}</span><b>{w.title}</b></li>
            ))}
          </ul>
          <a className="text-link" href="#contact">Find the shop <ArrowRight size={16} aria-hidden="true" /></a>
        </Reveal>
      </div>
    </section>
  );
}
