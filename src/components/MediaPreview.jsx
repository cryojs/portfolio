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

export function MediaPreview({ media }) {
  if (media.variant === 'tidebreak') {
    return <TidebreakScene media={media} />
  }

  return media.video ? (
    <video
      className="block h-full w-full object-contain"
      src={media.video}
      poster={media.image}
      controls
      playsInline
      preload="metadata"
      aria-label={`${media.alt} video preview`}
    />
  ) : (
    <img
      className="block h-full w-full object-cover"
      src={media.image}
      alt={media.alt}
      loading="lazy"
      style={{ objectPosition: media.position }}
    />
  )
}
