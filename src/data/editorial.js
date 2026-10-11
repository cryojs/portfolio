// Add your own files to public/photos, then set src to '/photos/filename.webp'.
// Empty or failed sources intentionally render a designed, labelled photo placeholder.
export const photographs = {
  portrait: {
    src: '',
    alt: 'Portrait of Jason Sun',
    label: 'A face to the name',
    index: '01',
    position: 'center',
  },
  everyday: {
    src: '',
    alt: 'A moment from Jason’s everyday life',
    label: 'Life, outside the screen',
    index: '02',
    position: 'center',
  },
}

export const aboutCopy = {
  intro:
    'I’m Jason, a Computer Science student at the University of Waterloo. I like building things, getting stuck, and understanding enough to get unstuck.',
  approach:
    'My projects take different forms: a more comfortable way to read the web, a place to focus, a tool for testing interfaces, and a game with its own level editor. I’m interested in the details that make software feel better to use.',
  learning:
    'Competitive programming gives me a different kind of challenge: finding the structure in a difficult problem. Building software asks me to turn that understanding into something someone can actually use.',
  // Add verified hobbies / personal stories here when ready. Never invent them.
  outside: '',
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
