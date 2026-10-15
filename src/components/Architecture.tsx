import type { ArchitectureData } from '../types/data';

interface ArchitectureProps {
  data: ArchitectureData;
}

export default function Architecture({ data }: ArchitectureProps) {
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
          marginBottom: '40px',
          color: 'var(--text)',
        }}>
          {data.title}
        </h2>
        
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {data.items.map((item, idx) => (
            <li key={idx} style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: 'var(--secondary)',
              paddingLeft: '28px',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute',
                left: 0,
                color: 'var(--gold)',
                fontWeight: 600,
              }}>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
