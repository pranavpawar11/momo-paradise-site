import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';

// The 3D canvas is lazy-loaded; keep it out of the DOM smoke test.
vi.mock('../guide/GuideCanvas.jsx', () => ({ default: () => null }));

import App from '../App.jsx';

describe('Home page smoke test', () => {
  it('renders every section, once, in order', () => {
    const { container } = render(<App />);
    const ids = [...container.querySelectorAll('main > section')].map((s) => s.dataset.guide);
    expect(ids).toEqual(['hero', 'specialties', 'menu', 'local', 'gallery', 'feedback', 'bulk', 'faq', 'location']);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Fresh Hot Delicious');
  });

  it('shows all menu prices at once from the config', () => {
    render(<App />);
    const veg = document.getElementById('menu-veg');
    expect(within(veg).getAllByRole('button')).toHaveLength(3);
    expect(veg.textContent).toContain('₹40');
    expect(veg.textContent).toContain('₹70');
    expect(document.getElementById('menu-cheese').textContent).toContain('₹90');
  });

  it('does not show demo reviews', () => {
    render(<App />);
    expect(screen.queryByText(/Sample Customer/)).toBeNull();
  });

  it('enquiry form validates and does not open WhatsApp when invalid', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue({});
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /continue to whatsapp/i }));
    expect(open).not.toHaveBeenCalled();
    expect(screen.getByText('Please enter your name.')).toBeTruthy();
    open.mockRestore();
  });

  it('enquiry form opens WhatsApp when valid (bulk order)', () => {
    const open = vi.spyOn(window, 'open').mockReturnValue({});
    render(<App />);
    const set = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
    set('Name', 'Asha'); set('Mobile number', '9876543210'); set('Enquiry type', 'Bulk Order');
    set('Event type', 'Birthday'); set('Approximate quantity', '80'); set('Event date', '2030-01-10');
    set('Event time', '18:00'); set('Event location', 'Hall');
    fireEvent.click(screen.getByRole('button', { name: /continue to whatsapp/i }));
    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toContain('https://wa.me/917058337561?text=');
    expect(screen.getByText(/WhatsApp is opening/)).toBeTruthy();
    open.mockRestore();
  });
});
