import { useEffect, useRef } from 'react'

function cursorMode(target) {
  const element = target instanceof Element ? target : target?.parentElement
  if (!element) return 'default'
  const computed = getComputedStyle(element).cursor
  const interactive = element.closest('a, button, summary, [role="button"], [role="link"]')
  if (element.closest('[disabled], [aria-disabled="true"]') || computed === 'not-allowed') return 'not-allowed'
  if (element.closest('.email-copy')) return 'copy'
  if (element.closest('.photography-frame')) return 'zoom-in'
  if (computed === 'wait' || computed === 'progress') return 'wait'
  if (computed === 'text' || computed === 'vertical-text' || element.matches('input:not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]')) return 'text'
  if (computed === 'crosshair') return 'crosshair'
  if (computed === 'zoom-in' || computed === 'zoom-out') return computed
  if (computed === 'grabbing') return 'grabbing'
  if (computed === 'grab' || element.closest('[draggable="true"]')) return 'grab'
  if (computed === 'move') return 'move'
  if (computed === 'ew-resize' || computed === 'ns-resize' || computed === 'col-resize' || computed === 'row-resize') return 'resize'
  if (computed === 'help') return 'help'
  if (computed === 'copy') return 'copy'
  if (interactive || computed === 'pointer') return 'link'
  // Browsers report "auto" for ordinary selectable text, rather than "text"
  const selectable = getComputedStyle(element).userSelect !== 'none'
  const hasText = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
  if (selectable && !element.closest('svg') && (hasText || element.closest('p, h1, h2, h3, h4, li, blockquote, pre, code, figcaption'))) return 'text'
  return 'default'
}

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const burstRef = useRef(null)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const root = document.documentElement
    const cursor = cursorRef.current
    const burstLayer = burstRef.current
    let targetX = -100, targetY = -100
    let lastTarget = null
    let visible = false

    const setMode = (target) => {
      // Read the real CSS cursor before applying the native-cursor override
      root.classList.remove('custom-pointer-enabled')
      cursor.dataset.mode = cursorMode(target)
      if (visible) root.classList.add('custom-pointer-enabled')
    }
    const hide = () => {
      visible = false
      cursor.classList.remove('is-visible', 'is-down')
      root.classList.remove('custom-pointer-enabled')
      lastTarget = null
    }
    const emitBurst = (event) => {
      if (!burstLayer) return
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
    const move = (event) => {
      if (reduced.matches || event.pointerType !== 'mouse' || document.querySelector('dialog[open]') || event.target instanceof HTMLIFrameElement) return hide()
      targetX = event.clientX
      targetY = event.clientY
      if (lastTarget !== event.target) { setMode(event.target); lastTarget = event.target }
      cursor.style.transform = 'translate3d(' + targetX + 'px, ' + targetY + 'px, 0)'
      visible = true
      root.classList.add('custom-pointer-enabled')
      cursor.classList.add('is-visible')
    }
    const down = (event) => {
      if (reduced.matches || event.pointerType !== 'mouse') return hide()
      emitBurst(event)
      cursor.classList.add('is-down')
      setMode(event.target)
    }
    const up = (event) => { cursor.classList.remove('is-down'); if (visible) setMode(event.target) }
    const leave = (event) => { if (!event.relatedTarget) hide() }
    const visibility = () => { if (document.hidden) hide() }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    window.addEventListener('mouseout', leave, { passive: true })
    window.addEventListener('blur', hide)
    window.addEventListener('keydown', hide)
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', hide)
    return () => {
      hide()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('mouseout', leave)
      window.removeEventListener('blur', hide)
      window.removeEventListener('keydown', hide)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', hide)
      burstLayer?.replaceChildren()
    }
  }, [])
  return <>
    <div className="custom-cursor-bursts" ref={burstRef} aria-hidden="true" />
    <div className="custom-cursor" ref={cursorRef} data-mode="default" aria-hidden="true">
      <span className="custom-cursor-shell">
        <svg className="custom-cursor-glyph" viewBox="0 0 72 82" fill="none">
          <g className="cursor-glyph cursor-glyph-arrow">
            <path d="M6 8Q6 3 10 6L52 38Q58 43 51 44L34 45 24 63Q20 69 18 61Z" fill="#fafaff" stroke="#171923" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M27 52 32 42 43 41" stroke="#7586e9" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="cursor-glyph cursor-glyph-link">
            <path d="M27 42V13Q27 5 34 5T41 13V29Q45 23 50 29Q56 27 59 34Q65 34 65 42L62 62Q61 72 54 73H33Q27 72 24 66L12 46Q8 39 13 36T23 40Z" fill="#fafaff" stroke="#171923" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M41 30v12M50 31v12M59 36v9" stroke="#555966" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M35 65h18" stroke="#7586e9" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <g className="cursor-glyph cursor-glyph-text">
            <path d="M24 10Q36 10 36 18V61Q36 69 24 69M48 10Q36 10 36 18M48 69Q36 69 36 61" stroke="#171923" strokeWidth="8" strokeLinecap="round" />
            <path d="M24 10Q36 10 36 18V61Q36 69 24 69M48 10Q36 10 36 18M48 69Q36 69 36 61" stroke="#fafaff" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="cursor-glyph cursor-glyph-zoom-in cursor-glyph-zoom-out">
            <circle cx="32" cy="32" r="21" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path className="zoom-plus" d="M32 20v24M20 32h24M47 47l17 17" stroke="#172ce8" strokeWidth="5" />
            <path className="zoom-minus" d="M20 32h24M47 47l17 17" stroke="#172ce8" strokeWidth="5" />
          </g>
          <g className="cursor-glyph cursor-glyph-grab">
            <path d="M24 66 15 39q-3-10 4-12 5-1 8 8l4 10V15q0-7 5-7t4 7v26-30q0-7 4-7t4 7v29-24q0-6 4-6t4 7v25-16q0-6 4-6t4 7v24q0 17-15 27Z" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path d="M24 66 15 39q-3-10 4-12 5-1 8 8l4 10V15q0-7 5-7t4 7v26-30q0-7 4-7t4 7v29-24q0-6 4-6t4 7v25-16q0-6 4-6t4 7v24q0 17-15 27Z" stroke="#172ce8" strokeWidth="3" strokeDasharray="2 7" />
          </g>
          <g className="cursor-glyph cursor-glyph-wait">
            <circle cx="36" cy="39" r="24" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" strokeDasharray="8 6" />
            <path d="M36 25v15l10 7" stroke="#172ce8" strokeWidth="4" strokeLinecap="square" />
          </g>
          <g className="cursor-glyph cursor-glyph-crosshair">
            <circle cx="36" cy="39" r="18" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path d="M36 7v64M4 39h64" stroke="#172ce8" strokeWidth="3" strokeDasharray="8 5" />
            <circle cx="36" cy="39" r="4" fill="#f1f1f4" />
          </g>
          <g className="cursor-glyph cursor-glyph-not-allowed">
            <circle cx="36" cy="39" r="25" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path d="m19 22 34 34" stroke="#172ce8" strokeWidth="7" />
            <path d="m19 22 34 34" stroke="#f1f1f4" strokeWidth="2" />
          </g>
          <g className="cursor-glyph cursor-glyph-move">
            <path d="M36 6v66M4 39h64M36 6l-8 8m8-8 8 8M36 72l-8-8m8 8 8-8M4 39l8-8m-8 8 8 8M68 39l-8-8m8 8-8 8" stroke="#f1f1f4" strokeWidth="3" />
            <path d="M36 15v48M12 39h48" stroke="#172ce8" strokeWidth="4" />
          </g>
          <g className="cursor-glyph cursor-glyph-resize">
            <path d="M14 14h44v44H14z" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path d="m22 22 12 12m-12 0 12-12m14 14 12 12m-12 0 12-12" stroke="#172ce8" strokeWidth="4" />
          </g>
          <g className="cursor-glyph cursor-glyph-help">
            <circle cx="36" cy="39" r="26" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path d="M28 31q1-12 10-12 10 0 10 9 0 7-9 12v5M39 53v2" stroke="#172ce8" strokeWidth="4" strokeLinecap="square" />
          </g>
          <g className="cursor-glyph cursor-glyph-copy">
            <path d="M26 22h29v34H26zM17 31h-5v35h29v-10" fill="#08090d" stroke="#f1f1f4" strokeWidth="2" />
            <path d="M32 31h16M32 39h14M32 47h9" stroke="#172ce8" strokeWidth="3" />
          </g>
        </svg>
        <span className="cursor-glitch cursor-glitch-a" />
        <span className="cursor-glitch cursor-glitch-b" />
        <span className="cursor-glitch cursor-glitch-c" />
        <span className="cursor-glitch cursor-glitch-d" />
        <span className="cursor-glitch cursor-glitch-e" />
      </span>
    </div>
  </>
}
