// Specialty cards. `image` is a key into src/assets/food/index.js (null shows a clearly marked sample visual).
export const SPECIALTIES = [
  { id: 'steamed', title: 'Steamed Momos', blurb: 'Soft, hot and simple.', image: 'steamed', target: { category: 'veg', prepKey: 'steamed' } },
  { id: 'fried', title: 'Fried Momos', blurb: 'Crispy outside, juicy inside.', image: 'fried', target: { category: 'veg', prepKey: 'fried' } },
  { id: 'peri', title: 'Peri-Peri Momos', blurb: 'For the spice lovers.', image: null, target: { category: 'veg', prepKey: 'peri' } },
  { id: 'cheese', title: 'Cheese Momos', blurb: 'Cheesy and comforting.', image: 'cheese', target: { category: 'cheese', prepKey: null } },
];

export const GALLERY = [
  { image: 'steamed', alt: 'Steamed momos with chilli sauce and mayo', caption: 'Steamed momos' },
  { image: 'fried', alt: 'Fried momos with chilli sauce and mayo', caption: 'Fried momos' },
  { image: 'steamed2', alt: 'Steamed momos on paper with chilli sauce', caption: 'Steamed momos with chilli sauce and mayo' },
  { image: 'cheese', alt: 'Cheese-topped fried momos with sauce', caption: 'Cheese-topped fried momos' },
];

export const HERO_DISHES = [
  { image: 'fried', label: 'Fried' },
  { image: 'steamed', label: 'Steamed' },
  { image: 'cheese', label: 'Cheese' },
];
