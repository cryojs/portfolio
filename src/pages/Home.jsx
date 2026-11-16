import { useEffect, useLayoutEffect, useRef } from 'react'
import { PhotoStack } from '../components/Editorial'
import { Burst, DottedGraphic, PhotoMotif } from '../components/CyberGraphics'
import Silhouette from '../components/Silhouette'
import ProjectGlyph from '../components/ProjectGlyph'
import OrbitVortex from '../components/OrbitVortex'
import { photographGroups } from '../data/editorial'
import './Home.css'

const ORBIT_ORDER = ['about', 'work', 'photo-right', 'contact', 'projects', 'photo-left']
const RIDE_MS = 720
const riseFrames = [
  { offset: 0, translate: '0px 16px', scale: '0.96', opacity: 0, filter: 'blur(2px)' },
  { offset: 0.6, opacity: 1 },
  { offset: 1, translate: '0px 0px', scale: '1', opacity: 1, filter: 'blur(0px)' },
]

function rideFrames(phi) {
  return [
    { offset: 0, '--phi': `${phi - 22}deg`, opacity: 0, scale: '0.94', filter: 'blur(2px)' },
    { offset: 0.45, opacity: 1 },
    { offset: 1, '--phi': `${phi}deg`, opacity: 1, scale: '1', filter: 'blur(0px)' },
  ]
}

export default function Home({ headingRef }) {
  const sceneRef = useRef(null)
  const motionRef = useRef({ x: 0, y: 0 })

  useLayoutEffect(() => {
    const scene = sceneRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return undefined
    const hasRing = window.matchMedia('(min-width: 901px)').matches
    scene.classList.add('is-entering')
    const objects = ORBIT_ORDER.map((slot) => scene.querySelector(`[data-slot="${slot}"]`))
      .filter((node) => node && getComputedStyle(node).display !== 'none')
    const animations = objects.map((node, index) => {
      const phi = parseFloat(getComputedStyle(node).getPropertyValue('--phi')) || 0
      return node.animate(hasRing ? rideFrames(phi) : riseFrames, {
        duration: RIDE_MS, delay: 180 + index * 70,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards',
      })
    })
    const finish = () => {
      animations.forEach((animation) => animation.cancel())
      scene.classList.remove('is-entering')
    }
    const done = setTimeout(finish, 180 + (objects.length - 1) * 70 + RIDE_MS)
    const onPreference = () => { if (reduced.matches) finish() }
    reduced.addEventListener('change', onPreference)
    return () => {
      clearTimeout(done)
      reduced.removeEventListener('change', onPreference)
      finish()
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    const plane = scene.querySelector('.world-objects .orbit-plane')
    const canMove = window.matchMedia('(min-width: 901px) and (hover: hover) and (prefers-reduced-motion: no-preference)')
    const target = { x: 0, y: 0 }
    let rect = scene.getBoundingClientRect()
    let frame = 0
    let last = 0

    // A short, frame-rate-independent response. Only one compositor transform
    // changes; no inherited CSS variables or layout reads on pointer events.
    const tick = (now) => {
      const dt = last ? Math.min(now - last, 40) : 16
      last = now
      const ease = 1 - Math.exp(-dt / 70)
      const current = motionRef.current
      current.x += (target.x - current.x) * ease
      current.y += (target.y - current.y) * ease
      plane.style.transform = `translate3d(${-current.x * 12}px, ${-current.y * 8}px, 0) rotateY(${current.x * 3}deg) rotateX(calc(var(--tilt) + ${-current.y * 2}deg))`
      if (Math.abs(target.x - current.x) > 0.0005 || Math.abs(target.y - current.y) > 0.0005) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
        last = 0
      }
    }
    const wake = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(tick) }
    const move = (event) => {
      if (!canMove.matches || event.pointerType === 'touch') return
      target.x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5))
      target.y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5))
      wake()
    }
    const leave = () => {
      target.x = 0
      target.y = 0
      if (canMove.matches) wake()
    }
    const reset = () => {
      cancelAnimationFrame(frame)
      frame = 0
      last = 0
      target.x = target.y = 0
      motionRef.current.x = motionRef.current.y = 0
      plane.style.removeProperty('transform')
    }
    const measure = () => { rect = scene.getBoundingClientRect() }
    const observer = new ResizeObserver(measure)
    observer.observe(scene)
    scene.addEventListener('pointermove', move, { passive: true })
    scene.addEventListener('pointerleave', leave)
    window.addEventListener('scroll', measure, { passive: true })
    canMove.addEventListener('change', reset)
    document.addEventListener('visibilitychange', reset)
    return () => {
      reset()
      observer.disconnect()
      scene.removeEventListener('pointermove', move)
      scene.removeEventListener('pointerleave', leave)
      window.removeEventListener('scroll', measure)
      canMove.removeEventListener('change', reset)
      document.removeEventListener('visibilitychange', reset)
    }
  }, [])

  return (
    <section ref={sceneRef} className="home-scene">
      <div className="scene-light" aria-hidden="true" />
      <OrbitVortex motionRef={motionRef} />

      <div className="home-title">
        <p className="greeting">hi! i’m</p>
        <h1 ref={headingRef} tabIndex={-1}>
          <span className="name-highlight"><span className="name-word">jason</span></span>{' '}
          <em><span className="name-word">sun</span></em>
          <span className="title-period">.</span>
        </h1>
        <div className="home-introduction">
          <p>
            <span>computer science @ uwaterloo.</span>
            <span>combining code with curiosity</span>
          </p>
        </div>
      </div>

      <div className="home-world world-objects">
        <div className="orbit-plane">
          <a href="#about" data-slot="about" className="scene-object slot-about about-object" aria-label="about · the person behind the screen">
            <PhotoStack photos={photographGroups.spain} className="about-photo-stack" />
            <span className="object-label">about <span>↗</span></span>
          </a>
          <a href="#work" data-slot="work" className="scene-object slot-work work-object" aria-label="work · my experience">
            <span className="object-art">
              <Burst className="plush-burst dotted" />
              <Silhouette kind="bear" finish="cobalt" />
            </span>
            <span className="object-label">work <span>↗</span></span>
          </a>
          <a href="#projects" data-slot="projects" className="scene-object slot-projects projects-object">
            <span className="object-art">
              <DottedGraphic className="object-dots project-dots" kind="cloud" />
              <ProjectGlyph />
            </span>
            <span className="object-label">projects <span>↗</span></span>
          </a>
          <a href="#contact" data-slot="contact" className="scene-object slot-contact contact-object">
            <span className="object-art">
              <DottedGraphic className="object-dots contact-dots" kind="letter" />
              <Silhouette kind="letter" finish="cobalt" />
            </span>
            <span className="object-label">contact <span>↗</span></span>
          </a>
          <div data-slot="photo-right" className="scene-object slot-photo-right scene-photo" aria-label="a set of Spain and Toronto photographs">
            <PhotoStack photos={photographGroups.toronto} className="toronto-photo-stack" />
            <PhotoMotif variant="toronto" />
          </div>
          <div data-slot="photo-left" className="scene-object slot-photo-left scene-photo scene-photo-secondary" aria-label="a group of travel photographs">
            <PhotoStack photos={photographGroups.travel} className="travel-photo-stack" />
          </div>
        </div>
      </div>

    </section>
  )
}
