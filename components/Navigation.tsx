import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#recharge' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Attractions', href: '#attractions' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand">
          <Image
            src="/logo1.svg"
            alt="Wild Berry Wood logo"
            width={100}
            height={100}
            className="site-logo"
          />
        </div>

        <button
          onClick={toggleMobileMenu}
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
        <div className="relative h-full flex flex-col justify-center items-center space-y-8">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl lg:text-3xl text-white font-light tracking-wider uppercase hover:scale-105 transition-transform duration-200"
              style={{
                animationDelay: isMobileMenuOpen ? `${index * 0.1}s` : '0s',
                animation: isMobileMenuOpen ? 'fadeInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
