import { test, expect } from '@playwright/test'

test('only banner hover moves project media and banners use product showcases', async ({ page }) => {
  await page.goto('/#projects')
  for (const card of await page.locator('.project-spread').all()) {
    const screen = card.locator('.project-screen')
    await card.locator('.project-description').hover()
    await page.waitForTimeout(650)
    expect(await screen.evaluate((el) => getComputedStyle(el).translate)).toBe('none')
    await card.locator('.project-art').hover()
    await page.waitForTimeout(650)
    expect(await screen.evaluate((el) => getComputedStyle(el).translate)).toBe('0px -8px')
    await expect(card.locator('.project-mark')).toHaveCount(0)
    await expect(card.locator('.project-banner-media')).toBeVisible()
  }
  await page.locator('.project-art').first().screenshot({ path: 'test-results/cybercore-banner.png' })
})

test('project gallery controls and indicators share the bottom row', async ({ page }) => {
  await page.goto('/#projects')
  const gallery = page.locator('.project-readify .project-gallery')
  const footer = gallery.locator('.gallery-bottom-bar')

  await expect(gallery.locator('.gallery-topbar, .gallery-project-name, .gallery-hint')).toHaveCount(0)
  await expect(gallery.locator('.gallery-decor, .gallery-halftone, .gallery-checkers')).toHaveCount(0)
  expect(await gallery.locator('.gallery-stage').evaluate((stage) => getComputedStyle(stage, '::before').content)).toBe('none')
  await expect(footer.locator('.gallery-star')).toHaveCount(0)
  await expect(footer.locator('.gallery-kind, .gallery-caption-text, .gallery-counter')).toHaveCount(0)
  await expect(footer.locator('.gallery-bottom-caption, .gallery-icon-button')).toHaveCount(0)
  await expect(footer.locator('.gallery-pagination')).toBeVisible()
  await expect(footer.locator('.gallery-footer-motif')).toHaveCount(0)
  const footerBox = await footer.boundingBox()
  expect(footerBox).not.toBeNull()
  expect(footerBox.height).toBeLessThan(42)
  await gallery.locator('.gallery-pagination button').nth(1).click()
  await expect(footer.locator('.gallery-kind, .gallery-caption-text, .gallery-counter')).toHaveCount(0)
  await expect(footer.locator('.gallery-bottom-caption, .gallery-icon-button')).toHaveCount(0)
})

