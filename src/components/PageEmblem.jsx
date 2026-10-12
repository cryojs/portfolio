import { useId } from 'react'
import BobaEmblem from './BobaEmblem'

// Original vector collages: optics, mechanical assemblies, cut-paper fins, and
// correspondence. No reference artwork is embedded or traced.
export default function PageEmblem({ kind, className = '' }) {
  const id = useId()
  const ink = `url(#${id}-ink)`
  const dots = `url(#${id}-dots)`
  const checker = `url(#${id}-check)`
  if (kind === 'about') return <BobaEmblem className={className} />
  return (
    <svg viewBox="0 0 400 400" className={`page-emblem emblem-${kind} ${className}`} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id={`${id}-ink`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#172ce8"/><stop offset=".42" stopColor="#667ff7"/><stop offset=".55" stopColor="#e4eaff"/><stop offset=".65" stopColor="#172ce8"/><stop offset="1" stopColor="#080f58"/>
        </linearGradient>
        <pattern id={`${id}-dots`} width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.25" fill="currentColor"/></pattern>
        <pattern id={`${id}-check`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 0h10v10H0zM10 10h10v10H10z" fill="currentColor"/></pattern>
      </defs>
      {kind === 'work' && <>
        <path d="M12 202L211 19l177 173-210 189Z" fill={dots} opacity=".5"/>
        <g transform="translate(242 117)">
          {Array.from({length: 28}, (_, i) => <path key={i} d="M-3-44L-6-88H6L3-44Z" fill="currentColor" transform={`rotate(${i * 360 / 28})`}/>)}
          <circle r="35" stroke="currentColor" strokeWidth="3"/>
        </g>
        <g transform="rotate(-32 200 200)">
          <rect x="67" y="118" width="209" height="118" rx="59" stroke={ink} strokeWidth="27"/>
          <rect x="136" y="205" width="199" height="109" rx="54" stroke="currentColor" strokeWidth="20"/>
          <path d="M125 177h91M189 259h91" stroke="var(--foreground, #f1f1f4)" strokeWidth="2"/>
        </g>
        <path d="M12 262l105 7 184-201 90-11-112 41-164 223Z" fill={ink}/>
        <g transform="rotate(12 200 200)">
          <rect x="153" y="125" width="90" height="154" rx="12" fill="var(--surface)" stroke="currentColor" strokeWidth="5" />
          <path d="M180 137h36M186 171l-17 20 17 20m25-40 17 20-17 20M190 262h17" stroke={ink} strokeWidth="4" />
        </g>
        <path d="M41 338h110v23H41zM320 211h20v88h-20z" fill={checker}/>
        <path d="M33 80h46M56 57v46M351 322h24m-12-12v24" stroke="currentColor" strokeWidth="3"/>
      </>}
      {kind === 'projects' && <>
        <path d="M63 63L336 37 373 310 94 354Z" fill={dots} opacity=".6"/>
        <g transform="translate(233 149) rotate(20)">
          {Array.from({length: 16}, (_, i) => <path key={i} d="M5-20L22-131 36-99 17-13Z" fill={i % 3 === 0 ? ink : 'currentColor'} transform={`rotate(${i * 16})`}/>)}
        </g>
        <path d="M25 343L124 190 150 222 299 36 216 228 187 220 123 365 109 275Z" fill={ink}/>
        <g transform="rotate(36 190 210)">
          <path d="M177 92h26v181l-13 35-13-35z" fill="var(--surface)" stroke="currentColor" strokeWidth="4" />
          <path d="M177 116h26M177 269h26m-13 0v25" stroke={ink} strokeWidth="4" />
        </g>
        <path d="M34 346L184 192 313 49M59 366L330 269" stroke="var(--foreground, #f1f1f4)" strokeWidth="1.5"/>
        <path d="M57 108l81 22-81 25zM281 304l68-38-24 83z" fill="currentColor"/>
        <ellipse cx="197" cy="231" rx="174" ry="49" stroke="currentColor" strokeWidth="2" transform="rotate(-36 197 231)"/>
        <path d="M42 50h70v22H42zM264 364h82v16h-82z" fill={checker}/>
        <circle cx="325" cy="161" r="14" fill="currentColor"/><circle cx="325" cy="161" r="6" fill="var(--surface, #08090d)"/>
      </>}
      {kind === 'contact' && <>
        <ellipse cx="207" cy="210" rx="159" ry="125" fill={dots} transform="rotate(-28 207 210)" opacity=".6"/>
        <path d="M19 204C28 45 324 41 373 139C265 20 43 135 19 204Z" fill={ink}/>
        <path d="M21 201C45 334 347 311 377 131C332 369 43 353 21 201Z" fill="currentColor"/>
        <g transform="rotate(-18 200 200)">
          <path d="M89 142h206v140H89Z" fill="var(--surface, #08090d)" stroke="currentColor" strokeWidth="5"/>
          <path d="M89 142l103 86 103-86M89 282l78-73m128 73-78-73" stroke={ink} strokeWidth="6"/>
          <path d="M266 154h17v24h-17z" fill={checker}/>
        </g>
        <path d="M18 323C89 305 318 84 385 61" stroke="var(--foreground, #f1f1f4)" strokeWidth="2"/>
        <path d="M296 69l60-15-35 49Z" fill="currentColor"/>
        <path d="M35 87h64v20H35zM302 327h52v20h-52z" fill={checker}/>
        <circle cx="86" cy="297" r="16" fill="currentColor"/><circle cx="86" cy="297" r="7" fill="var(--surface, #08090d)"/>
      </>}
    </svg>
  )
}

export function MotifRule({ variant = 'about' }) {
  return <div className={`motif-rule motif-rule-${variant}`} aria-hidden="true">
    <svg viewBox="0 0 900 32" preserveAspectRatio="xMidYMid meet" fill="none">
      <path d="M0 16h246M512 16h388" stroke="currentColor" strokeWidth="1"/>
      <path d="M257 7h8v8h-8zm8 8h8v8h-8zm8-8h8v8h-8zm8 8h8v8h-8zm8-8h8v8h-8zM390 6l-14 10 14 10v-8l11 8V6l-11 8z" fill="currentColor"/>
      <ellipse cx="331" cy="16" rx="18" ry="8" transform="rotate(-20 331 16)" stroke="currentColor" strokeWidth="2"/>
      <circle cx="331" cy="16" r="4" fill="currentColor"/>
      <path d="M426 3v26m7-20v15m7-20v25m7-18v11m7-19v26M475 6h20v20h-20z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  </div>
}
