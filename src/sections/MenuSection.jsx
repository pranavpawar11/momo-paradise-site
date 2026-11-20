import { MENU_CATEGORIES } from '../config/menu.js';
import { whatsappUrl } from '../config/contact.js';
import MenuCard from '../components/MenuCard.jsx';
import MenuSelector from '../components/MenuSelector.jsx';
import FoodMark from '../components/FoodMark.jsx';
import Reveal from '../components/Reveal.jsx';

export default function MenuSection() {
  return (
    <section id="menu" data-guide="menu" className="section menu">
      <div className="wrap">
        <Reveal as="h2">Explore Our Delicious Menu</Reveal>
        <p className="muted">Find your favourite filling, flavour and portion.</p>
        <p className="legend">
          <span><FoodMark type="veg" /> Veg</span>
          <span><FoodMark type="nonveg" /> Non-veg</span>
          <span>🌶️ Peri-Peri</span>
          <span>Prices in ₹</span>
        </p>
        <MenuSelector />
        <div className="menu-grid">
          {MENU_CATEGORIES.map((c) => <MenuCard key={c.id} category={c} />)}
        </div>
        <div className="menu-cta">
          <div>
            <h3>Know what you want?</h3>
            <p>Message us on WhatsApp with your choice and portion. Planning a party? Ask about bulk orders.</p>
          </div>
          <div className="button-row">
            <a className="btn" href={whatsappUrl('Hi Momo Paradise! I’d like to order from your menu.')} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
            <a className="btn btn-alt" href="#bulk">Bulk orders</a>
          </div>
        </div>
      </div>
    </section>
  );
}
