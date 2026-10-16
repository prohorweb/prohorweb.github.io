import type { ArchitectureData } from '../types/data';

interface ArchitectureProps {
  data: ArchitectureData;
}

export default function Architecture({ data }: ArchitectureProps) {
  return (
    <section className="arch-section">
      <div className="arch-container">
        <div className="mono arch-label">
          {data.sectionNumber}
        </div>
        <h2 className="arch-title">
          {data.title}
        </h2>
        
        <ul className="arch-list">
          {data.items.map((item, idx) => (
            <li key={idx} className="arch-item">
              <span className="arch-bullet">•</span>
              {item}
            </li>
          ))}
        </ul>

        {data.about && (
          <div className="arch-about">
            <h3 className="arch-about-title">
              {data.about.title}
            </h3>
            {data.about.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="arch-about-text">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
