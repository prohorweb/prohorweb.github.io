import type { AIData } from '../types/data';

interface AIProps {
  data: AIData;
}

export default function AI({ data }: AIProps) {
  return (
    <section className="py-[80px] px-[32px] border-t border-[var(--hairline)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mono mb-[16px] text-[var(--gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[20px] text-[var(--text)]">
          {data.title}
        </h2>
        
        <p className="text-[17px] leading-[1.8] mb-[48px] text-[var(--secondary)] max-w-[720px]">
          {data.intro}
        </p>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[24px]">
          {data.cards.map((card) => (
            <div
              key={card.label}
              className="bg-[var(--surface)] border border-[var(--gold-border)] rounded-[12px] p-[20px]"
            >
              <div className="mono mb-[12px] text-[var(--gold)]">
                {card.label}
              </div>
              <h3 className="font-[var(--display)] text-[20px] font-semibold mb-[12px] text-[var(--text)]">
                {card.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[var(--secondary)]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
