import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function RechargeSection() {
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Trigger animation immediately when section comes into view
          setIsVisible(true)
        } else {
          // Reset animation when section goes out of view
          setIsVisible(false)
        }
      },
      { 
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before section is fully in view
      }
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
                objectPosition: 'center center',
                animationDelay: '0.3s'
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
