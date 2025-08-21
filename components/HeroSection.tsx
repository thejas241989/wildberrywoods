import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Import slider dynamically to avoid SSR issues
const HeroParallaxSlider = dynamic(() => import('./HeroParallaxSlider'), { ssr: false })

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
    <>
      {/* Replace static header content with parallax slider (dynamic import) */}
      <HeroParallaxSlider />

      {/*
      <header id="home" className={`header ${videoLoaded ? 'video-loaded' : ''}`}>
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
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
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
        </div>
      </header>
      */}
    </>
  )
}
