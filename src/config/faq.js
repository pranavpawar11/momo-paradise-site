import { CONTACT } from './contact.js';
import { OPENING_HOURS } from './openingHours.js';
import { startingPrice } from './menu.js';

// Answers use confirmed facts only and read prices from the menu config.
export const FAQ = [
  { q: 'Where is Momo Paradise?', a: `Momo Paradise is at ${CONTACT.address.full}` },
  { q: 'What are the opening hours?', a: `We are open from ${OPENING_HOURS.label.replace('–', 'to')}.` },
  { q: 'What momos do you serve?', a: 'Veg, non-veg and cheese momos, steamed, fried or peri-peri, in half and full portions.' },
  {
    q: 'How much do momos cost?',
    a: `Veg momos start at ₹${startingPrice('veg')} for a half and ₹${startingPrice('veg', 'full')} for a full portion. Non-veg momos start at ₹${startingPrice('nonveg')} and ₹${startingPrice('nonveg', 'full')}. Cheese momos start at ₹${startingPrice('cheese')} and ₹${startingPrice('cheese', 'full')}. The menu above lists every variety.`,
  },
  {
    q: 'Do you take bulk orders or deliver to homes?',
    a: 'You can send a bulk order or home delivery enquiry with the form on this page or on WhatsApp. The owner confirms every enquiry, and delivery charges are extra and shared directly.',
  },
  { q: 'How do I order?', a: `Message us on WhatsApp at ${CONTACT.phoneIntl.replace('+91', '+91 ')} or call the same number. There is no online checkout.` },
];
