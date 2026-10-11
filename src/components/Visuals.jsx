import { useEffect, useLayoutEffect, useRef } from 'react'

export function PixelObject({ object }) {
  return <img className="pixel-object" src={`/objects/${object}.png`} alt="" width="512" height="512" draggable="false" />
}

export function FloatingLinks({ items }) {
  const field = useRef(null)
  function illuminate(event) {
    const link = event.target.closest('.floating-link')
    if (!link) return
    const parent = field.current.getBoundingClientRect()
    const rect = link.getBoundingClientRect()
    field.current.style.setProperty('--light-x', `${rect.left - parent.left + rect.width / 2}px`)
    field.current.style.setProperty('--light-y', `${rect.top - parent.top + rect.height / 2}px`)
  }
  return <nav className="floating-links" aria-label="Explore my portfolio" ref={field} onPointerOver={illuminate} onFocus={illuminate}>
    <svg className="link-ribbon" viewBox="0 0 500 440" fill="none" aria-hidden="true"><defs><linearGradient id="home-light"><stop stopColor="#295d9b" stopOpacity="0"/><stop offset=".5" stopColor="#73c5ff"/><stop offset="1" stopColor="#366cba" stopOpacity="0"/></linearGradient></defs><path d="M-40 335C175 365 126 3 330 117S416 470 550 225" stroke="url(#home-light)" strokeWidth="1.5"/><path d="M-40 335C175 365 126 3 330 117S416 470 550 225" stroke="url(#home-light)" strokeWidth="26" opacity=".12" className="ribbon-glow"/></svg>
    <span className="shared-light" aria-hidden="true" />
    {items.map(item => <a href={`#${item.id}`} key={item.id} className={`floating-link floating-link--${item.id}`}>
      <span className="floating-art"><PixelObject object={item.object}/><span className="hover-orbit" aria-hidden="true"><i /></span></span>
      <span className="floating-label">{item.label} <span aria-hidden="true">↗</span></span>
      <span className="floating-description">{item.preview}</span>
    </a>)}
  </nav>
}

export function PointerLight() {
  const lightRef = useRef(null)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = null
    let x = 0, y = 0, targetX = 0, targetY = 0
    const light = lightRef.current
    const hide = () => { light.classList.remove('is-visible'); cancelAnimationFrame(frame); frame = null }
    const reset = () => { hide(); document.documentElement.classList.remove('mouse-pointer') }
    const draw = () => {
      x += (targetX - x) * .24
      y += (targetY - y) * .24
      light.style.transform = `translate3d(${x}px, ${y}px, 0)`
      frame = Math.abs(x - targetX) + Math.abs(y - targetY) > .2 ? requestAnimationFrame(draw) : null
    }
    const move = event => {
      // Actual input modality also handles laptops/tablets whose primary pointer is touch.
      if (reduced.matches || event.pointerType !== 'mouse') return reset()
      document.documentElement.classList.add('mouse-pointer')
      targetX = event.clientX; targetY = event.clientY
      if (!light.classList.contains('is-visible')) { x = targetX; y = targetY }
      light.classList.add('is-visible')
      light.classList.toggle('is-link', !!event.target.closest('a, button, summary'))
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const visibility = () => { if (document.hidden) reset() }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', reset)
    window.addEventListener('keydown', reset)
    window.addEventListener('pointerdown', eventDown)
    window.addEventListener('scroll', hide, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', reset)
    function eventDown(event) { if (event.pointerType !== 'mouse') reset() }
    return () => {
      reset(); window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', reset); window.removeEventListener('scroll', hide)
      window.removeEventListener('keydown', reset); window.removeEventListener('pointerdown', eventDown)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', reset)
    }
  }, [])
  return <div className="pointer-light" ref={lightRef} aria-hidden="true"><span /></div>
}

// Measure actual entry positions, so the trail survives wrapping, media, and resizing.
export function EntryTrail() {
  const svgRef = useRef(null)
  useLayoutEffect(() => {
    const svg = svgRef.current
    const container = svg.parentElement
    let frame
    const measure = () => {
      const bounds = container.getBoundingClientRect()
      const points = [...container.querySelectorAll('[data-trail-node]')].map(node => {
        const r = node.getBoundingClientRect()
        return { x: r.left - bounds.left + r.width / 2, y: r.top - bounds.top + r.height / 2 }
      })
      if (!points.length) return
      const path = points.slice(1).reduce((d, point, index) => {
        const previous = points[index]
        const middle = (previous.y + point.y) / 2
        return `${d} C ${previous.x + 28} ${middle}, ${point.x - 12} ${middle}, ${point.x} ${point.y}`
      }, `M ${points[0].x} ${points[0].y}`)
      svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`)
      svg.querySelectorAll('path').forEach(node => node.setAttribute('d', path))
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
    const observer = new ResizeObserver(schedule)
    observer.observe(container)
    container.querySelectorAll('article').forEach(node => observer.observe(node))
    measure()
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [])
  return <svg ref={svgRef} className="entry-trail" aria-hidden="true" preserveAspectRatio="none"><path className="trail-base"/><path className="trail-flow"/></svg>
}
