export function ScribbleUnderline({ children }) {
  const isLong = String(children).length > 6

  return (
    <span className="scribble-underline">
      <span className="relative z-[1]">{children}</span>
      <svg className={`scribble-underline-svg${isLong ? ' scribble-underline-svg--long' : ''}`} viewBox={isLong ? '0 0 280 22' : '0 0 180 22'} preserveAspectRatio="none" aria-hidden="true">
        <path d={isLong ? 'M2 10C28 3 54 15 82 9S136 4 164 10S220 15 278 7' : 'M3 9C24 14 48 4 70 9C94 15 116 5 141 9C155 11 166 9 177 6'} />
        <path className="scribble-underline-echo" d={isLong ? 'M5 14C37 8 69 18 105 13S174 8 211 14S251 16 278 11' : 'M5 14C31 10 51 17 77 12C102 7 128 16 174 10'} />
      </svg>
    </span>
  )
}

export function ProjectSpark() {
  return (
    <svg className="heading-doodle heading-doodle--spark" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M14 12C14 11 15 10 17 10H39C41 10 42 11 42 13V31C42 33 41 34 39 34H17C15 34 14 33 14 31V12Z" />
      <path className="doodle-echo" d="M18 14H38V30H18V14Z" />
      <path className="keyboard-deck-fill" d="M14 33Q14 32.5 15 33H42Q42.5 33 43 33.5L48 39V40Q48 42 46 42H22Q20.5 42 19.5 41L14 35Q13 34 14 33Z" />
      <path className="keyboard-deck-outline" d="M14 33Q14 32.5 15 33H42Q42.5 33 43 33.5L48 39V40Q48 42 46 42" />
      <path className="keyboard-deck-outline" d="M22 42Q20.5 42 19.5 41L14 35Q13 34 14 33" />
      <path className="keyboard-bottom-edge" d="M22 42H46" />
      <path className="doodle-echo keyboard-lines" d="M18 35L42 35M21 38L42 38M25 35L26 37M30 35L31 38M35 35L36 38M40 35L41 37" />
      <path className="project-star-solid" d="M9 23C10 27 12 29 16 30C12 31 10 33 9 37C8 33 6 31 3 30C6 29 8 27 9 23Z" />
      <path className="project-star-solid" d="M49 5L50 8L53 9L50 10L49 13L48 10L45 9L48 8L49 5Z" />
    </svg>
  )
}

function BubbleTea() {
  return (
    <svg className="heading-doodle heading-doodle--bubble-tea" viewBox="0 0 56 84" aria-hidden="true">
      <path className="bubble-tea-straw" d="M27 57L33 4L37 4L31 57Z" />
      <path d="M11 28C18 25 38 25 45 28L41 73C34 80 20 80 14 73L11 28Z" />
      <path d="M11 28C18 32 37 32 45 28L43 23C35 20 21 20 13 23L11 28Z" />
      <path className="doodle-echo" d="M15 43C22 46 35 46 42 43M18 60C18 57 22 57 22 60C22 63 18 63 18 60ZM28 68C28 65 32 65 32 68C32 71 28 71 28 68ZM35 55C35 52 39 52 39 55C39 58 35 58 35 55Z" />
    </svg>
  )
}

function SkillsTool() {
  return (
    <svg className="heading-doodle heading-doodle--tool" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M35 7C29 8 25 13 26 19L9 36C6 39 7 45 11 47C14 49 18 48 21 45L38 28C44 29 49 25 50 19L42 22L36 16L39 8C38 7 37 7 35 7Z" />
      <path className="doodle-echo" d="M13 39L18 44M31 23L36 28" />
    </svg>
  )
}

function EducationBook() {
  return (
    <svg className="heading-doodle heading-doodle--book" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M28 15C21 9 13 9 7 12V42C15 39 22 40 28 45C34 40 41 39 49 42V12C42 9 34 9 28 15Z" />
      <path d="M28 15V45M12 18C17 16 21 17 24 19M33 19C37 16 42 16 46 18" />
      <path className="doodle-echo" d="M10 46C17 43 23 45 28 49C34 45 40 43 47 46" />
    </svg>
  )
}

function ContactBubble() {
  return (
    <svg className="heading-doodle heading-doodle--contact" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M9 13C17 5 38 6 47 16C54 24 50 36 40 41C32 45 22 43 17 40L7 48L10 35C5 29 4 20 9 13Z" />
      <path d="M17 25C18 23 20 24 21 25M27 26C29 23 31 24 31 26M38 24C40 23 41 25 41 26" />
      <path className="doodle-echo" d="M11 15C19 8 37 8 45 17C51 24 48 34 40 39C33 43 24 42 18 39L10 45" />
    </svg>
  )
}

const headingDoodles = {
  experience: BubbleTea,
  projects: ProjectSpark,
  skills: SkillsTool,
  education: EducationBook,
  contact: ContactBubble,
}

export function HeadingDoodle({ type }) {
  const Doodle = headingDoodles[type]
  return Doodle ? <Doodle /> : null
}

export function ContactLoop() {
  return (
    <svg className="contact-doodle" viewBox="0 0 360 280" aria-hidden="true">
      <path d="M346 200C354 181 346 151 322 138C295 125 270 140 270 169C270 195 298 207 319 190C340 173 332 139 309 108C278 74 243 58 214 70C182 87 181 120 205 145C231 169 266 182 270 210C274 237 257 256 239 260C232 261 226 261 220 260" />
      <path d="M244 238C234 247 224 257 220 260C230 263 240 270 248 276" />
      <path className="doodle-echo contact-loop-motif" d="M324 119C334 131 338 144 339 156" />
      <path className="doodle-echo contact-loop-motif" d="M282 207C296 213 310 209 321 199" />
      <path className="doodle-echo contact-loop-motif" d="M208 160C225 173 241 180 255 184" />
      <path className="doodle-echo contact-loop-motif" d="M281 221C281 235 274 247 264 254" />
      <path className="doodle-echo" d="M236 20L242 21M226 13L231 8M250 43L257 45" />
    </svg>
  )
}
