import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function RechargeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('recharge')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section className="recharge-section" id="recharge">
      {/* Decorative elements */}
      <div className="deco-element deco-01"></div>
      <div className="deco-element deco-02"></div>
      <div className="deco-element deco-03"></div>
      <div className="deco-element deco-04"></div>
      <div className="deco-element deco-05"></div>
      
      <div className="container">
        <h2 className={`section-title ${isVisible ? 'animate' : ''}`}>
          TO REJUVENATE
        </h2>
      </div>
      
      <div className="resort-container">
        <div className="resort-layout">
          {/* Left side - Image */}
          <div ref={imageRef} className={`resort-image-container ${isVisible ? 'animate' : ''}`}>
            <Image
              src="/aboutus2.png"
              alt="Wild Berry Wood aerial view"
              fill
              className="resort-image"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center'
              }}
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className={`resort-content ${isVisible ? 'animate' : ''}`}>
            <div className="resort-text">
              <p>
                Wild Berry Wood is a boutique property with tranquil valley views in the rural village of Charlevoix, just outside of Quebec City.
              </p>
              
              <p>
                It is attuned to the surrounding environment through a thoughtful design that respects Quebec&apos;s rich artistry and cultural heritage.
              </p>
            </div>
            
            <button className="read-story-btn">
              READ THE STORY
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
