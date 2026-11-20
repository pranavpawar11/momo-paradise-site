// Indian mobile numbers: 10 digits starting 6-9, optional +91 / 91 / 0 prefix.
export const normalizePhone = (value = '') => value.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
export const isValidPhone = (value) => /^[6-9]\d{9}$/.test(normalizePhone(value));

export const ENQUIRY_TYPES = ['Bulk Order', 'Home Delivery'];
export const EVENT_TYPES = ['Birthday', 'College event', 'Office gathering', 'Family function', 'Other'];

const empty = (v) => !String(v ?? '').trim();

export function validateEnquiry(v) {
  const e = {};
  if (empty(v.name)) e.name = 'Please enter your name.';
  if (empty(v.phone)) e.phone = 'Please enter your mobile number.';
  else if (!isValidPhone(v.phone)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!ENQUIRY_TYPES.includes(v.type)) e.type = 'Please choose an enquiry type.';
  if (v.type === 'Bulk Order') {
    if (empty(v.eventType)) e.eventType = 'Please choose an event type.';
    if (empty(v.quantity)) e.quantity = 'Please enter an approximate quantity.';
    if (empty(v.eventDate)) e.eventDate = 'Please choose the event date.';
    if (empty(v.eventTime)) e.eventTime = 'Please choose the event time.';
    if (empty(v.eventLocation)) e.eventLocation = 'Please enter the event location.';
  }
  if (v.type === 'Home Delivery') {
    if (empty(v.items)) e.items = 'Please list the items and quantity.';
    if (empty(v.address)) e.address = 'Please enter the delivery address.';
    if (empty(v.deliveryTime)) e.deliveryTime = 'Please choose a preferred delivery time.';
  }
  return e;
}
