// Add your own files to public/photos, then set src to '/photos/filename.webp'.
// Empty or failed sources intentionally render a designed, labelled photo placeholder.
export const photographs = {
  portrait: {
    src: '/photos/selfie-spain.jpg',
    alt: 'Jason outdoors in Spain',
    label: 'A face to the name',
    index: '01',
    position: 'center 45%',
  },
  everyday: {
    src: '/photos/selfie-toronto.jpg',
    alt: 'Jason outdoors in Toronto',
    label: 'Life, outside the screen',
    index: '02',
    position: 'center',
  },
}

export const photographGroups = {
  spain: [
    {
      src: '/photos/selfie-spain.jpg',
      alt: 'Jason outdoors in Spain',
      position: 'center 45%',
    },
  ],
  toronto: [
    {
      src: '/photos/spain.jpg',
      alt: 'A view from Spain',
      position: 'center',
    },
    {
      src: '/photos/selfie-toronto.jpg',
      alt: 'Jason outdoors in Toronto',
      position: 'center',
    },
    {
      src: '/photos/toronto.jpg',
      alt: 'A view from Toronto',
      position: 'center',
    },
  ],
  travel: [
    {
      src: '/photos/disney.jpg',
      alt: 'A day at Disney',
      position: 'center',
    },
    {
      src: '/photos/japan.jpg',
      alt: 'A view from Japan',
      position: 'center',
    },
    {
      src: '/photos/japan-uniqlo.jpg',
      alt: 'A detail from Japan',
      position: 'center',
    },
    {
      src: '/photos/china2.jpg',
      alt: 'A view from China',
      position: 'center',
    },
    {
      src: '/photos/great-wall-of-china.jpg',
      alt: 'The Great Wall of China',
      position: 'center',
    },
  ],
}

export const aboutCopy = {
  intro:
    'I’m Jason, a Computer Science student at the University of Waterloo. I like building things, getting stuck, and understanding enough to get unstuck.',
  approach:
    'My projects take different forms: a more comfortable way to read the web, a place to focus, a tool for testing interfaces, and a game with its own level editor. I’m interested in the details that make software feel better to use.',
  learning:
    'Competitive programming gives me a different kind of challenge: finding the structure in a difficult problem. Building software asks me to turn that understanding into something someone can actually use.',
  next: [
    'keep building things that make the web feel more comfortable.',
    'keep learning by getting stuck on harder problems.',
    'make more room for travel, photographs, and new places.',
  ],
  // Keep these easy to edit as more personal details become part of the site.
  outside: ['travel / photography', 'competitive programming', 'good questions'],
}

// These captions describe the existing project functionality, not unverified individual contributions.
export const projectEditorial = {
  friction: {
    category: '01 / Developer tooling',
    line: 'A second look.\nA better experience.',
    detail:
      'A visual control room for the QA loop: explore a live website, identify friction, verify a fix, and create a pull request. The interface brings routes and agent activity into one place.',
    contribution: '',
  },
  readify: {
    category: '02 / Accessibility',
    line: 'The web,\non your terms.',
    detail:
      'Readify brings reading controls and contextual AI assistance into the browser. Personalize typography, ask questions about the page, or get an explanation without breaking the flow of reading.',
    contribution: '',
  },
  refrain: {
    category: '03 / Focus & productivity',
    line: 'Make room\nfor focus.',
    detail:
      'A Pomodoro workspace that keeps its timer accurate in the background. Tasks can be reordered, notes stay close at hand, and activity visualizations make a session easier to follow.',
    contribution: '',
  },
  tidebreak: {
    category: '04 / Game development',
    line: 'Build a world.\nFind your way.',
    detail:
      'A 2D platformer exploring custom movement and water physics. Its in-game level editor includes undo and redo, bringing the tools for building a level into the game itself.',
    contribution: '',
  },
}
