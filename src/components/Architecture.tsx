import type { ArchitectureData } from '../types/data';

interface ArchitectureProps {
  data: ArchitectureData;
}

export default function Architecture({ data }: ArchitectureProps) {
  return (
    <section className="py-[80px] px-[32px] bg-[rgba(13,16,22,0.6)] backdrop-blur border-t border-[var(--hairline)]">
      <div className="max-w-[960px] mx-auto">
        <div className="mono mb-[16px] text-[var(--gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[40px] text-[var(--text)]">
          {data.title}
        </h2>
        
        <ul className="list-none flex flex-col gap-[20px]">
          {data.items.map((item, idx) => (
            <li key={idx} className="text-base leading-[1.7] text-[var(--secondary)] pl-[28px] relative">
              <span className="absolute left-0 text-[var(--gold)] font-semibold">
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
