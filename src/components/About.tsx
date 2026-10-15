import type { AboutData } from '../types/data';

interface AboutProps {
  data: AboutData;
}

export default function About({ data }: AboutProps) {
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
          marginBottom: '32px',
          color: 'var(--text)',
        }}>
          {data.title}
        </h2>
        
        <div style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--secondary)' }}>
          {data.paragraphs.map((para, idx) => (
            <p 
              key={idx} 
              style={{ marginBottom: idx < data.paragraphs.length - 1 ? '20px' : '0' }}
              dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text); font-weight: 600;">$1</strong>') }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
