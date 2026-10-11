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

export function resolveRoute(hash = '') {
  const value = hash.replace(/^#\/?/, '')
  if (['experience', 'log'].includes(value))
    return { page: 'work', anchor: null }
  if (['currently', 'skills', 'education'].includes(value))
    return { page: 'about', anchor: value }
  if (value.startsWith('projects/'))
    return { page: 'projects', anchor: `project-${value.slice(9)}` }
  return {
    page: chapters.some((item) => item.id === value) ? value : 'home',
    anchor: null,
  }
}
