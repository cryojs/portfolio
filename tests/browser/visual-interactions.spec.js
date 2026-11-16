import { test, expect } from '@playwright/test'

test('project gallery controls live in one bar beneath the media', async ({ page }) => {
  await page.goto('/#projects')
  const gallery = page.locator('.project-friction .project-gallery')
  const stage = await gallery.locator('.gallery-stage').boundingBox()
  const controls = await gallery.locator('.gallery-controls').boundingBox()
  // Nothing overlaps the media: the controls sit entirely below it.
  expect(controls.y).toBeGreaterThanOrEqual(stage.y + stage.height - 1)
  await expect(gallery.locator('.gallery-side-arrow')).toHaveCount(0)
  const segments = gallery.locator('.gallery-track button')
  const total = await segments.count()
  await expect(gallery.locator('.gallery-count')).toHaveText(`01 / ${String(total).padStart(2, '0')}`)
  await expect(gallery.locator('.gallery-caption')).toHaveText('demo video')

  await gallery.getByRole('button', { name: 'Next Friction slide' }).click()
  await expect(gallery.locator('.gallery-count')).toContainText('02')
  await expect(segments.nth(1)).toHaveAttribute('aria-current', 'true')
  await expect(gallery.locator('.gallery-caption')).toHaveText('live routes & agent activity')
  await gallery.getByRole('button', { name: 'Previous Friction slide' }).click()
  await gallery.getByRole('button', { name: 'Previous Friction slide' }).click()
  await expect(gallery.locator('.gallery-count')).toContainText(String(total).padStart(2, '0') + ' /')
  await segments.nth(2).click()
  await expect(gallery.locator('.gallery-count')).toContainText('03')

  // The enlarged view steps through stills with buttons and arrow keys.
  await gallery.locator('.gallery-image-button').click()
  const lightbox = page.locator('.gallery-lightbox')
  await expect(lightbox).toBeVisible()
  const before = await lightbox.locator('.gallery-caption').innerText()
  await page.keyboard.press('ArrowRight')
  await expect(lightbox.locator('.gallery-caption')).not.toHaveText(before)
  await lightbox.getByRole('button', { name: 'Previous Friction image' }).click()
  await expect(lightbox.locator('.gallery-caption')).toHaveText(before)
  await page.keyboard.press('Escape')
  await expect(lightbox).toHaveCount(0)
})
test('project spreads alternate sides on desktop and lead with their kicker', async ({ page }) => {
  await page.goto('/#projects')
  const sides = await page.locator('.project-spread').evaluateAll((spreads) => spreads.map((spread) => {
    const info = spread.querySelector('.project-info').getBoundingClientRect()
    const gallery = spread.querySelector('.project-gallery').getBoundingClientRect()
    return info.x < gallery.x ? 'left' : 'right'
  }))
  expect(sides).toEqual(['left', 'right', 'left', 'right'])
  const readify = page.locator('.project-readify .project-info')
  await expect(readify.locator('.project-meta')).toContainText('2026')
  await expect(page.locator('.project-friction .project-context')).toContainText('hack the north', { ignoreCase: true })
  await expect(readify.locator('.link-badge')).toHaveCount(3)
  await expect(page.locator('.projects-page .project-index, .projects-page .tags')).toHaveCount(0)

  await page.setViewportSize({ width: 760, height: 844 })
  await page.reload()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
test('project banners share one accent and sit just off the page colour', async ({ page }) => {
  await page.goto('/#projects')
  const read = () => page.locator('.project-spread').evaluateAll((spreads) => spreads.map((spread) => ({
    accent: getComputedStyle(spread).getPropertyValue('--gallery-accent').trim(),
    banner: getComputedStyle(spread.querySelector('.project-gallery')).backgroundColor,
  })))
  const lightness = (rgb) => rgb.match(/\d+/g).slice(0, 3).reduce((sum, value) => sum + Number(value), 0)
  const page_bg = () => page.evaluate(() => getComputedStyle(document.querySelector('.site')).backgroundColor)
  for (const theme of ['dark', 'light']) {
    if (theme === 'light') await page.locator('.theme-toggle').click()
    const spreads = await read()
    expect(new Set(spreads.map((s) => s.accent)).size).toBe(1)
    const difference = lightness(spreads[0].banner) - lightness(await page_bg())
    // Dark: a touch lighter than the page. Light: a touch darker. Never a jump.
    if (theme === 'dark') expect(difference).toBeGreaterThan(0)
    else expect(difference).toBeLessThan(0)
    expect(Math.abs(difference)).toBeLessThan(45)
  }
  // Every link badge keeps a light fill on hover (the live-project badge used to go black).
  const badge = page.locator('.project-friction .link-badge-web')
  await badge.hover()
  await page.waitForTimeout(300)
  expect(lightness(await badge.evaluate((el) => getComputedStyle(el).backgroundColor))).toBeGreaterThan(600)
})
test('mouse clicks emit a short-lived burst unless motion is reduced', async ({ page }) => {
  const countBursts = () => page.evaluate(() => {
    window.__bursts = 0
    new MutationObserver((records) => records.forEach((record) => { window.__bursts += record.addedNodes.length }))
      .observe(document.querySelector('.custom-cursor-bursts'), { childList: true })
  })
  await page.goto('/#contact')
  await countBursts()
  await page.mouse.move(400, 700)
  await page.mouse.down()
  await page.mouse.up()
  await expect.poll(() => page.evaluate(() => window.__bursts)).toBe(1)
  await expect(page.locator('.cursor-burst')).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await countBursts()
  await page.mouse.move(400, 700)
  await page.mouse.down()
  await page.mouse.up()
  await page.waitForTimeout(200)
  expect(await page.evaluate(() => window.__bursts)).toBe(0)
})
test('boba can be stirred with bounded pointer and keyboard input', async ({ page }) => {
  await page.goto('/#about')
  const straw = page.getByRole('slider', { name: 'stir bubble tea' })
  await straw.focus()
  await page.keyboard.press('ArrowRight')
  await expect(straw).toHaveAttribute('aria-valuenow', '5')
  const initialPath = await straw.locator('.straw-body').getAttribute('d')
  const pearlBefore = await page.locator('.boba-pearl').first().getAttribute('transform')
  await page.keyboard.press('ArrowDown')
  await expect(straw).toHaveAttribute('aria-valuetext', /depth 5/)
  expect(await straw.locator('.straw-body').getAttribute('d')).not.toBe(initialPath)
  await expect.poll(() => page.locator('.boba-pearl').first().getAttribute('transform')).not.toBe(pearlBefore)
  await expect.poll(() => page.locator('.emblem-about').evaluate(svg => {
    const strawNode = svg.querySelector('.boba-straw')
    const strawDepth = Number(strawNode.dataset.depth)
    return [...svg.querySelectorAll('.boba-pearl')].every(pearl => {
      const isInFront = Number(pearl.dataset.depth) > strawDepth
      const isAfterStraw = Boolean(strawNode.compareDocumentPosition(pearl) & Node.DOCUMENT_POSITION_FOLLOWING)
      return isInFront === isAfterStraw
    })
  })).toBe(true)
  const body = await straw.locator('.straw-body').boundingBox()
  await page.mouse.move(body.x + body.width / 2, body.y + body.height / 2)
  await page.mouse.down()
  await page.mouse.move(body.x + 300, body.y + body.height / 2, { steps: 10 })
  await page.mouse.up()
  await expect(straw).toHaveAttribute('aria-valuenow', '42')
  await page.keyboard.press('Home')
  await expect(straw).toHaveAttribute('aria-valuenow', '-42')
  await page.locator('.emblem-about').screenshot({ path: 'test-results/boba-stir.png' })
})

test('home objects stand on a tilted 3D ring and ride it into place clockwise', async ({ page }) => {
  await page.goto('/')
  const scene = page.locator('.home-scene')
  await expect(scene).toHaveClass(/is-entering/)
  const motion = await scene.evaluate((root) => {
    const order = ['about', 'work', 'photo-right', 'contact', 'projects', 'photo-left']
    return order.map((slot) => {
      const node = root.querySelector(`[data-slot="${slot}"]`)
      const [animation] = node.getAnimations().filter((a) => a.effect.getKeyframes().some((k) => '--phi' in k))
      const frames = animation.effect.getKeyframes()
      return {
        delay: animation.effect.getTiming().delay,
        slot,
        startPhi: parseFloat(frames[0]['--phi']),
        endPhi: parseFloat(frames.at(-1)['--phi']),
        startBlur: frames[0].filter,
      }
    })
  })
  expect(motion).toHaveLength(6)
  for (let i = 1; i < motion.length; i++) expect(motion[i].delay).toBeGreaterThan(motion[i - 1].delay)
  for (const item of motion) {
    expect(item.endPhi).toBeGreaterThan(item.startPhi)
    expect(item.startBlur).not.toBe('blur(0px)')
  }
  await expect(scene).not.toHaveClass(/is-entering/, { timeout: 5000 })
  // Every ride ends exactly at the object's resting slot on the ring.
  for (const item of motion) {
    const resting = await page.locator(`[data-slot="${item.slot}"]`).evaluate((node) => {
      node.getAnimations().forEach((animation) => {
        if (animation.effect.getKeyframes().some((k) => '--phi' in k)) animation.finish()
      })
      return parseFloat(getComputedStyle(node).getPropertyValue('--phi'))
    })
    expect(item.endPhi).toBeCloseTo(resting, 3)
  }
  // Real perspective: the far pair renders smaller and higher than the near pair.
  const box = (slot) => page.locator(`[data-slot="${slot}"] > :first-child`).boundingBox()
  const [about, work, contact, projects, side] = await Promise.all(['about', 'work', 'contact', 'projects', 'photo-left'].map(box))
  expect(about.width).toBeLessThan(projects.width)
  expect(work.width).toBeLessThan(contact.width)
  expect(about.y).toBeLessThan(side.y)
  expect(side.y).toBeLessThan(projects.y)
  const titleAboveObjects = await scene.evaluate((root) => {
    const titleZ = Number(getComputedStyle(root.querySelector('.home-title')).zIndex)
    const worldZ = parseInt(getComputedStyle(root.querySelector('.home-world')).zIndex, 10) || 0
    return worldZ < titleZ
  })
  expect(titleAboveObjects).toBe(true)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await expect(scene).not.toHaveClass(/is-entering/)
  expect(await page.locator('.scene-object').first().evaluate((el) => el.getAnimations().length)).toBe(0)
})
