import { useId } from 'react'

// The same cobalt silhouette and theme-matched cutouts as the bear and letter.
export default function ProjectGlyph() {
  const id = useId()
  return (
    <svg className="project-glyph" viewBox="0 0 240 240" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="40" y1="20" x2="190" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7d9aff" />
          <stop offset=".45" stopColor="#3b59f4" />
          <stop offset="1" stopColor="#172ca8" />
        </linearGradient>
      </defs>
      <g className="graphic-body">
        <path d="M27 58 197 41 213 185 43 202Z" fill={`url(#${id})`} />
        <g fill="var(--graphic-cutout)" stroke="var(--graphic-cutout)">
          <path d="m30 87 170-17" fill="none" strokeWidth="4" />
          <circle cx="43" cy="72" r="3" stroke="none" />
          <circle cx="55" cy="71" r="3" stroke="none" />
          <circle cx="67" cy="70" r="3" stroke="none" />
          <path d="m87 115-23 22 27 17m62-46 27 17-23 22m-24-42-16 56" fill="none" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
