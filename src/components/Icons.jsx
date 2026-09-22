export function ArrowIcon({ direction = 'up-right', className = '' }) {
  const directionClass = direction === 'up-right' ? '-rotate-45' : direction === 'up' ? '-rotate-90' : ''

  return (
    <svg aria-hidden="true" className={`size-[15px] shrink-0 ${directionClass} ${className}`} viewBox="0 0 20 20" fill="none">
      <path d="M4.5 10h10M10.5 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GithubIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`size-[15px] shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.25c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.28c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`size-[15px] shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.37 7.98H1.25V21h4.12V7.98ZM3.31 1.5a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8ZM21.25 13.54c0-3.92-2.09-5.74-4.88-5.74-2.25 0-3.25 1.24-3.81 2.1V7.98H8.44V21h4.12v-6.45c0-1.7.32-3.35 2.43-3.35 2.08 0 2.1 1.95 2.1 3.46V21h4.12l.04-7.46Z" />
    </svg>
  )
}

export function MailIcon({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`size-[15px] shrink-0 ${className}`} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MenuIcon({ open }) {
  return (
    <svg aria-hidden="true" className="size-[18px]" viewBox="0 0 20 20" fill="none">
      {open ? (
        <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M4 6.5h12M4 13.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  )
}
