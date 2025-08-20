import Image from 'next/image'

const galleryImages = [
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=350&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=450&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=550&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop'
]

export default function GallerySection() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <h2 className="section-title animate">
          G a l l e r y
        </h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={400}
                height={420}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
