import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function RechargeSection() {
  const [isVisible, setIsVisible] = useState(false)

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
          T o &nbsp;&nbsp; r e c h a r g e
        </h2>
        <div className="recharge-content">
          <div className="recharge-text">
            <p className={isVisible ? 'animate' : ''}>
              T h i s  s u p e r b  h o m e  s i t s  o n  a n  e x c e p t i o n a l  t r a c t  o f  l a n d  b e t w e e n  m o u n t a i n  a n d  r i v e r ,  i n  o n e  o f  t h e  l o v e l i e s t  t o w n s  i n  Q u é b e c .  O f f e r i n g  b r e a t h t a k i n g  v i e w s  o f  t h e  S t .  L a w r e n c e  R i v e r ,  I l e - a u x - C o u d r e s  a n d  L e s  É b o u l e m e n t s  v i l l a g e ,  h e r e  y o u  c a n  a d m i r e  t h e  m o s t  b e a u t i f u l  s u n s e t s  i n  Q u e b e c  w h i l e  r e l a x i n g  a r o u n d  t h e  f i r e p l a c e  o r  i n  t h e  s p a .
            </p>
            <p className={isVisible ? 'animate' : ''}>
              L o c a t e d  i n  o n e  o f  t h e  m o s t  b e a u t i f u l  v i l l a g e s  i n  Q u e b e c ,  t h i s  s u p e r b  v i l l a  i s  a  r e s i d e n c e  b u i l t  o n  e x c e p t i o n a l  l a n d  b e t w e e n  m o u n t a i n  a n d  r i v e r .
            </p>
          </div>
          <div className="recharge-images">
            <Image
              src="https://images.prismic.io/villa-canopee/917f3cc5-52aa-43f2-820d-4603752343c3_maison-villa-canopee.jpg?auto=compress,format&rect=0,0,1200,1200&w=1000&h=1000"
              alt="Wild Berry Wood exterior"
              width={1000}
              height={1000}
              className="main-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
