import { Navigation } from 'lucide-react';
import { CONTACT, directionsUrl, mapEmbedUrl } from '../config/contact.js';

export default function MapEmbed() {
  const { lat, lng } = CONTACT.coordinates;
  return (
    <div className="map-panel">
      <div className="map-fallback">📍 {lat}, {lng}</div>
      <iframe title="Map to Momo Paradise, Keshav Nagar, Pune" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapEmbedUrl()} />
      <a className="btn map-directions" href={directionsUrl()} target="_blank" rel="noopener noreferrer">
        <Navigation size={18} aria-hidden="true" /> Get directions
      </a>
    </div>
  );
}