test('projects use compact desktop spreads without the project index', async ({ page }) => {
  await page.goto('/#projects')
  const spread = page.locator('.project-readify')
  const info = spread.locator('.project-info')
  const gallery = spread.locator('.project-gallery')

  await expect(page.locator('.projects-page .project-index')).toHaveCount(0)
  await expect(spread.locator('.project-top span')).toHaveCount(1)
  await expect(spread.locator('.project-top')).not.toContainText('accessibility')
  await expect(info.locator('.project-details .tags')).toBeVisible()
  await expect(info.locator('.project-details .project-links')).toBeVisible()
  const infoBox = await info.boundingBox()
  const galleryBox = await gallery.boundingBox()
  expect(galleryBox.x).toBeGreaterThan(infoBox.x)

  await page.setViewportSize({ width: 760, height: 844 })
  await page.reload()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('each project spread carries its own accent through the editorial dividers', async ({ page }) => {
  await page.goto('/#projects')
  const colors = await page.locator('.project-spread').evaluateAll((spreads) => spreads.map((spread) => {
    const info = spread.querySelector('.project-info')
    const tag = spread.querySelector('.tags li')
    const link = spread.querySelector('.project-destination')
    return {
      accent: getComputedStyle(spread).getPropertyValue('--gallery-accent').trim(),
      infoRule: getComputedStyle(info, '::before').backgroundColor,
      tagBorder: getComputedStyle(tag).borderTopColor,
      linkBorder: getComputedStyle(link).borderBottomColor,
    }
  }))

  expect(colors).toHaveLength(4)
  expect(new Set(colors.map((color) => color.accent)).size).toBe(4)
  expect(new Set(colors.map((color) => color.infoRule)).size).toBe(4)
  expect(new Set(colors.map((color) => color.tagBorder)).size).toBe(4)
  expect(new Set(colors.map((color) => color.linkBorder)).size).toBe(4)
})

test('custom cursor preserves interactive states with idle glitches and click bursts', async ({ page }) => {
  await page.goto('#contact')
  await expect.poll(async () => {
    await page.mouse.move(20, 200)
    await page.mouse.move(21, 200)
    return page.locator('html').getAttribute('class')
  }).toMatch(/custom-pointer-enabled/)
  await expect(page.locator('html')).toHaveClass(/custom-pointer-enabled/)
  await expect(page.locator('.custom-cursor')).toHaveClass(/is-visible/)
  await expect(page.locator('.custom-cursor')).toHaveAttribute('data-mode', 'default')
  await page.locator('.site-header nav a').first().hover()
  await expect(page.locator('.custom-cursor')).toHaveAttribute('data-mode', 'link')
  await expect(page.locator('.cursor-glyph-link')).toBeVisible()
  await page.locator('.theme-toggle svg').hover()
  await expect(page.locator('.custom-cursor')).toHaveAttribute('data-mode', 'link')
  await page.locator('.copy-status').hover()
  await expect(page.locator('.custom-cursor')).toHaveAttribute('data-mode', 'text')
  await expect(page.locator('.cursor-glyph-text')).toBeVisible()
  await page.locator('.email-copy').hover()
  await expect(page.locator('.custom-cursor')).toHaveAttribute('data-mode', 'copy')
  await page.mouse.down()
  await expect(page.locator('.custom-cursor')).toHaveClass(/is-down/)
  await expect(page.locator('.cursor-burst')).toHaveCount(1)
  await page.mouse.up()
  await expect(page.locator('.custom-cursor-trail')).toHaveCount(0)
  await expect(page.locator('.cursor-glitch')).toHaveCount(3)
  await page.screenshot({ path: 'test-results/custom-cursor.png' })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.reload()
  await expect(page.locator('.custom-cursor')).toBeHidden()
  await expect(page.locator('html')).not.toHaveClass(/custom-pointer-enabled/)
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

test('all six home elements share one decelerating orbital entrance', async ({ page }) => {
  await page.goto('/')
  const motion = await page.locator('.home-scene').evaluate(scene => {
    return [...scene.querySelectorAll(':scope > .scene-object')].map(node => {
      const animation = node.getAnimations().find(a => a.effect.getKeyframes().length === 121)
      const frames = animation.effect.getKeyframes()
      animation.pause()
      animation.currentTime = 800
      return {delay:animation.effect.getTiming().delay, duration:animation.effect.getTiming().duration,
        initial:parseFloat(frames[1].rotate)-parseFloat(frames[0].rotate),
        final:parseFloat(frames[120].rotate)-parseFloat(frames[119].rotate)}
    })
  })
  expect(motion).toHaveLength(6)
  const titleAboveObjects = await page.locator('.home-scene').evaluate(scene => {
    const titleZ = Number(getComputedStyle(scene.querySelector('.home-title')).zIndex)
    return [...scene.querySelectorAll(':scope > .scene-object')].every(el => Number(getComputedStyle(el).zIndex) < titleZ)
  })
  expect(titleAboveObjects).toBe(true)
  for (const item of motion) {
    expect(item.delay).toBe(0)
    expect(item.duration).toBe(1450)
    expect(Math.abs(item.initial)).toBeGreaterThan(Math.abs(item.final)*100)
  }
  await expect(page.locator('.entrance-vortex, .vortex-foreground, .vortex-layer')).toHaveCount(0)
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.reload()
  expect(await page.locator('.scene-object').first().evaluate(el => el.getAnimations().length)).toBe(0)
})

test('photo-only collage includes every gallery file and expands photos', async ({ page }) => {
  await page.goto('/#about')
  await page.locator('.photography-collection .hobby-heading-trigger').click()
  const photos = page.locator('.photography-frame')
  await expect(photos).toHaveCount(17)
  await expect(page.getByText('click to expand · enjoy!', { exact: true })).toBeVisible()
  await expect(photos.locator('span')).toHaveCount(0)
  for (const photo of await photos.all()) {
    await photo.scrollIntoViewIfNeeded()
    await expect.poll(() => photo.locator('img').evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true)
  }
  await page.locator('.photography-gallery').screenshot({ path: 'test-results/photo-collage.png', style: '.site-header { visibility: hidden }' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.locator('.photography-gallery').screenshot({ path: 'test-results/photo-collage-mobile.png', style: '.site-header { visibility: hidden }' })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await photos.last().click()
  await expect(page.locator('.hobby-dialog img')).toHaveAttribute('src', '/photos/gallery/random/airplane.webp')
})
