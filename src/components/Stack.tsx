import type { StackData } from '../types/data';

interface StackProps {
  data: StackData;
}

export default function Stack({ data }: StackProps) {
  return (
    <section className="stack-section">
      <div className="stack-container">
        <div className="mono stack-label">
          {data.sectionNumber}
        </div>
        <h2 className="stack-title">
          {data.title}
        </h2>
        
        <div className="stack-categories">
          {data.categories.map((category) => (
            <div key={category.name}>
              <h3 className="stack-category-title">
                {category.name}
              </h3>
              <div className="stack-tags">
                {category.tags.map((tag) => (
                  <span key={tag} className="stack-tag">
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
