// Confirmed business details. Keep this the single source of truth.
export const CONTACT = {
  owner: 'Pratik Jagtap',
  phoneDisplay: '7058337561',
  phoneIntl: '+917058337561',
  whatsapp: '917058337561',
  address: {
    street: 'Prestige Panorama, Manjari Road, Near Manik Shop, Keshav Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    postalCode: '411036',
    country: 'IN',
    full: 'Prestige Panorama, Manjari Road, Near Manik Shop, Keshav Nagar, Pune, Maharashtra 411036.',
  },
  coordinates: { lat: 18.5369, lng: 73.9482 },
  instagram: [
    { handle: 'momos_paradise_08', url: 'https://www.instagram.com/momos_paradise_08/' },
    { handle: 'pratik_jagtap_08', url: 'https://www.instagram.com/pratik_jagtap_08/' },
  ],
  // NOT YET PROVIDED: fill in when the Google Business Profile review link exists.
  googleReviewUrl: '',
};

export const whatsappUrl = (text = '') =>
  `https://wa.me/${CONTACT.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const telUrl = () => `tel:${CONTACT.phoneIntl}`;
export const directionsUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${CONTACT.coordinates.lat},${CONTACT.coordinates.lng}`;
export const mapEmbedUrl = () =>
  `https://www.google.com/maps?q=${CONTACT.coordinates.lat},${CONTACT.coordinates.lng}&z=16&output=embed`;
