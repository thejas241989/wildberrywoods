import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AttractionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="attractions-section" id="attractions" ref={sectionRef}>
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'animate' : ''}`}>
          A t t r a c t i o n s
        </h2>
        <p className="attractions-intro">
          Discover the natural beauty and rich culture of Charlevoix region. Wild Berry Wood is perfectly positioned to explore the best that Quebec has to offer, from charming villages to breathtaking mountain landscapes.
        </p>
        
        <div className="attractions-grid">
          <div className={`attraction-category ${isVisible ? 'animate' : ''}`}>
            <div className="category-icon">
              <div style={{ fontSize: '60px', color: '#4a7c59' }}>🏘️</div>
            </div>
            <h3>N e a r b y  c i t i e s</h3>
            <ul>
              <li>1 2  k m  f r o m  B a i e - S a i n t - P a u l</li>
              <li>1 0 5  k m  f r o m  Q u e b e c  C i t y</li>
            </ul>
          </div>
          
          <div className={`attraction-category ${isVisible ? 'animate' : ''}`}>
            <div className="category-icon">
              <div style={{ fontSize: '60px', color: '#4a7c59' }}>🎯</div>
            </div>
            <h3>A c t i v i t i e s  &  D i s c o v e r i e s</h3>
            <ul>
              <li>5  k m  f r o m  t h e  w h a r f  t o w a r d s  Î l e - a u x - C o u d r e s</li>
              <li>3 0  k m  f r o m  t h e  F a i r m o n t  M a n o i r  R i c h e l i e u  g o l f  c o u r s e</li>
              <li>3 0  k m  f r o m  t h e  C a s i n o  d e  C h a r l e v o i x</li>
            </ul>
          </div>
          
          <div className={`attraction-category ${isVisible ? 'animate' : ''}`}>
            <div className="category-icon">
              <div style={{ fontSize: '60px', color: '#4a7c59' }}>🏔️</div>
            </div>
            <h3>M o u n t a i n s  &  h i k e s</h3>
            <ul>
              <li>P e d e s t r i a n  p a t h s  f r o m  t h e  r e s i d e n c e</li>
              <li>3 5  k m  f r o m  t h e  M a s s i f  d e  C h a r l e v o i x</li>
              <li>4 0  k m  f r o m  M o n t  G r a n d - F o n d s</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
