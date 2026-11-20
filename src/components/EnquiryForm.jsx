import { useRef, useState } from 'react';
import { ENQUIRY_TYPES, EVENT_TYPES, validateEnquiry } from '../lib/validation.js';
import { enquiryUrl } from '../lib/whatsapp.js';

const INITIAL = {
  name: '', phone: '', type: '', eventType: '', quantity: '', eventDate: '', eventTime: '',
  eventLocation: '', items: '', address: '', deliveryTime: '', notes: '',
};

function Field({ id, label, error, children, wide }) {
  return (
    <div className={`field ${wide ? 'wide' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

// Bulk order / home delivery enquiry. Opens WhatsApp with a prefilled message; the customer presses Send.
export default function EnquiryForm() {
  const [v, setV] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const formRef = useRef(null);
  const today = new Date().toISOString().slice(0, 10);

  const set = (e) => setV((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const p = (name) => ({
    id: name, name, value: v[name], onChange: set,
    'aria-invalid': !!errors[name], 'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('');
    const found = validateEnquiry(v);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current.querySelector(`[name="${first}"]`)?.focus();
      setStatus('Please fix the highlighted fields.');
      return;
    }
    const win = window.open(enquiryUrl(v), '_blank', 'noopener');
    // No success message until WhatsApp actually opens.
    setStatus(win ? 'WhatsApp is opening. Press Send there to deliver your enquiry.' : 'Your browser blocked WhatsApp. Allow pop-ups and try again.');
  };

  return (
    <form className="enquiry card" ref={formRef} onSubmit={onSubmit} noValidate>
      <Field id="name" label="Name" error={errors.name}><input {...p('name')} autoComplete="name" /></Field>
      <Field id="phone" label="Mobile number" error={errors.phone}>
        <input {...p('phone')} type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit number" />
      </Field>
      <Field id="type" label="Enquiry type" error={errors.type} wide>
        <select {...p('type')}>
          <option value="">Choose one</option>
          {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>

      {v.type === 'Bulk Order' && (
        <>
          <Field id="eventType" label="Event type" error={errors.eventType}>
            <select {...p('eventType')}>
              <option value="">Choose one</option>
              {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field id="quantity" label="Approximate quantity" error={errors.quantity}>
            <input {...p('quantity')} placeholder="e.g. 100 pieces" />
          </Field>
          <Field id="eventDate" label="Event date" error={errors.eventDate}><input {...p('eventDate')} type="date" min={today} /></Field>
          <Field id="eventTime" label="Event time" error={errors.eventTime}><input {...p('eventTime')} type="time" /></Field>
          <Field id="eventLocation" label="Event location" error={errors.eventLocation} wide><input {...p('eventLocation')} /></Field>
        </>
      )}

      {v.type === 'Home Delivery' && (
        <>
          <Field id="items" label="Food items and quantity" error={errors.items} wide>
            <textarea {...p('items')} rows={3} placeholder="e.g. Veg Fried Full × 2, Non-Veg Steamed Half × 1" />
          </Field>
          <Field id="address" label="Delivery address" error={errors.address} wide><textarea {...p('address')} rows={2} /></Field>
          <Field id="deliveryTime" label="Preferred delivery time" error={errors.deliveryTime}><input {...p('deliveryTime')} type="time" /></Field>
        </>
      )}

      <Field id="notes" label="Additional requirements" wide><textarea {...p('notes')} rows={3} /></Field>

      <p className="note wide">
        Home delivery and bulk orders are subject to owner confirmation. Delivery charges are extra and will be shared directly on WhatsApp.
      </p>
      <div className="wide">
        <button className="btn" type="submit">Continue to WhatsApp</button>
        <p className="note" role="status">{status}</p>
      </div>
    </form>
  );
}
