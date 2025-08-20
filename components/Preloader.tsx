import { useEffect, useState } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ALWAYS show for exactly 3 seconds, regardless of page load time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Then fully hide after fade animation
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Match CSS transition duration
    }, 3000); // Exactly 3 seconds, no matter what

    // Failsafe: Force hide after 4 seconds maximum (3s + 1s buffer)
    const failsafeTimer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
    }, 4000);

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearTimeout(failsafeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div id="preloader" className={!isLoading ? 'fade-out' : ''}>
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
