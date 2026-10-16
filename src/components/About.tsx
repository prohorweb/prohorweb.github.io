import type { AboutData } from '../types/data';

interface AboutProps {
  data: AboutData;
}

export default function About({ data }: AboutProps) {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="mono about-label">
          {data.sectionNumber}
        </div>
        <h2 className="about-title">
          {data.title}
        </h2>
        {data.paragraphs.map((paragraph, idx) => (
          <p key={idx} className="about-text">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
