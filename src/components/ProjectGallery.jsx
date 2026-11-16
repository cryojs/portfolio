import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
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

const pad = (value) => String(value).padStart(2, '0')
const captionFor = (slide) => slide.caption || (slide.type === 'video' ? 'demo video' : slide.alt)

function StepButtons({ onPrevious, onNext, label, className = '' }) {
  return (
    <div className={`gallery-step ${className}`}>
      <button type="button" className="gallery-step-button" onClick={onPrevious} aria-label={`Previous ${label}`} title="previous (←)">
        <ChevronLeft size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <button type="button" className="gallery-step-button" onClick={onNext} aria-label={`Next ${label}`} title="next (→)">
        <ChevronRight size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  )
}

export default function ProjectGallery({ media, title }) {
  const slides = useMemo(() => {
    const gallery = media.gallery || [{ type: 'image', src: media.image, alt: media.alt }]
    return [...gallery.filter((slide) => slide.type === 'video'), ...gallery.filter((slide) => slide.type !== 'video')]
  }, [media])
  // The lightbox only browses stills; videos keep their own native player.
  const stills = useMemo(() => slides.flatMap((slide, index) => (slide.type === 'video' ? [] : [index])), [slides])
  const [activeIndex, setActiveIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const videoRef = useRef(null)
  const dialogRef = useRef(null)
  const touchStart = useRef(null)
  const slide = slides[activeIndex]
  const isVideo = slide?.type === 'video'
  const several = slides.length > 1

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

  function stepStill(direction) {
    const position = stills.indexOf(activeIndex)
    setActiveIndex(stills[(position + direction + stills.length) % stills.length])
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

      <div className="gallery-controls">
        {several && (
          <div className="gallery-track" role="group" aria-label={`${title} slides`}>
            {slides.map((item, index) => (
              <button
                key={item.src || item.alt}
                type="button"
                aria-label={`Show ${title} ${item.type === 'video' ? 'video' : 'image'} ${index + 1}: ${captionFor(item)}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                title={captionFor(item)}
                onClick={() => goToSlide(index)}
              >
                <span />
              </button>
            ))}
          </div>
        )}
        <div className="gallery-bar">
          <p className="gallery-caption" aria-live="polite">{captionFor(slide)}</p>
          {several && (
            <>
              <span className="gallery-count" aria-hidden="true">
                <b>{pad(activeIndex + 1)}</b> / {pad(slides.length)}
              </span>
              <StepButtons label={`${title} slide`} onPrevious={() => goToSlide(activeIndex - 1)} onNext={() => goToSlide(activeIndex + 1)} />
            </>
          )}
        </div>
      </div>

      {expanded && (
        <dialog
          ref={dialogRef}
          className="gallery-lightbox"
          aria-label={`${title} expanded image`}
          onClose={() => setExpanded(false)}
          onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false) }}
          onKeyDown={(event) => {
            if (stills.length < 2 || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
            event.preventDefault()
            stepStill(event.key === 'ArrowLeft' ? -1 : 1)
          }}
        >
          <div className="gallery-lightbox-media"><Still slide={slide} /></div>
          <div className="gallery-lightbox-bar">
            <p className="gallery-caption">{captionFor(slide)}</p>
            {stills.length > 1 && (
              <>
                <span className="gallery-count" aria-hidden="true">
                  <b>{pad(stills.indexOf(activeIndex) + 1)}</b> / {pad(stills.length)}
                </span>
                <StepButtons label={`${title} image`} onPrevious={() => stepStill(-1)} onNext={() => stepStill(1)} />
              </>
            )}
            <button className="gallery-step-button gallery-close" type="button" onClick={() => setExpanded(false)} aria-label="Close expanded image" autoFocus>
              <X size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </dialog>
      )}
    </section>
  )
}
