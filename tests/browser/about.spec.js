import { test, expect } from '@playwright/test'

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
  await page.getByRole('button', { name: 'more details for make you my what' }).click()
  await expect(page.getByRole('button', { name: 'restart make you my what' })).toBeVisible()
  const slider = page.getByRole('slider', { name: 'volume level for make you my what' })
  await expect(slider).toBeVisible()
  await page.getByRole('button', { name: 'mute make you my what' }).click()
  await expect(slider).toHaveValue('0')
  await page.getByRole('button', { name: 'unmute make you my what' }).click()
  await expect(slider).not.toHaveValue('0')
  await page.setViewportSize({ width: 320, height: 740 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy()
})


test('about keeps its sections and no longer carries the hobby archives', async ({ page }) => {
  await page.goto('/#about')
  for (const id of ['currently', 'experience', 'next', 'outside', 'education'])
    await expect(page.locator(`#${id}`)).toBeVisible()
  await expect(page.locator('.hobbies-section, .hobby-collection, .motif-rule')).toHaveCount(0)
  await expect(page.getByText('motion graphics')).toHaveCount(0)
  await expect(page.locator('#outside .link-badge-instagram')).toHaveAttribute('href', 'https://www.instagram.com/cryojs/')
})
