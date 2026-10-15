import type { AIData } from '../types/data';

interface AIProps {
  data: AIData;
}

export default function AI({ data }: AIProps) {
  return (
    <section style={{
      padding: '80px 32px',
      borderTop: '1px solid var(--hairline)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          marginBottom: '48px',
          color: 'var(--secondary)',
          maxWidth: '720px',
        }}>
          {data.intro}
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {data.cards.map((card) => (
            <div
              key={card.label}
              style={{
                background: 'rgba(13, 16, 22, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                border: '1px solid var(--gold-border)',
                borderRadius: '12px',
                padding: '32px 28px)',
              }}
            >
              <div className="mono" style={{ marginBottom: '12px', color: 'var(--orange)' }}>
                {card.label}
              </div>
              <h3 style={{
                fontFamily: 'var(--display)',
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: '12px',
                color: 'var(--text)',
              }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--secondary)' }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
