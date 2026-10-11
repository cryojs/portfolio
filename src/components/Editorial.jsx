import { useState } from 'react'

export function Star({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className={`star ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M100 0L123 76L200 100L124 123L100 200L76 124L0 100L76 76Z" />
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
          aria-label={`${photo.alt} — photograph to come`}
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

export function ExternalLink({ href, children, className = '' }) {
  return (
    <a
      className={`text-link ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function PageIntro({ children, description, headingRef }) {
  return (
    <div className="page-intro">
      <h1 tabIndex={-1} ref={headingRef}>
        {children}
      </h1>
      {description && <p className="page-description">{description}</p>}
    </div>
  )
}
