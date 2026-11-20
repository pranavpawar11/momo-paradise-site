import { FOOD_IMAGES } from '../assets/food/index.js';
import { SPECIALTIES } from '../config/specialties.js';
import { REACTIONS } from '../config/characterDialogue.js';
import { sayAsGuide } from '../guide/store.js';
import { goToMenu } from '../lib/menuNav.js';
import Reveal from '../components/Reveal.jsx';
import SampleVisual from '../components/SampleVisual.jsx';

export default function SpecialtiesSection() {
  return (
    <section id="specialties" data-guide="specialties" className="section specialties">
      <div className="wrap">
        <Reveal as="h2">Our specialties</Reveal>
        <div className="spec-grid">
          {SPECIALTIES.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <button
                type="button"
                className="spec card"
                onClick={() => {
                  goToMenu(s.target);
                  if (s.id === 'peri') sayAsGuide(...REACTIONS.peri);
                }}
              >
                <span className="spec-photo">
                  {s.image ? <img src={FOOD_IMAGES[s.image]} alt={`${s.title} from Momo Paradise`} width="480" height="360" loading="lazy" /> : <SampleVisual />}
                </span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
