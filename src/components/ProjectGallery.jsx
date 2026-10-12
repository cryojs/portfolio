import { useEffect, useMemo, useRef, useState } from 'react'
import { Image, Maximize2, Play, X } from 'lucide-react'
import { Star } from './Editorial'
import './ProjectGallery.css'

function GalleryImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false)
  return failed ? (
    <p className="gallery-unavailable">image unavailable</p>
  ) : (
    <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />
  )
}

function Still({ slide }) {
  return slide.type === 'collage' ? (
    <div className="gallery-collage" role="img" aria-label={slide.alt}>
      {slide.images.map((image) => (
        <GalleryImage key={image.src} src={image.src} alt="" />
      ))}
    </div>
  ) : <GalleryImage src={slide.src} alt={slide.alt} />
}

function GalleryDecor() {
  return (
    <div className="gallery-decor" aria-hidden="true">
      <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="currentColor">
          <ellipse cx="1100" cy="135" rx="295" ry="95" transform="rotate(-32 1100 135)" />
          <ellipse cx="1100" cy="135" rx="307" ry="105" transform="rotate(-32 1100 135)" strokeDasharray="2 9" />
          <path d="M-100 550 375 295M-90 562 360 320M970-80 1270 330" />
        </g>
        <g fill="currentColor">
          <path d="m26 442 52 12-29 39 8-29Zm1100-16 60 46-70 16 37-27Z" />
          <path d="m1165 45-5 37 31 10-37 5-15 36 5-37-31-10 37-5Z" />
        </g>
      </svg>
      <span className="gallery-halftone" />
      <span className="gallery-checkers" />
    </div>
  )
}

function GalleryChevron({ direction }) {
  return <svg className="gallery-chevron" viewBox="0 0 24 100" fill="none" aria-hidden="true"><path d={direction === 'left' ? 'M21 2 3 50 21 98' : 'M3 2 21 50 3 98'} stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /></svg>
}

export default function ProjectGallery({ media, title }) {
  const slides = useMemo(() => {
    const gallery = media.gallery || [{ type: 'image', src: media.image, alt: media.alt }]
    return [...gallery.filter((slide) => slide.type === 'video'), ...gallery.filter((slide) => slide.type !== 'video')]
  }, [media])
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const videoRef = useRef(null)
  const dialogRef = useRef(null)
  const touchStart = useRef(null)
  const slide = slides[activeIndex]
  const isVideo = slide?.type === 'video'
  const MediaIcon = isVideo ? Play : Image

  useEffect(() => {
    if (!expanded) return undefined
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [expanded])

  function goToSlide(index) {
    videoRef.current?.pause()
    setActiveIndex((index + slides.length) % slides.length)
  }

  function handleKeyDown(event) {
    // Native player keys control seeking and volume, never the carousel.
    if (event.target.closest('video, dialog')) return
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      goToSlide(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1))
    }
  }

  if (!slide) return null

  return (
    <section className="project-gallery" aria-label={`${title} project gallery`} aria-roledescription="carousel" tabIndex={0} onKeyDown={handleKeyDown}>
      <GalleryDecor />
      <div className="gallery-topbar">
        <div className="gallery-heading"><Star className="gallery-star" /><span className="gallery-project-name">{title}</span><span className="gallery-divider" aria-hidden="true">/</span><span className="gallery-kind" aria-live="polite"><MediaIcon size={13} aria-hidden="true" />{isVideo ? 'demo' : (slide.caption || slide.alt)}</span></div>
        <span className="gallery-counter" aria-live="polite" aria-atomic="true"><span>{String(activeIndex + 1).padStart(2, '0')}</span><span aria-hidden="true">/</span>{String(slides.length).padStart(2, '0')}</span>
      </div>
      <div
        className="gallery-stage"
        onTouchStart={(event) => { touchStart.current = isVideo ? null : event.touches[0] }}
        onTouchEnd={(event) => {
          if (!touchStart.current) return
          const dx = event.changedTouches[0].clientX - touchStart.current.clientX
          const dy = event.changedTouches[0].clientY - touchStart.current.clientY
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) goToSlide(activeIndex + (dx < 0 ? 1 : -1))
          touchStart.current = null
        }}
        role="group"
        aria-roledescription="slide"
        aria-label={`${activeIndex + 1} of ${slides.length}: ${slide.alt}`}
      >
        {isVideo ? (
          <video key={slide.src} ref={videoRef} src={slide.src} poster={slide.poster} controls playsInline preload="metadata" aria-label={`${title} demo video`} />
        ) : (
          <button key={slide.src || slide.alt} type="button" className="gallery-image-button" onClick={() => setExpanded(true)} aria-label={`Expand: ${slide.alt}`}>
            <Still slide={slide} />
          </button>
        )}
      </div>
      <button className="gallery-icon-button gallery-side-arrow gallery-prev" type="button" aria-label={`Previous ${title} slide`} onClick={() => goToSlide(activeIndex - 1)} disabled={slides.length < 2}><GalleryChevron direction="left" /></button>
      <button className="gallery-icon-button gallery-side-arrow gallery-next" type="button" aria-label={`Next ${title} slide`} onClick={() => goToSlide(activeIndex + 1)} disabled={slides.length < 2}><GalleryChevron direction="right" /></button>
      <div className="gallery-bottom-bar">
        <span className="gallery-expand-slot">{!isVideo && <button className="gallery-icon-button" type="button" onClick={() => setExpanded(true)} aria-label={`Expand ${title} image`}><Maximize2 size={16} aria-hidden="true" /></button>}</span>
        <div className="gallery-pagination" aria-label={`${title} slides`}>
          {slides.map((item, index) => (
            <button key={item.src || item.alt} type="button" aria-label={`Show ${title} ${item.type === 'video' ? 'video' : 'image'} ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => goToSlide(index)}><span /></button>
          ))}
        </div>
        <span className="gallery-footer-motif" aria-hidden="true" />
      </div>
      {expanded && (
        <dialog ref={dialogRef} className="gallery-lightbox" aria-label={`${title} expanded image`} onClose={() => setExpanded(false)} onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false) }}>
          <button className="gallery-icon-button gallery-close" type="button" onClick={() => setExpanded(false)} aria-label="Close expanded image" autoFocus><X size={22} aria-hidden="true" /></button>
          <div className="gallery-lightbox-media"><Still slide={slide} /></div>
        </dialog>
      )}
    </section>
  )
}
