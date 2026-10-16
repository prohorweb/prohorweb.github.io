import type { ContactsData } from '../types/data';
import ContactForm from './ContactForm';

interface ContactsProps {
  data: ContactsData;
}

export default function Contacts({ data }: ContactsProps) {
  return (
    <section style={{
      padding: '80px 32px',
      background: 'rgba(13, 16, 22, .98)',
      borderTop: '1px solid var(--hairline)',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <div className="mono" style={{ marginBottom: '16px', color: 'var(--gold)' }}>
          {data.sectionNumber}
        </div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 600,
          marginBottom: '20px',
          color: 'var(--text)',
        }}>
          {data.title}
        </h2>
        
        <p style={{
          fontSize: '17px',
          lineHeight: 1.8,
          marginBottom: '40px',
          color: 'var(--secondary)',
        }}>
          {data.intro}
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginBottom: '48px',
        }}
        className="contacts-links">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '20px 24px',
                background: 'var(--surface)',
                border: '1px solid var(--hairline)',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--text)',
                fontWeight: 500,
                fontSize: '16px',
                textAlign: 'center',
                transition: 'border-color .2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-border)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--hairline)'}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
          padding: '28px',
          background: 'var(--surface)',
          border: '1px solid var(--gold-border)',
          borderRadius: '12px',
        }}>
          {data.info.map((item) => (
            <div key={item.label}>
              <div className="mono" style={{ marginBottom: '6px', color: 'var(--gold)' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 500 }}>
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
