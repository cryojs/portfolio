import { useLayoutEffect, useRef } from 'react'
import { PhotoStack, Trajectories } from '../components/Editorial'
import { Burst, DottedGraphic, PhotoMotif } from '../components/CyberGraphics'
import Silhouette from '../components/Silhouette'
import { photographGroups } from '../data/editorial'

export default function Home({ headingRef }) {
  const sceneRef = useRef(null)
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const scene = sceneRef.current
    const bounds = scene.getBoundingClientRect()
    const animations = [...scene.querySelectorAll(':scope > .scene-object')].map((node) => {
      const rect = node.getBoundingClientRect()
      const x = bounds.left + bounds.width / 2 - rect.left - rect.width / 2
      const y = bounds.top + bounds.height / 2 - rect.top - rect.height / 2
      const frames = Array.from({length:121}, (_,i) => {
        const t = i/120
        const angle = -Math.PI*2.2*Math.pow(1-t, 3)
        const radius = 1-Math.pow(1-t, 2.6)
        const px = (-x*Math.cos(angle)+y*Math.sin(angle))*radius
        const py = (-x*Math.sin(angle)-y*Math.cos(angle))*radius
        return { translate:`${x+px}px ${y+py}px`, rotate:`${angle*180/Math.PI*.22}deg`,
          scale:String(.08+.92*radius), opacity:Math.min(1,t*9),
          filter:`blur(${64*Math.pow(1-t,1.7)}px)`, offset:t }
      })
      return node.animate(frames, { duration: 1450, easing: 'linear', fill: 'backwards' })
    })
    return () => animations.forEach(animation => animation.cancel())
  }, [])
  function move(event) {
    if (
      !window.matchMedia(
        '(hover: hover) and (prefers-reduced-motion: no-preference)',
      ).matches
    )
      return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty(
      '--pointer-x',
      `${(event.clientX - rect.left - rect.width / 2) * 0.022}px`,
    )
    event.currentTarget.style.setProperty(
      '--pointer-y',
      `${(event.clientY - rect.top - rect.height / 2) * 0.022}px`,
    )
  }
  function reset(event) {
    event.currentTarget.style.setProperty('--pointer-x', '0px')
    event.currentTarget.style.setProperty('--pointer-y', '0px')
  }
  return (
    <section ref={sceneRef} className="home-scene" onPointerMove={move} onPointerLeave={reset}>
      <div className="scene-light" aria-hidden="true" />
      <Trajectories />
      <a
        href="#about"
        className="scene-object about-object"
        aria-label="about · the person behind the screen"
      >
        <PhotoStack
          photos={photographGroups.spain}
          className="about-photo-stack"
        />
        <span className="object-label">
          about <span>↗</span>
        </span>
      </a>
      <a href="#work" className="scene-object work-object">
        <Burst className="plush-burst dotted" />
        <Silhouette kind="bear" />
        <span className="object-label">
          work <span>↗</span>
        </span>
      </a>
      <div className="home-title">
        <p className="greeting">hi! i’m</p>
        <h1 ref={headingRef} tabIndex={-1}>
          <span className="name-highlight">jason</span> <em>sun</em>
          <span className="title-period">.</span>
        </h1>
        <div className="home-introduction">
          <p>
            studying computer science @ uwaterloo.
            <br />
            always learning, making, and figuring things out.
          </p>
        </div>
      </div>
      <a href="#projects" className="scene-object projects-object">
        <DottedGraphic className="object-dots project-dots" kind="cloud" />
        <Silhouette kind="quill" />
        <span className="object-label">
          projects <span>↗</span>
        </span>
      </a>
      <div
        className="scene-object scene-photo"
        aria-label="a set of Spain and Toronto photographs"
      >
        <PhotoStack
          photos={photographGroups.toronto}
          className="toronto-photo-stack"
        />
        <PhotoMotif variant="toronto" />
      </div>
      <div
        className="scene-object scene-photo scene-photo-secondary"
        aria-label="a group of travel photographs"
      >
        <PhotoStack
          photos={photographGroups.travel}
          className="travel-photo-stack"
        />
        <PhotoMotif variant="travel" />
      </div>
      <a href="#contact" className="scene-object contact-object">
        <DottedGraphic className="object-dots contact-dots" kind="letter" />
        <Silhouette kind="letter" />
        <span className="object-label">
          contact <span>↗</span>
        </span>
      </a>
    </section>
  )
}
