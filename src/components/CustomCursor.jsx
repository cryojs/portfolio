import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const burstRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const burstLayer = burstRef.current

    const emitBurst = (event) => {
      if (!burstLayer || reduced.matches) return

      const burst = document.createElement('span')
      burst.className = 'cursor-burst'
      burst.style.left = event.clientX + 'px'
      burst.style.top = event.clientY + 'px'

      const sparkCount = 4 + Math.floor(Math.random() * 3)
      for (let index = 0; index < sparkCount; index += 1) {
        const spark = document.createElement('i')
        spark.className = 'cursor-spark'
        spark.style.setProperty('--angle', (Math.random() * 360) + 'deg')
        spark.style.setProperty('--distance', (12 + Math.random() * 11) + 'px')
        spark.style.setProperty('--length', (6 + Math.random() * 7) + 'px')
        spark.style.setProperty('--spark-opacity', (.65 + Math.random() * .28).toFixed(2))
        spark.style.setProperty('--delay', Math.random() * .03 + 's')
        burst.append(spark)
      }

      const pixelCount = 1 + Math.floor(Math.random() * 2)
      for (let index = 0; index < pixelCount; index += 1) {
        const pixel = document.createElement('i')
        pixel.className = 'cursor-pixel'
        pixel.style.setProperty('--angle', (Math.random() * 360) + 'deg')
        pixel.style.setProperty('--distance', (8 + Math.random() * 15) + 'px')
        pixel.style.setProperty('--delay', Math.random() * .04 + 's')
        burst.append(pixel)
      }

      burstLayer.append(burst)
      burst.addEventListener('animationend', () => burst.remove(), { once: true })
    }

    const down = (event) => {
      if (event.pointerType !== 'mouse') return
      emitBurst(event)
    }

    window.addEventListener('pointerdown', down, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', down)
      burstLayer?.replaceChildren()
    }
  }, [])

  return <div className="custom-cursor-bursts" ref={burstRef} aria-hidden="true" />
}
