import type { ContactsData } from '../types/data';
import ContactForm from './ContactForm';

interface ContactsProps {
  data: ContactsData;
}

export default function Contacts({ data }: ContactsProps) {
  return (
    <section className="contacts-section">
      <div className="contacts-container">
        <div className="mono contacts-label">
          {data.sectionNumber}
        </div>
        <h2 className="contacts-title">
          {data.title}
        </h2>
        
        <p className="contacts-intro">
          {data.intro}
        </p>
        
        <div className="contacts-links">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contacts-link"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="contacts-info">
          {data.info.map((item) => (
            <div key={item.label}>
              <div className="mono contacts-info-label">
                {item.label}
              </div>
              <div className="contacts-info-value">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        
        <ContactForm labels={data.form} email={data.email} />
      </div>
    </section>
  );
}
