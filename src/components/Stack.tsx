import type { StackData } from '../types/data';

interface StackProps {
  data: StackData;
}

export default function Stack({ data }: StackProps) {
  return (
    <section className="py-[200px] px-[32px] bg-[rgba(13,16,22,0.6)] backdrop-blur border-t border-[var(--color-hairline)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mono mb-[16px] text-[var(--color-gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--font-family-display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[48px] text-[var(--color-text)]">
          {data.title}
        </h2>
        
        <div className="flex flex-col gap-[90px]">
          {data.categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-[var(--font-family-mono)] tracking-[0.12em] uppercase text-[var(--color-gold)] mb-[24px]">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-[20px] gap-y-[18px]">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="py-[10px] px-[18px] bg-[rgba(13,16,22,0.5)] backdrop-blur border border-[var(--color-hairline)] rounded-[8px] text-sm text-[var(--color-text)] font-medium"
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
