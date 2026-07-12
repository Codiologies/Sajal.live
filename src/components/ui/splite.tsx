'use client'

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  /** Static image shown instead of the live WebGL scene on mobile / reduced-motion. */
  poster?: string
}

const Loader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <span className="loader"></span>
  </div>
)

/**
 * Renders the Spline 3D scene ONLY when it makes sense to:
 *  - On phones we NEVER load WebGL (it tanks mobile GPUs) — we show a static
 *    poster image instead.
 *  - For users who prefer reduced motion, same static poster.
 *  - On capable screens it mounts only while near the viewport and unmounts
 *    once scrolled far away, so it never renders off-screen.
 */
export function SplineScene({ scene, className, poster = '/robot-poster.webp' }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [useStatic, setUseStatic] = useState(true) // default to the cheap path until we know

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isMobile || reducedMotion) {
      setUseStatic(true)
      return
    }
    setUseStatic(false)

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // Generous margin so it mounts just before it's visible and only
      // unmounts once well out of view (avoids remount thrash while scrolling).
      { rootMargin: '400px 0px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      {useStatic ? (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      ) : active ? (
        <Suspense fallback={<Loader />}>
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
        <div className="w-full h-full" aria-hidden="true" />
      )}
    </div>
  )
}
