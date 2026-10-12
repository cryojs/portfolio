import { useId } from 'react'

export function Burst({ className = '' }) {
  const patternId = useId()
  return (
    <svg
      viewBox="0 0 240 240"
      className={`burst ${className}`}
      fill={
        className.includes('dotted') ? `url(#${patternId})` : 'currentColor'
      }
      aria-hidden="true"
    >
      {className.includes('dotted') && (
        <defs>
          <pattern
            id={patternId}
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2.5" cy="2.5" r="1.35" fill="currentColor" />
          </pattern>
        </defs>
      )}
      <path d="M120 0L135 77L180 15L163 87L235 54L182 108L240 125L179 139L223 195L158 163L166 232L129 181L98 240L96 173L32 211L66 151L0 155L67 120L14 64L86 84L72 10L111 75Z" />
    </svg>
  )
}

const dotShapes = {
  cloud:
    'M31 155C13 148 7 130 17 114C7 99 15 80 33 73C31 52 48 36 69 37C78 20 101 13 120 24C135 10 159 13 172 28C193 24 212 35 216 53C234 57 243 77 234 93C244 108 237 126 220 133C215 151 195 162 175 158C164 175 141 182 121 173C102 185 79 178 69 162C53 169 37 165 31 155Z',
  feather:
    'M18 186C36 99 103 34 221 22C169 75 141 144 119 221C84 203 47 193 18 186Z M38 176C83 160 130 108 182 43C143 112 111 173 101 204C78 190 56 181 38 176Z M60 173C98 141 131 95 165 54C132 116 104 163 91 191C79 183 69 177 60 173Z',
  letter: 'M22 62L211 34L224 170L35 201Z M30 70L121 127L214 48L216 158L38 188Z',
}

