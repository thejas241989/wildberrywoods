import { useEffect, useRef, useState, useMemo } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  once?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const { threshold = 0.25, rootMargin = '0px', once = true } = options

  const observerOptions = useMemo(
    () => ({
      threshold,
      rootMargin,
    }),
    [threshold, rootMargin]
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersectingNow = entry.isIntersecting
        setIsIntersecting(isIntersectingNow)

        if (isIntersectingNow && !hasIntersected) {
          setHasIntersected(true)
          if (once) {
            observer.disconnect()
          }
        }
      },
      observerOptions
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [observerOptions, hasIntersected, once])

  return {
    elementRef,
    isIntersecting: once ? hasIntersected : isIntersecting,
    hasIntersected,
  }
}
