import { useRef } from 'react'

function TidebreakScene({ media }) {
  return (
    <div className="tidebreak-scene h-full w-full group-hover:scale-[1.025] group-focus-within:scale-[1.025]" role="img" aria-label={media.alt}>
      <div className="grid h-full w-full grid-cols-[1.15fr_0.85fr]">
        <img className="h-full w-full object-cover [image-rendering:pixelated]" src={media.gameplay} alt="" style={{ objectPosition: '54% center' }} />
        <img className="h-full w-full border-l border-[rgba(255,255,255,0.34)] object-cover [image-rendering:pixelated]" src={media.editor} alt="" style={{ objectPosition: '48% center' }} />
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
    <div className="relative h-full w-full" onMouseEnter={playPreview} onMouseLeave={stopPreview}>
      <img className="block h-full w-full object-cover transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.025] group-focus-within:scale-[1.025]" src={media.image} alt={media.alt} loading="lazy" style={{ objectPosition: media.position }} />
      {media.video && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)]"
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
