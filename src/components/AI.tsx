import type { AIData } from '../types/data';

interface AIProps {
  data: AIData;
}

export default function AI({ data }: AIProps) {
  return (
    <section className="py-[180px] px-[32px] border-t border-[var(--color-hairline)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mono mb-[16px] text-[var(--color-gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--font-family-display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[20px] text-[var(--color-text)]">
          {data.title}
        </h2>
        
        <p className="text-[17px] leading-[1.8] mb-[110px] text-[var(--color-secondary)] max-w-[720px]">
          {data.intro}
        </p>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[110px] gap-y-[90px]">
          {data.cards.map((card) => (
            <div
              key={card.label}
              className="bg-[var(--color-surface)] border border-[var(--color-gold-border)] rounded-[12px] p-[20px]"
            >
              <div className="mono mb-[12px] text-[var(--color-gold)]">
                {card.label}
              </div>
              <h3 className="font-[var(--font-family-display)] text-[20px] font-semibold mb-[12px] text-[var(--color-text)]">
                {card.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[var(--color-secondary)]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
