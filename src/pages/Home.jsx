import HeroSection from '../sections/HeroSection.jsx';
import SpecialtiesSection from '../sections/SpecialtiesSection.jsx';
import MenuSection from '../sections/MenuSection.jsx';
import LocalSection from '../sections/LocalSection.jsx';
import GallerySection from '../sections/GallerySection.jsx';
import FeedbackSection from '../sections/FeedbackSection.jsx';
import BulkOrderSection from '../sections/BulkOrderSection.jsx';
import FaqSection from '../sections/FaqSection.jsx';
import LocationSection from '../sections/LocationSection.jsx';

// Section order = the customer journey. Every section carries data-guide so the mascot knows where he is.
export default function Home() {
  return (
    <>
      <HeroSection />
      <SpecialtiesSection />
      <MenuSection />
      <LocalSection />
      <GallerySection />
      <FeedbackSection />
      <BulkOrderSection />
      <FaqSection />
      <LocationSection />
    </>
  );
}
