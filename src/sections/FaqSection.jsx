import { FAQ } from '../config/faq.js';
import Reveal from '../components/Reveal.jsx';

export default function FaqSection() {
  return (
    <section id="faq" data-guide="faq" className="section faq">
      <div className="wrap">
        <Reveal as="h2">A few useful details</Reveal>
        <div className="faq-list">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
