import type { StackData } from '../types/data';

interface StackProps {
  data: StackData;
}

export default function Stack({ data }: StackProps) {
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
          marginBottom: '48px',
          color: 'var(--text)',
        }}>
          {data.title}
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {data.categories.map((category) => (
            <div key={category.name}>
              <h3 style={{
                fontSize: '14px',
                fontFamily: 'var(--mono)',
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: 'var(--orange)',
                marginBottom: '16px',
              }}>
                {category.name}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '10px 18px',
                      background: 'var(--surface)',
                      border: '1px solid var(--hairline)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: 'var(--text)',
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
