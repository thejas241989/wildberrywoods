import { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hidePreloader = () => {
      setIsVisible(false);
    };

    // Minimum 3 seconds display time
    const minTime = setTimeout(() => {
      if (document.readyState === 'complete') {
        hidePreloader();
      } else {
        const handleLoad = () => {
          hidePreloader();
          window.removeEventListener('load', handleLoad);
        };
        window.addEventListener('load', handleLoad);
      }
    }, 3000);

    // Cleanup function
    return () => {
      clearTimeout(minTime);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div id="preloader">
      <div className="preloader-container">
        <Image
          src="/logo1.svg"
          alt="Wild Berry Wood"
          width={120}
          height={120}
          className="preloader-logo"
          priority
        />
        <div className="preloader-spinner"></div>
      </div>
    </div>
  );
};

export default Preloader;
