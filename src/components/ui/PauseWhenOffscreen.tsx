'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Wraps content whose CSS animations should stop running while it is scrolled
 * out of view. CSS `infinite` animations keep repainting forever even when
 * off-screen; this toggles a class that pauses every descendant animation
 * (via `animation-play-state: paused`, see `.anim-offscreen-paused` in
 * globals.css) whenever the block leaves the viewport.
 */
export default function PauseWhenOffscreen({
  children,
  className = '',
  rootMargin = '200px 0px',
}: {
  children: React.ReactNode
  className?: string
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin, threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={`${className} ${visible ? '' : 'anim-offscreen-paused'}`}>
      {children}
    </div>
  )
}
