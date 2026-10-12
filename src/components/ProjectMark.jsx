export default function ProjectMark({ kind }) {
  return <svg className={`project-mark project-mark-${kind}`} viewBox="0 0 240 180" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="3">
    {kind === 'friction' && <><rect x="22" y="22" width="168" height="112" rx="4" /><path d="M22 45h168M43 33h4m10 0h4m10 0h4M68 75l-16 16 16 16m54-32 16 16-16 16m-21-40-14 48M165 101l43 26-21 5-9 24z" /></>}
    {kind === 'readify' && <><path d="M25 35q45-18 90 8 45-26 90-8v110q-45-18-90 8-45-26-90-8zM115 43v110M43 63q28-7 52 6m-52 15q28-7 52 6m-52 15q28-7 52 6M136 69h48m-48 22h48m-48 22h31" /></>}
    {kind === 'refrain' && <><circle cx="115" cy="91" r="66" /><circle cx="115" cy="91" r="53" strokeDasharray="2 10" /><path d="M103 65v51m24-51v51M91 13h48m-24 0v12" strokeWidth="7" /></>}
    {kind === 'tidebreak' && <><path d="M10 125q25-30 50 0t50 0 50 0 50 0M10 146q25-30 50 0t50 0 50 0 50 0M28 102V74h46V47h46V20h46M165 47l20-15 20 15-20 26z" /><path d="M39 86h12m34-28h12m34-27h12" strokeWidth="5" /></>}
  </svg>
}
