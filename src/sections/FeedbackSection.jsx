import { ArrowRight, Star } from 'lucide-react';
import { CONTACT, whatsappUrl } from '../config/contact.js';
import { REVIEWS_CONFIG } from '../config/reviews.js';
import Reveal from '../components/Reveal.jsx';

// No verified testimonials exist yet, so visitors are invited to send feedback instead.
export default function FeedbackSection() {
  const { showDemoReviews, demoReviews } = REVIEWS_CONFIG;
  return (
    <section id="feedback" data-guide="feedback" className="feedback-section">
      <div className="wrap feedback-inner">
        <Reveal>
          <p className="eyebrow">A small local business, a big thank you</p>
          <h2>Have you tried our momos?</h2>
          <p>We’d love to hear what you think. Send us your feedback directly.</p>
        </Reveal>
        <div className="button-row">
          <a className="btn" href={whatsappUrl('Hi Momo Paradise! I wanted to share feedback about my order.')} target="_blank" rel="noopener noreferrer">
            Share feedback on WhatsApp <ArrowRight size={18} aria-hidden="true" />
          </a>
          {CONTACT.googleReviewUrl && (
            <a className="btn btn-alt" href={CONTACT.googleReviewUrl} target="_blank" rel="noopener noreferrer">Leave a Google review</a>
          )}
        </div>
      </div>
      {showDemoReviews && (
        <div className="wrap demo-reviews">
          <p className="demo-banner">Development preview only: these are sample reviews, not real customer feedback.</p>
          <div className="demo-grid">
            {demoReviews.map((r) => (
              <div key={r.name} className="card demo-card">
                <div className="stars" aria-label={`${r.stars} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill={i < r.stars ? 'currentColor' : 'none'} />)}
                </div>
                <p>{r.text}</p>
                <small>{r.name} (sample)</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
