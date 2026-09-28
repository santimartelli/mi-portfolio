// Isla de la sección de contacto y CV.
import Contact from './Contact';
import type { ContactTranslations } from '../../util/i18n';

interface ContactIslandProps {
  content: ContactTranslations;
}

const ContactIsland = ({ content }: ContactIslandProps) => {
  return (
    <Contact content={content} />
  );
};

export default ContactIsland;
