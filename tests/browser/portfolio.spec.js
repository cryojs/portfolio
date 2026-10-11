import { test, expect } from '@playwright/test'

const pages = ['home', 'about', 'work', 'projects', 'contact']

test('all pages load directly, expose navigation, and keep assets intact', async ({
  page,
}, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  for (const route of pages) {
    await page.goto(`/#${route}`)
    await expect(page.locator(`.route-${route}`)).toBeVisible()
    await expect(page.locator('.page-wipe')).toHaveCount(0)
    await expect(page.locator('h1')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await expect(
      page.locator('nav[aria-label="Main navigation"] a'),
    ).toHaveCount(4)
    expect(
      await page
        .locator('img')
        .evaluateAll((images) =>
          images.every((img) => !img.complete || img.naturalWidth > 0),
        ),
    ).toBeTruthy()
    for (const img of await page.locator('img:visible').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect(img).toHaveJSProperty('complete', true)
      expect(await img.evaluate((el) => el.naturalWidth)).toBeGreaterThan(0)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({
      path: testInfo.outputPath(`${route}-desktop.png`),
      fullPage: true,
      animations: 'disabled',
    })
  }
  expect(errors).toEqual([])
})

test('navigation transitions, keyboard focus, history, and deep links', async ({
  page,
}) => {
  await page.goto('/#home')
  await page.locator('.projects-object').click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('h1')).toContainText('from a thought')
  await expect(page.locator('h1')).toBeFocused()
  await expect(page.locator('.page-wipe')).toHaveCount(0)
  await page.locator('.project-index a').filter({ hasText: 'Readify' }).click()
  await expect(page.locator('#project-readify details')).toHaveAttribute(
    'open',
    '',
  )
  await expect(page.locator('#project-readify h2')).toBeFocused()
  await page.reload()
  await expect(page.locator('#project-readify details')).toHaveAttribute(
    'open',
    '',
  )
  await page.goBack()
  await expect(page).toHaveURL(/#projects$/)
  await page.goBack()
  await expect(page.locator('.home-scene')).toBeVisible()
  await page.goForward()
  await expect(page.locator('.project-index')).toBeVisible()
  await page.locator('.home-control').click()
  await expect(page.locator('.home-scene')).toBeVisible()
})

test('mobile, tablet, short desktop: no horizontal overflow', async ({
  page,
}, testInfo) => {
  for (const [width, height] of [
    [390, 844],
    [320, 740],
    [768, 1024],
    [1280, 600],
  ]) {
    await page.setViewportSize({ width, height })
    for (const route of pages) {
      await page.goto(`/#${route}`)
      await expect(page.locator(`.route-${route}`)).toBeVisible()
      await expect(page.locator('.page-wipe')).toHaveCount(0)
      await page.evaluate(() => document.fonts.ready)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}px`,
      ).toBeTruthy()
      if (width === 390) {
        for (const img of await page.locator('img:visible').all()) {
          await img.scrollIntoViewIfNeeded()
          await expect(img).toHaveJSProperty('complete', true)
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.screenshot({
          path: testInfo.outputPath(`${route}-mobile.png`),
          fullPage: true,
          animations: 'disabled',
        })
      }
    }
  }
})

test('reduced motion, keyboard controls, and accessible email feedback', async ({
  page,
  context,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#home')
  await page.keyboard.press('Tab')
  await expect(page.locator('.skip-link')).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('h1')).toBeFocused()
  await page.locator('.contact-object').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.contact-page')).toBeVisible()
  await expect(page.locator('.page-wipe')).toHaveCount(0)
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page
    .getByRole('button', { name: 'copy email address: jasonsun.dev@gmail.com' })
    .click()
  await expect(page.getByRole('status')).toContainText('copied!')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'jasonsun.dev@gmail.com',
  )
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
})

test('email fallback and broken screenshot keep the page usable', async ({
  page,
}) => {
  await page.goto('/#contact')
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new Error('denied')),
    }),
  )
  await page
    .getByRole('button', { name: 'copy email address: jasonsun.dev@gmail.com' })
    .click()
  await expect(page.getByRole('status')).toContainText(
    'couldn’t copy automatically',
  )
  await page.goto('/#projects')
  await page
    .locator('.project-screen img')
    .first()
    .evaluate((img) => {
      img.src = '/deliberately-missing.png'
    })
  await expect(page.locator('.missing-media')).toBeVisible()
  await expect(
    page.locator('.project-links').first().getByText('source code'),
  ).toBeVisible()
})

test('dark by default, persistent icon theme toggle, and clear lowercase UI', async ({
  page,
}, testInfo) => {
  await page.goto('/#home')
  await expect(page.locator('.site')).toHaveClass(/theme-dark/)
  const theme = page.getByRole('button', { name: 'dark theme' })
  await expect(theme).toHaveAccessibleName('dark theme')
  await expect(theme).not.toHaveAttribute('title')
  await expect(page.getByRole('combobox')).toHaveCount(0)
  await expect(
    page.locator('.scene-topline, .scene-bottom, .scene-side'),
  ).toHaveCount(0)
  await expect(page.locator('.silhouette-bear')).toBeVisible()
  await expect(page.locator('.silhouette-quill')).toBeVisible()
  await expect(page.locator('.silhouette-letter')).toBeVisible()
  await theme.click()
  await page.reload()
  await expect(page.locator('.site')).toHaveClass(/theme-paper/)
  const lightTheme = page.getByRole('button', { name: 'light theme' })
  await expect(lightTheme).toHaveAccessibleName('light theme')
  for (const route of pages) {
    await page.goto(`/#${route}`)
    await expect(page.locator(`.route-${route}`)).toBeVisible()
    await expect(page.locator('.page-wipe')).toHaveCount(0)
    await expect(page.locator('.site')).toHaveClass(/theme-paper/)
    await page.screenshot({
      path: testInfo.outputPath(`${route}-light.png`),
      fullPage: true,
      animations: 'disabled',
    })
  }
  await lightTheme.click()
  await page.goto('/#work')
  await expect(page.locator('.work-page')).toBeVisible()
  await expect(page.locator('.site')).toHaveClass(/theme-dark/)
  await expect(
    page.locator('.experience-panel .tags, .experience-number'),
  ).toHaveCount(0)
  await expect(page.locator('.site')).toHaveClass(/theme-dark/)
  await expect(page.locator('.site-header nav')).toHaveText(
    'aboutworkprojectscontact',
  )
})

test('content fades into focus without a swipe or navbar animation', async ({
  page,
}) => {
  await page.goto('/#home')
  await expect(page.locator('.page')).toHaveCSS(
    'animation-name',
    'content-focus',
  )
  await expect(page.locator('.site-header')).toHaveCSS('animation-name', 'none')
  await page.locator('.work-object').click()
  await expect(page.locator('.route-work')).toBeVisible()
  await expect(page.locator('.page-entrance, .page-wipe')).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.page')).toHaveCSS('animation-name', 'none')
})
