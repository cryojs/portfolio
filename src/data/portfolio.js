export const profile = {
  name: 'Jason Sun',
  firstName: 'Jason',
  lastName: 'Sun',
  email: 'jasonsun.dev@gmail.com',
  currentProjectId: 'readify',
  links: {
    github: 'https://github.com/CryoJS',
    linkedin: 'https://www.linkedin.com/in/jasonsuncs/',
    dmoj: 'https://dmoj.ca/user/Vastaway',
    leetcode: 'https://leetcode.com/u/Vastaway/',
  },
}

export const education = {
  school: 'University of Waterloo',
  degree: 'Bachelor of Computer Science, Co-op',
  location: 'Waterloo, ON',
  dates: 'Sept. 2026 — expected May 2031',
}

export const experience = [
  {
    id: 'career-education-council',
    role: 'iOS Developer (Co-op)',
    company: 'Career Education Council',
    logo: '/logos/develop-the-future-program.jpg',
    location: 'Remote',
    dates: 'Sept. 2024 — Jan. 2025',
    highlights: [
      'Built 10 iOS applications in Swift, UIKit, and SwiftUI through an Apple-supported development program, incorporating code and UX feedback from industry engineers into each release.',
      'Designed and built a SwiftUI productivity app prototype and presented the finished application, visual presentation, and elevator pitch to a panel of industry developers and judges.',
    ],
  },
  {
    id: 'usaco-guide',
    role: 'Open Source Contributor',
    company: 'USACO Guide',
    logo: '/logos/cpinitiative.jpg',
    location: 'Remote',
    dates: 'Oct. 2024 — Dec. 2024',
    highlights: [
      'Authored 6 pull requests adding editorial solutions, test cases, and algorithmic guides for competitive programmers.',
    ],
  },
  {
    id: 'three-flavors',
    role: 'Computer Camp Assistant',
    company: 'Three-Flavors Summer Camp',
    logo: '/logos/threeflavors.webp',
    location: 'Richmond Hill, ON',
    dates: 'July 2023',
    highlights: [
      'Taught Python fundamentals and core programming logic to 15+ students, helping every student complete their first working program.',
    ],
  },
]

export const projects = [
  {
    id: 'friction',
    title: 'Friction',
    dates: 'Sept. 2026',
    description: 'An AI-powered QA control room that tests live websites, surfaces UX friction, verifies fixes, and creates pull requests.',
    tech: ['React', 'TypeScript', 'Browserbase', 'OpenAI API', 'React Flow'],
    github: 'https://github.com/CryoJS/friction',
    live: 'https://friction-d95.pages.dev/',
    media: {
      image: '/projects/friction/cover.png',
      alt: 'Friction Paths view showing site routes, assigned agents, and scan results',
      position: 'center',
    },
  },
  {
    id: 'readify',
    title: 'Readify',
    dates: 'Sept. 2026 — present',
    spotlightDescription: 'a browser extension to simplify reading',
    description: 'A cross-browser accessibility extension that personalizes typography and uses AI to explain and answer questions about webpages.',
    tech: ['WXT', 'React', 'TypeScript', 'Gemini API'],
    github: 'https://github.com/CryoJS/readify',
    media: {
      image: '/projects/readify/cover.png',
      alt: 'Readify browser extension answering a question about a webpage',
      position: 'center top',
    },
  },
  {
    id: 'refrain',
    title: 'Refrain',
    dates: 'July 2026 — Sept. 2026',
    description: 'A customizable Pomodoro workspace with accurate background timers, reorderable tasks, notes, and live activity visualizations.',
    tech: ['Next.js', 'React', 'TypeScript', 'dnd-kit', 'Recharts'],
    github: 'https://github.com/CryoJS/refrain',
    live: 'https://refrain-timer.vercel.app/',
    media: {
      image: '/projects/refrain/cover.png',
      alt: 'Refrain focus timer beside a task list',
      position: 'center',
    },
  },
  {
    id: 'tidebreak',
    title: 'Tidebreak',
    dates: 'Apr. 2026 — July 2026',
    description: 'A 2D platformer with custom movement and water physics, plus a complete in-game level editor with undo and redo.',
    tech: ['C#', 'MonoGame', 'Gum UI'],
    github: 'https://github.com/CryoJS/tidebreak',
    media: {
      variant: 'tidebreak',
      gameplay: '/projects/tidebreak/gameplay.png',
      editor: '/projects/tidebreak/editor.png',
      alt: 'Tidebreak gameplay and in-game level editor',
    },
  },
]

export const projectsById = Object.fromEntries(projects.map((project) => [project.id, project]))

export const skillGroups = [
  {
    id: 'languages',
    label: 'Languages',
    values: ['Python', 'C++', 'C#', 'Swift', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  },
  {
    id: 'frameworks-tools',
    label: 'Frameworks & tools',
    values: ['React', 'Next.js', 'WXT', 'React Flow', 'Browserbase', 'OpenAI API', 'Gemini API', 'Supabase', 'Git'],
  },
]

export const navigation = [
  { id: 'intro', label: 'hello' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]
