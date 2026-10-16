import type { ProfileData } from '../types/data';
import HeroHalo from './HeroHalo';

interface HeroProps {
  data: ProfileData;
}

const renderIcon = (iconType: string) => {
  switch (iconType) {
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      );
    case 'hh':
      return <span>hh</span>;
    case 'fl':
      return <span>FL</span>;
    default:
      return null;
  }
};

export default function Hero({ data }: HeroProps) {
  return (
    <section className="min-h-screen max-h-screen flex items-center justify-center relative py-[80px] px-[32px]">
      <div className="max-w-[960px] w-full text-center relative z-[2]">
        <div className="relative inline-block mb-[32px]">
          <HeroHalo />
          <img 
            src={data.photo}
            alt={data.name}
            width="200"
            height="200"
            className="relative w-[200px] h-[200px] rounded-full border border-[var(--gold)] shadow-[0_0_16px_rgba(214,179,106,0.15)] object-cover"
          />
        </div>
        
        <div className="mono mb-[16px] text-[var(--gold)]">
          {data.label}
        </div>
        
        <h1 className="font-[var(--mono)] text-[clamp(32px,6vw,64px)] font-normal leading-[1.1] mb-[16px] text-[var(--gold)] tracking-[-0.02em] uppercase">
          {data.name}
        </h1>
        
        <p className="text-[clamp(16px,2.5vw,22px)] mb-[24px] text-[var(--text)] font-medium">
          {data.title}
        </p>
        
        <p className="text-base leading-[1.7] max-w-[640px] mx-auto mb-[40px] text-[var(--secondary)]">
          {data.tagline}
        </p>
        
        <div className="flex gap-[16px] justify-center flex-wrap">
          {data.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon-gold"
              aria-label={link.label}
              title={link.label}
            >
              {renderIcon(link.icon)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
