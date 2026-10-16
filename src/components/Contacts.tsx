import type { ContactsData } from '../types/data';
import ContactForm from './ContactForm';

interface ContactsProps {
  data: ContactsData;
}

export default function Contacts({ data }: ContactsProps) {
  return (
    <section className="py-[80px] px-[32px] bg-[rgba(13,16,22,0.98)] border-t border-[var(--hairline)]">
      <div className="max-w-[960px] mx-auto">
        <div className="mono mb-[16px] text-[var(--gold)]">
          {data.sectionNumber}
        </div>
        <h2 className="font-[var(--display)] text-[clamp(28px,4vw,42px)] font-semibold mb-[20px] text-[var(--text)]">
          {data.title}
        </h2>
        
        <p className="text-[17px] leading-[1.8] mb-[40px] text-[var(--secondary)]">
          {data.intro}
        </p>
        
        <div className="grid contacts-links gap-[20px] mb-[48px]">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-[20px] px-[24px] bg-[var(--surface)] border border-[var(--hairline)] rounded-[12px] no-underline text-[var(--text)] font-medium text-base text-center transition-[border-color] duration-200 hover:border-[var(--gold-border)]"
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[16px] mb-[48px] p-[28px] bg-[var(--surface)] border border-[var(--gold-border)] rounded-[12px]">
          {data.info.map((item) => (
            <div key={item.label}>
              <div className="mono mb-[6px] text-[var(--gold)]">
                {item.label}
              </div>
              <div className="text-[15px] text-[var(--text)] font-medium">
                {item.value}
              </div>
            </div>
          ))}
        </div>
        
        <ContactForm labels={data.form} email={data.email} />
      </div>
    </section>
  );
}
