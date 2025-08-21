import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/bundle'
import 'swiper/css/bundle'

const slides = [
  { type: 'video', src: '/homepage video1.mp4' },
  { type: 'image', src: '/Slider1.png' },
  { type: 'image', src: '/Slider2.png' },
  { type: 'image', src: '/Slider3.png' },
  { type: 'image', src: '/Slider4.png' },
]

export default function HeroParallaxSlider() {
  const swiperRef = useRef<any>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Manage slide behavior: video plays on first slide, other slides autoplay with 3s
  useEffect(() => {
    const swiper = swiperRef.current
    const video = videoRef.current
    if (!swiper) return

    const handleSlideChange = () => {
      const idx = typeof swiper.realIndex === 'number' ? swiper.realIndex : swiper.activeIndex

      if (idx === 0) {
        // On video slide: stop swiper autoplay and play video
        try { swiper.autoplay && swiper.autoplay.stop() } catch (e) {}
        if (video) {
          try {
            video.currentTime = 0
            const p = video.play()
            if (p && typeof p.then === 'function') p.catch(() => {})
          } catch (e) {}
        }
      } else {
        // From 2nd slide onwards: ensure video is paused and start autoplay (3s)
        if (video && !video.paused) {
          try { video.pause() } catch (e) {}
        }
        if (swiper.params) {
          swiper.params.autoplay = { delay: 3000, disableOnInteraction: false }
        }
        try { swiper.autoplay && swiper.autoplay.start() } catch (e) {}
      }
    }

    swiper.on('slideChange', handleSlideChange)

    // initialize behavior for the starting slide
    handleSlideChange()

    return () => {
      try { swiper.off('slideChange', handleSlideChange) } catch (e) {}
    }
  }, [])

  // When the video ends, advance to the next slide and start autoplay
  useEffect(() => {
    const video = videoRef.current
    const swiper = swiperRef.current
    if (!video || !swiper) return

    const onEnded = () => {
      try {
        swiper.slideNext()
        if (swiper.params) swiper.params.autoplay = { delay: 3000, disableOnInteraction: false }
        swiper.autoplay && swiper.autoplay.start()
      } catch (e) {}
    }

    // Set video playback rate to slow it down slightly
    const onLoadedData = () => {
      video.playbackRate = 0.8 // 80% of normal speed
    }

    video.addEventListener('ended', onEnded)
    video.addEventListener('loadeddata', onLoadedData)
    
    // If video is already loaded, set playback rate immediately
    if (video.readyState >= 2) {
      video.playbackRate = 0.8
    }
    
    return () => {
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('loadeddata', onLoadedData)
    }
  }, [])

  return (
    <section className="hero-swiper-wrapper" aria-label="Homepage hero slider">
      <Swiper
        speed={1000}
        loop
        parallax
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper"
        onSwiper={(sw) => { swiperRef.current = sw }}
      >
        <div slot="container-start" className="parallax-overlay" data-swiper-parallax="-200" />

        {slides.map((s, idx) => (
          <SwiperSlide key={idx} className="hero-slide">
            {s.type === 'video' ? (
              <>
                <div className="slide-bg" style={{ backgroundColor: '#000' }} data-swiper-parallax="-30%" />
                <video
                  ref={videoRef}
                  src={s.src}
                  className="hero-video"
                  playsInline
                  muted
                  controls={false}
                />
              </>
            ) : (
              <>
                <div
                  className="slide-bg"
                  style={{ backgroundImage: `url(${s.src})` }}
                  data-swiper-parallax="-30%"
                />
              </>
            )}
            
            {/* Hero content only for video slide (first slide) */}
            {s.type === 'video' && (
              <div className="header-content">
                <div className="hero-section">
                  <h1 className="hero-title">
                    Peaceful Retreat
                  </h1>
                  <h2 className="hero-subtitle">
                    The forest on your doorstep.
                  </h2>
                  <p className="hero-description">
                    Come discover this haven of peace on a short trip away from home, or for a longer stay
                  </p>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll indicator with mouse animation */}
      <a href="#recharge" className="scroll-indicator" aria-label="Scroll down to recharge section">
        <svg 
          className="mouse-icon" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M12 3C8.686 3 6 5.686 6 9v6c0 3.314 2.686 6 6 6s6-2.686 6-6V9c0-3.314-2.686-6-6-6zm0 2c2.21 0 4 1.79 4 4v6c0 2.21-1.79 4-4 4s-4-1.79-4-4V9c0-2.21 1.79-4 4-4zm0 2c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1s1-.448 1-1v-2c0-.552-.448-1-1-1z"
          />
        </svg>
        <span className="scroll-text">Scroll Down</span>
      </a>
    </section>
  )
}
