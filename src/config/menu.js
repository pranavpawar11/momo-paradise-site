// Centralised menu. Owners change prices ONLY here.
// Do not add products that have not been approved (no fries, rolls, drinks or platters in v1).
export const MENU_CATEGORIES = [
  { id: 'veg', label: 'Veg Momos', icon: '🥬', blurb: 'Steamed, fried or peri-peri' },
  { id: 'nonveg', label: 'Non-Veg Momos', icon: '🍗', blurb: 'Steamed, fried or peri-peri' },
  { id: 'cheese', label: 'Cheese Momos', icon: '🧀', blurb: 'Veg and non-veg, three ways' },
];

export const PREPARATIONS = { steamed: 'Steamed', fried: 'Fried', peri: 'Peri-Peri' };

const item = (id, category, foodType, name, prepKey, half, full) => ({
  id,
  name,
  category,
  foodType, // 'veg' | 'nonveg'
  preparation: PREPARATIONS[prepKey],
  prepKey,
  portions: { half, full },
  available: true,
  extraCharge: 0, // optional additional charge added to every portion
  image: null, // image reference (replace when real photos exist)
  description: '',
});

export const MENU_ITEMS = [
  item('veg-steamed', 'veg', 'veg', 'Steamed Veg Momos', 'steamed', 40, 70),
  item('veg-fried', 'veg', 'veg', 'Fried Veg Momos', 'fried', 40, 70),
  item('veg-peri', 'veg', 'veg', 'Peri-Peri Fried Veg Momos', 'peri', 50, 80),
  item('nonveg-steamed', 'nonveg', 'nonveg', 'Steamed Non-Veg Momos', 'steamed', 50, 80),
  item('nonveg-fried', 'nonveg', 'nonveg', 'Fried Non-Veg Momos', 'fried', 50, 80),
  item('nonveg-peri', 'nonveg', 'nonveg', 'Peri-Peri Fried Non-Veg Momos', 'peri', 60, 90),
  // Cheese pricing follows the matching Peri-Peri variant.
  item('cheese-veg-steamed', 'cheese', 'veg', 'Steamed Cheese Veg Momos', 'steamed', 50, 80),
  item('cheese-veg-fried', 'cheese', 'veg', 'Fried Cheese Veg Momos', 'fried', 50, 80),
  item('cheese-veg-peri', 'cheese', 'veg', 'Peri-Peri Cheese Veg Momos', 'peri', 50, 80),
  item('cheese-nonveg-steamed', 'cheese', 'nonveg', 'Steamed Cheese Non-Veg Momos', 'steamed', 60, 90),
  item('cheese-nonveg-fried', 'cheese', 'nonveg', 'Fried Cheese Non-Veg Momos', 'fried', 60, 90),
  item('cheese-nonveg-peri', 'cheese', 'nonveg', 'Peri-Peri Cheese Non-Veg Momos', 'peri', 60, 90),
];

export const itemsByCategory = (categoryId) =>
  MENU_ITEMS.filter((m) => m.category === categoryId && m.available);

export const portionPrice = (m, portion) => m.portions[portion] + m.extraCharge;

export const startingPrice = (categoryId, portion = 'half') =>
  Math.min(...itemsByCategory(categoryId).map((m) => portionPrice(m, portion)));

export const shortName = (m) => m.name.replace(' Momos', '');
