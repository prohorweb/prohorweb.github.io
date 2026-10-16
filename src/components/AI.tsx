import type { AIData } from '../types/data';

interface AIProps {
  data: AIData;
}

export default function AI({ data }: AIProps) {
  return (
    <section className="ai-section">
      <div className="ai-container">
        <div className="mono ai-label">
          {data.sectionNumber}
        </div>
        <h2 className="ai-title">
          {data.title}
        </h2>
        
        <p className="ai-intro">
          {data.intro}
        </p>
        
        <div className="ai-cards">
          {data.cards.map((card) => (
            <div key={card.label} className="ai-card">
              <div className="mono ai-card-label">
                {card.label}
              </div>
              <h3 className="ai-card-title">
                {card.title}
              </h3>
              <p className="ai-card-desc">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
