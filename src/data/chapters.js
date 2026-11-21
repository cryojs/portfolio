export const chapters = [
  {
    id: 'about',
    label: 'about',
    index: '01',
    subtitle: 'The person behind the screen',
  },
  {
    id: 'work',
    label: 'work',
    index: '02',
    subtitle: 'Learning alongside others',
  },
  {
    id: 'projects',
    label: 'projects',
    index: '03',
    subtitle: 'Ideas made tangible',
  },
  {
    id: 'contact',
    label: 'contact',
    index: '04',
    subtitle: 'Start a conversation',
  },
]

// Titles shown in the browser tab for each page.
export const pageTitles = {
  home: 'jason sun · developer & cs student',
  about: 'about · jason sun',
  work: 'work · jason sun',
  projects: 'projects · jason sun',
  contact: 'contact · jason sun',
  notfound: 'not found · jason sun',
}

export function resolveRoute(hash = '') {
  const value = hash.replace(/^#\/?/, '')
  if (['', 'home', 'intro', 'content'].includes(value))
    return { page: 'home', anchor: null }
  if (['experience', 'log'].includes(value))
    return { page: 'work', anchor: null }
  if (value.startsWith('work/'))
    return { page: 'work', anchor: `work-${value.slice(5)}` }
  if (['currently', 'skills', 'education'].includes(value))
    return { page: 'about', anchor: value }
  if (value.startsWith('projects/'))
    return { page: 'projects', anchor: `project-${value.slice(9)}` }
  return {
    page: chapters.some((item) => item.id === value) ? value : 'notfound',
    anchor: null,
  }
}
