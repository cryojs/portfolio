import { useRef } from 'react'

function TidebreakScene({ media }) {
  return (
    <div className="tidebreak-scene" role="img" aria-label={media.alt}>
      <div className="tidebreak-screens" aria-hidden="true">
        <img src={media.gameplay} alt="" />
        <img src={media.editor} alt="" />
      </div>
    </div>
  )
}

export function MediaPreview({ media, title }) {
  const videoRef = useRef(null)

  const playPreview = () => {
    if (!videoRef.current) return
    videoRef.current.play().catch(() => {})
  }

  const stopPreview = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  if (media.variant === 'tidebreak') {
    return <TidebreakScene media={media} />
  }

  return (
    <div className="project-media__visual" onMouseEnter={playPreview} onMouseLeave={stopPreview}>
      <img src={media.image} alt={media.alt} loading="lazy" style={{ objectPosition: media.position }} />
      {media.video && (
        <video
          ref={videoRef}
          src={media.video}
          poster={media.image}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${title} preview`}
        />
      )}
    </div>
  )
}
