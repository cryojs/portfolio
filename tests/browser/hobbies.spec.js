import { test, expect } from '@playwright/test'

test('both archives retain bottom spacing after opening and resizing', async ({ page }) => {
  await page.goto('/#about')
  for (const section of await page.locator('.hobby-collection').all()) {
    await section.locator('.hobby-heading-trigger').click()
  }
  for (const width of [1440, 390, 1024]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.waitForTimeout(650)
    for (const panel of await page.locator('.hobby-panel').all()) {
      const spacing = await panel.evaluate((element) => {
        const inner = element.firstElementChild
        const gallery = inner.firstElementChild
        return {
          bottom: element.getBoundingClientRect().bottom - gallery.getBoundingClientRect().bottom,
          expected: parseFloat(getComputedStyle(inner).paddingBottom),
        }
      })
      expect(spacing.bottom).toBeGreaterThanOrEqual(spacing.expected - 1)
      expect(spacing.bottom).toBeLessThanOrEqual(spacing.expected + 2)
    }
  }
})

test('music card exposes compact native controls and stays within a narrow page', async ({ page }) => {
  await page.goto('/#about')
  const cards = page.locator('.music-card')
  const card = cards.first()
  await expect(cards).toHaveCount(2)
  await expect(card).toBeVisible()
  await expect(card.locator('iframe')).toHaveCount(0)
  await expect(card.locator('audio')).toHaveAttribute('src', '/audio/Make you my what.opus')
  await expect(page.locator('.music-progress').first()).toBeVisible()
  await expect(page.getByRole('button', { name: /play make you my what/ })).toBeVisible()
  await expect(page.getByRole('button', { name: 'restart make you my what' })).toBeVisible()
  const volume = page.getByRole('button', { name: 'volume make you my what' })
  await expect(volume).toBeVisible()
  await volume.click()
  await expect(page.getByRole('slider', { name: 'volume level for make you my what' })).toBeVisible()
  await volume.click()
  await expect(page.getByRole('slider', { name: 'volume level for make you my what' })).toBeHidden()
  await page.setViewportSize({ width: 320, height: 740 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})

test('hobby previews mount on intent and expanded media closes with focus restored', async ({ page }) => {
  // Verify our player lifecycle without relying on third-party availability.
  await page.route('https://www.youtube-nocookie.com/**', (route) => route.fulfill({ body: '<html><body>player</body></html>', contentType: 'text/html' }))
  await page.goto('/#about')
  await expect(page.locator('#skills')).toHaveCount(0)
  const photographySection = page.locator('.photography-collection')
  const motionSection = page.locator('.motion-collection')
  await expect(motionSection.locator('.hobby-heading-trigger')).toHaveAttribute('aria-expanded', 'false')
  await motionSection.locator('.hobby-heading-trigger').click()
  await expect(page.locator('.motion-tile')).toHaveCount(8)
  await expect(page.locator('.motion-caption')).toHaveCount(0)
  await expect(page.locator('.motion-tile iframe')).toHaveCount(0)
  const edit = page.getByRole('button', { name: 'watch motion and vfx edit 1', exact: true })
  await edit.hover()
  await expect(edit.locator('iframe')).toHaveAttribute('src', /mute=1/)
  await edit.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.locator('.hobby-dialog iframe')).toHaveAttribute('src', /mute=0/)
  await expect(page.locator('.motion-tile iframe')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(edit).toBeFocused()
  await photographySection.locator('.hobby-heading-trigger').click()
  const photo = page.getByRole('button', { name: 'view photograph: A building framed by a park in Japan' })
  await photo.click()
  await expect(page.locator('.hobby-dialog img')).toHaveAttribute('src', '/photos/gallery/japan/japan1.jpg')
  await page.getByRole('button', { name: 'close ×' }).click()
  await expect(photo).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
})

test('motion editing stays secondary while its archive remains accessible', async ({ page }) => {
  await page.goto('/#about')
  const motionSection = page.locator('.motion-collection')
  const motionHeading = motionSection.locator('.motion-heading-subtle')
  const photographyHeading = page.locator('.photography-collection > .hobby-heading')

  await expect(motionHeading.locator('h3')).toHaveText('motion graphics & vfx')
  await expect(motionHeading).toBeVisible()
  await expect(motionSection.locator('.hobby-panel')).toBeHidden()
  expect(await motionHeading.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)')
  expect(await photographyHeading.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe('rgba(0, 0, 0, 0)')
  expect(await photographyHeading.evaluate((element) => getComputedStyle(element).borderTopStyle)).toBe('solid')

  await motionHeading.locator('.hobby-heading-trigger').click()
  await expect(motionSection.locator('.hobby-panel')).toBeVisible()
  await expect(motionSection.locator('.motion-tile')).toHaveCount(8)
})

test('hobby archives animate open and close on every toggle', async ({ page }) => {
  await page.goto('/#about')
  const section = page.locator('.photography-collection')
  const summary = section.locator('.hobby-heading-trigger')
  const panel = section.locator('.hobby-panel')
  await panel.evaluate((element) => {
    window.__hobbyTransitions = 0
    element.addEventListener('transitionrun', (event) => {
      if (event.propertyName === 'height') window.__hobbyTransitions += 1
    })
  })

  await summary.click()
  await page.waitForTimeout(120)
  expect(await panel.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(0)
  await page.waitForTimeout(550)

  await summary.click()
  await page.waitForTimeout(120)
  expect(await panel.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(0)
  await page.waitForTimeout(550)
  expect(await panel.evaluate((element) => element.getBoundingClientRect().height)).toBe(0)

  await summary.click()
  await page.waitForTimeout(550)
  await summary.click()
  await page.waitForTimeout(550)
  expect(await page.evaluate(() => window.__hobbyTransitions)).toBeGreaterThanOrEqual(4)
})

test('reduced motion suppresses hover playback while explicit playback remains available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#about')
  await page.locator('.motion-collection .hobby-heading-trigger').click()
  const edit = page.getByRole('button', { name: 'watch motion and vfx edit 1', exact: true })
  await edit.hover()
  await page.waitForTimeout(600)
  await expect(edit.locator('iframe')).toHaveCount(0)
  const chip = page.locator('.about-chip-waterloo')
  await chip.hover()
  await expect(chip).toHaveCSS('transform', 'none')
  await expect(chip).toHaveCSS('filter', 'none')
})
