import Gallery from '../components/Gallery.jsx';
import Reveal from '../components/Reveal.jsx';

export default function GallerySection() {
  return (
    <section id="gallery" data-guide="gallery" className="section gallery-section">
      <div className="wrap">
        <Reveal as="h2">Straight from our kitchen</Reveal>
        <p className="muted">Take a closer look at the momos on our menu.</p>
        <Gallery />
      </div>
    </section>
  );
}
