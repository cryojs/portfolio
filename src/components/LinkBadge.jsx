function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function displayUrl(href) {
  return href.replace(/^https?:\/\//, '')
}

function BadgeBorder() {
  return (
    <svg className="link-badge-border text-[#93c5fd]" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <rect x="1" y="1" width="98" height="38" rx="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function LinkPreview({ id, label, href, detail, preview }) {
  const hasThumbnail = Boolean(preview?.image)
  const previewPosition = hasThumbnail ? 'left-[-12px] w-[270px] whitespace-normal p-3.5 pr-6' : 'left-[calc(100%-6px)] w-[230px] p-4 pr-7'
  const mobileWidth = hasThumbnail ? 'max-[780px]:w-[min(270px,calc(100vw_-_40px))]' : 'max-[780px]:w-[min(230px,calc(100vw_-_40px))]'
  const contentLayout = hasThumbnail ? 'w-full max-w-full min-w-0 grid-cols-1 gap-2.5' : 'gap-[5px]'

  return (
    <span
      id={id}
      role="tooltip"
      className={`link-preview invisible pointer-events-none absolute bottom-[calc(100%+12px)] z-[5] isolate text-blue-dark max-[780px]:right-[-4px] max-[780px]:left-auto ${mobileWidth} ${previewPosition}`}
    >
      <span className="link-preview-layer absolute inset-[5px_-5px_-5px_5px] z-0 bg-blue-soft" aria-hidden="true" />
      <span className="link-preview-paper absolute inset-0 z-[1]" aria-hidden="true" />
      <span className="link-preview-fold absolute right-0 bottom-0 z-[2] size-[22px]" aria-hidden="true" />
      <span className={`link-preview-content relative z-[3] grid ${contentLayout}`}>
        {hasThumbnail && (
          <span className="block aspect-[16/9] w-full max-w-full min-w-0 overflow-hidden rounded-[3px] border border-blue-soft bg-blue-soft">
            <img className="block h-full w-full max-w-full min-w-0 object-cover" src={preview.image} alt={preview.imageAlt ?? ''} style={{ objectPosition: preview.imagePosition ?? 'center' }} />
          </span>
        )}
        {hasThumbnail ? (
          <span className="grid min-w-0 max-w-full gap-1">
            <strong className="text-[15px] font-[650] text-blue-dark">{label}</strong>
            <span className="break-words text-[11px] leading-[1.35] text-ink-soft">{detail}</span>
          </span>
        ) : (
          <>
            <strong className="text-[15px] font-[650] text-blue-dark">{label}</strong>
            <span className="text-[11px] leading-[1.35] text-ink-soft">{detail}</span>
          </>
        )}
        {preview?.tags?.length > 0 && (
          <span className="flex flex-wrap gap-1">
            {preview.tags.map((tag) => <span className="rounded-full bg-blue-soft px-1.5 py-0.5 text-[9px] font-[600] text-blue-dark" key={tag}>{tag}</span>)}
          </span>
        )}
        <span className="overflow-hidden text-[10px] text-ellipsis whitespace-nowrap text-blue-dark">{displayUrl(href)}</span>
      </span>
    </span>
  )
}

export function LinkBadge({ label, href, detail, preview = {}, size = 'large' }) {
  const previewId = `link-preview-${preview.id ?? slugify(label)}`
  const textSize = size === 'large' ? 'text-sm' : 'text-[10px]'

  return (
    <a
      aria-describedby={previewId}
      className={`group link-badge link-preview-trigger inline-flex items-center rounded-full bg-blue-soft px-2 py-1 ${textSize} font-[650] leading-[1.2] whitespace-nowrap !text-blue-dark no-underline transition duration-150 hover:-translate-y-px hover:bg-[#bfdbfe] focus-visible:-translate-y-px focus-visible:bg-[#bfdbfe]`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-blue-dark">{label}</span>
      <BadgeBorder />
      <LinkPreview id={previewId} label={label} href={href} detail={detail} preview={preview} />
    </a>
  )
}
