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
    await expect(page).toHaveTitle(/jason sun/)
    await expect(page.locator('.page-wipe')).toHaveCount(0)
    if (route === 'home') {
      await expect(page.locator('.home-scene')).not.toHaveClass(/is-entering/)
      await expect(page.locator('.home-scene .scene-photo')).toHaveCount(2)
      const stacks = page.locator('.home-scene .photo-stack')
      await expect(stacks).toHaveCount(3)
      const firstPhotos = [
        '/photos/selfie-spain.webp',
        '/photos/spain.webp',
        '/photos/toronto.webp',
      ]
      await expect(stacks.nth(1).getByText('1/3')).toBeVisible()
      for (let index = 0; index < stacks.count(); index += 1) {
        const stack = stacks.nth(index)
        const stackImage = stack.locator('img')
        if (index === 2) {
          await expect(stackImage).toHaveAttribute('src', '/photos/disney.webp')
        } else {
          await expect(stackImage).toHaveAttribute('src', firstPhotos[index])
        }
        if (index > 0) {
          const firstPhoto = await stackImage.getAttribute('src')
          await stack.getByRole('button', { name: /flip to photo/ }).click()
          await expect(stackImage).not.toHaveAttribute('src', firstPhoto)
        } else {
          await expect(stack.getByRole('button')).toHaveCount(0)
          await expect(page.locator('.about-object')).toHaveAttribute(
            'href',
            '#about',
          )
        }
      }
    }
    await expect(page.locator('h1')).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await expect(
      page.locator('nav[aria-label="Main navigation"] a'),
    ).toHaveCount(4)
    await expect(
      page.locator(
        '.site-footer a[href="https://www.linkedin.com/in/jasonsuncs/"]',
      ),
    ).toHaveCount(1)
    await expect(
      page.locator('.site-footer a[href="https://github.com/CryoJS"]'),
    ).toHaveCount(1)
    await expect(page.getByText('let’s talk ↗')).toHaveCount(0)
    expect(
      await page
        .locator('img')
        .evaluateAll((images) =>
          images.every((img) => !img.complete || img.naturalWidth > 0),
        ),
    ).toBeTruthy()
    for (const img of await page.locator('img:visible').all()) {
      // Home objects sway continuously, so scroll directly rather than
      // waiting for them to hold still.
      await img.evaluate((el) => el.scrollIntoView({ block: 'nearest' }))
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
  await page.locator('.projects-object').click({ force: true }) // home objects sway continuously
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('h1')).toContainText('from thought')
  await expect(page.locator('h1')).toBeFocused()
  await expect(page.locator('.page-wipe')).toHaveCount(0)
  await page.goto('/#projects/readify')
  await expect(page.locator('#project-readify details')).toHaveCount(0)
  await expect(page.locator('#project-readify h2')).toBeFocused()
  await page.reload()
  await expect(page.locator('#project-readify details')).toHaveCount(0)
  await page.goBack()
  await expect(page).toHaveURL(/#projects$/)
  await page.goBack()
  await expect(page.locator('.home-scene')).toBeVisible()
  await page.goForward()
  await expect(page.locator('.project-spreads')).toBeVisible()
  await page.locator('.home-control').click()
  await expect(page.locator('.home-scene')).toBeVisible()
})

