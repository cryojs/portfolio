import { Photo, Star, Trajectories } from '../components/Editorial'
import { Burst } from '../components/CyberGraphics'
import Silhouette from '../components/Silhouette'
import { photographs } from '../data/editorial'

export default function Home({ headingRef }) {
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
    <section className="home-scene" onPointerMove={move} onPointerLeave={reset}>
      <div className="scene-light" aria-hidden="true" />
      <Trajectories />
      <a
        href="#about"
        className="scene-object about-object"
        aria-label="About — the person behind the screen"
      >
        <Photo photo={photographs.portrait} />
        <span className="object-label">
          about <span>↗</span>
        </span>
      </a>
      <a href="#work" className="scene-object work-object">
        <Burst className="plush-burst" />
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
          <span className="intro-marker" aria-hidden="true">
            ↳
          </span>
          <p>
            computer science @ waterloo.
            <br />
            making things. figuring things out.
          </p>
        </div>
      </div>
      <a href="#projects" className="scene-object projects-object">
        <Silhouette kind="quill" />
        <span className="object-label">
          projects <span>↗</span>
        </span>
      </a>
      <div className="scene-photo">
        <Photo photo={photographs.everyday} />
        <Star className="photo-star" />
      </div>
      <a href="#contact" className="scene-object contact-object">
        <Silhouette kind="letter" />
        <span className="object-label">
          contact <span>↗</span>
        </span>
      </a>
    </section>
  )
}
