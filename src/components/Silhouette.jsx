import { useId } from 'react'

// Original, single-colour cutouts. Their inset details use the surrounding theme color.
const shapes = {
  // A soft, round-eared teddy peeking over a laptop, with paws at either side.
  bear: 'M58 61C35 62 30 42 40 28C51 13 76 19 82 37C102 30 135 30 155 38C163 19 187 18 198 32C210 49 201 68 183 69C197 87 192 111 175 126C161 138 139 143 119 143C94 143 70 134 55 118C40 102 40 78 58 61Z M93 131C78 143 75 166 82 184L156 184C165 164 158 143 145 132Z M66 158C53 146 38 156 39 173C40 188 54 195 69 184Z M172 158C185 145 201 157 200 173C198 189 183 195 169 183Z M80 184C57 178 46 195 51 212C55 228 76 231 90 219L102 203Z M145 185L136 205C148 226 170 231 183 217C196 200 177 177 157 182Z M72 145H167Q172 145 172 151L167 191H72L66 151Q65 145 72 145Z M59 193H180L188 203Q188 208 180 208H58Q50 208 51 203L59 193Z',
  // A tapered feather with a fine split shaft, dipping into a faceted ink bottle.
  quill:
    'M204 12C164 19 133 43 120 72L134 67L115 85C108 102 108 121 113 138L100 161L105 164L124 137C147 137 167 128 181 114L164 116C185 101 196 88 203 72L184 81L207 58C211 40 208 23 204 12ZM191 35L126 122L116 137L122 118L191 35ZM76 163C76 156 117 156 117 163L117 172L132 184L136 208C137 219 129 226 117 226H77C65 226 57 219 58 208L62 184L77 172L76 163ZM83 164C83 168 110 168 110 164C110 160 83 160 83 164ZM97 185L108 201L97 216L86 201L97 185Z',
  letter:
    'M21 77L192 41L225 164L54 203L21 77ZM35 81L126 123L183 52L128 110L35 81ZM60 186L107 130L99 126L60 186ZM137 124L211 159L143 116L137 124Z',
}

// Interior details sit on a theme-matched layer instead of opening to a stray color.
const cutouts = {
  quill:
    'M191 35L126 122L116 137L122 118L191 35ZM83 164C83 168 110 168 110 164C110 160 83 160 83 164ZM97 185L108 201L97 216L86 201L97 185Z',
  letter:
    'M35 81L126 123L183 52L128 110L35 81ZM60 186L107 130L99 126L60 186ZM137 124L211 159L143 116L137 124Z',
}

export default function Silhouette({ kind, className = '', finish }) {
  const faceId = useId()
  const gradientId = useId()
  const fill = finish === 'cobalt' ? `url(#${gradientId})` : 'currentColor'
  return (
    <svg
      className={`silhouette silhouette-${kind} ${className}`}
      viewBox="0 0 240 240"
      aria-hidden="true"
      fill={fill}
    >
      {finish === 'cobalt' && (
        <defs>
          <linearGradient id={gradientId} x1="40" y1="20" x2="190" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7d9aff" />
            <stop offset=".45" stopColor="#3b59f4" />
            <stop offset="1" stopColor="#172ca8" />
          </linearGradient>
        </defs>
      )}
      {kind === 'bear' && (
        <defs>
          <mask id={faceId}>
            <rect width="240" height="240" fill="white" />
            <circle cx="60" cy="42" r="9" fill="black" />
            <circle cx="178" cy="44" r="9" fill="black" />
            <ellipse cx="87" cy="89" rx="6" ry="8" fill="black" />
            <ellipse cx="151" cy="89" rx="6" ry="8" fill="black" />
            <ellipse cx="119" cy="104" rx="6" ry="4" fill="black" />
            <path
              d="M119 107V112M106 111Q112 119 119 113Q126 120 132 111"
              fill="none"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M73 152H165L161 185H78Z" fill="black" />
            <path
              d="M119 164C109 153 100 169 119 178C138 169 129 153 119 164Z"
              fill="white"
            />
            <path
              d="M61 200H177"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </mask>
        </defs>
      )}
      {kind === 'bear' ? (
        <g className="graphic-body">
          <g fill="var(--graphic-cutout)">
            {shapes.bear.split(' M').map((part, index) => (
              <path key={index} d={index ? `M${part}` : part} />
            ))}
          </g>
          <g mask={`url(#${faceId})`}>
            {shapes.bear.split(' M').map((part, index) => (
              <path key={index} d={index ? `M${part}` : part} />
            ))}
          </g>
        </g>
      ) : (
        <g className="graphic-body">
          <path d={shapes[kind]} fill={fill} fillRule="evenodd" />
          <path d={cutouts[kind]} fill="var(--graphic-cutout)" />
        </g>
      )}
    </svg>
  )
}
