import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Lightbox = ({ images, currentIndex, isOpen, onClose, onNext, onPrevious }: LightboxProps) => {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Prevent body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  useEffect(() => {
    // Focus the lightbox when it opens for accessibility
    if (isOpen && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="lightbox-overlay"
      onClick={onClose}
      ref={lightboxRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery lightbox"
    >
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button 
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          ×
        </button>

        {/* Previous button */}
        <button 
          className="lightbox-nav lightbox-prev"
          onClick={onPrevious}
          aria-label="Previous image"
          disabled={images.length <= 1}
        >
          &#8249;
        </button>

        {/* Main image */}
        <div className="lightbox-image-container">
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1200}
            height={800}
            className="lightbox-image"
            priority
          />
        </div>

        {/* Next button */}
        <button 
          className="lightbox-nav lightbox-next"
          onClick={onNext}
          aria-label="Next image"
          disabled={images.length <= 1}
        >
          &#8250;
        </button>

        {/* Image counter */}
        <div className="lightbox-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
