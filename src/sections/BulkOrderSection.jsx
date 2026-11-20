import EnquiryForm from '../components/EnquiryForm.jsx';
import Reveal from '../components/Reveal.jsx';

const OCCASIONS = ['Birthday parties', 'College events', 'Office gatherings', 'Family functions', 'Bulk food orders', 'Home delivery enquiries'];

export default function BulkOrderSection() {
  return (
    <section id="bulk" data-guide="bulk" className="bulk">
      <div className="wrap">
        <Reveal as="h2">Making Every Celebration More Delicious!</Reveal>
        <p className="bulk-lede">Planning a birthday, party, college event, office gathering or family function? Let Momo Paradise make it special!</p>
        <ul className="occasions">{OCCASIONS.map((o) => <li key={o}>{o}</li>)}</ul>
        <EnquiryForm />
      </div>
    </section>
  );
}
