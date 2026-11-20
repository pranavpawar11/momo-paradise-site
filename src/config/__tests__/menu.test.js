import { describe, it, expect } from 'vitest';
import { MENU_ITEMS, MENU_CATEGORIES, portionPrice, startingPrice } from '../menu.js';
import { FAQ } from '../faq.js';
import { CONTACT, whatsappUrl } from '../contact.js';
import { OPENING_HOURS } from '../openingHours.js';

const price = (id) => { const m = MENU_ITEMS.find((x) => x.id === id); return [portionPrice(m, 'half'), portionPrice(m, 'full')]; };

describe('menu (approved launch prices)', () => {
  it('has only the three approved categories', () => {
    expect(MENU_CATEGORIES.map((c) => c.id)).toEqual(['veg', 'nonveg', 'cheese']);
    expect(MENU_ITEMS).toHaveLength(12);
  });
  it('veg prices match', () => {
    expect(price('veg-steamed')).toEqual([40, 70]);
    expect(price('veg-fried')).toEqual([40, 70]);
    expect(price('veg-peri')).toEqual([50, 80]);
  });
  it('non-veg prices match', () => {
    expect(price('nonveg-steamed')).toEqual([50, 80]);
    expect(price('nonveg-fried')).toEqual([50, 80]);
    expect(price('nonveg-peri')).toEqual([60, 90]);
  });
  it('cheese prices follow the matching peri-peri variant', () => {
    for (const p of ['steamed', 'fried', 'peri']) expect(price(`cheese-veg-${p}`)).toEqual(price('veg-peri'));
    for (const p of ['steamed', 'fried', 'peri']) expect(price(`cheese-nonveg-${p}`)).toEqual(price('nonveg-peri'));
  });
  it('supports an extra charge from the single config', () => {
    const m = { ...MENU_ITEMS[0], extraCharge: 5 };
    expect(portionPrice(m, 'half')).toBe(45);
  });
  it('computes starting prices', () => {
    expect(startingPrice('veg')).toBe(40);
    expect(startingPrice('nonveg')).toBe(50);
    expect(startingPrice('cheese')).toBe(50);
  });
});

describe('confirmed business details', () => {
  it('keeps contact, hours and links correct', () => {
    expect(CONTACT.phoneIntl).toBe('+917058337561');
    expect(CONTACT.coordinates).toEqual({ lat: 18.5369, lng: 73.9482 });
    expect(CONTACT.address.postalCode).toBe('411036');
    expect(OPENING_HOURS.label).toBe('4:00 PM – 10:00 PM');
    expect(OPENING_HOURS.closedDays).toEqual([]);
    expect(whatsappUrl('hi there')).toBe('https://wa.me/917058337561?text=hi%20there');
  });
  it('FAQ prices come from the menu', () => {
    const cost = FAQ.find((f) => f.q.startsWith('How much'));
    expect(cost.a).toContain('₹40');
    expect(cost.a).toContain('₹80');
  });
});
