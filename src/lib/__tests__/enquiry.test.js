import { describe, it, expect } from 'vitest';
import { isValidPhone, normalizePhone, validateEnquiry } from '../validation.js';
import { buildEnquiryMessage, enquiryUrl } from '../whatsapp.js';

const base = { name: 'Asha', phone: '98765 43210', type: '', eventType: '', quantity: '', eventDate: '', eventTime: '', eventLocation: '', items: '', address: '', deliveryTime: '', notes: '' };

describe('phone validation', () => {
  it('accepts valid Indian mobiles with common prefixes', () => {
    for (const p of ['9876543210', '98765 43210', '+91 98765 43210', '09876543210', '91-9876543210']) expect(isValidPhone(p)).toBe(true);
    expect(normalizePhone('+91 98765 43210')).toBe('9876543210');
  });
  it('rejects bad numbers', () => {
    for (const p of ['', '12345', '5876543210', '98765432101', 'abcdefghij']) expect(isValidPhone(p)).toBe(false);
  });
});

describe('enquiry validation', () => {
  it('requires name, phone and type', () => {
    expect(Object.keys(validateEnquiry({ ...base, name: '', phone: '' }))).toEqual(expect.arrayContaining(['name', 'phone', 'type']));
  });
  it('requires bulk-order fields', () => {
    const e = validateEnquiry({ ...base, type: 'Bulk Order' });
    expect(Object.keys(e)).toEqual(['eventType', 'quantity', 'eventDate', 'eventTime', 'eventLocation']);
  });
  it('requires home-delivery fields', () => {
    const e = validateEnquiry({ ...base, type: 'Home Delivery' });
    expect(Object.keys(e)).toEqual(['items', 'address', 'deliveryTime']);
  });
  it('passes a complete enquiry', () => {
    const v = { ...base, type: 'Home Delivery', items: 'Veg Fried Full x2', address: 'Flat 4, Keshav Nagar', deliveryTime: '19:30' };
    expect(validateEnquiry(v)).toEqual({});
  });
});

describe('WhatsApp message', () => {
  const bulk = { ...base, type: 'Bulk Order', eventType: 'Birthday', quantity: '100 pieces', eventDate: '2026-12-05', eventTime: '18:00', eventLocation: 'Community hall', notes: 'Less spicy' };
  it('includes every entered bulk field', () => {
    const m = buildEnquiryMessage(bulk);
    for (const s of ['Bulk Order', 'Asha', '9876543210', 'Birthday', '100 pieces', '2026-12-05', '18:00', 'Community hall', 'Less spicy']) expect(m).toContain(s);
  });
  it('includes every entered delivery field', () => {
    const m = buildEnquiryMessage({ ...base, type: 'Home Delivery', items: 'Veg Fried Full x2', address: 'Flat 4', deliveryTime: '19:30' });
    for (const s of ['Home Delivery', 'Veg Fried Full x2', 'Flat 4', '19:30']) expect(m).toContain(s);
  });
  it('is URL-encoded for the owner number', () => {
    const u = enquiryUrl(bulk);
    expect(u.startsWith('https://wa.me/917058337561?text=')).toBe(true);
    expect(decodeURIComponent(u.split('?text=')[1])).toContain('Community hall');
    expect(u).not.toContain(' ');
  });
});
