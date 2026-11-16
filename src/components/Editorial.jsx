import { useEffect, useId, useState } from 'react'
import { ChevronsRight, Globe } from 'lucide-react'
import { GithubIcon, InstagramIcon, LinkedinIcon } from './Icons'
import Silhouette from './Silhouette'

export function Star({ className = '', brand = false, ...props }) {
  const id = useId()
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className={`star ${className}`}
      aria-hidden="true"
      {...props}
    >
      {brand ? <>
        <defs>
          <clipPath id={`${id}-ring-front`}>
            <rect x="0" y="100" width="200" height="100" />
          </clipPath>
          <mask id={`${id}-star-core-cutout`} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="white" />
            <path d="M113 6Q114 78 188 88Q116 104 87 194Q91 121 12 112Q86 95 113 6Z" fill="black" transform="translate(100 100) scale(.40) translate(-100 -100)" />
          </mask>
        </defs>
        <ellipse cx="100" cy="100" rx="84" ry="51" transform="rotate(-26 100 100)" fill="none" stroke="#172ce8" strokeWidth="6" />
        <path d="M113 6Q114 78 188 88Q116 104 87 194Q91 121 12 112Q86 95 113 6Z" mask={`url(#${id}-star-core-cutout)`} />
        <ellipse cx="100" cy="100" rx="84" ry="51" transform="rotate(-26 100 100)" fill="none" stroke="#172ce8" strokeWidth="6" clipPath={`url(#${id}-ring-front)`} />
      </> : <path d="M100 0L130 70L200 100L130 130L100 200L70 130L0 100L70 70Z" />}
    </svg>
  )
}

export function Photo({ photo, className = '', loading = 'lazy', onSettle }) {
  const [failed, setFailed] = useState(false)
  const hasPhoto = photo.src && !failed
  // A placeholder has nothing to wait for.
  useEffect(() => {
    if (!photo.src) onSettle?.()
  }, [photo.src, onSettle])
  return (
    <figure
      className={`photo ${hasPhoto ? 'has-photo' : 'photo-placeholder'} ${className}`}
    >
      {hasPhoto ? (
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ objectPosition: photo.position }}
          onLoad={onSettle}
          onError={() => {
            setFailed(true)
            onSettle?.()
          }}
          loading={loading}
          decoding="async"
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
  // Hidden until the first photograph arrives, so empty frames never flash.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!photos?.length) return undefined

    const preloadedImages = photos
      .filter((photo) => photo?.src)
      .map((photo) => {
        const image = new Image()
        image.decoding = 'async'
        image.src = photo.src
        return image
      })

    return () => {
      preloadedImages.forEach((image) => {
        image.onload = null
        image.onerror = null
      })
    }
  }, [photos])

  if (!photos?.length) return null

  const photo = photos[activeIndex]
  const nextIndex = (activeIndex + 1) % photos.length

  return (
    <div className={`photo-stack ${className}`} data-photo-index={activeIndex} data-ready={ready}>
      <span
        className="photo-stack-layer photo-stack-layer-back"
        aria-hidden="true"
      />
      <span
        className="photo-stack-layer photo-stack-layer-front"
        aria-hidden="true"
      />
      <div className="photo-stack-frame">
        <Photo key={photo.src} photo={photo} loading="eager" onSettle={() => setReady(true)} />
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
          <span key={`counter-${photo.src}`} className="photo-stack-count" aria-live="polite" aria-atomic="true">
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
  chrome: 'C',
  firefox: 'F',
}

const brandImages = {
  waterloo: '/logos/uw-transparent.webp',
  readify: '/logos/readify.png',
  dmoj: '/logos/dmoj.png',
  leetcode: '/logos/leetcode.png',
  github: '/logos/github.svg',
  linkedin: '/logos/linkedin.webp',
  chrome: '/logos/chrome-store.webp',
  firefox: '/logos/firefox.webp',
}

export function BrandMark({ brand }) {
  const Icon = { github: GithubIcon, linkedin: LinkedinIcon, instagram: InstagramIcon, web: Globe }[brand]
  const image = brandImages[brand]
  const className = `brand-mark brand-mark-${brand}${image ? ' brand-mark-image' : ''}`
  return <span className={className} aria-hidden="true">
    {image ? <img src={image} alt="" /> : Icon ? <Icon size={13} strokeWidth={2.2} /> : brandLabels[brand] || brand.slice(0, 1).toUpperCase()}
  </span>
}

export function LinkBadge({ href, brand, image, children, external = false, className = '', ...props }) {
  const badgeClassName = `link-badge${brand ? ` link-badge-${brand}` : ''}${className ? ` ${className}` : ''}`
  const mark = image
    ? <span className="brand-mark brand-mark-image" aria-hidden="true"><img src={image} alt="" /></span>
    : <BrandMark brand={brand} />
  const content = <>{mark}{children}</>

  if (external) {
    return <ExternalLink href={href} className={badgeClassName} {...props}>{content}</ExternalLink>
  }

  return <a href={href} className={badgeClassName} {...props}>{content}</a>
}

export function PageIntro({ children, headingRef }) {
  return (
    <div className="page-intro">
      <h1 tabIndex={-1} ref={headingRef}>
        {children}
      </h1>
    </div>
  )
}

// The closing hand-off to the next chapter. The chevron is bound to the last
// word so it can never wrap onto a line of its own.
export function NextPage({ href, children, silhouette }) {
  const words = children.split(' ')
  const last = words.pop()
  return (
    <a className="next-page" href={href}>
      <span>
        {words.join(' ')}{' '}
        <span className="next-page-tail">
          {last}
          <ChevronsRight className="next-page-chevron" aria-hidden="true" size={22} strokeWidth={1.8} />
        </span>
      </span>
      <Silhouette kind={silhouette} className="next-page-silhouette" />
    </a>
  )
}
