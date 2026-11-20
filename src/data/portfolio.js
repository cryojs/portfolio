export const profile = {
  name: 'Jason Sun',
  firstName: 'Jason',
  lastName: 'Sun',
  email: 'jasonsun.dev@gmail.com',
  links: {
    github: 'https://github.com/CryoJS',
    linkedin: 'https://www.linkedin.com/in/jasonsuncs/',
    dmoj: 'https://dmoj.ca/user/Vastaway',
    leetcode: 'https://leetcode.com/u/Vastaway/',
    instagram: 'https://www.instagram.com/cryojs/',
  },
}

export const education = {
  school: 'University of Waterloo',
  degree: 'Bachelor of Computer Science, Co-op',
  location: 'Waterloo, ON',
  dates: 'Sept. 2026 to expected Apr. 2031',
}

export const experience = [
  {
    id: 'career-education-council',
    role: 'iOS Developer (Co-op)',
    company: 'Career Education Council',
    website: 'https://www.careereducationcouncil.ca/',
    logo: '/logos/develop-the-future-program.jpg',
    location: 'Remote',
    dates: 'Sept. 2024 to Jan. 2025',
    highlights: [
      'Built 10 iOS applications in Swift, UIKit, and SwiftUI through an Apple-supported development program, incorporating code and UX feedback from industry engineers into each release.',
      'Designed and built Stream, a SwiftUI productivity app prototype, and presented the finished application, visual presentation, and elevator pitch to a panel of industry developers and judges.',
    ],
  },
  {
    id: 'usaco-guide',
    role: 'Open Source Contributor',
    company: 'USACO Guide',
    website: 'https://usaco.guide/',
    logo: '/logos/cpinitiative.jpg',
    location: 'Remote',
    dates: 'Oct. 2024 to Dec. 2024',
    highlights: [
      'Merged 6 pull requests into the open-source USACO Guide, adding Python solutions and quizzes to Bronze and Gold modules (sorting, graphs, bitmask DP).',
    ],
  },
  {
    id: 'stephen-lewis',
    role: 'President, CS Club & Math Club',
    company: 'Stephen Lewis Secondary School',
    website: 'https://stephenlewis-ss.yrdsb.ca/',
    logo: '/logos/stephen-lewis.webp',
    location: 'Thornhill, ON',
    dates: 'Sept. 2024 to June 2026',
    highlights: [
      'Wrote and taught a 5-part competitive programming curriculum covering time complexity, prefix sums, data structures, recursion, and greedy algorithms.',
      'Open-sourced the curriculum as the DSA Handbook, a presentation-style guide to competitive programming fundamentals.',
    ],
  },
]

export const projects = [
  {
    id: 'readify',
    title: 'Readify',
    dates: 'Sept. 2026 to Oct. 2026',
    description: 'A cross-browser accessibility extension that personalizes typography and uses AI to explain and answer questions about webpages.',
    tech: ['WXT', 'React', 'TypeScript', 'Gemini API', 'Groq API', 'xAI API'],
    github: 'https://github.com/CryoJS/readify',
    storeLinks: [
      { label: 'Chrome', href: 'https://chromewebstore.google.com/detail/readify/cpdfcocmpacdfogkbgjggdokppbffafb' },
      { label: 'Firefox', href: 'https://addons.mozilla.org/en-CA/firefox/addon/readify-web/' },
    ],
    media: {
      image: '/projects/readify/wiki-ask-ai.webp',
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
          src: '/projects/readify/wiki-base.webp',
          caption: 'original page · before Readify',
          alt: 'Readify on a Wikipedia article before accessibility settings are applied',
        },
        {
          type: 'image',
          src: '/projects/readify/wiki-ask-ai.webp',
          caption: 'ask AI about the page',
          alt: 'Readify asking AI to explain a Wikipedia article',
        },
        {
          type: 'image',
          src: '/projects/readify/wiki-typography.webp',
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
    // Optional: where or why a project was made, shown beside its dates.
    context: { prefix: 'Browserbase finalist at', label: 'Hack the North 2026', href: 'https://hackthenorth.com/' },
    description: 'An AI-powered QA control room that tests live websites, surfaces UX friction, verifies fixes, and creates pull requests.',
    tech: ['React', 'TypeScript', 'Browserbase', 'OpenAI API', 'React Flow'],
    github: 'https://github.com/CryoJS/friction',
    live: 'https://friction-d95.pages.dev/',
    media: {
      image: '/projects/friction/cover.webp',
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
          src: '/projects/friction/cover.webp',
          caption: 'live routes & agent activity',
          alt: 'Friction Paths view showing site routes, assigned agents, and scan results',
        },
        {
          type: 'image',
          src: '/projects/friction/friction1.webp',
          caption: 'start a scan & connect a repository',
          alt: 'Friction project scan workspace',
        },
        {
          type: 'image',
          src: '/projects/friction/friction2.webp',
          caption: 'task results & findings',
          alt: 'Friction task graph showing completed and failed tasks with issue severity',
        },
        {
          type: 'image',
          src: '/projects/friction/friction3.webp',
          caption: 'site paths & assigned agents',
          alt: 'Friction project findings view',
        },
        {
          type: 'image',
          src: '/projects/friction/friction4.webp',
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
          src: '/projects/friction/friction-howitworks.webp',
          caption: 'from website scan to fixes',
          alt: 'Diagram showing how Friction turns website scans into fixes',
        },
        {
          type: 'image',
          src: '/projects/friction/friction-architecture.webp',
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
          src: '/projects/tidebreak/tidebreak-mapselection.webp',
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
