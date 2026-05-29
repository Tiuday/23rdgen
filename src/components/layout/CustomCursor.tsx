'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
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
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`
        dotRef.current.style.top = `${mouseY}px`
      }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const expandRing = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(0)'
      if (ringRef.current) {
        ringRef.current.style.width = '48px'
        ringRef.current.style.height = '48px'
        ringRef.current.style.background = 'rgba(124,106,158,0.15)'
      }
    }
    const collapseRing = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current) {
        ringRef.current.style.width = '28px'
        ringRef.current.style.height = '28px'
        ringRef.current.style.background = 'transparent'
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (t?.closest('a, button')) expandRing()
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null
      if (t?.closest('a, button')) collapseRing()
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#7C6A9E',
          pointerEvents: 'none',
          zIndex: 9999,
          top: 0,
          left: 0,
          transform: 'translate(-50%,-50%)',
          filter: 'drop-shadow(0 0 8px rgba(124,106,158,0.8))',
          transition: 'transform 80ms ease',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(124,106,158,0.7)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          top: 0,
          left: 0,
          transform: 'translate(-50%,-50%)',
          transition: 'width 200ms ease, height 200ms ease, background 200ms ease',
        }}
      />
    </>
  )
}
