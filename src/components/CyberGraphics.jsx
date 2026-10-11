import { useId } from 'react'

export function Burst({ className = '' }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={`burst ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M120 0L135 77L180 15L163 87L235 54L182 108L240 125L179 139L223 195L158 163L166 232L129 181L98 240L96 173L32 211L66 151L0 155L67 120L14 64L86 84L72 10L111 75Z" />
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
      'M1220 70L1245 190L1370 215L1245 240L1220 360L1195 240L1070 215L1195 190Z',
  },
  work: {
    blue: 'M1180-30H1225L1440 220V270Z M1260-30H1305L1440 125V180Z M1340-30H1385L1440 40V90Z M-90 570L105 775L50 780L-90 630Z M-90 675L205 985H150L-90 735Z',
    line: 'M1030 0L1400 420H1510 M1110 0L1430 360 M-40 500L260 830V1000 M-70 580L205 875V1000',
    dots: 'M1260 220H1440V710H1320Z M0 700L155 860V1000H0Z',
    orbit: 'M1160 790H1490 M1325 625V955 M1205 670H1445V910H1205Z',
  },
  projects: {
    blue: 'M1370 40L1355 180L1460 100L1387 220L1540 235L1375 260L1450 380L1330 285L1300 435L1288 280L1150 355L1240 240L1090 190L1250 205L1190 70L1305 170Z M-80 690L180 560L85 705L280 670L10 890L110 725Z',
    line: 'M1090 0L1450 425 M1040 110L1500 295 M1130 420L1450 50 M-70 820L300 595L135 820L370 740',
    dots: 'M1160 320L1440 400V830L1310 730Z M0 400L200 490L110 880H0Z',
    orbit: 'M-70 930C260 550 390 700 85 1050 M-45 950C275 590 350 730 110 1050',
  },
  contact: {
    blue: 'M1110 40L1140 175L1270 205L1140 230L1110 365L1082 230L950 205L1082 175Z',
    line: 'M-140 920C300 680 790 1130 1530 390 M-120 950C350 705 830 1170 1550 420',
    dots: 'M1260 590L1440 490V940L1290 1000Z',
    orbit: 'M-80 665C210 490 380 675 115 895C-70 1040-245 875-80 665Z',
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
