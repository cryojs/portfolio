import { useEffect, useId, useRef, useState } from 'react'
import { createPearls, stepPearls } from './bobaPhysics'

const clamp = (n) => Math.max(-42, Math.min(42, n))

export default function BobaEmblem({ className = '' }) {
  const id = useId()
  const [position, setPosition] = useState(0)
  const [depth, setDepth] = useState(0)
  const [pearls, setPearls] = useState(createPearls)
  const fluid = useRef(null)
  if (fluid.current === null) fluid.current = { pearls: createPearls(), straw: {x:0,z:0}, impulse:{x:0,z:0} }
  const start = useRef(() => {})
  const drag = useRef(null)
  useEffect(() => {
    let frame = null, previous = 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    function tick(time) {
      const dt = Math.min((time-previous)/1000 || .016, .025)
      previous = time
      const f = fluid.current
      stepPearls(f.pearls, f.straw, f.impulse, dt)
      f.impulse = {x:0,z:0}
      setPearls(f.pearls.map(p => ({...p})))
      const moving = f.pearls.some(p => Math.hypot(p.vx,p.vz,p.vy) > .3 || p.energy > .02)
      frame = !reduced && moving ? requestAnimationFrame(tick) : null
    }
    start.current = () => { if(frame === null) { previous = performance.now(); frame = requestAnimationFrame(tick) } }
    return () => { cancelAnimationFrame(frame); start.current = () => {} }
  }, [])
  function stir(x, z) {
    x = clamp(x); z = clamp(z)
    const f = fluid.current
    f.impulse.x += Math.max(-18, Math.min(18, x-f.straw.x))
    f.impulse.z += Math.max(-18, Math.min(18, z-f.straw.z))
    f.straw = {x,z}
    setPosition(x); setDepth(z); start.current()
  }
  function localPoint(event) {
    const svg = event.currentTarget.ownerSVGElement
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse())
  }
  const strawDepth = depth
  const renderedPearls = pearls
    .map((p, i) => ({ ...p, i }))
    .sort((a, b) => a.z - b.z)
  const backPearls = renderedPearls.filter(p => p.z <= strawDepth)
  const frontPearls = renderedPearls.filter(p => p.z > strawDepth)
  const renderPearl = (p) => <g key={p.i} className="boba-pearl" pointerEvents="none"
    data-depth={p.z.toFixed(2)}
    transform={`translate(${200+p.x} ${301+p.z*.42+p.y}) scale(${.85+(p.z+53)/350})`}>
    <circle r={p.radius} fill="#080d28" stroke="#a8b7ff" strokeWidth="1"/>
    <circle cx="-4.5" cy="-4.5" r="3.3" fill="#c1cbff" opacity=".6"/>
  </g>
  return <svg viewBox="0 0 400 400" className={`page-emblem emblem-about ${className}`} fill="none">
    <defs>
      <linearGradient id={`${id}-tea`} x2="1" y2="1"><stop stopColor="#172ce8"/><stop offset=".45" stopColor="#829bf7"/><stop offset=".52" stopColor="#e4eaff"/><stop offset=".68" stopColor="#263ab7"/><stop offset="1" stopColor="#080f58"/></linearGradient>
      <pattern id={`${id}-dots`} width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="currentColor"/></pattern>
      <clipPath id={`${id}-cup`}><path d="M119 143h162l-22 177q-59 25-118 0z"/></clipPath>
    </defs>
    <ellipse cx="200" cy="230" rx="173" ry="105" fill={`url(#${id}-dots)`} opacity=".4" transform="rotate(-20 200 230)"/>
    <path d="M111 137h178l-24 190q-65 29-130 0z" fill="var(--surface)" stroke="currentColor" strokeWidth="5"/>
    <path d="M120 191q80 23 160 0l-21 129q-59 25-118 0z" fill={`url(#${id}-tea)`}/>
    <ellipse cx="200" cy="137" rx="89" ry="18" fill="var(--surface)" stroke="currentColor" strokeWidth="4"/>
    <g clipPath={`url(#${id}-cup)`}>
      {backPearls.map(renderPearl)}
    </g>
    <g className="boba-straw" role="slider" tabIndex={0} aria-label="stir bubble tea"
      aria-valuemin={-42} aria-valuemax={42} aria-valuenow={Math.round(position)}
      data-depth={strawDepth.toFixed(2)}
      aria-valuetext={`Across ${Math.round(position)}, depth ${Math.round(depth)}. Use arrow keys to stir in two dimensions`}
      onPointerDown={(event) => { event.preventDefault(); event.currentTarget.focus(); drag.current = {point:localPoint(event), position, depth}; event.currentTarget.setPointerCapture(event.pointerId) }}
      onPointerMove={(event) => { if(drag.current) { const point=localPoint(event); stir(drag.current.position + point.x-drag.current.point.x, drag.current.depth + point.y-drag.current.point.y) } }}
      onPointerUp={(event) => { drag.current = null; event.currentTarget.releasePointerCapture(event.pointerId) }}
      onPointerCancel={() => { drag.current = null }}
      onLostPointerCapture={() => { drag.current = null }}
      onKeyDown={(event) => {
        if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key)) return
        event.preventDefault()
        stir(event.key === 'Home' ? -42 : event.key === 'End' ? 42 : position + (event.key === 'ArrowRight' ? 5 : event.key === 'ArrowLeft' ? -5 : 0),
          depth + (event.key === 'ArrowDown' ? 5 : event.key === 'ArrowUp' ? -5 : 0))
      }}>
      <path d={`M${225+position*1.2} ${45+depth*.8}L${200+position} ${295+depth*.42}`} stroke="transparent" strokeWidth="42"/>
      <path className="straw-body" d={`M${225+position*1.2} ${45+depth*.8}L${200+position} ${295+depth*.42}`} stroke={`url(#${id}-tea)`} strokeWidth={(18+depth*.04)*1.5}/>
      <path d={`M${219+position*1.2} ${47+depth*.8}L${194+position} ${290+depth*.42}`} stroke="#e4eaff" strokeWidth="4.5" opacity=".8"/>
    </g>
    <g clipPath={`url(#${id}-cup)`}>
      {frontPearls.map(renderPearl)}
    </g>
    <path d="M111 137q89 37 178 0M141 169l8 70" stroke="currentColor" strokeWidth="4" pointerEvents="none"/>
    <path d="M60 82l8 23 23 8-23 8-8 23-8-23-23-8 23-8zM324 234l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill="currentColor"/>
  </svg>
}
