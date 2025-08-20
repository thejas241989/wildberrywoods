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
      {/* Decorative elements */}
      <div className="deco-element deco-01"></div>
      <div className="deco-element deco-02"></div>
      <div className="deco-element deco-03"></div>
      <div className="deco-element deco-04"></div>
      <div className="deco-element deco-05"></div>
      
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'animate' : ''}`}>
          A t t r a c t i o n s
        </h2>
        <p className="attractions-intro">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <div className="attractions-grid">
          <div className={`attraction-category ${isVisible ? 'animate' : ''}`}>
            <div className="category-icon">
              <Image 
                src="https://villa-canopee.cdn.prismic.io/villa-canopee/c83407f4-f3bb-4668-a9c7-41e76e62ce18_icon-villes.svg" 
                alt="Cities icon"
                width={60}
                height={60}
              />
            </div>
            <h3>N e a r b y  c i t i e s</h3>
            <ul>
              <li>1 2  k m  f r o m  B a i e - S a i n t - P a u l</li>
              <li>1 0 5  k m  f r o m  Q u e b e c  C i t y</li>
            </ul>
          </div>
          
          <div className={`attraction-category ${isVisible ? 'animate' : ''}`}>
            <div className="category-icon">
              <Image 
                src="https://villa-canopee.cdn.prismic.io/villa-canopee/0e4a2b12-e7b2-4376-8ec1-c538dc9d6b80_icon-decouvertes.svg" 
                alt="Activities icon"
                width={60}
                height={60}
              />
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
              <Image 
                src="https://villa-canopee.cdn.prismic.io/villa-canopee/2331bf73-8968-45e4-b1fb-460dfeab4b78_icon-montagnes.svg" 
                alt="Mountains icon"
                width={60}
                height={60}
              />
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
