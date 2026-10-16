import type { ArchitectureData } from '../types/data';

interface ArchitectureProps {
  data: ArchitectureData;
}

export default function Architecture({ data }: ArchitectureProps) {
  if (!data.about) {
    return null;
  }

  return (
    <section className="arch-section">
      <div className="arch-container">
        <div className="mono arch-label">
          {data.about.sectionNumber}
        </div>
        <h2 className="arch-title">
          {data.about.title}
        </h2>
        {data.about.paragraphs.map((paragraph, idx) => (
          <p key={idx} className="arch-about-text">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
