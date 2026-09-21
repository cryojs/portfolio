export function HeroUnderline() {
  return (
    <svg className="hero-scribble" viewBox="0 0 180 22" aria-hidden="true">
      <path d="M3 9C24 14 48 4 70 9C94 15 116 5 141 9C155 11 166 9 177 6" />
      <path className="doodle-echo" d="M5 14C31 10 51 17 77 12C102 7 128 16 174 10" />
      <path className="doodle-echo" d="M13 18C48 13 73 18 105 14C130 11 151 15 169 13" />
    </svg>
  )
}

export function ProjectSpark() {
  return (
    <svg className="heading-doodle heading-doodle--spark" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M29 3C28 13 27 20 23 25C18 29 12 31 4 32C13 33 20 35 24 40C27 44 28 49 29 54C31 46 33 40 38 36C42 33 47 32 53 31C45 29 39 27 35 23C31 18 30 11 29 3Z" />
      <path className="doodle-echo" d="M42 7L41 17M37 12L47 11" />
    </svg>
  )
}

function CoffeeCup() {
  return (
    <svg className="heading-doodle heading-doodle--coffee" viewBox="0 0 56 56" aria-hidden="true">
      <path d="M17 12C13 9 20 7 17 3M28 12C24 9 31 7 28 3" />
      <path d="M9 19C16 16 36 16 44 20L41 37C40 44 15 45 13 37L9 19Z" />
      <path d="M12 20C19 23 35 24 43 20M15 26C22 28 34 28 41 26" />
      <path d="M43 24C51 21 53 29 49 34C47 37 44 37 41 36" />
      <path className="doodle-echo" d="M10 45C20 48 37 48 47 44M15 22C22 25 35 25 41 22" />
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

export function HeadingDoodle({ type }) {
  if (type === 'experience') return <CoffeeCup />
  if (type === 'projects') return <ProjectSpark />
  if (type === 'skills') return <SkillsTool />
  if (type === 'education') return <EducationBook />
  if (type === 'contact') return <ContactBubble />
  return null
}

export function ContactLoop() {
  return (
    <svg className="contact-doodle" viewBox="0 0 260 170" aria-hidden="true">
      <path d="M246 27C222 15 191 13 170 24C151 34 143 50 149 65C156 81 177 88 199 82C220 77 232 62 225 47C218 31 195 24 175 30C151 36 136 53 123 75C108 102 91 125 61 136C42 143 27 141 13 137" />
      <path d="M30 126C24 132 20 135 13 137C19 141 24 145 29 151" />
      <path className="doodle-echo" d="M249 32C225 18 194 18 173 28C157 36 149 51 154 63C160 76 179 82 197 77C215 72 225 60 220 49C214 37 196 31 179 35C157 41 143 57 130 79C114 106 95 132 63 141C43 147 28 144 16 140" />
      <path className="doodle-echo" d="M32 130C26 134 21 137 15 140C21 143 25 148 27 154" />
      <path className="doodle-echo" d="M236 20L242 21M226 13L231 8M250 43L257 45" />
    </svg>
  )
}
