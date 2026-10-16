import type { ArchitectureData } from '../types/data';

interface ArchitectureProps {
  data: ArchitectureData;
}

export default function Architecture({ data }: ArchitectureProps) {
  return (
    <section className="py-[180px] px-[32px] bg-[rgba(13,16,22,0.6)] backdrop-blur border-t border-[var(--color-hairline)]">
      <div className="max-w-[960px] mx-auto">
        <div className="mono mb-[16px] text-[var(--color-gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--font-family-display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[80px] text-[var(--color-text)]">
          {data.title}
        </h2>
        
        <ul className="list-none flex flex-col gap-[40px]">
          {data.items.map((item, idx) => (
            <li key={idx} className="text-base leading-[2.0] text-[var(--color-secondary)] pl-[28px] relative">
              <span className="absolute left-0 text-[var(--color-gold)] font-semibold">
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
