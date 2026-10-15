import { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import AI from './components/AI';
import Architecture from './components/Architecture';
import Stack from './components/Stack';
import Contacts from './components/Contacts';
import ThreeScene from './components/ThreeScene';
import ParallaxBackground from './components/ParallaxBackground';

import profileData from './data/profile.json';
import aiData from './data/ai.json';
import architectureData from './data/architecture.json';
import stackData from './data/stack.json';
import contactsData from './data/contacts.json';

function App() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const blueprint = parallaxRef.current?.querySelector('.blueprint-layer') as HTMLElement;
          const grid = parallaxRef.current?.querySelector('.grid-layer') as HTMLElement;
          
          if (blueprint) {
            blueprint.style.transform = `translateY(${scrolled * 0.3}px)`;
          }
          if (grid) {
            grid.style.transform = `translateY(${scrolled * 0.15}px)`;
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ParallaxBackground ref={parallaxRef} />
      <ThreeScene />
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero data={profileData} />
        <main>
          <Stack data={stackData} />
          <AI data={aiData} />
          <Architecture data={architectureData} />
          <Contacts data={contactsData} />
        </main>
        <footer style={{ 
          padding: '48px 0', 
          textAlign: 'center', 
          background: 'rgba(13, 16, 22, .98)', 
          borderTop: '1px solid var(--hairline)' 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
            <div className="mono" style={{ color: 'var(--secondary)', letterSpacing: '.12em' }}>
              &copy; 2026 Prokhor Efimov / Fullstack AI-Driven Engineer
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
