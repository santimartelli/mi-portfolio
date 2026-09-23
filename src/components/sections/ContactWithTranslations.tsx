// Isla de la sección de contacto y CV.
import { MotionConfig } from 'framer-motion';
import Contact from './Contact';
import type { ContactTranslations } from '../../util/i18n';

interface ContactIslandProps {
  content: ContactTranslations;
}

const ContactIsland = ({ content }: ContactIslandProps) => {
  return (
    <MotionConfig reducedMotion="user">
      <Contact content={content} />
    </MotionConfig>
  );
};

export default ContactIsland;
