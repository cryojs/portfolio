import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Minus, Plus } from 'lucide-react'
import { photography, motionEdits } from '../data/hobbies'
import { BrandMark, ExternalLink } from './Editorial'
import { MotifRule } from './PageEmblem'

function embedUrl(id, muted) {
  const params = new URLSearchParams({
    autoplay: '1', mute: muted ? '1' : '0', playsinline: '1',
    controls: muted ? '0' : '1', rel: '0',
    ...(muted ? { loop: '1', playlist: id } : {}),
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`
}

function usePanelMotion(isOpen) {
  const panelRef = useRef(null)

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    let frame

    // Let the new open/closed styles paint first, then change the measured
    // height on the following frame. Without that separation, closing can
    // collapse before the browser has a previous height to interpolate from.
    frame = requestAnimationFrame(() => {
      if (!panelRef.current) return
      panel.style.height = isOpen ? `${panel.scrollHeight}px` : '0px'
    })

    return () => cancelAnimationFrame(frame)
  }, [isOpen])

  return panelRef
}

function MediaDialog({ item, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])
  return createPortal(
    <dialog ref={ref} className="hobby-dialog" aria-label={item.id ? 'motion and vfx player' : item.alt}
      onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="hobby-dialog-content">
        <button type="button" className="hobby-close" onClick={onClose}>close ×</button>
        {item.id ? (
          <>
            <iframe src={embedUrl(item.id, false)} title="motion and vfx edit · full player"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin" />
            <a href={`https://www.youtube.com/watch?v=${item.id}`} target="_blank" rel="noreferrer">watch on youtube ↗</a>
          </>
        ) : <img src={item.src} alt={item.alt} />}
      </div>
    </dialog>, document.body,
  )
}

export default function Hobbies() {
  const [preview, setPreview] = useState(null)
  const [selected, setSelected] = useState(null)
  const [photographyOpen, setPhotographyOpen] = useState(false)
  const [motionOpen, setMotionOpen] = useState(false)
  const photographyPanelRef = usePanelMotion(photographyOpen)
  const motionPanelRef = usePanelMotion(motionOpen)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  function stopPreview() {
    clearTimeout(timer.current)
    setPreview(null)
  }
  function startPreview(id) {
    clearTimeout(timer.current)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = setTimeout(() => setPreview(id), 450)
  }
  function open(item) {
    stopPreview()
    setSelected(item)
  }
  function toggleCollection(setOpen) {
    setOpen((open) => !open)
  }
  return (
    <section className="hobbies-section" aria-labelledby="hobbies-title">
      <MotifRule variant="about" />
      <h2 id="hobbies-title">outside the <em>editor</em> ⤵</h2>
      <section className={`hobby-collection photography-collection${photographyOpen ? ' is-open' : ''}`}>
        <div className="hobby-heading">
          <button type="button" className="hobby-heading-trigger" aria-expanded={photographyOpen}
            aria-controls="photography-panel" onClick={() => toggleCollection(setPhotographyOpen)}>
          <span className="hobby-heading-label">
            <h3 id="photography-heading">photography</h3>
            <span className="hobby-toggle" aria-hidden="true">
              <Plus className="hobby-toggle-plus" size={17} strokeWidth={2.2} />
              <Minus className="hobby-toggle-minus" size={17} strokeWidth={2.2} />
            </span>
          </span>
          </button>
          <ExternalLink href="https://www.instagram.com/cryojs/"><BrandMark brand="instagram" />@cryojs on insta</ExternalLink>
        </div>
        <div ref={photographyPanelRef} id="photography-panel" className={`hobby-panel${photographyOpen ? ' is-open' : ''}`}
          role="region" aria-labelledby="photography-heading" aria-hidden={!photographyOpen}>
          <div className="hobby-panel-inner">
            <div className="photography-gallery">
              {photography.map((photo) => (
                <button type="button" className="photography-frame" key={photo.src} onClick={() => open(photo)} aria-label={`view photograph: ${photo.caption}`}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <span>{photo.caption} <span aria-hidden="true">↗</span></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className={`hobby-collection motion-collection${motionOpen ? ' is-open' : ''}`}>
        <div className="hobby-heading motion-heading">
          <button type="button" className="hobby-heading-trigger" aria-expanded={motionOpen}
            aria-controls="motion-panel" onClick={() => toggleCollection(setMotionOpen)}>
          <span className="hobby-heading-label">
            <span>
              <h3 id="motion-heading">motion graphics &amp; vfx</h3>
              <p>hover to preview · click to watch with sound</p>
            </span>
            <span className="hobby-toggle" aria-hidden="true">
              <Plus className="hobby-toggle-plus" size={17} strokeWidth={2.2} />
              <Minus className="hobby-toggle-minus" size={17} strokeWidth={2.2} />
            </span>
          </span>
          </button>
          <ExternalLink href="https://www.youtube.com/@VastAMV"><BrandMark brand="youtube" />@vastamv on yt</ExternalLink>
        </div>
        <div ref={motionPanelRef} id="motion-panel" className={`hobby-panel${motionOpen ? ' is-open' : ''}`}
          role="region" aria-labelledby="motion-heading" aria-hidden={!motionOpen}>
          <div className="hobby-panel-inner">
            <div className="motion-gallery">
              {motionEdits.map((edit, index) => (
                <button type="button" className="motion-tile" key={edit.id}
                  aria-label={`watch motion and vfx edit ${index + 1}`}
                  onPointerEnter={(event) => { if (event.pointerType === 'mouse') startPreview(edit.id) }}
                  onPointerLeave={stopPreview} onFocus={() => startPreview(edit.id)} onBlur={stopPreview}
                  onClick={() => open(edit)}>
                  <span className="motion-thumbnail" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${edit.id}/mqdefault.jpg)` }} />
                  {preview === edit.id && (edit.previewSrc ? (
                    <video src={edit.previewSrc} autoPlay muted loop playsInline aria-hidden="true" />
                  ) : (
                    <iframe src={embedUrl(edit.id, true)} title={`muted preview ${index + 1}`} tabIndex={-1} aria-hidden="true"
                      allow="autoplay; encrypted-media" referrerPolicy="strict-origin-when-cross-origin" />
                  ))}
                  <span className="motion-play" aria-hidden="true">▶</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {selected && <MediaDialog item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
