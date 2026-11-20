import { FOOD_IMAGES } from '../assets/food/index.js';
import { GALLERY } from '../config/specialties.js';

// Swipeable, scroll-snapping photo strip.
export default function Gallery() {
  return (
    <div className="gallery" tabIndex={0} aria-label="Photos of our momos, swipe to see more">
      {GALLERY.map((g) => (
        <figure key={g.caption}>
          <img src={FOOD_IMAGES[g.image]} alt={g.alt} width="640" height="480" loading="lazy" />
          <figcaption>{g.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
