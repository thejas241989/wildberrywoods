import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Amenity {
  id: number
  name: string
  image: string
}

const amenities: Amenity[] = [
  {
    id: 1,
    name: 'Cozy Fireplace',
    image: '/Slider1.png'
  },
  {
    id: 2,
    name: 'Forest Views',
    image: '/Slider2.png'
  },
  {
    id: 3,
    name: 'Relaxation Area',
    image: '/Slider3.png'
  },
  {
    id: 4,
    name: 'Modern Kitchen',
    image: '/Slider4.png'
  },
  {
    id: 5,
    name: 'Comfortable Bedroom',
    image: '/aboutus1.png'
  },
  {
    id: 6,
    name: 'Living Space',
    image: '/aboutus2.png'
  }
]

export default function AmenitiesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.getAttribute('data-id') || '0')
            setVisibleItems(prev => [...prev, itemId])
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = document.querySelectorAll('.amenity-item')
    items.forEach(item => observer.observe(item))

    return () => {
      items.forEach(item => observer.unobserve(item))
    }
  }, [])

  return (
    <section className="amenities-section" id="amenities">
      <div className="container">
        <h2 className="section-title animate">
          A m e n i t i e s
        </h2>
        <div className="amenities-grid">
          {amenities.map((amenity, index) => (
            <div
              key={amenity.id}
              className={`amenity-item ${visibleItems.includes(amenity.id) ? 'animate' : ''}`}
              data-id={amenity.id}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Image
                src={amenity.image}
                alt={amenity.name}
                width={440}
                height={610}
                className="amenity-image"
              />
              <div className="amenity-label">
                <span className="amenity-number">{amenity.id}</span>
                <span className="amenity-name">{amenity.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
