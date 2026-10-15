import type { ProfileData } from '../types/data';
import HeroHalo from './HeroHalo';

interface HeroProps {
  data: ProfileData;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section style={{
      minHeight: '100vh',
      maxHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '80px 32px',
    }}>
      <div style={{ 
        maxWidth: '960px', 
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '32px' }}>
          <HeroHalo />
          <img 
            src={data.photo}
            alt={data.name}
            width="200"
            height="200"
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '4px solid var(--gold)',
              boxShadow: '0 0 40px rgba(214, 179, 106, .4)',
              objectFit: 'cover',
            }}
          />
        </div>
        
        <div className="mono" style={{ marginBottom: '16px', color: 'var(--gold)' }}>
          {data.label}
        </div>
        
        <h1 style={{
          fontFamily: 'var(--mono)',
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 400,
          lineHeight: 1.1,
          marginBottom: '16px',
          color: 'var(--gold-light)',
          letterSpacing: '-.02em',
          textTransform: 'uppercase',
        }}>
          {data.name}
        </h1>
        
        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          marginBottom: '24px',
          color: 'var(--text)',
          fontWeight: 500,
        }}>
          {data.title}
        </p>
        
        <p style={{
          fontSize: '16px',
          lineHeight: 1.7,
          maxWidth: '640px',
          margin: '0 auto 40px',
          color: 'var(--secondary)',
        }}>
          {data.tagline}
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: link.primary ? '14px 32px' : '14px 28px',
                background: link.primary ? 'var(--gold)' : 'var(--surface)',
                color: link.primary ? 'var(--bg)' : 'var(--text)',
                border: `1px solid ${link.primary ? 'var(--gold)' : 'var(--hairline)'}`,
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '15px',
                transition: 'all .2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--hairline)';
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--hairline)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
