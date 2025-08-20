import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open and restore on close
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMenu()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isMobileMenuOpen])

  const openMenu = () => {
    setIsMobileMenuOpen(true)
    // move focus to first link for accessibility after opening
    setTimeout(() => firstLinkRef.current?.focus(), 300)
  }

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
    // Prevent visual transition glitch by temporarily disabling transitions
    const btn = hamburgerRef.current
    if (btn) {
      btn.classList.add('no-transition')
      // restore focus after a short delay and re-enable transitions
      setTimeout(() => {
        try {
          btn.classList.remove('no-transition')
          btn.focus()
        } catch (e) {
          // ignore
        }
      }, 60)
    }
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) closeMenu()
    else openMenu()
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
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* regular nav-links removed; hamburger-only menu */}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal={isMobileMenuOpen}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

        {/* Close button (X) */}
        <button
          className="mobile-close"
          onClick={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>

        <div className="relative h-full flex flex-col justify-center items-center space-y-8">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={closeMenu}
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
