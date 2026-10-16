import type { StackData } from '../types/data';

interface StackProps {
  data: StackData;
}

export default function Stack({ data }: StackProps) {
  return (
    <section className="py-[80px] px-[32px] bg-[rgba(13,16,22,0.6)] backdrop-blur border-t border-[var(--hairline)]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mono mb-[16px] text-[var(--gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[48px] text-[var(--text)]">
          {data.title}
        </h2>
        
        <div className="flex flex-col gap-[32px]">
          {data.categories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-[var(--mono)] tracking-[0.12em] uppercase text-[var(--gold)] mb-[16px]">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-[12px]">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="py-[10px] px-[18px] bg-[rgba(13,16,22,0.5)] backdrop-blur border border-[var(--hairline)] rounded-[8px] text-sm text-[var(--text)] font-medium"
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
