import { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import AI from './components/AI';
import About from './components/About';
import Stack from './components/Stack';
import Contacts from './components/Contacts';
import ThreeScene from './components/ThreeScene';
import ParallaxBackground from './components/ParallaxBackground';

import profileData from './data/profile.json';
import aiData from './data/ai.json';
import aboutData from './data/about.json';
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
      
      <div className="main-wrapper">
        <Hero data={profileData} />
        <main>
          <Stack data={stackData} />
          <AI data={aiData} />
          <About data={aboutData} />
          <Contacts data={contactsData} />
        </main>
        <footer className="site-footer">
          <div className="footer-container">
            <div className="mono footer-text">
              &copy; 2026 Prohor Efimov / {profileData.label}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
