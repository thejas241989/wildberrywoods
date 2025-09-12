// Smooth scroll utility with performance optimizations
export const smoothScrollTo = (elementId: string, offset: number = 150) => {
  const element = document.getElementById(elementId.replace('#', ''));
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  // Use requestAnimationFrame for smooth scrolling with better performance
  let start: number | null = null;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800; // 800ms for smooth scrolling

  const smoothStep = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    
    // Easing function for smooth animation
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (progress < 1) {
      requestAnimationFrame(smoothStep);
    }
  };

  requestAnimationFrame(smoothStep);
};

// Smooth scroll to top utility
export const scrollToTop = (duration: number = 800) => {
  let start: number | null = null;
  const startPosition = window.pageYOffset;

  const smoothStep = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    
    // Easing function for smooth animation
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    
    window.scrollTo(0, startPosition * (1 - ease));
    
    if (progress < 1) {
      requestAnimationFrame(smoothStep);
    }
  };

  requestAnimationFrame(smoothStep);
};

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Optimized intersection observer with better performance
export const createOptimizedIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Performance monitoring utility
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Image lazy loading with performance optimization
export const optimizeImage = (img: HTMLImageElement) => {
  // Add loading="lazy" for native lazy loading
  img.loading = 'lazy';
  
  // Add decoding="async" for better performance
  img.decoding = 'async';
  
  // Set proper sizes for responsive images
  if (!img.sizes && img.dataset.sizes) {
    img.sizes = img.dataset.sizes;
  }
};

// Preload critical resources
export const preloadCriticalResources = (customResources?: string[]) => {
  if (typeof window === 'undefined') return;

  // Preload custom resources if provided
  if (customResources) {
    customResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      // Determine resource type based on file extension
      if (resource.includes('.mp4') || resource.includes('.webm')) {
        link.as = 'video';
      } else if (resource.includes('.jpg') || resource.includes('.png') || resource.includes('.webp') || resource.includes('.svg')) {
        link.as = 'image';
      } else if (resource.includes('.woff') || resource.includes('.woff2')) {
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      } else {
        link.as = 'fetch';
        link.crossOrigin = 'anonymous';
      }
      
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/system-ui.woff2',
    '/fonts/helvetica-neue.woff2'
  ];

  fontPreloads.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = font;
    document.head.appendChild(link);
  });

  // Preload hero video
  const videoLink = document.createElement('link');
  videoLink.rel = 'preload';
  videoLink.as = 'video';
  videoLink.href = '/homepage video1.mp4';
  document.head.appendChild(videoLink);
};
