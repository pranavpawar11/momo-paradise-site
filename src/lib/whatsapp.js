import { whatsappUrl } from '../config/contact.js';
import { normalizePhone } from './validation.js';

// Builds the WhatsApp text from every field the customer entered. The customer presses Send themselves.
export function buildEnquiryMessage(v) {
  const lines = [`*New ${v.type} enquiry – Momo Paradise*`, `Name: ${v.name.trim()}`, `Mobile: ${normalizePhone(v.phone)}`];
  if (v.type === 'Bulk Order') {
    lines.push(
      `Event type: ${v.eventType}`,
      `Approx. quantity: ${v.quantity.trim()}`,
      `Event date: ${v.eventDate}`,
      `Event time: ${v.eventTime}`,
      `Event location: ${v.eventLocation.trim()}`,
    );
  } else {
    lines.push(`Items & quantity: ${v.items.trim()}`, `Delivery address: ${v.address.trim()}`, `Preferred delivery time: ${v.deliveryTime}`);
  }
  if (v.notes?.trim()) lines.push(`Additional requirements: ${v.notes.trim()}`);
  return lines.join('\n');
}

export const enquiryUrl = (values) => whatsappUrl(buildEnquiryMessage(values));
