import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/bundle'
import 'swiper/css/bundle'

const slides = [
  { src: '/aboutus2.png', title: 'Peaceful Retreat', subtitle: 'Find calm in nature' },
  { src: '/aboutus1.png', title: 'Cozy Cottages', subtitle: 'Comfort & charm' },
  { src: '/aboutus.png', title: 'Forest Walks', subtitle: 'Explore nearby trails' },
]

export default function HeroParallaxSlider() {
  return (
    <section className="hero-swiper-wrapper" aria-label="Homepage hero slider">
      <Swiper
        speed={1000}
        loop
        parallax
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper"
      >
        <div slot="container-start" className="parallax-overlay" data-swiper-parallax="-200" />

        {slides.map((s, idx) => (
          <SwiperSlide key={idx} className="hero-slide">
            <div
              className="slide-bg"
              style={{ backgroundImage: `url(${s.src})` }}
              data-swiper-parallax="-30%"
            />
            <div className="slide-content" data-swiper-parallax="-400">
              <h1 className="slide-title">{s.title}</h1>
              <p className="slide-sub">{s.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
