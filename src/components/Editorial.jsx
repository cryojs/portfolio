import { useState } from 'react'
import { MotifRule } from './PageEmblem'
import { GithubIcon, LinkedinIcon } from './Icons'

export function Star({ className = '', monogram = false, ...props }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className={`star ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M100 0L123 76L200 100L124 123L100 200L76 124L0 100L76 76Z" />
      {monogram && <g fill="none" stroke="var(--graphic-cutout)" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M79 87h12v24l-5 5h-9v-7M119 87h-16v12h15v16h-17" />
      </g>}
    </svg>
  )
}

export function Trajectories({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1440 850"
      preserveAspectRatio="none"
      className={`trajectories ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth=".7">
        <ellipse
          cx="728"
          cy="438"
          rx="666"
          ry="210"
          transform="rotate(-22 728 438)"
        />
        <ellipse
          cx="729"
          cy="438"
          rx="671"
          ry="219"
          transform="rotate(-19 729 438)"
        />
        <path d="M-90 715Q510 120 1510 209M242-120Q355 569 1290 928" />
        <circle cx="727" cy="438" r="327" strokeDasharray="2 7" />
      </g>
      <g fill="currentColor">
        <circle cx="262" cy="546" r="4" />
        <circle cx="1108" cy="177" r="3" />
        <circle cx="902" cy="702" r="4" />
      </g>
    </svg>
  )
}

export function Photo({ photo, className = '' }) {
  const [failed, setFailed] = useState(false)
  const hasPhoto = photo.src && !failed
  return (
    <figure
      className={`photo ${hasPhoto ? 'has-photo' : 'photo-placeholder'} ${className}`}
    >
      {hasPhoto ? (
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ objectPosition: photo.position }}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="photo-empty"
          role="img"
          aria-label={`${photo.alt} · photograph to come`}
        >
          <span className="photo-cross">+</span>
          <span className="photo-empty-label">
            photo
            <br />
            coming soon
          </span>
        </div>
      )}
    </figure>
  )
}

export function PhotoStack({ photos, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  if (!photos?.length) return null

  const photo = photos[activeIndex]
  const nextIndex = (activeIndex + 1) % photos.length

  return (
    <div className={`photo-stack ${className}`} data-photo-index={activeIndex}>
      <span
        className="photo-stack-layer photo-stack-layer-back"
        aria-hidden="true"
      />
      <span
        className="photo-stack-layer photo-stack-layer-front"
        aria-hidden="true"
      />
      <div className="photo-stack-frame">
        <Photo key={photo.src} photo={photo} />
        {photos.length > 1 && (
          <button
            className="photo-stack-control"
            type="button"
            onClick={(event) => {
              setActiveIndex(nextIndex)
              // Pointer clicks should release :focus-within so the scene can
              // leave its hover state when the pointer exits the photograph.
              if (event.detail > 0) event.currentTarget.blur()
            }}
            aria-label={`flip to photo ${nextIndex + 1} of ${photos.length}`}
          />
        )}
        {photos.length > 1 && (
          <span key={`counter-${photo.src}`} className="photo-stack-count" aria-live="polite">
            <span className="photo-stack-count-text">{activeIndex + 1}/{photos.length}</span>
          </span>
        )}
      </div>
    </div>
  )
}

export function ExternalLink({ href, children, className = '', ...props }) {
  return (
    <a
      className={`text-link ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
      <span className="external-link-arrow" aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

const brandLabels = {
  waterloo: 'W',
  readify: 'R',
  dmoj: 'D',
  leetcode: 'LC',
  github: null,
  linkedin: null,
  instagram: '◎',
  youtube: '▶',
}

export function BrandMark({ brand }) {
  const Icon = brand === 'github' ? GithubIcon : brand === 'linkedin' ? LinkedinIcon : null
  return (
    <span className={`brand-mark brand-mark-${brand}`} aria-hidden="true">
      {Icon ? <Icon size={13} strokeWidth={2.2} /> : brandLabels[brand] || brand.slice(0, 1).toUpperCase()}
    </span>
  )
}

export function PageIntro({ children, description, headingRef, motif }) {
  return (
    <div className="page-intro">
      <h1 tabIndex={-1} ref={headingRef}>
        {children}
      </h1>
      {description && <p className="page-description">{description}</p>}
      {motif && <MotifRule variant={motif} />}
    </div>
  )
}
