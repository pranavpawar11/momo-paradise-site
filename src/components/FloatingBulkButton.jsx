import { motion } from 'motion/react';
import { PartyPopper } from 'lucide-react';

// Persistent shortcut to the bulk enquiry form (scrolls, never opens a popup).
export default function FloatingBulkButton() {
  return (
    <motion.a
      href="#bulk"
      className="fab"
      aria-label="Bulk orders: go to the enquiry form"
      animate={{ rotate: [0, 0, -3, 3, 0] }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.88, 0.92, 0.96, 1] }}
    >
      <PartyPopper size={20} aria-hidden="true" />
      Bulk Orders
    </motion.a>
  );
}
