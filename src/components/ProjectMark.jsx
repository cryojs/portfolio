import { useId } from 'react'

// Static chrome collages: inspection, reading, focus, and flood escape
export default function ProjectMark({ kind }) {
  const id = useId()
  const chrome = `url(#${id}-chrome)`
  return <svg className={`project-mark project-mark-${kind}`} viewBox="0 0 240 180" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2=".8" y2="1">
        <stop stopColor="#fafbff"/><stop offset=".3" stopColor="#8195c0"/><stop offset=".48" stopColor="#f5f8ff"/><stop offset=".51" stopColor="#263453"/><stop offset=".8" stopColor="#9cadd0"/><stop offset="1" stopColor="#e4edff"/>
      </linearGradient>
      <pattern id={`${id}-check`} width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 0h6v6H0zM6 6h6v6H6z" fill="currentColor"/></pattern>
    </defs>
    <path d="M6 46V18h32M206 18h28v28M6 136v28h32M206 164h28v-28" stroke="currentColor" opacity=".45"/>
    <path d="M17 153h60v12H17zM178 12h48v12h-48z" fill={`url(#${id}-check)`}/>
    {kind === 'friction' && <>
      <ellipse cx="119" cy="89" rx="101" ry="32" transform="rotate(-32 119 89)" stroke="currentColor"/>
      <path d="M120 17l20 44 45 25-45 24-20 48-22-48-45-24 45-25z" fill={chrome}/>
      <path d="M120 17v69H53l45-25zM120 158V86h65l-45 24z" fill="#0a1029" opacity=".6"/>
      <circle cx="120" cy="86" r="26" fill="#0a1029" stroke="currentColor"/>
      <path d="M106 86l9 9 21-24M120 39v12M120 121v12M73 86h12M155 86h12" stroke="currentColor" strokeWidth="3"/>
      <path d="M170 114l40 15-19 5-4 20z" fill={chrome}/>
    </>}
    {kind === 'readify' && <>
      <path d="M30 57l83-33 95 40-84 95z" stroke="currentColor" opacity=".5"/>
      <path d="M43 43l69 15 83-38-15 111-69 32-81-31z" fill={chrome}/>
      <path d="M112 58l-1 105-81-31 13-89z" fill="#0a1029" opacity=".65"/>
      <path d="M112 58l-1 105M56 70l39 10M53 88l40 11M51 106l39 11M130 66l45-20M128 86l44-20M126 106l30-14" stroke="currentColor" strokeWidth="2"/>
      <path d="M198 87l5 22 22 5-22 6-5 22-6-22-22-6 22-5z" fill={chrome}/>
      <path d="M16 139L221 37" stroke="currentColor" opacity=".65"/>
    </>}
    {kind === 'refrain' && <>
      <g transform="translate(120 90)">
        {Array.from({length:20},(_,i)=><path key={i} d="M-4-43L-9-77 9-77 4-43Z" fill={i%4===0?'currentColor':chrome} transform={`rotate(${i*18})`}/>)}
        <circle r="34" stroke="currentColor"/>
        <path d="M-11-15h7v30h-7zM4-15h7v30H4z" fill={chrome}/>
      </g>
      <ellipse cx="120" cy="90" rx="113" ry="34" transform="rotate(-27 120 90)" stroke="currentColor"/>
      <path d="M15 137l44-11-21 26zM197 27l27 3-19 22z" fill={chrome}/>
    </>}
    {kind === 'tidebreak' && <>
      <path d="M29 136h39v-31h39V74h39V43h39V15h28v151H29z" fill={chrome}/>
      <path d="M68 105l16 13v31H45l-16-13h39zm39-31 16 13v31H84l-16-13h39zm39-31 16 13v31h-39l-16-13h39z" fill="#0a1029" opacity=".65"/>
      <path d="M5 130l30-19 31 23 29-19 33 22 33-15v51H5z" fill="#172ce8" stroke="currentColor"/>
      <path d="M7 146l28-17 31 23 29-19 33 22 33-15M8 161h39m10 0h40m12 0h38" stroke="currentColor" opacity=".7"/>
      <path d="M83 84l73-65-5 33-10-13-47 53zM151 19l33-5-9 33-9-17z" fill={chrome}/>
      <path d="M186 46h23m-23 9h23m-23 9h23" stroke="#0a1029"/>
    </>}
  </svg>
}
