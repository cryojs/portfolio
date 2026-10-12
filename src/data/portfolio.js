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
  dates: 'Sept. 2026 to expected May 2031',
}

export const experience = [
  {
    id: 'career-education-council',
    tech: ['Swift', 'SwiftUI', 'UIKit'],
    role: 'iOS Developer (Co-op)',
    company: 'Career Education Council',
    website: 'https://www.careereducationcouncil.ca/',
    shortContribution: 'built 10 iOS apps with Swift, UIKit, and SwiftUI.',
    logo: '/logos/develop-the-future-program.jpg',
    location: 'Remote',
    dates: 'Sept. 2024 to Jan. 2025',
    highlights: [
      'Built 10 iOS applications in Swift, UIKit, and SwiftUI through an Apple-supported development program, incorporating code and UX feedback from industry engineers into each release.',
      'Designed and built a SwiftUI productivity app prototype and presented the finished application, visual presentation, and elevator pitch to a panel of industry developers and judges.',
    ],
  },
  {
    id: 'usaco-guide',
    tech: ['Open source', 'Algorithms', 'Editorials'],
    role: 'Open Source Contributor',
    company: 'USACO Guide',
    website: 'https://usaco.guide/',
    shortContribution: 'contributed 6 pull requests with algorithm explanations, solutions, and test cases.',
    logo: '/logos/cpinitiative.jpg',
    location: 'Remote',
    dates: 'Oct. 2024 to Dec. 2024',
    highlights: [
      'Authored 6 pull requests adding editorial solutions, test cases, and algorithmic guides for competitive programmers.',
    ],
  },
  {
    id: 'three-flavors',
    tech: ['Python', 'Teaching', 'Mentorship'],
    role: 'Computer Camp Assistant',
    company: 'Three-Flavors Summer Camp',
    website: 'https://threeflavors.org/',
    shortContribution: 'taught Python and programming fundamentals to 15+ students.',
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
    id: 'readify',
    title: 'Readify',
    dates: 'Sept. 2026',
    spotlightDescription: 'a browser extension available on Chrome and Firefox',
    description: 'A cross-browser accessibility extension that personalizes typography and uses AI to explain and answer questions about webpages.',
    tech: ['WXT', 'React', 'TypeScript', 'Gemini API', 'Groq API', 'xAI API'],
    github: 'https://github.com/CryoJS/readify',
    storeLinks: [
      { label: 'Chrome', href: 'https://chromewebstore.google.com/detail/readify/cpdfcocmpacdfogkbgjggdokppbffafb' },
      { label: 'Firefox', href: 'https://addons.mozilla.org/en-CA/firefox/addon/readify-web/' },
    ],
    media: {
      image: '/projects/readify/wiki-ask-ai.png',
      width: 1093,
      height: 1168,
      video: '/projects/readify/showcase.mp4',
      alt: 'Readify browser extension answering a question about a webpage',
      position: 'center top',
      gallery: [
        {
          type: 'video',
          src: '/projects/readify/showcase.mp4',
          poster: '/projects/readify/video-poster.jpg',
          alt: 'Readify browser extension demo on Wikipedia',
        },
        {
          type: 'image',
          src: '/projects/readify/wiki-base.png',
          caption: 'original page · before Readify',
          alt: 'Readify on a Wikipedia article before accessibility settings are applied',
        },
        {
          type: 'image',
          src: '/projects/readify/wiki-ask-ai.png',
          caption: 'ask AI about the page',
          alt: 'Readify asking AI to explain a Wikipedia article',
        },
        {
          type: 'image',
          src: '/projects/readify/wiki-typography.png',
          caption: 'fonts, spacing & readability',
          alt: 'Readify typography controls applied to a Wikipedia article',
        },
      ],
    },
  },
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
      width: 2190,
      height: 1457,
      alt: 'Friction Paths view showing site routes, assigned agents, and scan results',
      position: 'center',
      video: '/projects/friction/Friction - Demo for HTN 2026.webm',
      gallery: [
        {
          type: 'video',
          src: '/projects/friction/Friction - Demo for HTN 2026.webm',
          poster: '/projects/friction/video-poster.jpg',
          alt: 'Friction demo showing an AI website quality scan',
        },
        {
          type: 'image',
          src: '/projects/friction/cover.png',
          caption: 'live routes & agent activity',
          alt: 'Friction Paths view showing site routes, assigned agents, and scan results',
        },
        {
          type: 'image',
          src: '/projects/friction/friction1.png',
          caption: 'start a scan & connect a repository',
          alt: 'Friction project scan workspace',
        },
        {
          type: 'image',
          src: '/projects/friction/friction2.png',
          caption: 'task results & findings',
          alt: 'Friction task graph showing completed and failed tasks with issue severity',
        },
        {
          type: 'image',
          src: '/projects/friction/friction3.png',
          caption: 'site paths & assigned agents',
          alt: 'Friction project findings view',
        },
        {
          type: 'image',
          src: '/projects/friction/friction4.png',
          caption: 'page annotations & UX issues',
          alt: 'Friction project issue review view',
        },
        {
          type: 'image',
          src: '/projects/friction/friction5.png',
          caption: 'scan results by severity',
          alt: 'Friction scan results with task counts and issues grouped by severity',
        },
        {
          type: 'image',
          src: '/projects/friction/friction-howitworks.png',
          caption: 'from website scan to fixes',
          alt: 'Diagram showing how Friction turns website scans into fixes',
        },
        {
          type: 'image',
          src: '/projects/friction/friction-architecture.png',
          caption: 'system architecture',
          alt: 'Friction system architecture diagram',
        },
      ],
    },
  },
  {
    id: 'refrain',
    title: 'Refrain',
    dates: 'July 2026 to Sept. 2026',
    description: 'A customizable Pomodoro workspace with accurate background timers, reorderable tasks, notes, and live activity visualizations.',
    tech: ['Next.js', 'React', 'TypeScript', 'dnd-kit', 'Recharts'],
    github: 'https://github.com/CryoJS/refrain',
    live: 'https://refrain-timer.vercel.app/',
    media: {
      image: '/projects/refrain/refrain-timer.png',
      width: 1626,
      height: 714,
      alt: 'Refrain focus timer beside a task list',
      position: 'center',
      gallery: [
        {
          type: 'image',
          src: '/projects/refrain/refrain-timer.png',
          caption: 'focus timer & to-do list',
          alt: 'Refrain focus timer beside a task list',
        },
        {
          type: 'image',
          src: '/projects/refrain/refrain-stats.png',
          caption: 'study streaks & activity',
          alt: 'Refrain study statistics dashboard',
        },
        {
          type: 'image',
          src: '/projects/refrain/refrain-notes.png',
          caption: 'notes with Markdown preview',
          alt: 'Refrain notes workspace with markdown preview',
        },
        {
          type: 'collage',
          caption: 'timer plans & appearance settings',
          alt: 'Refrain timer plans and appearance settings',
          images: [
            { src: '/projects/refrain/refrain-settings1.png' },
            { src: '/projects/refrain/refrain-settings2.png' },
          ],
        },
      ],
    },
  },
  {
    id: 'tidebreak',
    title: 'Tidebreak',
    dates: 'Apr. 2026 to July 2026',
    description: 'A 2D platformer with custom movement and water physics, plus a complete in-game level editor with undo and redo.',
    tech: ['C#', 'MonoGame', 'Gum UI'],
    github: 'https://github.com/CryoJS/tidebreak',
    media: {
      variant: 'tidebreak',
      gameplay: '/projects/tidebreak/tidebreak-gameplay-sliding.png',
      width: 1780,
      height: 1017,
      editor: '/projects/tidebreak/tidebreak-mapeditor.png',
      alt: 'Tidebreak gameplay and in-game level editor',
      gallery: [
        {
          type: 'image',
          src: '/projects/tidebreak/tidebreak-gameplay-sliding.png',
          caption: 'sliding through tranquil forest',
          alt: 'Tidebreak platformer gameplay showing a slide through a level',
        },
        {
          type: 'image',
          src: '/projects/tidebreak/tidebreak-walljump.png',
          caption: 'wall-jump gameplay',
          alt: 'Tidebreak platformer wall-jump gameplay',
        },
        {
          type: 'image',
          src: '/projects/tidebreak/tidebreak-mapselection.png',
          caption: 'choose a level',
          alt: 'Tidebreak level selection screen',
        },
        {
          type: 'image',
          src: '/projects/tidebreak/tidebreak-mapeditor.png',
          caption: 'build a level in the map editor',
          alt: 'Tidebreak in-game level editor',
        },
      ],
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
  { id: 'currently', label: 'currently' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
]
