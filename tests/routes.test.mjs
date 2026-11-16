import test from 'node:test'
import assert from 'node:assert/strict'
import { chapters, pageTitles, resolveRoute } from '../src/data/chapters.js'

test('all four destinations resolve as independent pages', () => {
  assert.deepEqual(
    chapters.map((item) => item.id),
    ['about', 'work', 'projects', 'contact'],
  )
  for (const { id } of chapters)
    assert.deepEqual(resolveRoute(`#${id}`), { page: id, anchor: null })
})
test('legacy URLs still resolve to relevant content', () => {
  for (const hash of ['#experience', '#log'])
    assert.deepEqual(resolveRoute(hash), { page: 'work', anchor: null })
  for (const anchor of ['skills', 'currently', 'education'])
    assert.deepEqual(resolveRoute(`#${anchor}`), { page: 'about', anchor })
})
test('project deep links retain a stable destination', () => {
  for (const project of ['friction', 'readify', 'refrain', 'tidebreak'])
    assert.deepEqual(resolveRoute(`#projects/${project}`), {
      page: 'projects',
      anchor: `project-${project}`,
    })
})
test('home URLs resolve home and unknown URLs get a not-found page', () => {
  for (const hash of ['', '#home', '#intro'])
    assert.deepEqual(resolveRoute(hash), { page: 'home', anchor: null })
  for (const hash of ['#unknown', '#projects-old', '#about/me'])
    assert.deepEqual(resolveRoute(hash), { page: 'notfound', anchor: null })
})
test('work deep links open a specific entry', () => {
  assert.deepEqual(resolveRoute('#work/usaco-guide'), {
    page: 'work',
    anchor: 'work-usaco-guide',
  })
})
test('every page has a tab title', () => {
  for (const page of ['home', 'about', 'work', 'projects', 'contact', 'notfound'])
    assert.ok(pageTitles[page])
})