test('mobile, tablet, short desktop: no horizontal overflow', async ({
  page,
}, testInfo) => {
  for (const [width, height] of [
    [390, 844],
    [320, 740],
    [480, 900],
    [600, 900],
    [768, 1024],
    [1024, 768],
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
      if (route === 'home' && width <= 760) {
        await expect(page.locator('.home-scene .scene-object:visible')).toHaveCount(6)
      }
      if (route === 'projects' && width <= 760) {
        for (const spread of await page.locator('.project-spread').all()) {
          const info = await spread.locator('.project-info').boundingBox()
          const gallery = await spread.locator('.project-gallery').boundingBox()
          expect(gallery.y).toBeGreaterThanOrEqual(info.y + info.height)
        }
      }
      const tail = page.locator('.next-page-tail')
      if (await tail.count()) {
        const box = await tail.boundingBox()
        const chevron = await tail.locator('.next-page-chevron').boundingBox()
        expect(chevron.y, `${route} chevron stays with its word`).toBeLessThan(box.y + box.height)
        expect(chevron.y + chevron.height).toBeGreaterThan(box.y)
      }
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
  const gallery = page.locator('.project-readify .project-gallery')
  await gallery.locator('.gallery-track button').nth(1).click()
  await gallery.locator('.gallery-stage img').evaluate((img) => {
    img.src = '/deliberately-missing.png'
  })
  await expect(gallery.locator('.gallery-unavailable')).toBeVisible()
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
  await expect(page.locator('.project-glyph')).toBeVisible()
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
  await expect(page.locator('.work-entry')).toHaveCount(3)
  await expect(page.locator('.work-entry .work-entry-role').first()).toHaveCSS(
    'text-transform',
    'lowercase',
  )
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
  await page.locator('.work-object').click({ force: true }) // home objects sway continuously
  await expect(page.locator('.route-work')).toBeVisible()
  await expect(page.locator('.page-entrance, .page-wipe')).toHaveCount(0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.page')).toHaveCSS('animation-name', 'none')
})

test('work entries start collapsed and expand on demand', async ({ page }) => {
  await page.goto('/#work')
  const toggles = page.locator('.work-entry-toggle')
  await expect(toggles).toHaveCount(3)
  for (const toggle of await toggles.all()) await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  const first = page.locator('.work-entry').first()
  await expect(first.locator('.work-entry-highlights li').first()).not.toBeInViewport()
  await toggles.first().click()
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true')
  await expect(first.locator('.work-entry-highlights li').first()).toBeVisible()
  // The whole entry toggles; the company ↗ is the only link and does not.
  await first.locator('.work-entry-meta').click()
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'false')
  await first.locator('.work-entry-name').click()
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true')
  await expect(first.locator('.work-entry-name > a')).toHaveCount(0)
  const popup = page.waitForEvent('popup')
  await first.locator('.work-entry-link').click()
  await (await popup).close()
  await expect(toggles.first()).toHaveAttribute('aria-expanded', 'true')
  // Role and dates share the top row on desktop.
  const role = await first.locator('.work-entry-role').boundingBox()
  const meta = await first.locator('.work-entry-meta').boundingBox()
  expect(Math.abs(role.y + role.height / 2 - (meta.y + meta.height / 2))).toBeLessThan(4)
})

test('work deep links open their entry; unknown pages get a 404 and tab titles follow the page', async ({ page }) => {
  await page.goto('/#work/usaco-guide')
  await expect(page.locator('#work-usaco-guide .work-entry-toggle')).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#work-career-education-council .work-entry-toggle')).toHaveAttribute('aria-expanded', 'false')
  await expect(page).toHaveTitle('work · jason sun')
  await page.goto('/#definitely-not-a-page')
  await expect(page.locator('.notfound-page h1')).toContainText('lost in')
  await expect(page).toHaveTitle('not found · jason sun')
  await page.getByRole('link', { name: 'back to the start' }).click()
  await expect(page.locator('.home-scene')).toBeVisible()
  await expect(page).toHaveTitle('jason sun · developer & cs student')
})

test('phone header stays on one row with every destination reachable', async ({ page }) => {
  for (const width of [320, 390, 600]) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto('/#projects')
    const header = await page.locator('.site-header').boundingBox()
    expect(header.height).toBeLessThanOrEqual(64)
    for (const link of await page.locator('.site-header nav a').all()) await expect(link).toBeInViewport()
    await expect(page.locator('.theme-toggle')).toBeInViewport()
  }
})
