import { MotionConfig } from 'motion/react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingBulkButton from './components/FloatingBulkButton.jsx';
import GuideLayer from './components/GuideLayer.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Home />
      </main>
      <Footer />
      <FloatingBulkButton />
      <GuideLayer />
    </MotionConfig>
  );
}
