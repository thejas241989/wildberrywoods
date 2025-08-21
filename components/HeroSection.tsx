import { useEffect, useState, useRef } from 'react'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      const video = videoRef.current
      
      // Optimize video for smooth looping
      video.playbackRate = 1.0 // Ensure normal playback speed
      
      // Handle seamless looping
      const handleTimeUpdate = () => {
        // Smooth transition near the end
        if (video.duration - video.currentTime < 0.05) {
          video.style.filter = 'brightness(0.98)'
        } else {
          video.style.filter = 'brightness(1)'
        }
      }

      video.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoLoaded])

  const handleVideoLoad = () => {
    setVideoLoaded(true)
    
    // Additional optimization for smooth playback
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0
    }
  }

  return (
    <header id="home" className={`header ${videoLoaded ? 'video-loaded' : ''}`}>
      {/* Video Background */}
      <video 
        ref={videoRef}
        className="hero-video" 
        autoPlay 
        muted 
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoLoad}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
      
      {/* Video Overlay */}
      <div className="video-overlay"></div>

      {/* Decorative elements */}
      <div className="deco-element deco-01"></div>
      <div className="deco-element deco-02"></div>
      <div className="deco-element deco-03"></div>
      <div className="deco-element deco-04"></div>
      <div className="deco-element deco-05"></div>

      <div className="header-content">
        <div className="hero-section">
          <h1 className={`hero-title ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Peaceful Retreat
          </h1>

          <h2 className={`hero-subtitle ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            The forest on your doorstep.
          </h2>

          <p className={`hero-description ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Come discover this haven of peace on a short trip away from home, or for a longer stay
          </p>
        </div>

        {/* Scroll indicator */}
        <a href="#recharge" className="scroll-indicator" aria-label="Scroll to About section">
          <svg className="mouse-icon" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
            <rect x="1.5" y="1.5" width="21" height="31" rx="11" ry="11" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle className="mouse-wheel" cx="12" cy="9" r="1.6" fill="currentColor" />
          </svg>
          <span className="scroll-text">Scroll Down</span>
        </a>
      </div>
    </header>
  )
}
