import { existsSync } from 'node:fs'
import { env } from 'node:process'
import { defineConfig } from '@playwright/test'

const production = env.PORTFOLIO_PRODUCTION === '1'
const port = production ? 5175 : 5174

export default defineConfig({
  testDir: './tests/browser',
  timeout: 60000,
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    launchOptions: {
      // Use the system browser here; fall back to Playwright Chromium on other machines.
      ...(existsSync('/usr/bin/chromium')
        ? { executablePath: '/usr/bin/chromium' }
        : {}),
      args: ['--disable-gpu'],
    },
    viewport: { width: 1440, height: 1000 },
  },
  webServer: {
    command: `npm run ${production ? 'preview' : 'dev'} -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: true,
  },
  reporter: 'list',
})
