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
    name: 'Fireplace',
    image: 'https://images.prismic.io/villa-canopee/a0720282-3b2d-46ad-ab9b-8a41885a7a17_1-foyer-exterieur.jpg?auto=compress,format&rect=0,0,883,1224&w=440&h=610'
  },
  {
    id: 2,
    name: 'River view',
    image: 'https://images.prismic.io/villa-canopee/1262259d-e308-4c59-a760-61af9dd39455_2-vue-fleuve.jpg?auto=compress,format&rect=0,0,883,1224&w=440&h=610'
  },
  {
    id: 3,
    name: 'Spa',
    image: 'https://images.prismic.io/villa-canopee/c2b8b8b3-8c2f-4f4e-9d5b-1234567890ab_3-spa.jpg?auto=compress,format&rect=0,0,883,1224&w=440&h=610'
  },
  {
    id: 4,
    name: 'Kitchen',
    image: 'https://images.prismic.io/villa-canopee/d3c9c9c4-9d3f-5f5f-ae6c-2345678901bc_4-cuisine.jpg?auto=compress,format&rect=0,0,883,1224&w=440&h=610'
  },
  {
    id: 5,
    name: 'Bedroom',
    image: 'https://images.prismic.io/villa-canopee/e4dadad5-ae4f-6f6f-bf7d-3456789012cd_5-chambre.jpg?auto=compress,format&rect=0,0,883,1224&w=440&h=610'
  },
  {
    id: 6,
    name: 'Living Room',
    image: 'https://images.prismic.io/villa-canopee/f5ebebeb-bf5f-7f7f-cf8e-456789abcdef_6-salon.jpg?auto=compress,format&rect=0,0,883,1224&w=440&h=610'
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
      {/* Decorative elements */}
      <div className="deco-element deco-01"></div>
      <div className="deco-element deco-02"></div>
      <div className="deco-element deco-03"></div>
      <div className="deco-element deco-04"></div>
      <div className="deco-element deco-05"></div>
      
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
