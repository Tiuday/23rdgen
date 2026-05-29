'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top  = `${ringY}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const expandRing = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (t?.closest('a, button, [role="button"]') && ringRef.current) {
        ringRef.current.style.width  = '44px'
        ringRef.current.style.height = '44px'
        ringRef.current.style.background = 'rgba(124,106,158,0.1)'
        ringRef.current.style.borderColor = 'rgba(124,106,158,0.9)'
      }
    }
    const collapseRing = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (t?.closest('a, button, [role="button"]') && ringRef.current) {
        ringRef.current.style.width  = '28px'
        ringRef.current.style.height = '28px'
        ringRef.current.style.background = 'transparent'
        ringRef.current.style.borderColor = 'rgba(124,106,158,0.5)'
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', expandRing)
    document.addEventListener('mouseout', collapseRing)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', expandRing)
      document.removeEventListener('mouseout', collapseRing)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      style={{
        position: 'fixed',
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: '1.5px solid rgba(124,106,158,0.5)',
        background: 'transparent',
        pointerEvents: 'none',
        zIndex: 9998,
        top: 0,
        left: 0,
        transform: 'translate(-50%,-50%)',
        transition: 'width 200ms ease, height 200ms ease, background 200ms ease, border-color 200ms ease',
      }}
    />
  )
}