export function DottedGraphic({ kind, className = '' }) {
  const patternId = useId()
  return (
    <svg
      viewBox="0 0 240 240"
      className={`dotted-graphic dotted-graphic-${kind} ${className}`}
      fill={`url(#${patternId})`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2.5" cy="2.5" r="1.35" fill="currentColor" />
        </pattern>
      </defs>
      <path d={dotShapes[kind]} />
    </svg>
  )
}

export function PhotoMotif({ variant = 'toronto', className = '' }) {
  return (
    <svg
      viewBox="0 0 240 180"
      className={`photo-motif photo-motif-${variant} ${className}`}
      aria-hidden="true"
    >
      {variant === 'toronto' ? (
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 52V16h54M167 16h53v36M220 129v35h-53" />
          <path d="M30 41V26h30M195 26h15v15" strokeWidth="4" />
          <path d="M18 151h7m6 0h7m6 0h7m6 0h7" strokeWidth="6" />
          <path d="M182 157h25M196 145v25" />
        </g>
      ) : (
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20 137c48-58 108-81 201-98" />
          <path d="M33 153c48-48 113-71 183-83" strokeDasharray="2 11" />
          <path d="M45 24h42v42H45zM154 111h42v42h-42z" />
          <path d="M87 45l67 90M87 135l67-90" strokeDasharray="5 8" />
          <circle cx="135" cy="90" r="8" />
        </g>
      )}
    </svg>
  )
}

// Each page has its own composition, with a shared ink/line/halftone vocabulary.
const compositions = {
  about: {
    blue: 'M-90 160C240 40 310 230 120 470C245 220 75 150-90 270Z M1300 540C1010 740 1180 960 1500 850C1200 930 1180 740 1460 640Z',
    line: 'M-80 110C330 0 350 310 65 560 M-40 140C285 65 290 295 30 515 M1140 1000C930 695 1260 495 1510 570',
    dots: 'M0 360L160 300L220 710L0 800Z M1280 600L1440 650L1440 1000L1340 930Z',
    orbit:
      'M1110 90H1070V160M1290 90H1360V160M1360 300V360H1290M1110 360H1070V300 M1150 140H1290V310H1150Z M1170 120H1310V290',
  },
  work: {
    blue: 'M1180-30H1225L1440 220V270Z M1260-30H1305L1440 125V180Z M1340-30H1385L1440 40V90Z M-90 570L105 775L50 780L-90 630Z M-90 675L205 985H150L-90 735Z',
    line: 'M1030 0L1400 420H1510 M1110 0L1430 360 M-40 500L260 830V1000 M-70 580L205 875V1000',
    dots: 'M1260 220H1440V710H1320Z M0 700L155 860V1000H0Z',
    orbit: 'M1160 790H1490 M1325 625V955 M1205 670H1445V910H1205Z',
  },
  projects: {
    blue: 'M1180 40L1440 180L1270 430Z M1180 40L1110 240L1270 430Z M-80 690L180 560L85 705L280 670L10 890L110 725Z',
    line: 'M1090 0L1450 425 M1040 110L1500 295 M1130 420L1450 50 M-70 820L300 595L135 820L370 740',
    dots: 'M1160 320L1440 400V830L1310 730Z M0 400L200 490L110 880H0Z',
    orbit: 'M-70 930C260 550 390 700 85 1050 M-45 950C275 590 350 730 110 1050',
  },
  contact: {
    blue: 'M1065 272C1085 226 1132 194 1187 198C1204 163 1238 139 1275 143C1313 147 1335 173 1336 204L1390 190L1357 227C1360 277 1315 312 1265 307C1224 342 1151 334 1107 300L1060 324L1080 286Z M1150 245C1182 205 1233 201 1282 235C1258 243 1224 269 1202 303C1185 276 1169 259 1150 245Z',
    line: 'M-140 920C300 680 790 1130 1530 390 M-120 950C350 705 830 1170 1550 420 M1150 246C1190 214 1242 211 1284 235 M1183 221L1205 294 M1205 209L1234 285 M1227 202L1260 272 M1302 145L1308 177 M1335 204L1369 201 M1107 300L1056 303L1084 276 M1208 307L1196 337 M1240 310L1237 341 M1309 181a7 7 0 1 0 .1 0',
    dots: 'M1018 155L1108 122L1172 165L1112 238L1030 226Z M1340 292L1440 250V398L1370 375Z',
    orbit: 'M1000 102C1108 63 1199 83 1288 118C1360 146 1414 113 1476 56 M1018 375C1130 339 1244 356 1345 390C1400 408 1440 405 1490 385',
  },
}

// Poster-like edge compositions leave the central reading area clear.
export default function CyberBackdrop({ page = 'home' }) {
  const id = useId()
  const composition = compositions[page]
  return (
    <div
      className={`cyber-backdrop cyber-backdrop--${page}`}
      aria-hidden="true"
    >
      <div className="cyber-grid" />
      <svg
        className="cyber-fragments"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        {composition ? (
          <>
            <path className="fragment-blue" d={composition.blue} />
            <path className="fragment-line" d={composition.line} />
            <path
              className="fragment-dots"
              d={composition.dots}
              fill={`url(#${id})`}
            />
            <path className="fragment-orbit" d={composition.orbit} />
          </>
        ) : (
          <>
            <path
              className="fragment-blue"
              d="M-80 200L239 20L92 204L316 144L-31 383L172 176Z M1110 -40L1293 178L1251 44L1476 216L1323 -42Z M-65 825L285 605L149 746L401 666L79 908L204 770L-39 993Z"
            />
            <path
              className="fragment-line"
              d="M-30 288L255 90L104 274L369 131 M1127 -32L1305 192L1275 32L1482 218 M-16 849L302 633L168 775L423 691L95 931"
            />
            <path
              className="fragment-dots"
              d="M-40 433L277 294L154 624L-40 757Z M1191 331L1460 185L1440 624L1278 706Z"
              fill={`url(#${id})`}
            />
            <g className="fragment-target" fill="none">
              <ellipse
                cx="1320"
                cy="760"
                rx="230"
                ry="87"
                transform="rotate(-35 1320 760)"
              />
              <ellipse
                cx="1320"
                cy="760"
                rx="207"
                ry="70"
                transform="rotate(-35 1320 760)"
              />
              <path d="M1179 930L1457 579M1114 823L1450 683" />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
