import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.add('loaded')
      setIsLoaded(true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleLoad()
      }
    }

    window.addEventListener('load', handleLoad)
    document.addEventListener('keydown', handleKeyDown)

    // Auto-hide after 3 seconds
    const timer = setTimeout(handleLoad, 3000)

    return () => {
      window.removeEventListener('load', handleLoad)
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timer)
    }
  }, [])

  if (isLoaded) return null

  return (
    <div id="preloader">
      <Image 
        src="/logo1.svg" 
        alt="Wild Berry Wood logo" 
        width={140}
        height={140}
        className="preloader-logo" 
      />
    </div>
  )
}
